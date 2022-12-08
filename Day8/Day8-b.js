const fs = require('fs');

const rows = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');
const nbRows = rows.length;
const nbColumns = rows[0].length;
const columns = [];

const scenics = [];

rows.map(row => {
  for (let i = 0; i < nbColumns; i++) {
    if (!(i in columns)) {
      columns[i] = [];
    }
    columns[i].push(row[i]);
  }
});

getScenicScore = (trees, currentTree) => {
  let isBlocked = false;
  let scenicScore = 0;

  trees.map(tree => {
    if (!isBlocked) {
      if (parseInt(tree) >= currentTree) {
        isBlocked = true;
      }
      scenicScore++;
    }
  });

  return scenicScore;
}

for (let i = 0; i < nbRows; i++) {
  const row = rows[i];
  if (![0, nbRows - 1].includes(i)) {
    for (let j = 0; j < nbColumns; j++) {
      const column = columns[j];
      if (![0, nbColumns - 1].includes(j)) {
        const currentTree = parseInt(row[j]);

        scenics.push(
          parseInt(
            getScenicScore([...column].filter((tree, index) => index < i).reverse(), currentTree) *
            getScenicScore([...column].filter((tree, index) => index > i), currentTree) *
            getScenicScore([...row].filter((tree, index) => index < j).reverse(), currentTree) *
            getScenicScore([...row].filter((tree, index) => index > j), currentTree) 
          )
        );
      }
    }
  }
}

console.log(scenics.sort((a, b) => b - a)[0]);