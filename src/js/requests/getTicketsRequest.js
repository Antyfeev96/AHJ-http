/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
/* eslint-disable no-unreachable */
/* eslint-disable no-undef */
const getRequest = async (type, e) => {
  e.preventDefault();

  if (type !== 'GET') return;

  try {
    const formData = new FormData();
    formData.append('method', 'allTickets');

    const response = await fetch(
      `https://ahj-http-mishka.herokuapp.com/?method=${formData.get('method')}`,
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

export default getRequest;
