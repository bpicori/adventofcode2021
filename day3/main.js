const fs = require('fs');

function main1() {
  const input = fs.readFileSync('./input.txt').toString();
  const arr = input.split('\n').map(e => e.split(''));
  const length = arr[0].length;
  const gama = [];
  for (let i = 0; i < length; i++) {
      let sum = 0;
      for(let j = 0; j< arr.length; j++) {
          const el = parseInt(arr[j][i]);
          if (el) {
              sum += el;
          }
      }
      if (sum >= Math.round(arr.length / 2)) {
          gama.push(1);
      } else {
          gama.push(0);
      }
  }
  const epsilon = gama.map(e => e === 1 ? 0 : 1);
  return binaryToDecimal(gama.join('')) * binaryToDecimal(epsilon.join(''))
}

function main2() {
    const input = fs.readFileSync('./input.txt').toString();
    const arr = input.split('\n').filter(e => e);
    let index = 0;
    const oxygen = findOxygen(arr, index);
    index = 0;
    const co2 = findCO2(arr, index);
    return binaryToDecimal(oxygen) * binaryToDecimal(co2);
}

function findOxygen(arr, index) {
    const oneArr = [];
    const zeroArr = [];
    if (arr.length === 1) {
        return arr[0];
    }
    arr.forEach(e => {
        const el = e.split('')[index];
        if (el === '0') {
            zeroArr.push(e);
        } else {
            oneArr.push(e);
        }
    });
    if (oneArr.length >= zeroArr.length) {
        return findOxygen(oneArr, index + 1);
    } else {
        return findOxygen(zeroArr, index + 1);
    }
}

function findCO2(arr, index) {
    const oneArr = [];
    const zeroArr = [];
    if (arr.length === 1) {
        return arr[0];
    }
    arr.forEach(e => {
        const el = e.split('')[index];
        if (el === '0') {
            zeroArr.push(e);
        } else {
            oneArr.push(e);
        }
    });
    if (zeroArr.length <= oneArr.length) {
        return findCO2(zeroArr, index + 1);
    } else {
        return findCO2(oneArr, index + 1);
    }
}



function binaryToDecimal(b) {
    const arr = b.split('').map(e => parseInt(e));
    let sum = 0;
    let pow = arr.length - 1;
    for (let i = 0; i < arr.length; i++) {
        const r = arr[i] * Math.pow(2, pow);
        sum += r
        pow -= 1
    }
    return sum;
}
console.log(main1())
console.log(main2())
