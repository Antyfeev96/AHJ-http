/* eslint-disable import/no-unresolved */
import func from './request';
import AppController from './AppController';
import Layout from './Layout';

const app = new AppController(new Layout());
app.init();

const obj = {
  name: 'Mishka',
  age: 25,
};

func(obj);
