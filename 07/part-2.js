const input = require('./input.json');
const {parseInput, mapRequirements} = require('./lib');

const numWorkers = 5;
const baseDuration = 60;

const requirements = input.map(parseInput);
const {steps, stepDependencies, dependentSteps} = mapRequirements(requirements);

const getStepDuration = (step) => step.charCodeAt(0) - 'A'.charCodeAt(0) + 1 + baseDuration;

const readySteps = [...steps].filter((step) => stepDependencies[step].size === 0); // List of all steps with 0 dependencies
const pendingWork = [];
const completedSteps = [];
let totalTime = 0;
let readyWorkers = numWorkers;

while(readySteps.length > 0 || pendingWork.length > 0) {

    while(readySteps.length > 0 && readyWorkers > 0) {
        const next = readySteps.sort((a, b) => a.localeCompare(b)).shift();
        pendingWork.push({step: next, time: getStepDuration(next) });
        readyWorkers--;
    }

    const completed = pendingWork.sort((a, b) => a.time - b.time).shift();

    totalTime += completed.time;
    pendingWork.forEach((work) => work.time -= completed.time);

    readyWorkers++;

    // Remove completed stop frem dependencies of dependent steps
    dependentSteps[completed.step].forEach((dependent) => {
        stepDependencies[dependent].delete(completed.step)

        // If the dependent step has no more dependencies, mark it as ready
        if (stepDependencies[dependent].size == 0) readySteps.push(dependent);
    });

    completedSteps.push(completed.step);
}

console.log(completedSteps.join(''), totalTime);
