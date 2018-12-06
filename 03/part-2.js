const input = require('./input.json');
const parseRectangle = require('./parseRectangle');

const rectangles = input.map(parseRectangle);

// Check if two rectangles collide
function hasCollision(a, b) {
    return a.x < b.x + b.width &&
           b.x < a.x + a.width &&
           a.y < b.y + b.height &&
           b.y < a.y + a.height;
}

// Find the first (in this case only) rectangle with no collisions
const intact = rectangles.find((a) => !rectangles.some((b) => a.id !== b.id && hasCollision(a, b)));

console.log(intact.id);