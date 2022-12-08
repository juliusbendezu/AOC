const { readArr } = require('../../utils');

exports.solution = () => {
    const name = {
        A: 'Rock',
        B: 'Paper',
        C: 'Sciccors'
    }

    const outcomes = {
        A: { wins: 'C', loses: 'B' },
        B: { wins: 'A', loses: 'C' },
        C: { wins: 'B', loses: 'A' },
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
    rounds.forEach(([op, instruction]) => {
        let score;
        let move;

        if (instruction == 'Y') {
            score = scores.draw;
            move = op;
        } else if (instruction == 'X') {
            score = scores.lose;
            move = outcomes[op].wins;
        } else if (instruction == 'Z') {
            score = scores.win;
            move = outcomes[op].loses;
        }

        score += scores[name[move]];
        totalScore += score;
    });
    return totalScore;
}