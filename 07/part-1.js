const input = require('./input.json');
const {parseInput, mapRequirements} = require('./lib');

const requirements = input.map(parseInput);

const {steps, stepDependencies, dependentSteps} = mapRequirements(requirements);

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