const { readArr } = require('./../../utils');

class Knot {
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
    const moves = readArr('./test.txt').map(l => l.split(' ')).map(([direction, distance]) => [direction, parseInt(distance)]);

    const simulate = (rope) => {
        //FIX this

        const width = 15;
        const height = 26;
        for (let i = 0; i < height; i--) {
            let row = '';
            for (let j = 0; j < width; j++) {
                let c = '.';
                if (rope.find(({ x, y }) => x == j && y == i))
                    c = '#'
                if (rope[rope.length - 1].x == j && rope[rope.length - 1].y == i)
                    c = 'T'
                if (rope[0].x == j && rope[0].y == i)
                    c = 'H'
                row += c;
            }
            console.log(row);
        }
    }

    const rope = new Array(10).fill();
    for (let i = 0; i < 10; rope[i++] = new Knot());

    const head = rope[0];
    moves.forEach(([direction, distance], i) => {
        // console.log(`\nRound ${i} moving ${direction} ${distance}`);
        for (let traveled = 0; traveled < distance; traveled++) {
            // console.log(`Head at pos [${head.x}][${head.y}], Tail at pos [${tail.x}][${tail.y}]`);
            simulate(rope)

            head.move(direction);
            //Knots are connected, each knot follows its parent, with the same logic as tail currently follows head

            let prev = head;
            rope.forEach(knot => {
                while (!knot.isAdjacent(prev)) {
                    knot.align(prev);
                }
                prev = knot;
            })
            console.log(rope);
        }
    });

    return rope.pop().seenPositions.length;
}
