const { readArr } = require('./../../utils');

exports.solution = () => {
    const rawInput = readArr('input.txt');

    //Ignore ls command
    const filteredInput = rawInput.filter(line => !line.startsWith('$ ls'));

    const fileTree = { depth: 0 };

    let currentNode = fileTree;
    let parents = [];
    filteredInput.forEach(line => {
        if (line.startsWith('$ cd')) {
            const [cmd, arg] = line.slice(1).trim().split(' ');
            if (arg == '..') {
                //Done with dir, add its totalSize to parent TODO only works when cd .. to trigger calculation (works for input)
                const dirSize = currentNode.totalSize;
                currentNode = parents.pop();
                currentNode.totalSize += dirSize;
            } else {
                fileTree.depth++;

                const newNode = currentNode.children?.find(c => c.name === arg) || { name: arg, children: [], totalSize: 0 };
                currentNode.children = currentNode.children ? [...currentNode.children, newNode] : [newNode];
                parents.push(currentNode);

                currentNode = newNode;
            }
            // console.log('Current node is', currentNode);
        } else if (line.startsWith('dir')) { //CurrentNode has subdirectories
            currentNode.hasSubDirectories = true;
        } else {
            const [size, name] = line.split(' ');
            currentNode.children.push({ name, size: parseInt(size) });
            currentNode.totalSize += parseInt(size);
        }
    });

    //Tree
    fileTree.root = fileTree.children.pop();
    delete fileTree.children;

    console.log(JSON.stringify(fileTree, null, fileTree.depth));

    const sizeLimit = 100_000;
    const findDirsUnderSizeLimit = (node) => {
        let subDirSizes = 0;
        if (node.hasSubDirectories) {
            node.children.forEach(c => {
                subDirSizes += findDirsUnderSizeLimit(c);
            });
        }
        return node.totalSize <= sizeLimit ? node.totalSize + subDirSizes : subDirSizes;
    }

    return findDirsUnderSizeLimit(fileTree.root);
}