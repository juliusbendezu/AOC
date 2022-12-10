const { readArr } = require('./../../utils');

exports.solution = () => {
    const datastream = readArr('./input.txt', '');

    const lastFourteen = datastream.slice(0, 14);
    for (let i = 14; i < datastream.length; i++) {
        const current = datastream[i];
        if (lastFourteen.length === new Set(lastFourteen).size) { //Then lastFourteen contains only uniques
            // console.log(current);
            return i;
        }
        lastFourteen.shift();
        lastFourteen.push(current);
    }
}