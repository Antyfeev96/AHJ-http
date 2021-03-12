const postRequest = async (type, e, form) => {
  e.preventDefault();

  if (type !== 'POST') return;

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

export default postRequest;
