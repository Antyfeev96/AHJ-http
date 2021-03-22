/* eslint-disable consistent-return */
const editRequest = async (type, e, obj) => {
  if (type !== 'GET') return;

  try {
    const formData = new FormData();
    formData.append('method', 'editTicket');
    formData.append('id', obj.id);
    formData.append('shorttext', obj.shorttext);
    formData.append('fulltext', obj.fulltext);
    const response = await fetch(
      `http://localhost:7070/?method=${formData.get('method')}&id=${formData.get('id')}&shorttext=${formData.get('shorttext')}&fulltext=${formData.get('fulltext')}`,
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

export default editRequest;
