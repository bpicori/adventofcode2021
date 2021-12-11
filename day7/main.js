const fs = require('fs')

function main1() {
    const nrs = fs.readFileSync('./input.txt').toString().split(',').map(e => parseFloat(e)).sort((a, b) => a - b);
    let min = Number.MAX_VALUE;
    let minNr = -1;
    for (let i = 0; i < nrs[nrs.length - 1]; i++) {
        let fuel = 0;
        let b = false;
        for (let j = 0; j < nrs.length; j++) {
            if (fuel > min) {
                b = true
                break;
            }
            fuel += Math.abs(nrs[j] - i);
        }
        if (min > fuel && !b) {
            min = fuel;
            minNr = i;
        }
    }
    return {min, minNr};
}


function main2() {
    const nrs = fs.readFileSync('./input.txt').toString().split(',').map(e => parseFloat(e)).sort((a, b) => a - b);
    let min = Number.MAX_VALUE;
    let minNr = -1;
    for (let i = 0; i < nrs[nrs.length - 1]; i++) {
        let fuel = 0;
        let b = false;
        for (let j = 0; j < nrs.length; j++) {
            if (fuel > min) {
                b = true
                break;
            }
            fuel += fibonnaci(Math.abs(nrs[j] - i));
        }
        if (min > fuel && !b) {
            min = fuel;
            minNr = i;
        }
    }
    return {min, minNr};
}

function fibonnaci(number) {
    let sum = 0;
    let nr = number;
    while (nr > 0) {
        sum += nr;
        nr -= 1
    }
    return sum
}

console.log(main1())
console.log(main2())
