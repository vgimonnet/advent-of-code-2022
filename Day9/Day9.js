const fs = require('fs');

const moves = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const xDirections = ['L', 'R'];
const yDirections = ['D', 'U'];

const getNbPositions = (nbKnot) => {
  const startCoordinates = {x: 0, y: 0};
  const tailCoordinates = [startCoordinates];
  const knots = Array(nbKnot).fill({x: 0, y: 0});

  const moveHead = (direction) => {
    let x = knots[0].x;
    let y = knots[0].y;
    if (xDirections.includes(direction)) {
      x = 'L' === direction ? x - 1 : x + 1;
    } else if (yDirections.includes(direction)) {
      y = 'D' === direction ? y - 1 : y + 1;
    }

    knots[0] = {x, y};
  }

  const moveTail = (direction, index) => {
    const previousKnot = knots[index - 1];
    const currentKnot = knots[index];
    const xHead = previousKnot.x;
    const yHead = previousKnot.y;
    const xTail = currentKnot.x;
    const yTail = currentKnot.y;

    let x = xTail;
    let y = yTail;

    if (xHead - xTail < -1) {
      x--;
      if (yHead > yTail) y++;
      if (yHead < yTail) y--;
    } else if (xHead - xTail > 1) {
      x++;
      if (yHead > yTail) y++;
      if (yHead < yTail) y--;
    } else if (yHead - yTail < -1) {
      y--;
      if (xHead > xTail) x++;
      if (xHead < xTail) x--;
    } else if (yHead - yTail > 1) {
      y++;
      if (xHead > xTail) x++;
      if (xHead < xTail) x--;
    }
    
    const newCoordinates = {x, y};
    knots[index] = newCoordinates;  
    if (index === nbKnot - 1) tailCoordinates.push(newCoordinates);

  }

  moves.map(move => {
    const [direction, nbMove] = move.split(' ');
    for (i = 0; i < nbMove; i++) {
      moveHead(direction);
      for (let i = 1; i < nbKnot; i++) {
        moveTail(direction, i);
      }
    }
  });

  return Array.from(new Set(tailCoordinates.map(JSON.stringify))).map(JSON.parse).length;
}

console.log(getNbPositions(2));
console.log(getNbPositions(10));
