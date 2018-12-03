const shifts = require('./input.json');

function firstRepeatedFrequency(shifts) {
    const frequencies = new Set();
    let frequency = 0;
    let i = 0;

    while(!frequencies.has(frequency)) {
        frequencies.add(frequency);

        frequency += shifts[i++];

        if(i === shifts.length) i = 0;
    }

    return frequency;
}

const answer = firstRepeatedFrequency(shifts);

console.log(answer);