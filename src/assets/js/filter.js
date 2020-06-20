export const isDeleted = (item) => item.isDeleted === false;

export const filterContent = (array) => (array === undefined || typeof array !== 'object' ? [] : array.filter(isDeleted));

export const filterList = (list, type, typeValue) => {
  if (!type) return list;
  if (typeof list[type] === 'number') {
    return Number(list[type]) > 0 && Number(list[type]) <= typeValue;
  }

  if (typeof list[type] === 'object') {
    return typeValue.forEach((value) => (list[type] || []).includes(value));
  }

  return (list[type] || '').toLowerCase() === typeValue;
};
