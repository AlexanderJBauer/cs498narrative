/* global d3 */
import {
  initChart,
  bumpUpYDomain,
  bumpDownYDomain,
  addXAxis,
  addYAxis,
} from './chartHelpers';

export default (data, rootElement) => {
  const {
    rootHeight,
    rootWidth,
    margin,
    width,
    height,
  } = initChart(rootElement);

  const structuredData = data
    .filter((d) => d.offense === 'Drug abuse violations')
    .sort((a, b) => +a.year - +b.year);

  const arrestsIn1984 = structuredData.find((d) => d.year === '1984').total;

  const drugRelatedArrestsByYear = d3.select('#drugRelatedArrestsByYear')
    .append('svg')
    .attr('width', rootWidth)
    .attr('height', rootHeight)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const xScale = d3.scaleBand()
    .domain(structuredData.map((d) => +d.year))
    .range([0, width]).padding(0.4);

  const yScale = d3.scaleLinear()
    .domain([
      bumpDownYDomain(d3.min(structuredData.map((d) => +d.total))),
      bumpUpYDomain(d3.max(structuredData.map((d) => +d.total))),
    ])
    .range([height, 0]);

  const tooltip = d3.select('#tooltip').size() ? d3.select('#tooltip') : (d3.select('body')
    .append('div')
    .attr('id', 'tooltip')
    .attr('style', 'position: absolute; opacity: 0;')
    .style('border-radius', '5px')
    .style('padding', '10px')
    .style('background-color', '#D3D3D3'));

  const mouseover = (d) => {
    d3.select('#tooltip')
      .transition().duration(200).style('opacity', 1);
    d3.select('#tooltip')
      .html(`
        <strong>Number of arrests for drug abuse violations</strong>
        <p>${d.year}: ${d.total}</p>
        <p>1984: ${arrestsIn1984}</p>
      `);
  };

  const mousemove = () => {
    d3.select('#tooltip')
      .style('left', `${d3.event.pageX + 10}px`)
      .style('top', `${d3.event.pageY + 10}px`);
  };

  const mouseout = () => {
    tooltip
      .transition()
      .duration(200)
      .style('opacity', 0);
  };

  // Add bars
  drugRelatedArrestsByYear.append('g')
    .selectAll('bar')
    .data(structuredData)
    .enter()
    .append('rect')
    .attr('x', (d) => xScale(+d.year))
    .attr('width', xScale.bandwidth())
    .attr('y', () => 0)
    .attr('height', () => 0)
    .style('fill', (d) => (d.year <= 1984 ? '#69b3a2' : '#AE7BB3'))
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseout', mouseout);

  addXAxis({ chart: drugRelatedArrestsByYear, xScale, height, width, margin });
  addYAxis({ chart: drugRelatedArrestsByYear, yScale, height, width, margin });

  // Animation
  drugRelatedArrestsByYear.selectAll('rect')
    .transition()
    .duration(400)
    .attr('y', (d) => yScale(d.total))
    .attr('height', (d) => height - yScale(d.total))
    .delay((d, i) => i * 50);
};
