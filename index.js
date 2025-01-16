// Implementation of CLI for Conway's Game of Life
// RULES of the game :
//  - Any live cell with fewer than two live neighbours dies, as if by underpopulation.
//  - Any live cell with two or three live neighbours lives on to the next generation.
//  - Any live cell with more than three live neighbours dies, as if by overpopulation.
//  - Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
//
// Alive cells will be represented by # and dead cells will be represented by .
const {execSync} = require('child_process');

console.log("Conway's Game of Life, the brand new one of the best game ever created");

const ALIVE = '#';
const DEAD = '.';

const ROW = 50;
const COL = 50;

function createGrid(rows, cols) {
    let grid = [];
    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        for (let j = 0; j < cols; j++) {
            grid[i][j] = DEAD;
        }
    }
    return grid;
}

function printGrid(grid) {
    for (let row of grid) {
        console.log(row.join(' '));
    }
}

function getNeighbourCount(grid, x, y) {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],         [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];
    let count = 0;
    for (let [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;
        if (newX >= 0 && newX < grid.length && newY >= 0 && newY < grid[0].length) {
            if (grid[newX][newY] === ALIVE) {
                count++;
            }
        }
    }
    return count;
}

function nextGeneration(grid) {
    const newGrid = createGrid(grid.length, grid[0].length);
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const neighbours = getNeighbourCount(grid, i, j);
            if (grid[i][j] === ALIVE) {
                if (neighbours < 2 || neighbours > 3) {
                    newGrid[i][j] = DEAD;
                } else {
                    newGrid[i][j] = ALIVE;
                }
            } else {
                if (neighbours === 3) {
                    newGrid[i][j] = ALIVE;
                }
            }
        }
    }
    return newGrid;
}

// Example usage
let grid = createGrid(ROW,COL);
grid[25][25] = ALIVE;
grid[24][25] = ALIVE;
grid[26][25] = ALIVE;
grid[25][26] = ALIVE;
grid[26][24] = ALIVE;
grid[24][24] = ALIVE;
console.log("Initial Generation:");
printGrid(grid);

while (true) {
    execSync('sleep 0.1');
    console.clear();
    grid = nextGeneration(grid);
    printGrid(grid);
}