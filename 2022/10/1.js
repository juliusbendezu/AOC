const { readArr } = require('../../utils')

exports.solution = () => {
    const program = readArr('./input.txt').entries();

    let signalStrengths = []
    let x = 1;
    let cycle = 0;
    const incrCycle = (incr) => {
        const inspectCycle = (c) => {
            // const condition = true;
            const condition = (c - 20) % 40 === 0;
            if (condition) {
                // console.log(`cycle: ${cycle}, x: ${x}`);
                signalStrengths.push(cycle * x);
            }
        }

        for (let i = 0; i < incr; i++) {
            cycle++;
            inspectCycle(cycle);
        }
    }
    while (true) {
        const { value, done } = program.next();
        if (done) break;

        const [i, op] = value;
        if (op === "noop") {
            incrCycle(1);
        } else if (op.includes('addx')) {
            const v = op.split(' ')[1];
            incrCycle(2)
            x += Number(v);
        }
    }



    return signalStrengths.reduce((sum, ss) => sum += ss, 0);
}