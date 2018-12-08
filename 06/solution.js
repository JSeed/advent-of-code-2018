const Grid = require('./grid.js');
const input = require('./sample.json');
const points = input.map((pair) => ({x: pair[0], y: pair[1]}));


let left, right, top, bot;


for(let {x, y} of points) {
    if(left === undefined || x < left) left = x;
    if(right === undefined || x > right) right = x;
    if(top === undefined || y < top) top = y;
    if(bot === undefined || y > bot) bot = y;
}

const grid = new Grid(left, right, top, bot);


for(let {x,y} of points) {
    grid.put(x, y, 'P');
}

for(let y = top; y <= bot; y++) {
    for(let x = left; x <= right; x++) {


    }
}
grid.print();
