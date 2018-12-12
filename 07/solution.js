const input = require('./input.json');

const parseInput = (str) => {
    const matches = str.match("Step (.) must be finished before step (.) can begin.");
    return {step: matches[2], dependency: matches[1]};
}

const requirements = input.map(parseInput);

const stepDependencies = {};
const dependentSteps = {};

function add(map, key, value) {
    if(!map[key]) map[key] = new Set();
    if(!map[value]) map[value] = new Set();
    map[key].add(value);
}

const steps = new Set();

for(let {step, dependency} of requirements) {
    if(!steps.has(step))steps.add(step);
    if(!steps.has(dependency)) steps.add(dependency);
    add(stepDependencies, step, dependency);
    add(dependentSteps, dependency, step);
}

// Initialize the lists of ready and done steps
const ready = [...steps].filter((step) => stepDependencies[step].size === 0); // List of all steps with 0 dependencies
const done = [];

while(ready.length > 0) {
    // Get the next step
    const step = ready.sort((a, b) => a.localeCompare(b)).shift();

    // Remove from dependencies of dependents
    dependentSteps[step].forEach((dependent) => {
        stepDependencies[dependent].delete(step)

        // If the dependent step has no more dependencies, mark it as ready
        if (stepDependencies[dependent].size == 0) ready.push(dependent);
    });

    // Add step to completed
    done.push(step);
}

console.log(done.join(''));