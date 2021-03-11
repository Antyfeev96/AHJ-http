// const func = (formData) => {
//   const url = 'http://localhost:7070';
//   const xhr = new XMLHttpRequest();
//   xhr.open('POST', url, true);
//   xhr.addEventListener('readystatechange', () => {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//       console.log(formData);
//     }
//   });
//   xhr.setRequestHeader('Content-Type', 'form/multipart');
//   xhr.send(formData);
// };

// export default func;

const postRequest = async (e, form) => {
  e.preventDefault();

  for (const [key, value] of new FormData(form).entries()) {
    console.log(`${key}: ${value}`);
  }

  const queryString = Array.from(form.elements)
    .filter(({ name }) => name)
    .map(({ name, value }) => `${name}=${encodeURIComponent(value)}`)
    .join('&');

  const response = await fetch(`http://localhost:7070/?${queryString}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new FormData(form),
  });

  const result = await response.text();

  console.log(result);
};

export default postRequest;
