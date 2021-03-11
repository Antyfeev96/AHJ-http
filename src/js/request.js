/* eslint-disable no-unreachable */
/* eslint-disable no-undef */
const sendRequest = async (type, e, form) => {
  e.preventDefault();

  if (type === 'GET') {
    const formData = new FormData();
    formData.append('method', 'allTickets');

    const response = await fetch(`https://ahj-http-mishka.herokuapp.com/?method=${formData.get('method')}`, {
      method: type,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      // body: formData,
    });

    const result = await response.json();

    console.log(result);
  }
  return;

  for (const [key, value] of new FormData(form).entries()) {
    console.log(`${key}: ${value}`);
  }

  const queryString = Array.from(form.elements)
    .filter(({ name }) => name)
    .map(({ name, value }) => `${name}=${encodeURIComponent(value)}`)
    .join('&');

  const response = await fetch(`https://ahj-http-mishka.herokuapp.com/?${queryString}`, {
    method: type,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new FormData(form),
  });

  const result = await response.text();

  console.log(result);
};

export default sendRequest;
