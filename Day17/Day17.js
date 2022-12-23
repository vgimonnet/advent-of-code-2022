const fs = require('fs');

const horizontalLine = [
  ['.', '.', '@', '@', '@', '@', '.']
];
const cross = [
  ['.', '.', '.', '@', '.', '.', '.'], 
  ['.', '.', '@', '@', '@', '.', '.'], 
  ['.', '.', '.', '@', '.', '.', '.'],
];
const angle = [
  ['.', '.', '@', '@', '@', '.', '.'], 
  ['.', '.', '.', '.', '@', '.', '.'], 
  ['.', '.', '.', '.', '@', '.', '.']
];
const verticalLine = [
  ['.', '.', '@', '.', '.', '.', '.'], 
  ['.', '.', '@', '.', '.', '.', '.'], 
  ['.', '.', '@', '.', '.', '.', '.'], 
  ['.', '.', '@', '.', '.', '.', '.'], 
];
const square = [
  ['.', '.', '@', '@', '.', '.', '.'],
  ['.', '.', '@', '@', '.', '.', '.'],
];

const blocks = [horizontalLine, cross, angle, verticalLine, square];

const WIDE = 7;

const jets = fs.readFileSync('./test.txt', 'utf-8');

let tower = [];

const canGoLeft = () => {
  let canGoLeft = true;

  tower.map(row => {
    if (row.includes('@')) {
      for (let x = 0; x < WIDE; x++) {
        if ('@' === row[x] && (x === 0 || '#' === row[x - 1])) {
          canGoLeft = false;
          break;
        }
      }
    }
  });

  return canGoLeft;
}

const goLeft = () => {
  tower.map((row, y) => {
    if (row.includes('@')) {
      const newRow = Array(WIDE).fill('.');
      for (let x = 0; x < WIDE; x++) {
        if ('@' === row[x]) newRow[x - 1] = '@';
        else if ('#' === row[x]) newRow[x] = '#';
      }
      tower[y] = newRow;
    }
  });
}

const canGoRight = () => {
  let canGoRight = true;

  tower.map(row => {
    if (row.includes('@')) {
      for (let x = 0; x < WIDE; x++) {
        if ('@' === row[x] && (x === WIDE - 1 || '#' === row[x + 1])) {
          canGoRight = false;
          break;
        }
      }
    }
  });

  return canGoRight;
}

const goRight = () => {
  tower.map((row, y) => {
    if (row.includes('@')) {
      const newRow = Array(WIDE).fill('.');
      for (let x = 0; x < WIDE; x++) {
        if ('@' === row[x]) newRow[x + 1] = '@';
        else if ('#' === row[x]) newRow[x] = '#';
      }
      tower[y] = newRow;
    }
  });
}

const canGoDown = (blockHigh, towerHigh) => {
  if (blockHigh === towerHigh) return false;

  let canGoDown = true;
  tower.map((row, y) => {
    if (row.includes('@')) {
      row.map((e, x) => {
        if ('@' === e && '#' === tower[y - 1][x]) canGoDown = false;
      });
    }
  });

  return canGoDown;
}

const goDown = () => {
  tower.map((row, y) => {
    if (row.includes('@')) {
      const newRow = tower[y - 1];
      const currentRow = Array(WIDE).fill('.');
      row.map((e, x) => {
        if ('@' === e) newRow[x] = '@';
        else if ('#' === e) currentRow[x] = '#';
      });
      tower[y] = currentRow;
      tower[y - 1] = newRow;
    }
  });
};

const removeLastLine = () => {
  let remove = true;
  const lastRow = tower[tower.length - 1];
  for (let x = 0; x < WIDE; x++) {
    if ('#' === lastRow[x]) {
      remove = false;
      break;
    }
  }
  if (remove) tower.pop();
};

const createRock = () => {
  tower = tower.map(row => row.map(e => ['@', '#'].includes(e) ? '#' : '.'));
}

const startBlockFalling = (block) => {
  const blockHigh = block.length;
  let isBlockMoving = true;
  tower = tower.concat([Array(WIDE).fill('.')], [Array(WIDE).fill('.')], [Array(WIDE).fill('.')], block);

  do {
    let towerHigh = tower.length;
    const moveToLeft = '<' === jets[indexJet];
    indexJet++;
    if (indexJet === indexMaxJet) indexJet = 0;

    if (moveToLeft && canGoLeft()) goLeft();
    else if (!moveToLeft && canGoRight()) goRight();

    if (canGoDown(blockHigh, towerHigh)) {
      goDown();
      removeLastLine();
    } else {
      createRock();
      isBlockMoving = false;
      break;
    }

  } while (isBlockMoving);
}

let indexJet = 0;
let nbRocksFallen = 0;
const indexMaxJet = jets.length;
const test = (nbMaxRock) => {
  let indexBlock = 0;
  do {
    startBlockFalling(blocks[indexBlock]);
    indexBlock++;
    nbRocksFallen++;
    if (indexBlock >= 5) indexBlock = 0;
    if (nbRocksFallen == nbMaxRock) break;
  } while (nbRocksFallen < nbMaxRock);
}
test(2022); // Part1
// test(1000000000000); // Part2 Launch it only if you have a lot of hours to waist

// tower.reverse().map(row => console.log(row.join('')));
console.log(tower.length);