export const isDeleted = (item) => item.isDeleted === false;
export default (array) => (array === undefined || typeof array !== 'object' ? [] : array.filter(isDeleted));
