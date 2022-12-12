const { readArr } = require('./../../utils');

exports.solution = () => {
    const grid = readArr('input.txt').map(r => r.split(''));
    // console.log(grid);

    const height = grid.length;
    const width = grid[0].length;

    let topScore = 0;
    for (let i = 1; i < height - 1; i++) {
        // console.log(grid);
        for (let j = 1; j < width - 1; j++) {
            const left = grid[i].slice(0, j);
            const right = grid[i].slice(j + 1, width);
            const top = grid.slice(0, i).map(r => r[j]);
            const bottom = grid.slice(i + 1, height).map(r => r[j]);
            const currentTree = grid[i][j];

            const viewingDistance = (trees) => {
                for (let t = 0; t < trees.length; t++) {
                    if (trees[t] >= currentTree) {
                        return t + 1;
                    }
                }
                return trees.length;
            }

            const scenicScore = viewingDistance(left.reverse())
                * viewingDistance(top.reverse())
                * viewingDistance(right)
                * viewingDistance(bottom);
            if (scenicScore > topScore) {
                topScore = scenicScore;
            }
        }
    }

    return topScore;
}