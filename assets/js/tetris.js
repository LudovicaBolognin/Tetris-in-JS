let canvas;
let ctx;
let gameBoardArrayH = 20;
let gameBoardArrayW = 12;
let startX = 4;
let startY = 0;
// Creare un array con n elementi: var foo = new Array(100).fill('DefaultValue');
/* Array con range: function range(start, end) {
  return Array(end - start + 1).fill().map((_, idx) => start + idx)
}
var result = range(9, 18); // [9, 10, 11, 12, 13, 14, 15, 16, 17, 18] */
let coordinateArray = [...Array(gameBoardArrayH)].map(e => Array(gameBoardArrayW).fill(0));

/* Pezzi del tetromino in [j, k]:
00 01 02 03
01 11 21 31
02 12 22 32

T = [1,0] [0,1] [1,1] [2,1]
Quadrato = [0,0] [0,1] [1,0] [1,1]
Linea = [0,0], [1,0], [2,0], [3,0]
Zdx = [2,0], [0,1], [1,1], [2,1] Zsx = [0,0], [0,1], [1,1], [2,2]
Ldx = [1,0], [2,0], [0,1], [1,1] Lsn = [0,0], [1,0], [1,1,] [2,1]
*/

// Primo pezzo via shapes storing:
let currentTetromino = [[1,0], [0,1], [1, 1], [2, 1]];

let tetrominos = [];
let tetrominoColor = ['purple', 'pink', 'blue', 'yellow', 'orange', 'green', 'red'];
let currentTetrominoColor;

let gameboardArray = [...Array(gameBoardArrayH)].map(e => Array(gameBoardArrayW).fill(0));

let DIRECTION = {
    IDLE: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
};

let direction;

class Coordinate {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    };
};

document.addEventListener('DOMContentLoaded', setupCanvas);

// Popolare l'array coor
function createCoordArray() {
    let i = 0;
    let j = 0;
    // ciclo for per creare i quadratini del tetromino
    for(let y = 9; y <= 446; y+= 23) { //9px dal top screen //446 max da top finon a bottom screen // 23 misura del cubetto (21effettivi)
        for(let x = 11; x<= 264; x+= 23) { // 11 da left, max estensione 264px
            coordinateArray[i][j] = new Coordinate(x,y);
            i++;
        }
        j++;
        i = 0;
    }
}

function setupCanvas() {
    canvas = document.getElementById('my-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 936;
    canvas.width = 956;
    
    //ctx.scale(2,2);

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height); // disegnato un rettangolo con canvas
    ctx.strokeStyle = 'black';
    ctx.strokeRect(8, 8, 280, 462);


    document.addEventListener('keydown', handleKeyPress);
    createTetrominos();
    createTetromino();

    createCoordArray();
    drawTetromino();
}

function drawTetromino() { //da dove parte il pezzo e scrivere-cancellare i pezzi mano a mano che scendono
    for(let i=0; i < currentTetromino.length; i++) {
        let x = currentTetromino[i][0] + startX;
        let y = currentTetromino[i][1] + startY;
        // tetromino dentro l'array
        gameboardArray[x][y] = 1;
        let coorX = coordinateArray[x][y].x;
        let coorY = coordinateArray[x][y].y;
        ctx.fillStyle = currentTetrominoColor; //disegno il tetromino
        ctx.fillRect(coorX, coorY, 21, 21);
    }
}

function handleKeyPress(key) {
    /* 65 = A , 68 = D, 83 = S*/
    if(key.keyCode === 65) {
        direction = DIRECTION.LEFT;
        deleteTetromino();
        startX--;
        drawTetromino();
    } else if (key.keyCode === 68) {
        direction = DIRECTION.RIGHT;
        deleteTetromino();
        startX++;
        drawTetromino();
    } else if(key.keyCode === 83) {
        direction = DIRECTION.DOWN;
        deleteTetromino();
        startY++;
        drawTetromino();
    }
}

function deleteTetromino() {
    for(let i=0; i < currentTetromino.length; i++) {
        let x = currentTetromino[i][0] + startX;
        let y = currentTetromino[i][1] + startY;
        gameboardArray[x][y] = 0;
        let coorX = coordinateArray[x][y].x;
        let coorY = coordinateArray[x][y].y;
        ctx.fillStyle = 'white';
        ctx.fillRect(coorX, coorY, 21, 21);
    }
}

function createTetrominos() {
    tetrominos.push([[1,0], [0,1], [1,1], [2,1]]);
    tetrominos.push([[0,0], [1,0], [2,0], [3,0]]);
    tetrominos.push([[0,0], [0,1], [1,1], [2,1]]);
    tetrominos.push([[0,0], [1,0], [0,1], [1,1]]);
    tetrominos.push([[2,0], [0,1], [1,1], [2,1]]);
    tetrominos.push([[1,0], [2,0], [0,1], [1,1]]);
    tetrominos.push([[0,0], [1,0], [1,1], [2,1]]);
}

function createTetromino() {
    let randomTetromino = Math.floor(Math.random() * tetrominos.length);
    currentTetromino = tetrominos[randomTetromino];
    currentTetrominoColor = tetrominoColor[randomTetromino];
}