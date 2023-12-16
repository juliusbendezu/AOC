const { readArr, log } = require("../../utils");

exports.solution = () => {
  const [instructions, _, ...network] = readArr("input.txt");
  const parsedNetwork = network.reduce((map, n) => {
    const [key, v] = n.split("=").map((p) => p.trim());
    const [left, right] = v.replace(/[(),]/g, "").split(" ");
    return (map[key] = { L: left, R: right }), map;
  }, {});
  log(parsedNetwork);

  const ins = instructions.split("");
  const instruction = (i) => ins[i] || ins[i % ins.length];
  const start = "AAA";
  const stop = "ZZZ";
  let steps = 0;
  let pos = start;
  while (pos !== stop) {
    pos = parsedNetwork[pos][instruction(steps)];
    log(`Positions at step ${steps}: ${pos}`);
    steps++;
  }

  return steps;
};
