import { materials } from './materials';

const sheetInput = document.getElementById('sheetInput') as HTMLInputElement;
const thicknessSelect = document.getElementById('thicknessSelect') as HTMLSelectElement;
const cmInput = document.getElementById('cmInput') as HTMLInputElement;

let numberOfSheets = 0;
let selectedThickness = materials[0].value;

function calculateTotalThickness() {
  const totalThickness = (numberOfSheets * selectedThickness) / 10;
  cmInput.value = totalThickness.toFixed(2);
}

function calculateNumberOfSheets() {
  const totalThickness = Number.parseFloat(cmInput.value) || 0;
  numberOfSheets = Math.round((totalThickness * 10) / selectedThickness);
  sheetInput.value = numberOfSheets.toString();
}

sheetInput.addEventListener('input', () => {
  let value = sheetInput.value;
  if (value.startsWith('0') && value.length > 1) {
    value = value.slice(1);
    sheetInput.value = value;
  }
  numberOfSheets = Number.parseInt(value) || 0;
  calculateTotalThickness();
});

cmInput.addEventListener('input', () => {
  calculateNumberOfSheets();
});

for (const option of materials) {
  const opt = document.createElement('option');
  opt.value = option.value.toString();
  opt.textContent = option.label;
  if (option.value === selectedThickness) {
    opt.selected = true;
  }
  thicknessSelect.appendChild(opt);
}

thicknessSelect.addEventListener('change', () => {
  selectedThickness = Number.parseFloat(thicknessSelect.value);
  calculateTotalThickness();
});

thicknessSelect.value = selectedThickness.toString();
calculateTotalThickness();
