const Circle = require('./Circle');

const parseInput = require('./parseInput');
const input = require('./input.json');

const opts = parseInput(input);

function getWinningScore(opts) {
  const players = new Array(Number(opts.players)).fill(0);
  const circle = new Circle();

  circle.place(0);

  let marble = 1;
  while(marble <= opts.lastMarble ) {
    for(let i = 0; i < opts.players && marble <= opts.lastMarble; i++) {

      if(marble % 23 === 0) {
          players[i] += marble;
          circle.rotate(-7);
          
          players[i] += circle.currentValue();
          circle.remove();
      } else {
        circle.rotate(1);
        circle.place(marble);
      }

      marble += 1;
    }
  }

  return Math.max(...players);
}

console.log('Part 1:', getWinningScore(opts));

opts.lastMarble *= 100;

console.log('Part 2:', getWinningScore(opts));
