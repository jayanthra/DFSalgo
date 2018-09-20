//https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker
var cols, rows;
var w = 20;
var grid = [];
var current;
var stack = [];

function setup() {
    createCanvas(600, 600);
    background(50);
    // frameRate(25)
    cols = floor(width / w);
    rows = floor(height / w);

    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            var cell = new Cell(i, j);
            grid.push(cell);
        }
    }
    current = grid[0];
}

function draw() {

    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }

    current.visited = true;
    current.highlight();
    var neighbour = current.checkNeighbours();
    if (neighbour) {
        neighbour.visited = true;
        stack.push(current);
        removeWall(current, neighbour);
        current = neighbour;

    } else if (stack.length > 0) {
        current = stack.pop();
    }
}

function getIndex(i, j) {
    if (i < 0 || j < 0 || i > cols || j > rows) {
        return -1;
    }
    return i + j * cols;
}

function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;

    this.checkNeighbours = function () {
        var neighbours = [];

        var top = grid[getIndex(i, j - 1)];
        var right = grid[getIndex(i + 1, j)];
        var bottom = grid[getIndex(i, j + 1)];
        var left = grid[getIndex(i - 1, j)];

        if (top && !top.visited) {
            neighbours.push(top)
        }
        if (right && !right.visited) {
            neighbours.push(right)
        }
        if (bottom && !bottom.visited) {
            neighbours.push(bottom)
        }
        if (left && !left.visited) {
            neighbours.push(left)
        }

        if (neighbours.length > 0) {
            var rand = floor(random(0, neighbours.length));
            return neighbours[rand];
        } else {
            return undefined;
        }

    }

    this.highlight = function () {
        var x = this.i * w;
        var y = this.j * w;

        noStroke();
        fill(0, 255, 0, 100);
        rect(x, y, w, w)
    }
    this.show = function () {
        var x = this.i * w;
        var y = this.j * w;
        stroke(255);

        if (this.walls[0])
            line(x, y, x + w, y);

        if (this.walls[1])
            line(x + w, y, x + w, y + w);

        if (this.walls[2])
            line(x + w, y + w, x, y + w);

        if (this.walls[3])
            line(x, y + w, x, y);

        if (this.visited) {
            noStroke();
            fill(155, 0, 255, 100);
            rect(x, y, w, w)
        }

        //  line(x,y,x,y+w)

    }
}

function removeWall(curr, next) {
    var x = curr.i - next.i;
    var y = curr.j - next.j;

    if (x === 1) {
        curr.walls[3] = false;
        next.walls[1] = false;
    } else {
        curr.walls[1] = false;
        next.walls[3] = false;
    }


    if (y === 1) {
        curr.walls[0] = false;
        next.walls[2] = false;
    } else {
        curr.walls[2] = false;
        next.walls[0] = false;
    }
}