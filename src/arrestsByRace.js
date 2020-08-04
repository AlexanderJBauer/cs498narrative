import drawExplorationChart from './exploreArrestsByYear';

export default (data, rootElement) => {
  drawExplorationChart(
    data,
    rootElement,
    [
      {
        offense: 'Drug abuse violations',
        race: 'white',
        color: 'red',
      },
      {
        offense: 'Drug abuse violations',
        race: 'black',
        color: 'magenta',
      },
      {
        offense: 'Drug abuse violations',
        race: 'american_indian',
        color: 'blue',
      },
      {
        offense: 'Drug abuse violations',
        race: 'asian',
        color: 'green',
      },
    ],
  );
};
