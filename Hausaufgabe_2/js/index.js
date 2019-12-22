'use strict';
let width = 60;
let height = 25;
let playing;
let gameField;
let nextArray = new Array(width);
let reproductionTime = 100;
let hasChanged;
let timer;
let generation;

class Cgolgrid extends HTMLElement {
    constructor() {
        super();
        this.width = width;
        this.height = height;
        this.cellsize = 10;
        this.playing = false;
    }

    connectedCallback() {
        this.root = this.attachShadow({ mode: 'open' });
        this.root.id = 'rootElement';
        this.shadowRoot.innerHTML =
            `<style>
    .grid-container {
        display: grid;
        grid-template-columns: ${this.getCssGridColumns(this.width)}
    }
    .grid-container > div.cell {
        composed: true,
        width: ${this.cellsize.toString()}px;
        height: ${this.cellsize.toString()}px;
        text-align: center;
        font-size: ${(this.cellsize / 2).toString()}px;
        line-height: ${this.cellsize.toString()}px;
    }
    .cell-color-gray{
        background-color: gray;
    }
    .cell-color-yellow{
        background-color: yellow;
    }
    .cell-color-brown{
        background-color: brown;
    }
    </style>
    <div id="test"></div>
    `;
        this.root.appendChild(this.getElements(this.height, this.width));
    }

    getCssGridColumns(col) {
        let columns = '';
        const width = col;
        for (let i = 0; i < width; i++) {
            columns += ' ';
            columns += this.cellsize.toString() + 'px';
        }
        return columns;
    }

    getElements(row, col) {
        const grid = document.createElement('div');
        grid.setAttribute('class', 'grid-container');
        const width = col;
        const height = row;
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                const id = i.toString() + '_' + j.toString();
                const cell = document.createElement('div');
                cell.setAttribute('id', id);
                cell.setAttribute('class', 'cell cell-color-gray');
                cell.onclick = () => this.toggleColor(id, i, j);
                cell.setAttribute('isDead', '1');
                grid.appendChild(cell);
            }
        }

        create2DArray(row, col);
        return grid;
    }

    toggleColor(id, i, j) {
        if (playing) {
            return;
        }

        const elem = this.shadowRoot.getElementById(id);

        if (elem.classList.contains('cell-color-gray')) {
            elem.classList.remove('cell-color-gray');
            elem.classList.add('cell-color-yellow');
            gameField[i][j] = 1;
        } else {
            elem.classList.remove('cell-color-yellow');
            elem.classList.add('cell-color-gray');
            gameField[i][j] = 0;
        }
    }
}

function setReproductionTime() {
    const elem = document.getElementById('inputRepro');
    reproductionTime = elem.value;
}

function startGame() {
    if (playing) {
        return;
    }
    playing = true;
    generation = 0;

    play();
}

function create2DArray(row, col) {
    gameField = new Array(row);
    nextArray = new Array(row);

    for (let i = 0; i < row; i++) {
        gameField[i] = new Array(col);
        nextArray[i] = new Array(col);
    }

    for (let j = 0; j < row; j++) {
        for (let k = 0; k < col; k++) {
            gameField[j][k] = 0;
            nextArray[j][k] = 0;
        }
    }
}

function generateRandom() {
    const root = document.getElementById('shadowDom').root;
    let value;
    let elem;

    playing = false;

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            elem = root.getElementById(i.toString() + '_' + j.toString());
            value = Math.round(Math.random(2));
            gameField[i][j] = value;

            if (value === 1) {
                elem.classList.remove('cell-color-brown');
                elem.classList.remove('cell-color-gray');
                elem.classList.add('cell-color-yellow');
            } else {
                elem.classList.remove('cell-color-brown');
                elem.classList.remove('cell-color-yellow');
                elem.classList.add('cell-color-gray');
            }
        }
    }
}

function resetGame() {
    const root = document.getElementById('shadowDom').root;
    let elem;

    playing = false;

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            nextArray[i][j] = 0;
            gameField[i][j] = 0;
            elem = root.getElementById(i.toString() + '_' + j.toString());
            elem.classList.remove('cell-color-yellow');
            elem.classList.remove('cell-color-brown');
            elem.classList.add('cell-color-gray');
        }
    }
}

function play() {
    hasChanged = false;

    computeNextGen();

    if (!hasChanged) {
        playing = false;
        return;
    }

    if (playing) {
        addGeneration();
    }

    if (playing && hasChanged) {
        timer = setTimeout(play, reproductionTime);
    }
}

function addGeneration() {
    generation++;
    const label = document.getElementById('generationCounter');
    label.innerHTML = generation;
}

function pauseGame() {
    playing = false;
}

function copyAndResetGrid() {
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            gameField[i][j] = nextArray[i][j];
            nextArray[i][j] = 0;
        }
    }
}

function computeNextGen() {
    const root = document.getElementById('shadowDom').root;

    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {
            applyRules(j, i, root);
        }
    }

    copyAndResetGrid();
}

function applyRules(row, col, root) {
    var numNeighbors = countNeighbors(row, col);
    if (gameField[row][col] === 1) {
        if (numNeighbors < 2) {
            nextArray[row][col] = 0;
            changeColor(row, col, numNeighbors, root);
            hasChanged = true;
        } else if (numNeighbors === 2 || numNeighbors === 3) {
            nextArray[row][col] = 1;
            changeColor(row, col, numNeighbors, root);
            hasChanged = true;
        } else if (numNeighbors > 3) {
            nextArray[row][col] = 0;
            changeColor(row, col, numNeighbors, root);
            hasChanged = true;
        }
    } else if (gameField[row][col] === 0) {
        if (numNeighbors === 3) {
            nextArray[row][col] = 1;
            changeColor(row, col, numNeighbors, root);
            hasChanged = true;
        }
    }
}

function changeColor(row, col, value, root) {
    const elem = root.getElementById(row.toString() + '_' + col.toString());

    if (value < 2 && elem.classList.contains('cell-color-yellow')) {
        elem.classList.remove('cell-color-yellow');
        elem.classList.add('cell-color-brown');

        return;
    }

    if ((value === 2 && value === 3) && elem.classList.contains('cell-color-yellow')) {
        return;
    }

    if (value === 2) {
        elem.classList.remove('cell-color-gray');
        elem.classList.remove('cell-color-brown');
        elem.classList.add('cell-color-yellow');

        return;
    }

    if (value === 3 && (elem.classList.contains('cell-color-gray') || elem.classList.contains('cell-color-brown'))) {
        elem.classList.remove('cell-color-gray');
        elem.classList.remove('cell-color-brown');
        elem.classList.add('cell-color-yellow');

        return;
    }

    if (value > 3 && elem.classList.contains('cell-color-yellow')) {
        elem.classList.remove('cell-color-yellow');
        elem.classList.add('cell-color-brown');
    }
}

function loadLevel() {
    resetGame();

    const root = document.getElementById('shadowDom').root;
    var lines = document.getElementById('levelTextArea').value.split('\n');
    for (var i = 0; i < lines.length; i++) {
        const line = lines[i];
        for (let k = 0; k < width; k++) {
            if (line[k] === '1') {
                gameField[i][k] = 1;
                const elem = root.getElementById(i.toString() + '_' + k.toString());
                elem.classList.remove('cell-color-gray');
                elem.classList.add('cell-color-yellow');
            }
        }
    }
}

function setSize() {
    playing = false;

    const localHeight = document.getElementById('heightLabel');
    const localWidth = document.getElementById('widthLabel');

    if (localHeight.value < 10 || localWidth.value < 10) {
        return;
    }

    const root = document.getElementById('shadowDom').root;

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            root.getElementById(i.toString() + '_' + j.toString()).remove();
        }
    }

    height = localHeight.value;
    width = localWidth.value;
    const pith = document.getElementsByTagName('grid-cgol')[0];
    var style = document.createElement('style');
    var sheet = new CSSStyleSheet();
    sheet.replaceSync(`.grid-container {
        display: grid;
        grid-template-columns: ${pith.getCssGridColumns(width)}
    }`);

    root.adoptedStyleSheets = [sheet];
    root.appendChild(style);
    root.appendChild(pith.getElements(height, width));
}

function countNeighbors(row, col) {
    let sum = 0;

    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            const row2 = (row + i + Number(height)) % Number(height);
            const col2 = (col + j + Number(width)) % Number(width);

            sum += gameField[row2][col2];
        }
    }

    sum -= gameField[row][col];

    return sum;
}

window.customElements.define('grid-cgol', Cgolgrid);
