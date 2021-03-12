/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import getRequest from './getRequest';
import postRequest from './postRequest';
import renderResponse from './renderResponse';

/* eslint-disable class-methods-use-this */
export default class AppController {
  constructor(layout) {
    this.layout = layout;
  }

  init() {
    document.body.insertAdjacentHTML('afterbegin', this.layout.container);
    document.querySelector('.container').innerHTML = this.layout.addButton + this.layout.tickets;
    this.container = document.querySelector('.container');
    this.tickets = this.container.querySelector('.tickets');
    this.addButton = this.container.querySelector('.adding-button');
    this.addButton.addEventListener('click', () => this.addListener());
    this.renderTickets();
  }

  renderTickets() {
    document.addEventListener('DOMContentLoaded', async (e) => {
      this.dataTickets = await renderResponse(getRequest, 'GET', e);
      for (const ticket of this.dataTickets) {
        this.tickets.innerHTML
        += this.layout.renderTicket(ticket.id, ticket.status, ticket.name, ticket.created);
      }
      document.querySelectorAll('.ticket').forEach((ticket) => {
        ticket.addEventListener('click', (event) => this.selectListener(event));
        ticket.addEventListener('click', (event) => this.editListener(event));
        ticket.addEventListener('click', (event) => this.deleteListener(event));
      });
    });
  }

  addListener() {
    if (document.querySelector('.menu') !== null) {
      return;
    }
    this.showAddMenu();
  }

  selectListener(e) {
    if (e.target.dataset.type !== 'select') {
      return;
    }

    e.target.classList.toggle('ticket__flag_active');
    e.target.textContent = e.target.classList.contains('ticket__flag_active') ? '✓' : '';
  }

  editListener(e) {
    if (e.target.dataset.type !== 'edit' || document.querySelector('.menu') !== null) {
      return;
    }

    this.showEditMenu();
  }

  deleteListener(e) {
    if (e.target.dataset.type !== 'delete' || document.querySelector('.menu') !== null) {
      return;
    }

    this.showDeleteMenu();
  }

  showAddMenu() {
    document.body.insertAdjacentHTML('afterbegin', this.layout.menu);
    this.menu = document.querySelector('.menu');
    this.menu.querySelector('.menu__title').textContent = 'Добавить тикет';
    this.menu.querySelector('[data-action=cancel]').addEventListener('click', this.closeMenu);
    this.menu.querySelector('[data-action=ok]').addEventListener('click', (e) => this.submitForm(e));
  }

  showEditMenu() {
    document.body.insertAdjacentHTML('afterbegin', this.layout.menu);
    this.menu = document.querySelector('.menu');
    this.menu.querySelector('.menu__title').textContent = 'Изменить тикет';
    this.menu.querySelector('[data-action=cancel]').addEventListener('click', this.closeMenu);
  }

  showDeleteMenu() {
    document.body.insertAdjacentHTML('afterbegin', this.layout.deleteMenu);
    this.menu = document.querySelector('.menu');
    this.menu.querySelector('[data-action=cancel]').addEventListener('click', this.closeMenu);
  }

  async submitForm(e) {
    e.preventDefault();
    const form = this.menu.querySelector('.form');
    const data = await renderResponse(postRequest, 'POST', e, form);
    console.log(data);
  }

  closeMenu() {
    this.closest('.menu').remove();
  }
}
