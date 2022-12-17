const fs = require('fs');
let datas = fs.readFileSync('./input.txt', 'utf-8')
  .split('\r\n')
  .map(l => l.replace('Sensor at ', '').replace(' closest beacon is at ', ''))
  .map(l => l.split(':')
    .map(coord => coord.split(', ')
      .map((val, index) => {
        if (0 === index) return parseInt(val.replace('x=', ''));
        if (1 === index) return parseInt(val.replace('y=', ''));
      })
    )
  )
;

const getManhattanDistance = (p1, p2) => Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);

const beacons = datas.map(row => row[1]);
const sensors = datas.map(row => row[0]);
const manhattanDistances = datas.map(row => getManhattanDistance(row[0], row[1]));

let minX = 0, maxX = 0;
const findMinAndMax = () => {
    const mins = sensors.map((sensor, index) => sensor[0] - manhattanDistances[index]);
    const maxs = sensors.map((sensor, index) => sensor[0] + manhattanDistances[index]);

    minX = Math.min(...mins);
    maxX = Math.max(...maxs);
}
findMinAndMax();

const startScan = (y) => {
  let nbPositions = 0;
  for (let x = minX; x <= maxX; x++) {
    if (beacons.some(
      beacon => beacon[0] === x && beacon[1] === y
    )) continue;
    else if (sensors.some(
      (sensor, index) => getManhattanDistance(sensor, [x, y]) <= manhattanDistances[index]
    )) nbPositions++;
  }

  return nbPositions;
}

console.log(startScan(2000000));