const { readArr } = require('./../../utils')

exports.solution = () => {
    const rucksacks = readArr('./input.txt');
    const groups = new Array(rucksacks.length / 3).fill('');
    rucksacks.forEach((r, i) => {
        const group = Math.floor(i / 3);
        groups[group] = [...groups[group], r];
    })

    const badges = groups.map(g => {
        const uniqueItemsPerRucksack = g.flatMap(r => [...new Set(r)]);
        //find 3 occurences and return it
        const itemCount = new Map();
        uniqueItemsPerRucksack.forEach(i => {
            itemCount.set(i, 1 + (itemCount.get(i) || 0));
        });

        let badge;
        itemCount.forEach((count, item) => {
            if (count === 3)
                badge = item
        });
        return badge;
    })

    const priorityMap = new Map();

    const charcode1 = 'a'.charCodeAt(0);
    const charcode2 = 'A'.charCodeAt(0);

    for (let i = 0; i < 26; i++) {
        priorityMap.set(String.fromCharCode(charcode1 + i), i + 1);
        priorityMap.set(String.fromCharCode(charcode2 + i), i + 27);
    }

    const priorities = badges.map(b => priorityMap.get(b));

    return priorities.reduce((prev, curr) => prev + curr);
}