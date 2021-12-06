const fs = require('fs');

function main() {
    const input = fs.readFileSync('input.txt', 'utf8').toString();
    const arr = input.split('\n').map(e => parseInt(e));
    let sum = 0;
    for (let i = 0; i < arr.length - 1; i++ ) {
        const currEl = arr[i] + arr[i+1] + arr[i+2];
        const nextEl = arr[i + 1] + arr[i + 2] + arr[i + 3];
        if (nextEl > currEl) {
            sum +=1;
        }
    }
    return sum;
}

console.log(main())
