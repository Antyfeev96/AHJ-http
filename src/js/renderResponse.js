import getRequest from './getRequest';

async function renderResponse(e) {
  const result = await getRequest('GET', e);
  return result;
}

export default renderResponse;
