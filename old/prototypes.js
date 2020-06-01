export const split = (input, len) => input.match(
  new RegExp(
    `.{1,${len}}(?=(.{${len}})+(?!.))|.{1,${len}}$`,
    'g'
  )
);

export const unique = (array) => array
  .filter((value, index, self) => self.indexOf(value) === index);

export const randNum = (n) => Math.floor(Math.random() * n + 1);

export const splice = (array, start, delCount, newSubStr) => (array.slice(0, start)
  + newSubStr
  + array.slice(start + Math.abs(delCount)));

export const toSplittedString = (str) => {
  let inputString = str;
  const positions = [];
  for (let i = 0; i < inputString.length; i += 1) {
    if (inputString[i].match(/[A-Z]/) != null) {
      positions.push(i);
    }
  }
  for (let index = 0; index < positions.length; index += 1) {
    const ind = positions[index] + index;
    inputString = inputString.splice(ind, 0, ' ');
  }

  return inputString.toLowerCase();
};

export const uniqueObjectArray = (array, uniqueID) => Array.from(
  new Set(array.map((i) => i[uniqueID]))
).map((id) => array.find((item) => item[uniqueID] === id));

export const filterJargon = (array) => array.filter(
  (item) => item !== undefined && item !== null && item !== ''
);

export const sortNumAsc = (array) => array.sort((a, b) => a - b);

export const sortNumDesc = (array) => array.sort((a, b) => b - a);

export const addComma = (num) => (typeof num === 'number' ? split(num.toString(), 3).join(',') : '');
