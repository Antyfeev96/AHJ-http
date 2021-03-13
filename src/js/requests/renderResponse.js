async function renderResponse(func, type, e, data) {
  let result;
  switch (type) {
    case 'GET':
      result = await func(type, e, data);
      return result;
    case 'POST':
      result = await func(type, e, data);
      return result;
    default:
      return result;
  }
}

export default renderResponse;
