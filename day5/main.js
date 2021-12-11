const fs = require('fs');

function main1() {
    const input = fs.readFileSync('./input.txt').toString();
    const grid = [];
    let mX = 0;
    let mY = 0;
    const coordinates = input.split('\n').filter(e => e).map(line => {
        const temp = line.split('->');
        const [x1, y1] = temp[0].trim().split(',').map(e => parseFloat(e))
        const [x2, y2] = temp[1].trim().split(',').map(e => parseFloat(e))
        if (mX < x1) {
            mX = x1;
        }
        if (mX < x2) {
            mX = x2;
        }
        if (mY < y1) {
            mY = y1;
        }
        if (mY < y2) {
            mY = y2;
        }
        if (x1 === x2) {
            // start from min to max
            const min = y1 < y2 ? y1 : y2;
            const max = y1 > y2 ? y1 : y2;
            for (let i = min; i <= max; i++) {
                // check if is initialized
                if (grid[i]) {
                    grid[i][x1] = (grid[i][x1] || 0) + 1;
                } else {
                    grid[i] = [];
                    grid[i][x1] = 1;
                }
            }
        }
        if (y1 === y2) {
            // start from min to max
            const min = x1 < x2 ? x1 : x2;
            const max = x1 > x2 ? x1 : x2;
            for (let i = min; i <= max; i++) {
                // check if is initialized
                if (grid[y1]) {
                    grid[y1][i] = (grid[y1][i] || 0) + 1;
                } else {
                    grid[y1] = [];
                    grid[y1][i] = 1;
                }
            }
        }

    })
    let sum = 0;
    for (let i = 0; i <= mY; i++) {
        if (!grid[i]) {
            grid[i] = [];
        }
        for (let j = 0; j <= mX; j++) {
            // if (!grid[i][j]) {
            //     grid[i][j] = '.'
            // }
            if (grid[i][j] && grid[i][j] >= 2) {
                sum += 1;
            }
        }
    }
    return sum;
}

function getCoordinates([x1, y1], [x2, y2]) {
    const incrX = x1 < x2 ? 1 : -1;
    const incY = y1 < y2 ? 1 : -1;
    const coordinates = [];
    for (let x = x1, y = y1; true; x += incrX, y += incY) {
        coordinates.push([x, y]);
        if (x === x2) {
            break;
        }
    }
    return coordinates;
}


function main2() {
    const input = fs.readFileSync('./input.txt').toString();
    const grid = [];
    let mX = 0;
    let mY = 0;
    input.split('\n').filter(e => e).forEach(line => {
        const temp = line.split('->');
        const [x1, y1] = temp[0].trim().split(',').map(e => parseFloat(e))
        const [x2, y2] = temp[1].trim().split(',').map(e => parseFloat(e))
        if (mX < x1) {
            mX = x1;
        }
        if (mX < x2) {
            mX = x2;
        }
        if (mY < y1) {
            mY = y1;
        }
        if (mY < y2) {
            mY = y2;
        }
        if (x1 === x2) {
            // start from min to max
            const min = y1 < y2 ? y1 : y2;
            const max = y1 > y2 ? y1 : y2;
            for (let i = min; i <= max; i++) {
                // check if is initialized
                if (grid[i]) {
                    grid[i][x1] = (grid[i][x1] || 0) + 1;
                } else {
                    grid[i] = [];
                    grid[i][x1] = 1;
                }
            }
        } else if (y1 === y2) {
            // start from min to max
            const min = x1 < x2 ? x1 : x2;
            const max = x1 > x2 ? x1 : x2;
            for (let i = min; i <= max; i++) {
                // check if is initialized
                if (grid[y1]) {
                    grid[y1][i] = (grid[y1][i] || 0) + 1;
                } else {
                    grid[y1] = [];
                    grid[y1][i] = 1;
                }
            }
        } else  {
            const coordinates = getCoordinates([x1, y1], [x2, y2]);
            coordinates.forEach(([x, y]) => {
                if (grid[y]) {
                    grid[y][x] = (grid[y][x] || 0) + 1;
                } else {
                    grid[y] = [];
                    grid[y][x] = 1;
                }
            })
        }
    })
    let sum = 0;
    for (let i = 0; i <= mY; i++) {
        if (!grid[i]) {
            grid[i] = [];
        }
        for (let j = 0; j <= mX; j++) {
            if (!grid[i][j]) {
                grid[i][j] = '.'
            } else if (grid[i][j] && grid[i][j] >= 2) {
                sum += 1;
            }
        }
    }
    return { sum};
}

console.log(main1());
console.log(main2());
