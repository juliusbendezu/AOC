const { readArr } = require('./../../utils');

exports.solution = () => {
    const digitNames = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const regex = new RegExp(`(${digitNames.join('|')})`);

    const asDigit = (digitString) => String(digitNames.indexOf(digitString) + 1);
    const extractDigits = (string) => {
        const digits = [];
        let i = 0;
        let acc = '';
        while (i < string.length) {
            if (Number.parseInt(string[i])) { //Excludes 0
                digits.push(string[i++]);
                continue;
            }

            acc += string[i];
            const match = acc.match(regex);

            if (match) {
                digits.push(asDigit(match[1]));
                acc = '';
                //Continue without incrementing in case current digits last char is part of next digit, for example 'twone' should find 'two' & 'one'
                continue;
            }
            i++;
        }
        return digits;
    }

    const calibrationValue = (digits) => {
        const calibrationValue = digits[0] + digits[digits.length - 1];
        // console.log(digits, calibrationValue)
        return Number.parseInt(calibrationValue);
    }

    const lines = readArr('./input.txt');
    return lines.reduce((sum, line) => {
        const digits = extractDigits(line);
        return sum += calibrationValue(digits);
    }, 0);
}
