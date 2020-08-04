/* global d3 */
import {
  initChart,
  bumpUpYDomain,
  addXAxis,
  addYAxis,
  addCategoryLegend,
} from './chartHelpers';

export default (data, rootElement, gridConfigs) => {
  const {
    rootHeight,
    rootWidth,
    margin,
    width,
    height,
  } = initChart(rootElement);

  const colorMap = {};
  const races = [];
  const offenses = [];
  const genCategoryKey = (offense, race) => `${offense} by ${race}`;
  gridConfigs.forEach((config) => {
    colorMap[genCategoryKey(config.offense, config.race)] = config.color;
    if (!races.includes(config.race)) races.push(config.race);
    if (!offenses.includes(config.offense)) offenses.push(config.offense);
  });

  const structuredData = [];
  data.filter((d) => offenses.includes(d.offense))
    .sort((a, b) => (+a.year) - (+b.year))
    .forEach((d) => {
      races.forEach((race) => {
        structuredData.push({
          year: d.year,
          total: d[race],
          category: genCategoryKey(d.offense, race),
        });
      });
    });

  const lineOpacity = 1;
  const lineStroke = '2px';

  const colorScale = d3.scaleOrdinal()
    .domain(Object.keys(colorMap))
    .range(Object.keys(colorMap).map((key) => colorMap[key]));

  const timeScale = d3.scaleTime()
    .domain(d3.extent(structuredData, (d) => d.year))
    .range([0, width]);

  const xScale = d3.scaleLinear()
    .domain([d3.min(structuredData, (d) => +d.year), d3.max(structuredData, (d) => +d.year)])
    .range([0, width]);

  const yScale = d3.scaleLinear()
    .domain([0, bumpUpYDomain(d3.max(structuredData, (d) => +d.total))])
    .range([height, 0]);

  const svg = d3.select(`#${rootElement.id}`).append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  addXAxis({ chart: svg, xScale, height, width, margin });
  addYAxis({ chart: svg, yScale, height, width, margin });
  addCategoryLegend({ chart: svg, categories: Object.keys(colorMap), colorScale, height, width, margin });

  // line generator
  const line = d3.line()
    .x((d) => xScale(d.year))
    .y((d) => yScale(d.total));

  const nestedData = d3.nest()
    .key((d) => d.category)
    .entries(structuredData);

  // APPEND MULTIPLE LINES //
  const lines = svg.append('g')
    .attr('class', 'lines');

  const glines = lines.selectAll('.line-group')
    .data(nestedData).enter()
    .append('g')
    .attr('class', 'line-group');

  glines
    .append('path')
    .attr('class', 'line')
    .attr('d', (d) => line(d.values))
    .style('stroke', (d, i) => colorScale(d.key))
    .style('fill', 'none')
    .style('opacity', lineOpacity)
    .style('stroke-width', lineStroke);

  // // Add vertical for 1984
  svg.append('line')
    .attr('x1', xScale(1984))
    .attr('y1', 0)
    .attr('x2', xScale(1984))
    .attr('y2', height)
    .style('stroke-width', 3)
    .style('stroke', 'black')
    .style('fill', 'none');

  // CREATE HOVER TOOLTIP WITH VERTICAL LINE //
  const tooltip = d3.select('#race-tooltip').size()
    ? d3.select('#race-tooltip')
    : (d3.select('body').append('div')
      .attr('id', 'race-tooltip')
      .style('position', 'absolute')
      .style('background-color', '#D3D3D3')
      .style('padding', '10px')
      .style('display', 'none'));

  const mousemove = () => {
    d3.select('#race-tooltip')
      .style('left', `${d3.event.pageX + 10}px`)
      .style('top', `${d3.event.pageY + 10}px`);
  };

  const mouseG = svg.append('g')
    .attr('class', 'mouse-over-effects');

  mouseG.append('path') // create vertical line to follow mouse
    .attr('class', 'mouse-line')
    .style('stroke', '#A9A9A9')
    .style('stroke-width', lineStroke)
    .style('opacity', '0');

  const mousePerLine = mouseG.selectAll('.mouse-per-line')
    .data(nestedData)
    .enter()
    .append('g')
    .attr('class', 'mouse-per-line');

  mousePerLine.append('circle')
    .attr('r', 4)
    .style('stroke', (d) => colorScale(d.key))
    .style('fill', 'none')
    .style('stroke-width', lineStroke)
    .style('opacity', '0');

  mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
    .attr('width', width)
    .attr('height', height)
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .on('mouseout', () => { // on mouse out hide line, circles and text
      d3.select('.mouse-line')
        .style('opacity', '0');
      d3.selectAll('.mouse-per-line circle')
        .style('opacity', '0');
      d3.selectAll('.mouse-per-line text')
        .style('opacity', '0');
      d3.selectAll('#race-tooltip')
        .style('display', 'none');
    })
    .on('mouseover', () => { // on mouse in show line, circles and text
      d3.select('.mouse-line')
        .style('opacity', '1');
      d3.selectAll('.mouse-per-line circle')
        .style('opacity', '1');
      d3.selectAll('#race-tooltip')
        .style('display', 'block');
    })
    .on('mousemove', function () {
      const mouse = d3.mouse(this);
      d3.selectAll('.mouse-per-line')
        .attr('transform', (d, i) => {
          const xDate = timeScale.invert(mouse[0]); // use 'invert' to get date corresponding to distance from mouse position relative to svg
          const bisect = d3.bisector((d) => d.year).left; // retrieve row index of date on parsed csv
          const idx = bisect(d.values, xDate);

          d3.select('.mouse-line')
            .attr('d', () => {
              let data = 'M' + xScale(+d.values[idx].year) + ',' + (height);
              data += ' ' + xScale(+d.values[idx].year) + ',' + 0;
              return data;
            });

          return 'translate(' + xScale(+d.values[idx].year) + ',' + yScale(d.values[idx].total) + ')';
        });
      updateTooltipContent(mouse);
      mousemove();
    });


  function updateTooltipContent(mouse) {
    const sortingObj = [];
    nestedData.map((d) => {
      const xDate = timeScale.invert(mouse[0]);
      const bisect = d3.bisector((d) => d.year).left;
      const idx = bisect(d.values, xDate);
      sortingObj.push({
        key: d.values[idx].category, total: d.values[idx].total, year: d.values[idx].year,
      });
    });

    sortingObj.sort((x, y) => d3.descending(+x.total, +y.total));

    const sortingArr = sortingObj.map((d) => d.key);

    const resNested = nestedData.slice()
      .sort((a, b) => sortingArr.indexOf(a.key) - sortingArr.indexOf(b.key));

    tooltip.html(`${sortingObj[0].year}`)
      .style('display', 'block')
      .style('left', d3.event.pageX + 20)
      .style('top', d3.event.pageY - 20)
      .style('font-size', 11.5)
      .selectAll()
      .data(resNested)
      .enter() // for each vehicle races, list out name and price of premium
      .append('div')
      .style('color', (d) => colorScale(d.key))
      .style('font-size', 10)
      .html((d) => {
        const xDate = timeScale.invert(mouse[0]);
        const bisect = d3.bisector((d) => d.year).left;
        const idx = bisect(d.values, xDate);
        return `${d.key}: ${d.values[idx].total.toString()}`;
      });
  }
};
