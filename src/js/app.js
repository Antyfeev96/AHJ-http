import AppController from './appController.js';
import Layout from './layout.js';

const app = new AppController(new Layout());

app.init();
