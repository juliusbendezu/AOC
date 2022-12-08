const { readArr } = require('../../utils')

exports.solution = () => {
    let elfs = readArr('input.txt', '\n\n');

    let highest = 0;
    elfs.forEach(elf => {
        const calories = elf.split('\n').map(val => Number.parseInt(val)).reduce((prev, curr) => prev += curr);
        if (calories > highest) {
            highest = calories;
        }
    });
    return highest;
}
