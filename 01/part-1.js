const shifts = require('./input.json');

const frequency = shifts.reduce((acc, shift) => acc + shift);

console.log(frequency);