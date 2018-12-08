module.exports = class Grid {
    constructor(left, right, top, bot) {
        this.width = right - left + 1;
        this.height = bot - top + 1;
        this.left = left;
        this.right = right;
        this.top = top;
        this.bot = bot;
        this.grid = Array(this.width * this.height).fill('.');
    }

    get(x, y) {
        return this.grid[(y - this.top) * this.width + (x - this.left)];
    }

    put(x, y, value) {
        this.grid[(y - this.top) * this.width + (x - this.left)] = value;
    }

    print() {
        for(let y = 0; y < this.height; y++) {
            let line = '';
            for(let x = 0; x < this.width; x++) {
                line += this.grid[y * this.width + x] + ' ';
            }
            console.log(line);
        }
    }
}