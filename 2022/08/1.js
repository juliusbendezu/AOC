const { readArr } = require('./../../utils');

exports.solution = () => {
    const grid = readArr('input.txt').map(r => r.split(''));
    // console.log(grid);

    const height = grid.length;
    const width = grid[0].length;

    let visibleTrees = (height * 2) + (width * 2) - 4;
    // console.log(`At lest ${visibleTrees} trees are visible (edges)`);

    for (let i = 1; i < height - 1; i++) {
        // console.log(grid);
        for (let j = 1; j < width - 1; j++) {
            const left = grid[i].slice(0, j);
            const right = grid[i].slice(j + 1, width);
            const top = grid.slice(0, i).map(r => r[j]);
            const bottom = grid.slice(i + 1, height).map(r => r[j]);
            const currentTree = grid[i][j];

            const visibleFrom = (trees) => trees.every(t => t < currentTree);
            const isVisible = visibleFrom(left) || visibleFrom(right) || visibleFrom(top) || visibleFrom(bottom);
            visibleTrees += isVisible;

            // console.log(`Is g[${i}][${j}] visible? ${isVisible}`);
        }
    }

    return visibleTrees;
}