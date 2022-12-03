const fs = require('fs');

const fileContent = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const minRegExp = /[a-z]/;
const majRegExp = /[A-Z]/;

const getBagde = (firstRucksack, secondRucksak, thirdRucksack) => {
  const commonItemFirstSecond = firstRucksack.filter(item => secondRucksak.includes(item));
  const commonItemFirstThird = firstRucksack.filter(item => thirdRucksack.includes(item));
  const badge = commonItemFirstSecond.filter(item => commonItemFirstThird.includes(item))[0];
  
  if (minRegExp.test(badge)) {
    return badge.charCodeAt(0) - 96;
  } else if (majRegExp.test(badge)) {
    return badge.charCodeAt(0) - 38;
  }

  return 0;
}

let totalBadges = 0;
for (let i = 0; i < fileContent.length - 2; i += 3) {
  totalBadges += getBagde(
    fileContent[i].split(''),
    fileContent[i + 1].split(''),
    fileContent[i + 2].split(''),
  );
}

console.log(totalBadges);