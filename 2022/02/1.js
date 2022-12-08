const { readArr } = require('../../utils');

exports.solution = () => {
    const names = {
        A: 'Rock',
        B: 'Paper',
        C: 'Sciccors',
        X: 'Rock',
        Y: 'Paper',
        Z: 'Sciccors'
    }

    const defeats = {
        A: 'Z',
        B: 'X',
        C: 'Y',
        X: 'C',
        Y: 'A',
        Z: 'B'
    }

    const scores = {
        win: 6,
        lose: 0,
        draw: 3,
        'Rock': 1,
        'Paper': 2,
        'Sciccors': 3
    };

    const rounds = readArr('./input.txt').map(r => r.split(' ')); // arr of arrs, eg: [ 'A', 'X']

    let totalScore = 0;
    rounds.forEach(([op, you], i) => {
        let score;
        let winner = 'Noone';
        if (defeats[op] == you) {
            score = scores.lose;
            winner = 'Opponent';
        } else if (defeats[you] == op) {
            score = scores.win;
            winner = 'You';
        } else {
            score = scores.draw;
        }
        score += scores[names[you]];
        totalScore += score;
        // console.log(`Round ${i + 1}:\n${move[op]} vs ${move[you]}\nWinner: ${winner}\nScore for this round: ${score}\n`);
    });
    return totalScore;
}