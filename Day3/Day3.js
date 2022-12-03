const fs = require('fs');

const fileContent = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const minRegExp = /[a-z]/;
const majRegExp = /[A-Z]/;

const findPriorityItem = (rucksack) => {
  const totalItems = rucksack.length;
  const firstCompartment = [...rucksack.substring(0, totalItems/2)].sort();
  const secondCompartment = [...rucksack.substring(totalItems/2)].sort();

  const priorityItem = firstCompartment.filter(item => secondCompartment.includes(item))[0];

  if (minRegExp.test(priorityItem)) {
    return priorityItem.charCodeAt(0) - 96;
  } else if (majRegExp.test(priorityItem)) {
    return priorityItem.charCodeAt(0) - 38;
  }

  return 0;
}

const sumOfPrioritiesItem = fileContent.reduce((accumulator, rucksack) => accumulator + findPriorityItem(rucksack), 0);

console.log(sumOfPrioritiesItem);