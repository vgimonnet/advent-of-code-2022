const fs = require('fs');

const fileContent = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

let caloriesByElf = [];
let counter = 0
fileContent.map(calorie => {
  if ('' === calorie) counter++;
  else if (counter in caloriesByElf) caloriesByElf[counter] += parseInt(calorie);
  else caloriesByElf[counter] = parseInt(calorie);
});

caloriesByElf = caloriesByElf.sort((a, b) => b - a);
let totalCalories = counter = 0;
for (let i = 0; i < caloriesByElf.length; i++) {
  if (counter < 3) {
    if (i === 0 || caloriesByElf[i - 1] > caloriesByElf[i]) {
      totalCalories += caloriesByElf[i];
      counter++;
    }
    else if (caloriesByElf[i - 1] === caloriesByElf[i]) {
      totalCalories += caloriesByElf[i];
    }
  } else {
    break;
  }
}

// console.log(caloriesByElf);
// for (const calorie of caloriesByElf.sort()) {
//   console.log(calorie);
// }
// console.log(caloriesByElf.sort());

console.log(`Elf with max calorie has : ${ Math.max.apply(null, caloriesByElf) }`);
console.log(`Total of top 3 calories : ${ totalCalories }`);