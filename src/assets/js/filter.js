export const isDeleted = (item) => item.isDeleted === false;

export const filterContent = (array) => (array === undefined || typeof array !== 'object' ? [] : array.filter(isDeleted));

export const filterList = (list, type, typeValue) => {
  if (!type) return list;

  if (typeof list[type] === 'number') {
    return Number(list[type]) > typeValue;
  }

  if (typeof list[type] === 'object') {
    return typeValue.forEach((value) => (list[type] || []).includes(value));
  }

  if (typeof list[type] === 'boolean') {
    return list[type] === typeValue;
  }

  return ((list[type] || '').toLowerCase() === typeValue);
};

export const filterJargon = (array) => array.filter(
  (item) => item !== undefined && item !== null && item !== ''
);
