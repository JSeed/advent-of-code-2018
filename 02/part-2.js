function solve(ids) {
    // For each string
    for(let i = 0; i < ids.length; i++) {
        // Compare to each other string (except those it has already been compared to)
        for(let j = i + 1; j < ids.length; j++) {
            let matching = '';

            // Loop until we reach the end of the string, or more than one difference have been found
            for(let k = 0; k < ids[i].length && k - matching.length < 2; k++) {
                if(ids[i].charAt(k) === ids[j].charAt(k)) {
                    matching += ids[i].charAt(k);
                }
            }

            // If the difference is exactly one character, we've found it
            if (ids[i].length - matching.length === 1) return matching;
        }
    }
}

const ids = require('./input.json');
console.log(solve(ids));