const fs = require('fs');

function main1() {
    const latterns = fs.readFileSync('./input-test.txt').toString().split(',').map(e => parseFloat(e));
    console.log('Initial state: ', latterns.join(','));
    const days = 18;
    const dayMap = {};
    for (let day = 1; day <= 18; day++) {
        const babyLatterns = [];
        for (let i = 0; i < latterns.length; i++) {
            const lattern = latterns[i];
            if (lattern === 0) {
                babyLatterns.push(8)
                latterns[i] = 6;
            } else {
                latterns[i] -= 1;
            }
        }
        latterns.push(...babyLatterns);
        // console.log(`After day ${day}: ${latterns.join(',')}`)
    }
    return latterns.length;
}

function main2() {
    const latterns = fs.readFileSync('./input.txt').toString().split(',').map(e => parseFloat(e));
    console.log('Initial state: ', latterns.join(','));
    const MAX_DAYS = 256;
    const dayMap = {};
    let sum = latterns.length;
    latterns.forEach(l => {
        let days = nrOfChildren(l, 0, MAX_DAYS);
        Object.keys(days).forEach(day => {
            if (dayMap[day]) {
                dayMap[day] += days[day];
            } else {
                dayMap[day] = days[day];
            }
        });
    })
    for (let i = 1; i <= MAX_DAYS; i++) {
        const newLatterns = dayMap[i];
        console.log('Day ', i);
        if (newLatterns) {
            sum += newLatterns;
            let days = nrOfChildren(8, i, MAX_DAYS);
            Object.keys(days).forEach(day => {
                if (dayMap[day]) {
                    dayMap[day] += days[day] * newLatterns;
                } else {
                    dayMap[day] = days[day] * newLatterns;
                }
            });
            // for (let j =0; j< newLatterns; j++) {
            //     let days = nrOfChildren(8, i, MAX_DAYS);
            //     Object.keys(days).forEach(day => {
            //         if (dayMap[day]) {
            //             dayMap[day] += days[day];
            //         } else {
            //             dayMap[day] = days[day];
            //         }
            //     });
            // }
        }
    }
    // console.log(dayMap);
    // console.log(sum);
    return sum
}

function nrOfChildren(lattern, dayNr, maxDays) {
    let days = {};
    let l = lattern;
    let day = dayNr + 1;
    while (day <= maxDays) {
        l -= 1;
        if (l === -1) {
            days[day] = 1;
            l = 6;
        }
        day += 1;
    }
    return days;
}

// console.log(nrOfChildren(8, 6))
// console.log(nrOfChildren(3, 18))
// console.log(nrOfChildren(1, 18))
// console.log(nrOfChildren(2, 18))
// console.log(nrOfChildren(8, 2, 18))

// console.log(main1())
console.log(main2())
