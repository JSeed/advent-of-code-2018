const parseRectangle = require('./parseRectangle');

// Get list of points this rectangle covers (formatted as "x,y")
function getPoints(rect) {
        const points = [];
        for(let y = rect.y; y < rect.y + rect.height; y++) {
            for(let x = rect.x; x < rect.x + rect.width; x++) {
                points.push(`${x},${y}`);
            }
        }
       return points;
}

function solve(input) {
    // Convert input to list of rectangles
    const rectangles = input.map(parseRectangle);

    // Count layers fabric at each point
    const points = Object.values(rectangles.reduce((acc, rect) => getPoints(rect).reduce((acc, point) => {
            acc[point] = acc[point] ? acc[point] + 1 : 1;
            return acc;
        }, acc), {}));


    // Count the number of points with more than one layer of fabric
    return points.reduce((acc, p) => p > 1 ? acc + 1 : acc, 0);
}

const input = require('./input.json');
console.log(solve(input));