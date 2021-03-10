const func = (obj) => {
  const url = 'http://localhost:7070';
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(obj);
    }
  });
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(obj);
};

export default func;
