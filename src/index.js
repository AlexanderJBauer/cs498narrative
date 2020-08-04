/* global document, d3, window */
import drawDrugRelatedArrestsByYear from './arrestsByYear';
import drawDrugRelatedArrestsByRace from './arrestsByRace';
import renderExploration from './configEditor';
import initPage from './page';
import initNav from './navbar';
import initSlideAnimation from './slideAnimation';

initPage();
initSlideAnimation();
initNav();
d3.csv('data/arrestsByYearWithRace.csv').then((data) => {
  renderExploration(data);
  drawDrugRelatedArrestsByYear(
    data,
    document.querySelector('#drugRelatedArrestsByYear'),
  );
  drawDrugRelatedArrestsByRace(
    data,
    document.querySelector('#drugRelatedArrestsByRace'),
  );
  window.addEventListener('resize', () => {
    drawDrugRelatedArrestsByYear(
      data,
      document.querySelector('#drugRelatedArrestsByYear'),
    );
    drawDrugRelatedArrestsByRace(
      data,
      document.querySelector('#drugRelatedArrestsByRace'),
    );
    renderExploration(data);
  });
  document.getElementById('drugRelatedArrestsByYear')
    .addEventListener('animationend', (event) => {
      const drugRelatedArrestsByYear = document
        .querySelector('#drugRelatedArrestsByYear');
      if (
        event.animationName === 'fade-in-long'
      ) {
        drawDrugRelatedArrestsByYear(data, drugRelatedArrestsByYear);
      }
    });
});
