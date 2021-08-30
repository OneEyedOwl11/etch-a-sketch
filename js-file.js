const defaultColor = "#333333";
const defaultMode = 'color';
const defaultSize = 16;

let currentColor = defaultColor;
let currentMode = defaultMode;
let currentSize = defaultSize;

function setCurrentMode(newMode) {
    activateMode(newMode);
    currentMode = newMode;
}

function setCurrentColor (newColor) {
    currentColor = newColor;
}

function setCurrentSize (newSize) {
    currentSize = newSize;
}

const colorPicker = document.getElementById('colorPicker');
const colorBtn = document.getElementById('colorBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');
const sizeValue = document.getElementById('sizeValue');
const gridRange = document.getElementById('gridRange');
const sketchContainer = document.getElementById('sketchContainer');

colorPicker.onchange = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode('color');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
eraserBtn.onclick = () => setCurrentMode('eraser');
clearBtn.onclick = () => reloadGrid();
gridRange.onmousemove = (e) => updateSizeValue(e.target.value);
gridRange.onchange = (e) => changeSize(e.target.value);

function changeSize(value) {
    setCurrentSize(value);
    updateSizeValue(value);
    reloadGrid();
}

function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`;
}

function reloadGrid() {
    clearGrid();
    setupGrid(currentSize);
}

function setupGrid(size) {
    sketchContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    sketchContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i = 0; i <size*size; i++) {
        const sketchElement = document.createElement('div');
        sketchElement.addEventListener('mouseover', changeColor);
        sketchContainer.appendChild(sketchElement);
    }
}
function clearGrid() {
    sketchContainer.innerHTML = '';
}

function changeColor(e) {
    if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randomR},${randomG},${randomB})`
    }
    else if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = "#fff";
    }
}

function activateMode(newMode) {
    if (currentMode === 'rainbow') {
        rainbowBtn.classList.remove('active');
    } else if (currentMode === 'color') {
        colorBtn.classList.remove('active');
    } else if (currentMode === 'eraser') {
        eraserBtn.classList.remove('active');
    }

    if (newMode === 'rainbow') {
        rainbowBtn.classList.add('active');
    } else if (newMode === 'color') {
        colorBtn.classList.add('active');
    } else if (newMode === 'eraser') {
        eraserBtn.classList.add('active');
    }
}

window.onload = () => {
    setupGrid(defaultSize);
    activateMode(defaultMode);
}