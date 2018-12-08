const input = require('./input.json');
const points = input.map((pair) => ({x: pair[0], y: pair[1]}));

// Returns an array of the points contained within the given bounds
const gridArray = (left, right, top, bot) => {
    const arr = [];
    for(let y = top; y <= bot; y++) {
        for(let x = left; x <= right; x++) {
            arr.push({x,y});
        }
    }
    return arr;
}

// Distance between two points
const pointDistance = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

// Point area bounds
let left, right, top, bot;

// Set point area bounds
for(let {x, y} of points) {
    if(left === undefined || x < left) left = x;
    if(right === undefined || x > right) right = x;
    if(top === undefined || y < top) top = y;
    if(bot === undefined || y > bot) bot = y;
}

const grid = gridArray(left, right, top, bot);

// Init areas from points
const areas = points.map((point) => ({root: point, size: 0, infinite: false}));

// Calculate the sizes of each area
grid.forEach(({x, y}) => {
    const closest = areas.reduce((closest, area) => {
            const distance = pointDistance(area.root, {x,y});
            if(distance < closest.distance) {
                return {distance, owners: [area]};
            } else if(distance === closest.distance) {
                closest.owners.push(area);
            }
            return closest;
        }, { distance: Number.MAX_VALUE, owners: []});

        if(closest.owners.length === 1) {
            closest.owners[0].size += 1;
        }
        if(x === left || x === right || y === top || y === bot) {
            closest.owners.forEach((area) => area.infinite = true);
        }
});

// Find the largest area that is not infinite
let largest = areas.reduce((largest, area) => area.size > largest.size && !area.infinite ? area : largest, {size: 0});

console.log('Part 1:', largest);

// Find the size of the area that is within 1000 distance of all points
let area = grid.reduce((area, p) => points.reduce((acc, point) => acc + pointDistance(p, point), 0) < 10000 ? area + 1 : area, 0);

console.log('Part 2:', area);