/* eslint-disable consistent-return */
const deleteRequest = async (type, e, id) => {
  if (type !== 'GET') return;

  try {
    const formData = new FormData();
    formData.append('method', 'deleteById');
    formData.append('id', id);

    const response = await fetch(
      `https://ahj-http-mishka.herokuapp.com/?method=${formData.get('method')}&id=${formData.get('id')}`,
      {
        method: type,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export default deleteRequest;
