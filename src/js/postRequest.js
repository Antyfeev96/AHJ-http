/* eslint-disable consistent-return */
const postRequest = async (type, e, form) => {
  e.preventDefault();

  if (type !== 'POST') return;

  const queryString = Array.from(form.elements)
    .filter(({ name }) => name)
    .map(({ name, value }) => `${name}=${encodeURIComponent(value)}`)
    .join('&');

  try {
    const formData = new FormData();
    formData.set('method', 'createTicket');

    const response = await fetch(
      `http://localhost:7070/?method=${formData.get('method')}&${queryString}`,
      {
        method: type,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: queryString,
      },
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export default postRequest;
