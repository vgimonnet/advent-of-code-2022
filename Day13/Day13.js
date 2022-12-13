const fs = require('fs');

const pairs = fs.readFileSync('./input.txt', 'utf-8').split('\r\n\r\n').map(pair => pair.split('\r\n'));
const validPair = [];

const isRightOrder = (left, right, isDeep = false) => {
  const eLeft = left[0];
  const eRight = right[0];

  if (eLeft === undefined && eRight === undefined) return isDeep ? 'isDeep' : true;
  else if (eLeft === undefined) return true;
  else if (eRight === undefined) return false;
  
  const leftType = typeof(eLeft);
  const rightType = typeof(eRight);

  if (leftType === 'number' && rightType === 'number') {
    return eLeft === eRight ? isRightOrder(left.slice(1), right.slice(1), isDeep) : eLeft < eRight;
  } else if (leftType === 'object' && rightType === 'number') {
    return isRightOrder([eLeft, ...left.slice(1)], [[eRight], ...right.slice(1)], isDeep);
  } else if (leftType === 'number' && rightType === 'object') {
    return isRightOrder([[eLeft], ...left.slice(1)], [eRight, ...right.slice(1)], isDeep);
  } else if (leftType === 'object' && rightType === 'object') {
    return 'isDeep' === isRightOrder(eLeft, eRight, true) 
      ? isRightOrder(left.slice(1), right.slice(1), isDeep) 
      : isRightOrder(eLeft, eRight, isDeep);
  }
}

pairs.map((pair, index) => {
    if (isRightOrder(eval(pair[0]), eval(pair[1]))) validPair.push(index + 1);
  })
;

const indicesSum = validPair.reduce((acc, indexPair) => acc + indexPair, 0);
console.log(indicesSum);

const decoderKey = [[[2]], [[6]], ...pairs.flat().map(pair => eval(pair))]
  .sort((left, right) => isRightOrder(left, right) ? -1 : 1)
  .reduce((acc, pair, index) => ['[[2]]','[[6]]'].includes(JSON.stringify(pair)) ? acc * (index + 1) : acc, 1)
;
console.log(decoderKey);