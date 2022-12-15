const fs = require('fs');

const rows = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');
const nbRows = rows.length;
const nbColumns = rows[0].length;
let founds = [];

class Position {
  constructor({x, y}) {
    this.x = x;
    this.y = y;
    this.history = [];
  }

  compare = ({x, y}) => x === this.x && y === this.y;

  isMovable = () => this.x >= 0 && this.x < nbColumns && this.y >= 0 && this.y < nbRows;

  canMoves = (pos) => rows[this.y][this.x].charCodeAt(0) - rows[pos.y][pos.x].charCodeAt(0) <= 1 && !this.history.includes(pos);

  getMoves = () => [
      new Position({x: this.x - 1, y: this.y}),
      new Position({x: this.x + 1, y: this.y}),
      new Position({x: this.x, y: this.y - 1}),
      new Position({x: this.x, y: this.y + 1})
    ]
    .filter(position => position.isMovable() && this.canMoves(position))
    .map(position => {
      position.history.push(this);
      if (
        'a' === rows[position.y][position.x] &&
        !founds.includes([position.x, position.y])
      ) founds.push([position.x, position.y]);
      return position;
    })
  ;
}

const findPosition = (letter, replaceBy) => {
  let x = null, y = null;
  for (let i = 0; i < nbRows; i++) {
    const row = rows[i].split('');
    const index = row.findIndex(item => letter === item);
    if (-1 !== index) {
      rows[i] = rows[i].replace(letter, replaceBy);
      x = index;
      y = i;
      break;
    }
  }

  return {x, y};
}

const end = new Position(findPosition('E', 'z'));
end.history = [end]
let positions = [end];
let nbMoves = 0;

const target = rows.map(
  (row, y) => row.split('')
  .map((e, x) => e == 'a' ? [x, y] : null)
  .filter(x => !!x)
).flat()[0].length;

while (founds.length < target - 1) {
    nbMoves++
    positions = positions.map(position => position.getMoves())
    .flat()
    .filter((position, index, self) => self.findIndex(s => s.compare(position)) === index)
}
console.log(nbMoves);