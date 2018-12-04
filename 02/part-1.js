function getCharacterCounts(str) {
    return Object.values([...str].reduce((acc, c) => {
        if(!acc[c]) acc[c] = 0;
        acc[c]++;
        return acc;
    }, {}));
}

const countAppearances = (id) => {
    const counts = characterCounts(id);

    let twos = false;
    let threes = false;

    for(let i = 0; i < counts.length && (!twos || !threes); i++) {
        if(counts[i] === 2) twos = true;
        else if (counts[i] === 3) threes = true;
    }

    return {twos, threes};
}

const checksum = (ids) => {
    let twos = 0;
    let threes = 0;
    for(let i = 0; i < ids.length; i++) {
        const appearances = getCharacterCounts(ids[i]);

        twos += appearances.twos;
        threes += appearances.threes;
    }

    return twos * threes;
}
const ids = require('./input.json');
console.log(checksum(ids))