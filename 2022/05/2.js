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
    // console.log('Initial state', columns);
    procedure.forEach(([amount, from, to]) => {
        //Handle columns 0 based index
        const crates = columns[from - 1].splice(columns[from - 1].length - amount);
        columns[to - 1] = [...columns[to - 1], ...crates];

        // console.log('Moved these crates from', from, 'to', to, crates);
        // console.log('Current state', columns);
    });

    return columns.map(col => col.pop()).join('');
}
