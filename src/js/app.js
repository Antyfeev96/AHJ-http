/* eslint-disable import/no-unresolved */
// import postRequest from './request';
import AppController from './AppController';
import Layout from './Layout';

const app = new AppController(new Layout());
app.init();

// const form = document.createElement('form');
// const inputName = document.createElement('input');
// inputName.textContent = 'Mishka';
// inputName.name = 'name';
// const inputAge = document.createElement('input');
// inputAge.name = 'age';
// inputAge.textContent = '24';
// form.appendChild(inputName);
// form.appendChild(inputAge);
// console.log(form);

// const formData = new FormData();
// formData.append('name', inputName.textContent);
// formData.append('age', inputAge.textContent);
// console.log(formData.values());
// func(formData);
