async function renderResponse(func, type, e, form) {
  let result;
  if (type === 'GET') {
    result = await func(type, e);
  } else if (type === 'POST') {
    result = await func(type, e, form);
  }
  return result;
}

export default renderResponse;
