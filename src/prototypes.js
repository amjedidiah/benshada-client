const split = (input, len) =>
  input.match(
    new RegExp(
      ".{1," + len + "}(?=(.{" + len + "})+(?!.))|.{1," + len + "}$",
      "g"
    )
  );

Array.prototype.unique = function () {
  return this.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });
};

Number.prototype.randNum = function () {
  return Math.floor(Math.random() * 3 + 1);
};

String.prototype.splice = function (start, delCount, newSubStr) {
  return (
    this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount))
  );
};

String.prototype.toSplittedString = function () {
  let inputString = this,
    positions = [];
  for (let i = 0; i < inputString.length; i++) {
    if (inputString[i].match(/[A-Z]/) != null) {
      positions.push(i);
    }
  }
  for (let index = 0; index < positions.length; index++) {
    let ind = positions[index] + index;
    inputString = inputString.splice(ind, 0, " ");
  }

  return inputString.toLowerCase();
};

Array.prototype.uniqueObjectArray = function (uniqueID) {
  return Array.from(new Set(this.map((i) => i[uniqueID]))).map((id) =>
    this.find((item) => item[uniqueID] === id)
  );
};

Array.prototype.filterJargon = function () {
  return this.filter(
    (item) => item !== undefined && item !== null && item !== ""
  );
};

Array.prototype.sortNumAsc = function () {
  return this.sort((a, b) => a - b);
};

Array.prototype.sortNumDesc = function () {
  return this.sort((a, b) => b - a);
};

// String.prototype.toDashDate = function () {
//   let date = new Date(this),
//     dat =
//       date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
//   return dat;
// };

Number.prototype.addComma = function () {
  let n = { ...this };

  return typeof this === "number" ? split(this.toString(), 3).join(",") : "";
};
