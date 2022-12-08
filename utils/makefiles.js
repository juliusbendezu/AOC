const fs = require('fs');

const args = process.argv.slice(2);

if (args.length < 2) {
    console.log('Provide year and day as arguments to create files');
    return;
}

const year = args[0];
const day = args[1].padStart(2, '0');

const path = `./${year}/${day}`;

try {
    const snippet = 'exports.solution = () => {\n\t return "Not implemented";\n}';
    fs.mkdirSync(path);
    fs.writeFileSync(`${path}/1.js`, snippet);
    fs.writeFileSync(`${path}/2.js`, snippet);
    fs.openSync(`${path}/input.txt`, 'w');
    fs.openSync(`${path}/test.txt`, 'w');
} catch (err) {
    console.log(err.code == 'EEXIST' ? 'Folder already present' : err);
}