const { readArr } = require('./../../utils');

exports.solution = () => {
    const datastream = readArr('./input.txt', '');

    const lastFour = datastream.slice(0, 4);
    for (let i = 4; i < datastream.length; i++) {
        const current = datastream[i];
        if (lastFour.length === new Set(lastFour).size) { //Then lastFour contains only uniques
            console.log(current);
            return i;
        }
        lastFour.shift();
        lastFour.push(current);
    }
}