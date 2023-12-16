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
  const isStart = (instruction) => instruction.charAt(2) === "A";
  const isStop = (instruction) => instruction.charAt(2) === "Z";
  const start = Object.keys(parsedNetwork).filter(isStart);

  const steps = start.map((node) => {
    let s = 0;
    while (!isStop(node)) {
      node = parsedNetwork[node][instruction(s)];
      log(`Positions at step ${s}: ${node}`);
      s++;
    }
    return s;
  });

  log("Calculated steps:", steps);

  const findLCMNaive = (arr) => {
    let values = [...arr];
    while (true) {
      const idx = values.indexOf(Math.min(...values));
      values[idx] = values[idx] + arr[idx];
      log(values);
      if (values.every((value) => value === values[0])) return values[0];
    }
  };

  const findLCM = (arr) => {
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
    const lcm = (a, b) => (a * b) / gcd(a, b);

    //lcm of a, b, c is lcm(lcm(a, b), c) and so on
    const [start, ...rest] = arr;
    return rest.reduce((prev, curr) => lcm(prev, curr), start);
  };

  return findLCM(steps);
};
