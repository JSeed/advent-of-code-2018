const input = require('./sample.json');

const parseInput = (str) => {
    const matches = str.match("Step (.) must be finished before step (.) can begin.");
    return {step: matches[2], dependency: matches[1]};
}

const requirements = input.map(parseInput);

console.log(requirements);