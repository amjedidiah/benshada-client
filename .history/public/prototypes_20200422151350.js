const addComma = (target) => split(target.toString(), 3).join(",");

Array.prototype.unique = function () {
  return this.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });
};

String.prototype.toDashDate = function () {
  let date = new Date(this),
    dat =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  return dat;
};

String.prototype.addComma = () => addComma(this);

Number.prototype.addComma = () => addComma(this);
