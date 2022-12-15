const fs = require('fs');
const rockLines = fs.readFileSync('./input.txt', 'utf-8').split('\r\n').map(l => l.split(' -> ').map(e => e.split(',')));

let minX = 0;
let maxX = 0;
let minY = 0;
let maxY = 0;
const findMinMaxXY = () => {
  rockLines.map((l, indexL) => {
    l.map((coord, indexCoord) => {
      if (0 === indexL && 0 === indexCoord) {
        minX = parseInt(coord[0]);
        maxX = parseInt(coord[0]);
        minY = parseInt(coord[1]);
        maxY = parseInt(coord[1]);
      } else {
        if (coord[0] < minX) minX = parseInt(coord[0]);
        if (coord[0] > maxX) maxX = parseInt(coord[0]);
        if (coord[1] < minY) minY = parseInt(coord[1]);
        if (coord[1] > maxY) maxY = parseInt(coord[1]);
      }
    })
  });
}
findMinMaxXY();

let nbRows = maxY + 2;
let nbColumns = maxX - minX;

rockLines.map(l => l.map(coord => {coord[0] = parseInt(coord[0] - minX); coord[1] = parseInt(coord[1])}));

let startPosition = [];
const rows = Array(nbRows + 1).fill([]);
const buildGrid = () => {
  for (let i = 0; i < nbRows + 1; i++) {
    let row = [];
    for (let j = 0; j < nbColumns + 1; j++) i === nbRows ? row.push('#') : row.push('.');
    rows[i] = row;
  }
  startPosition = [parseInt(500 - minX), 0];
  rows[0][parseInt(500 - minX)] = '+';

  rockLines.map(l => {
    for (let i = 0; i < l.length - 1; i++) {
      const startX = l[i][0];
      const startY = l[i][1];
      const endX = l[i + 1][0];
      const endY = l[i + 1][1];

      if (startX === endX) {
        const start = startY > endY ? endY : startY;
        const end = startY > endY ? startY : endY;
        for (let j = start; j < end + 1; j++) rows[j][startX] = '#';
      } else if (startY === endY) {
        const start = startX > endX ? endX : startX;
        const end = startX > endX ? startX : endX;
        for (let j = start; j < end + 1; j++) rows[startY][j] = '#';
      }
    }
  });
}
buildGrid();

const getMoves = (x, y) => {
  let leftX = x - 1;
  const rightX = x + 1;
  const newY = y + 1;

  const row = rows[newY];

  if (row !== undefined && row[leftX] === undefined) {
    rows.map((row, index) => {
      if (index === nbRows) row.unshift('#');
      else row.unshift('.');
    });
    startPosition[0] += 1;
  }
  if (row !== undefined && row[rightX] === undefined) {
    rows.map((row, index) => {
      if (index === nbRows) row.push('#');
      else row.push('.');
    });
  }

  return ({
    down: { x: x, y: newY, val: row !== undefined ? row[x] : undefined },
    left: { x: leftX, y: newY, val: row !== undefined ? row[leftX] : undefined },
    right: { x: rightX, y: newY, val: row !== undefined ? row[rightX] : undefined },
  })
};

const addSand = (x, y) => { rows[y][x] = 'o'; }

const isRockOrSand = (val) => val !== undefined && ['#', 'o'].includes(val);

const isAir = (val) => val !== undefined && '.' === val;

// Down = air => go down
const canGoDown = ({ val }) => isAir(val);

// Down = sand | rock, Left = air => go left
const canGoLeft = (down, left) => isRockOrSand(down.val) && isAir(left.val);

// Down = sand | rock, Left = sand | rock, Right = air => go right
const canGoRight = (down, left, right) => isRockOrSand(down.val) && isRockOrSand(left.val) && isAir(right.val);

// Down = sand | rock, Left = sand | rock, Right = sand | rock => addSand
const shouldStopMoving = (down, left, right) => (
  isRockOrSand(down.val) && isRockOrSand(left.val) && isRockOrSand(right.val)
);


const startSandRain = () => {  
  let isDone = false;
  
  do {
    let xSand = startPosition[0];
    let ySand = startPosition[1];
    let isMoving = true;
    
    do {
      const { down, left, right } = getMoves(xSand, ySand);

      if (down.val === undefined && left.val === undefined && right.val === undefined) {
        isMoving = false;
        isDone = true;
      } else if (canGoDown(down)) {
        xSand = down.x;
        ySand = down.y;
      } else if (canGoLeft(down, left)) {
        xSand = left.x;
        ySand = left.y;
      } else if (canGoRight(down, left, right)) {
        xSand = right.x;
        ySand = right.y;
      } else if (shouldStopMoving(down, left, right)) {
        isMoving = false;
        addSand(xSand, ySand);
      } else {
        isMoving = false;
      }
    } while (isMoving);
    
    if (xSand === startPosition[0] && ySand === startPosition[1]) {
      isDone = true;
    }

  } while (!isDone);
}
startSandRain();


// console.log('');
// rows.map(row => console.log(row.join()));
// console.log(rows);

let nbSandUnits = 0
rows.map(row => { row.map(e => { if ('o' === e) nbSandUnits++; }) });

console.log(nbSandUnits);