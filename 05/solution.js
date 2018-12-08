let input = require('./input.json');

const diff = (a, b) => a.charCodeAt(0) - b.charCodeAt(0);
const splice = (str, index, length) => str.substr(0, index) + str.substr(index + length, str.length);

const react = (polymer) => {
    const target = diff('a', 'A');
    let i = 0;

    while(i < polymer.length - 1) {
        const span = diff(polymer.charAt(i), polymer.charAt(i + 1));

        if(Math.abs(span) === target) {
            polymer = splice(polymer, i, 2);
            if(i !== 0) i--;
        } else {
            i++;
        }
    }

    return polymer
}

const charCode = (c) => c.charCodeAt(0);
const nextChar = (c) => String.fromCharCode(charCode(c) + 1);
const regexp = (c) => new RegExp(c, 'g');
const removeFrom = (c, str) => str.replace(regexp(c.toUpperCase()), '').replace(regexp(c.toLowerCase()), '');

// TODO (never?) Build Set of polymer chars, iterate
let lowest;
for(let c = 'a'; charCode(c) <= charCode('z') ; c = nextChar(c)) {
    const modified = react(removeFrom(c, input));
    if(!lowest || modified.length < lowest.length) {
        lowest = modified;
    }
}

console.log('Part 1:', react(input).length);
console.log('Part 2:', lowest.length);
