const { readArr } = require('./../../utils');

function makeTree(input) {
    const fileTree = { depth: 0 };

    let currentNode = fileTree;
    let parents = [];
    input.forEach(line => {
        if (line.startsWith('$ cd')) {
            const [cmd, arg] = line.slice(1).trim().split(' ');
            if (arg == '..') {
                currentNode = parents.pop();
            } else {
                fileTree.depth++;

                const newNode = currentNode.children?.find(c => c.name === arg) || { name: arg, children: [] };
                currentNode.children = currentNode.children ? [...currentNode.children, newNode] : [newNode];
                parents.push(currentNode);

                currentNode = newNode;
            }
            // console.log('Current node is', currentNode);
        } else if (line.startsWith('dir')) { //CurrentNode has subdirectories
            // currentNode.hasSubDirectories = true;
        } else {
            const [size, name] = line.split(' ');
            currentNode.children.push({ name, size: parseInt(size) });
        }
    });

    return fileTree;
}

exports.solution = () => {
    const rawInput = readArr('input.txt');

    //Ignore ls command
    const filteredInput = rawInput.filter(line => !line.startsWith('$ ls'));

    //Tree
    const fileTree = makeTree(filteredInput);
    fileTree.root = fileTree.children.pop();
    delete fileTree.children;

    // console.log(JSON.stringify(fileTree, null, fileTree.depth));

    const dirSizes = [];
    const calculateDirSize = (node) => {
        if (node?.size) {
            return node.size;
        }
        const totalSize = node?.children.reduce((prev, node) => prev + calculateDirSize(node), 0);
        dirSizes.push(totalSize);
        node.totalSize = totalSize;
        return totalSize;
    }

    const totalUsedSpace = calculateDirSize(fileTree.root);
    // console.log(JSON.stringify(fileTree, null, fileTree.depth));

    const totalAvailableSpace = 70_000_000;
    const freeSpaceGoal = 30_000_000;

    const spaceToFree = freeSpaceGoal - (totalAvailableSpace - totalUsedSpace);
    // console.log('Additional free space required:', spaceToFree);

    for (const dir of dirSizes.sort((a, b) => a - b)) {
        if (dir >= spaceToFree) {
            return dir;
        }
    }
}