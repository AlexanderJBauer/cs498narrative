/* global document */
import drawExplorationChart from './exploreArrestsByYear';

let exploreData;
const currentConfigs = {};

const renderNewConfigItem = (config, currentConfigsElement) => {
  const newConfigItem = document.createElement('div');
  newConfigItem.setAttribute('id', config.id);
  const itemSpan = document.createElement('span');
  itemSpan.textContent = `offense: ${config.offense}, race: ${config.race}, color: ${config.color}`;
  const configRemoveButton = document.createElement('button');
  configRemoveButton.textContent = 'X';
  configRemoveButton.addEventListener('click', () => {
    document.getElementById(config.id).remove();
    delete currentConfigs[config.id];
    drawExplorationChart(exploreData, document.getElementById('exploreChart'), Object.values(currentConfigs));
  });
  newConfigItem.appendChild(itemSpan);
  newConfigItem.appendChild(configRemoveButton);
  currentConfigsElement.appendChild(newConfigItem);
};

const renderCurrentConfigsElement = (currentConfigsElement) => {
  while (currentConfigsElement.firstElementChild) {
    currentConfigsElement.removeChild(currentConfigsElement.firstElementChild);
  }
  Object.values(currentConfigs).forEach((config) => {
    renderNewConfigItem(config, currentConfigsElement);
  });
};

export default (data) => {
  exploreData = data;
  const configEditor = document.getElementById('configEditor');
  while (configEditor.firstElementChild) {
    configEditor.removeChild(configEditor.firstElementChild);
  }
  const categories = ['white', 'black', 'american_indian', 'asian', 'total'];
  const offenses = new Set();
  exploreData.forEach((d) => {
    offenses.add(d.offense);
  });

  const offenseSelect = document.createElement('select');
  offenseSelect.setAttribute('id', 'offenseSelect');
  offenseSelect.setAttribute('name', 'offenseSelect');
  offenseSelect.insertAdjacentHTML('beforeend', `
    <option value="">--Please choose an offense--</option>
    ${Array.from(offenses).reduce(
      (res, val) => `${res}<option value="${val}">${val}</option>`, ''
    )}
  `);

  const raceSelect = document.createElement('select');
  raceSelect.setAttribute('id', 'raceSelect');
  raceSelect.setAttribute('name', 'raceSelect');
  raceSelect.insertAdjacentHTML('beforeend', `
    <option value="">--Please choose a race--</option>
    ${categories.reduce(
      (res, val) => `${res}<option value="${val}">${val}</option>`, ''
    )}
  `);

  const colorInput = document.createElement('input');
  colorInput.setAttribute('id', 'colorInput');
  colorInput.setAttribute('name', 'colorInput');
  colorInput.setAttribute('placeholder', 'Ex: #123456 || red');
  colorInput.setAttribute('size', 16);

  const currentConfigsElement = document.createElement('div');
  currentConfigsElement.setAttribute('id', 'currentConfigs');

  const addConfigButton = document.createElement('button');
  addConfigButton.setAttribute('id', 'addConfigButton');
  addConfigButton.textContent = '+';
  addConfigButton.addEventListener('click', () => {
    const offense = document.getElementById('offenseSelect').value;
    const race = document.getElementById('raceSelect').value;
    const color = document.getElementById('colorInput').value;
    if (!offense || !race || !color) return;
    const configId = Math.random().toString().slice(2).toString(16);
    currentConfigs[configId] = {
      id: configId, offense, race, color,
    };
    renderNewConfigItem(currentConfigs[configId], currentConfigsElement);
    drawExplorationChart(exploreData, document.getElementById('exploreChart'), Object.values(currentConfigs));
  });

  configEditor.appendChild(offenseSelect);
  configEditor.appendChild(raceSelect);
  configEditor.appendChild(colorInput);
  configEditor.appendChild(addConfigButton);
  configEditor.appendChild(currentConfigsElement);
  renderCurrentConfigsElement(currentConfigsElement);
  drawExplorationChart(exploreData, document.getElementById('exploreChart'), Object.values(currentConfigs));
};
