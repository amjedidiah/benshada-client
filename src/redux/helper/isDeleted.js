export default (action) => {
  let responseData = action.payload && action.payload.data && action.payload.data.data;

  if (typeof responseData === 'object') {
    const isDeleted = (
      Object.values(responseData).map((key, value) => (key === 'isDeleted' ? value : null)) || [false]
    ).filter((i) => i !== null)[0];

    responseData = isDeleted ? {} : responseData;
  }

  return responseData;
};
