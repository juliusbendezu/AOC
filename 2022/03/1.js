const { readArr } = require('./../../utils')

exports.solution = () => {
    const rucksacks = readArr('./input.txt');
    const commonItems = rucksacks.map(r => {
        const comp1 = r.substring(0, r.length / 2).split('');
        const comp2 = r.substring(comp1.length, r.length).split('');
        return comp1.filter(c => comp2.includes(c)).pop();
    });

    // console.log(commonItems);

    const priorityMap = new Map();

    const charcode1 = 'a'.charCodeAt(0);
    const charcode2 = 'A'.charCodeAt(0);

    for (let i = 0; i < 26; i++) {
        priorityMap.set(String.fromCharCode(charcode1 + i), i + 1);
        priorityMap.set(String.fromCharCode(charcode2 + i), i + 27);
    }

    const priorities = commonItems.map(ci => priorityMap.get(ci));

    return priorities.reduce((prev, curr) => prev + curr);
}