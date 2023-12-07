const { readArr } = require('../../utils')

exports.solution = () => {
    const almanac = readArr('test.txt', '\n\n');
    const [first, ...rest] = almanac;
    const seeds = first.match(/[0-9]+/g);
    console.log('Seeds:', seeds);
    const maps = rest.map(m => m.split('\n').slice(1).map(map => map.split(' ')));
    console.log(maps);


    return "Not implemented";
}