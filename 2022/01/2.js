const { readArr } = require('../../utils')

exports.solution = () => {
    const elfs = readArr('input.txt', '\n\n');
    const result = elfs.map(
        elf => elf.split('\n')
            .map(val => Number.parseInt(val))
            .reduce((prev, curr) => prev + curr)
    ).sort((a, b) => b - a);

    const count = 3;
    return result.slice(0, count).reduce((prev, curr) => prev + curr);
}
