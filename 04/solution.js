const input = require('./input.json');
const parseEvent = require('./parseEvent');

// Put the events in chronological order
const events = input.map(parseEvent).sort((a, b) => a.date.getTime() - b.date.getTime());

const sleepTimes = {};
const minuteCounts = {};

let guard;
let fellAsleep;

for(let event of events) {
    if(event.event.endsWith("begins shift")) { // update guard id
        guard = event.event.match(/#([\d]+) /)[1];
    } else if(event.event === 'falls asleep') { // set start sleep time
        fellAsleep = event.minute;
    } else if (event.event === 'wakes up') { // update time slept, minute counts
        if(!sleepTimes[guard]) sleepTimes[guard] = 0;
        if(!minuteCounts[guard]) minuteCounts[guard] = {};

        for(let i = fellAsleep; i < event.minute; i++) {
            if(!minuteCounts[guard][i]) minuteCounts[guard][i] = 0;
            minuteCounts[guard][i]++;
        }

        sleepTimes[guard] += event.minute - fellAsleep;
    }
}

const getHighest = (obj) => Object.keys(obj).reduce((acc, key) => obj[key] > obj[acc] ? key : acc);

const sleepiestGuard = getHighest(sleepTimes);
const sleepiestMinute = getHighest(minuteCounts[sleepiestGuard]);

console.log('Part 1:', sleepiestGuard * sleepiestMinute);

const frequentMinutes = Object.keys(minuteCounts).reduce((acc, guard) => {let h = getHighest(minuteCounts[guard]); acc[guard * h] = minuteCounts[guard][h]; return acc;}, {});

const solution = getHighest(frequentMinutes);

console.log('Part 2:', solution);