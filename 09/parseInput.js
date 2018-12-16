module.exports = function parseInput(input) {
  const matches = input.match(/(\d+) players; last marble is worth (\d+) points/)
  return {players: matches[1], lastMarble: matches[2]};
}
