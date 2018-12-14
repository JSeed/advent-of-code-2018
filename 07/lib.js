

const parseInput = (str) => {
    const matches = str.match("Step (.) must be finished before step (.) can begin.");
    return {step: matches[2], dependency: matches[1]};
}

const addToMap = (map, key, value) => {
    if(!map[key]) map[key] = new Set();
    if(!map[value]) map[value] = new Set();
    map[key].add(value);
}

const mapRequirements = (requirements) => {
    const stepDependencies = {};
    const dependentSteps = {};
    const steps = new Set();

    for(let {step, dependency} of requirements) {
        if(!steps.has(step))steps.add(step);
        if(!steps.has(dependency)) steps.add(dependency);
        addToMap(stepDependencies, step, dependency);
        addToMap(dependentSteps, dependency, step);
    }

    return {steps, stepDependencies, dependentSteps};
}

module.exports = {
    parseInput,
    mapRequirements,
};