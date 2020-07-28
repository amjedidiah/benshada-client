export const splitByLength = (input, len) => input.match(new RegExp(`.{1,${len}}(?=(.{${len}})+(?!.))|.{1,${len}}$`, 'g'));

export const addComma = (number) => {
  const num = number.toString().includes('.') ? number.toString().split('.')[0] : number.toString();
  return splitByLength(num, 3).join(',');
};

export const cardNum = (num) => splitByLength(num, 4).join(' ');

export const randNum = (n) => Math.round(Math.random() * n);

export const genUniqueNumber = (d, arr) => {
  let inArray = true;
  let g;

  while (inArray) {
    g = randNum(d);
    inArray = arr.includes(g);
  }

  return g;
};

export const sortNumAsc = (array) => array.sort((a, b) => a - b);

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

export const unique = (array) => array
  .filter((value, index, self) => self.indexOf(value) === index);
