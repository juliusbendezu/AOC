const { readArr } = require('./../../utils');

class RopeEnd {
    x = 0; y = 0;
    seenPositions = [{ x: this.x, y: this.y }];

    move(direction) {
        switch (direction) {
            case 'R': this.x++; break;
            case 'L': this.x--; break;
            case 'U': this.y++; break;
            case 'D': this.y--; break;
        }
    }

    isAdjacent(other) {
        return Math.abs(this.x - other.x) < 2 && Math.abs(this.y - other.y) < 2;
    }

    // isSameAxis(other) {
    //     return this.x == other.x || this.y == other.y;
    // }

    align(other) {
        if (other.x > this.x)
            this.move('R');
        if (other.x < this.x)
            this.move('L');
        if (other.y > this.y)
            this.move('U');
        if (other.y < this.y)
            this.move('D');
        this.pushPosition();
    }

    pushPosition() {
        if (!this.seenPositions.find(p => p.x == this.x && p.y == this.y)) {
            this.seenPositions.push({ x: this.x, y: this.y })
        }
    }
}

exports.solution = () => {
    const moves = readArr('./input.txt').map(l => l.split(' ')).map(([direction, distance]) => [direction, parseInt(distance)]);

    const simulate = (head, tail) => {
        //Adjusted to test.txt, can't be bothered to adjust for input (would do it differently, probably based on head.seenPositions)
        const width = 5;
        const height = 6;
        for (let i = width; i >= 0; i--) {
            let row = '';
            for (let j = 0; j < height; j++) {
                let c = '.';
                if (tail.x == j && tail.y == i)
                    c = 'T'
                if (head.x == j && head.y == i)
                    c = 'H'
                row += c;
            }
            console.log(row);
        }
    }

    const head = new RopeEnd();
    const tail = new RopeEnd();
    moves.forEach(([direction, distance], i) => {
        // console.log(`\nRound ${i} moving ${direction} ${distance}`);
        for (let traveled = 0; traveled < distance; traveled++) {
            // console.log(`Head at pos [${head.x}][${head.y}], Tail at pos [${tail.x}][${tail.y}]`);
            // simulate(head, tail)

            head.move(direction);
            while (!tail.isAdjacent(head)) {
                tail.align(head);
            }
        }
    });

    return tail.seenPositions.length;
}
