/* global d3 */
import { outerHeight, outerWidth } from './helpers';

export const initChart = (rootElement) => {
  while (rootElement.firstElementChild) {
    rootElement.removeChild(rootElement.firstElementChild);
  }

  const rootHeight = outerHeight(rootElement);
  const rootWidth = outerWidth(rootElement);
  const margin = {
    top: Math.floor(rootHeight / 10),
    right: Math.floor(rootWidth / 10),
    bottom: Math.floor(rootHeight / 8),
    left: Math.floor(rootWidth / 8),
  };
  const width = rootWidth - margin.left - margin.right;
  const height = rootHeight - margin.top - margin.bottom;

  return {
    rootHeight,
    rootWidth,
    margin,
    width,
    height,
  };
};

export const bumpUpYDomain = (maxVal) => {
  const bumped = maxVal * 1.03;
  if (maxVal > 100) {
    return Math.ceil(bumped);
  }
  return bumped;
};

export const bumpDownYDomain = (maxVal) => {
  const bumped = maxVal * 0.8;
  if (maxVal > 100) {
    return Math.ceil(bumped);
  }
  return bumped;
};

export const addXAxis = ({ chart, xScale, height, width, margin }) => {
  chart.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(xScale).tickFormat((d, i) => d.toString()))
    .selectAll('text')
    .style('text-anchor', 'end')
    .attr('dx', '-.8em')
    .attr('dy', '.15em')
    .attr('transform', 'rotate(-65)');

  // text label for the x axis
  chart.append('text')
    .attr('transform', `translate(${width / 2},${height + margin.top + 10})`)
    .style('text-anchor', 'middle')
    .text('Year');
};

export const addYAxis = ({ chart, yScale, height, width, margin }) => {
  // Add Y axis
  chart.append('g')
    .call(d3.axisLeft(yScale));

  // text label for the y axis
  chart.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left + 10)
    .attr('x', 0 - (height / 2))
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text('Number of arrests');
};

export const addCategoryLegend = ({
  chart,
  height,
  width,
  margin,
  categories,
  colorScale,
}) => {
  const svgLegend = chart.append('g')
    .attr('class', 'gLegend')
    .attr('transform', `translate(${20},${0})`);

  const legend = svgLegend.selectAll('.legend')
    .data(categories)
    .enter().append('g')
    .attr('class', 'legend')
    .attr('transform', (d, i) => `translate(0,${i * 20})`);

  legend.append('circle')
    .attr('class', 'legend-node')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', 5)
    .style('fill', (d) => colorScale(d));

  legend.append('text')
    .attr('class', 'legend-text')
    .attr('x', 5 * 2)
    .attr('y', 5 / 2)
    .style('fill', '#000000')
    .style('font-size', 12)
    .text((d) => d);
};
