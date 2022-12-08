const fs = require('fs');

const rows = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');
const nbRows = rows.length;
const nbColumns = rows[0].length;
const columns = [];

rows.map(row => {
  for (let i = 0; i < nbColumns; i++) {
    if (!(i in columns)) {
      columns[i] = [];
    }
    columns[i].push(row[i]);
  }
});

let nbVisibleTrees = 0;
for (let i = 0; i < nbRows; i++) {
  const row = rows[i];
  if ([0, nbRows - 1].includes(i)) {
    nbVisibleTrees += parseInt(row.length);
  } else {
    for (let j = 0; j < nbColumns; j++) {
      const column = columns[j];
      if ([0, nbColumns - 1].includes(j)) {
        nbVisibleTrees++;
      } else {
        const currentTree = parseInt(row[j]);

        const isVisibleFromTop = [...column].filter((tree, index) => parseInt(tree) >= currentTree && index < i).length === 0;
        const isVisibleFromBottom = [...column].filter((tree, index) => parseInt(tree) >= currentTree && index > i).length === 0;
        const isVisibleFromLeft = [...row].filter((tree, index) => parseInt(tree) >= currentTree && index < j).length === 0;
        const isVisibleFromRight = [...row].filter((tree, index) => parseInt(tree) >= currentTree && index > j).length === 0;

        if (isVisibleFromBottom || isVisibleFromLeft || isVisibleFromRight || isVisibleFromTop) {
          nbVisibleTrees++;
        }
      }
    }
  }
}

console.log(nbVisibleTrees);