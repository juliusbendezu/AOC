const { readArr } = require('./../../utils');

exports.solution = () => {
    const lines = readArr('./input.txt');
    return lines.reduce(((sum, l) => {
        const digits = l.match(/\d/g);
        return sum += !!digits && Number.parseInt(digits[0] + digits[digits.length - 1]);
    }), 0);
}
