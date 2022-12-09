const { readArr } = require('./../../utils');

exports.solution = () => {
    let [drawing, procedure] = readArr('./input.txt', '\n\n');

    //Fix drawing
    drawing = drawing.split('\n');
    const colCount = drawing.pop().trim().match(/[0-9]+$/)[0]; //Match any digit numbers, start from end to find last occurence
    const columns = new Array(parseInt(colCount)).fill([]);

    drawing.forEach((row) => {
        let col = 0;
        for (let i = 0; i < row.length; i += 4) {
            const crate = row[i + 1];
            if (!!crate.trim()) {
                columns[col] = [crate, ...columns[col]]; //prepend each crate to list of crates in the specific column
            }
            col++;
        }
    });

    //Fix procedure
    procedure = procedure.trim().split('\n')
        .map(line => [...line.matchAll(/[0-9]+/g)].map(m => m[0]));

    //Run procedure
    // console.info('Initial state', columns);
    procedure.forEach(([amount, from, to]) => {
        //Crates are moved 1 at a time
        for (let i = 0; i < amount; i++) {
            columns[to - 1].push(columns[from - 1].pop()); //Handle columns 0 based index
            // console.info(`Moving ${columns[to - 1][columns[to - 1].length - 1]} from ${from} to ${to}`);
        }
        // console.info('Current state', columns);
    });

    return columns.map(col => col.pop()).join('');
}