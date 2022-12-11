const fs = require('fs');

let lcm = 1;
const getLCM = (a, b) => Math.abs(a * b) / getGCD(a, b);
const getGCD = (a, b) => 0 === a ? b : getGCD(b % a, a);

const buildMonkeysArray = () => {
  const monkeys = [];
  const monkeysDatas = fs.readFileSync('./input.txt', 'utf-8').split('\r\n\r\n').map(monkey => monkey.split('\r\n'));

  monkeysDatas.map(monkeyDatas => {
    const monkey = [];
    monkeyDatas.map(monkeyData => {
      monkeyData = monkeyData.trimStart();
      if (monkeyData.startsWith('Starting items: ')) {
        monkey['items'] = monkeyData.split('Starting items: ')[1].split(', ');
      } else if (monkeyData.startsWith('Operation: new = ')) {
        monkey['operation'] = monkeyData.split('Operation: new = ')[1].split(' ');
      } else if (monkeyData.startsWith('Test: divisible by ')) {
        const test = monkeyData.split('Test: divisible by ')[1];
        monkey['test'] = test;
        lcm = getLCM(lcm, test);
      } else if (monkeyData.startsWith('If true: throw to monkey ')) {
        monkey['isTrue'] = monkeyData.split('If true: throw to monkey ')[1];
      } else if (monkeyData.startsWith('If false: throw to monkey ')) {
        monkey['isFalse'] = monkeyData.split('If false: throw to monkey ')[1];
      }
    });
    monkey['nbInspectedItems'] = 0;

    monkeys.push(monkey);
  });

  return monkeys;
}

const monkeys = buildMonkeysArray();

const startRound = () => {
  monkeys.map(({items, operation, test, isTrue, isFalse}, currentMonkey) => {
    items.map(item => {
      const [firstValue, operator, secondValue] = operation;      
      let oldValue = parseInt(item);
      const op1 = 'old' === firstValue ? oldValue : parseInt(firstValue);
      const op2 = 'old' === secondValue ? oldValue : parseInt(secondValue);
      let newValue = null;
      if ('-' === operator) newValue = (op1 - op2) % lcm;
      else if ('+' === operator) newValue = (op1 + op2) % lcm;
      else if ('*' === operator) newValue = (op1 * op2) % lcm;
      else if ('/' === operator) newValue = (op1 / op2) % lcm;
      newValue = parseInt(newValue);

      if (newValue && 0 === newValue % test) monkeys[isTrue].items.push(newValue);
      else if (newValue && 0 !== newValue % test) monkeys[isFalse].items.push(newValue);
      monkeys[currentMonkey].nbInspectedItems += 1;
    });
    monkeys[currentMonkey].items = [];
  });  
}

for (let i = 0; i < 10000; i++) startRound();

const sortedMonkeys = monkeys.sort((a, b) => b.nbInspectedItems - a.nbInspectedItems);
console.log(sortedMonkeys[0].nbInspectedItems * sortedMonkeys[1].nbInspectedItems);
