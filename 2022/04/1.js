const { readArr } = require('./../../utils');

exports.solution = () => {
    const pairs = readArr('./input.txt').map(p => p.split(','));

    let count = 0;
    pairs.map(pair => pair.map(elf => elf.split('-').map(id => parseInt(id))))
        .forEach(([[min1, max1], [min2, max2]]) => {
            count += (min1 <= min2 && max2 <= max1) || (min2 <= min1 && max1 <= max2);
        });

    return count;
}
