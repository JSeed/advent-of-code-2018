// Convert input string to object
module.exports = function parseRectangle(str) {
    const matches = str.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/);
    return {id: Number(matches[1]), x: Number(matches[2]), y: Number(matches[3]), width: Number(matches[4]), height: Number(matches[5])};
}