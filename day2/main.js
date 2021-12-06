const fs = require('fs');

function main() {
  const input = fs.readFileSync('./input.txt').toString();
  let horizontal = 0;
  let depth = 0;
  let aim = 0;
  const arr = input.split('\n');
  arr.forEach(e => {
      const [type, unit] = e.split(' ')
      switch (type) {
          case 'forward':
              horizontal += parseInt(unit);
              depth += parseInt(unit) * aim;
              return;
          case 'down':
              aim += parseInt(unit);
              return;
          case 'up':
              aim -= parseInt(unit);
              return;
          default:

      }
  })
  return horizontal * depth;
}

console.log(main())
