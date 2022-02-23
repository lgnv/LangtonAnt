class Hexdrawer{
    constructor(size, levels){
        this.color_from = color(20, 20, 20);
        this.color_to = color(255, 40, 40);
        this.antcolor = 'white';
        this.levels = levels;
        this.size = size;
    }

    redraw(grid, antX, antY) {
        clear();
        this.drawGrid(grid, antX, antY);
    }

    drawGrid(grid, antX, antY, dir) {
        this.setShapeDrawingMode();
        for (let x = 0; x < grid.length; x++) {
            for (let y = 0; y < grid[0].length; y++) {
                this.drawShape(x, y, grid[x][y]);
            }
        }
        this.drawAnt(antX, antY, dir);
    }

    drawShape(x, y, level) {
        let color = lerpColor(this.color_from, this.color_to, level / this.levels);
        fill(color);
        this.setShapeDrawingMode();
        
        let coords = this.getScreenPoint(x, y);
        this.polygon(coords[0], coords[1], this.size * 0.5, 6);
    }

    drawPrevShape(x, y, level) {
        this.setShapeDrawingMode();
        this.drawShape(x, y, level);
    }

    drawCurrShape(x, y, dir, level) {
        this.setShapeDrawingMode();
        this.drawShape(x, y, level);
        this.drawAnt(x, y, dir);
    }

    setShapeDrawingMode() {
        strokeWeight(0.01 * this.size);
        stroke(100);
    }

    polygon(x, y, radius, npoints) {
        let angle = TWO_PI / npoints;
        beginShape();
        for (let a = 0; a < TWO_PI; a += angle) {
            let sx = x + cos(a) * radius;
            let sy = y + sin(a) * radius;
            vertex(sx, sy);
        }
        endShape(CLOSE);
    }

    drawAnt(x, y, dir) {
        strokeWeight(0);
        fill(this.antcolor);

        let coords = this.getScreenPoint(x, y);

        translate(coords[0], coords[1]);
        rotate((dir * (1/3) + (1/3)) * PI);

        let x1 = 0;
        let y1 = -0.3 * this.size;
        let x2 = this.size / 4;
        let y2 = this.size / 5;
        let x3 = -this.size / 4;
        let y3 = this.size / 5;

        triangle(x1, y1, x2, y2, x3, y3);
        resetMatrix();
    }

    getScreenPoint(x, y) {
        let newX = y % 2 == 0 ? x + 0.4 : x + 0.9;
        newX *= this.size * 1.6;

        let newY = y + 1.5;
        newY *= (this.size * 0.45);

        return [newX, newY];
    }
}

class Hexwalker {
    moveAnt(grid, x, y, step) {
        grid[x][y] = step.cellState;
        let newX = x, newY = y;
        debugger;

        switch(step.moveDir) {
            case direction.Down:
                newY = y + 2;
                break;
            case direction.Up:
                newY = y - 2;
                break;
            case direction.UpRight:
                newY = y - 1;
                if (y % 2 === 1) {
                    newX = x + 1;
                }
                break;
            case direction.DownLeft:
                newY = y + 1;
                if (y % 2 === 0) {
                    newX = x + 1;
                }
                break;
            
            case direction.DownRight:
                newY = y + 1;
                if (y % 2 === 1) {
                    newX = x - 1;
                }
                break;               
            case direction.UpLeft:
                newY = y - 1;
                if (y % 2 == 0) {
                    newX = x - 1;
                }
                break;
        }

        return [newX, newY, step.finalDir];
    }
}