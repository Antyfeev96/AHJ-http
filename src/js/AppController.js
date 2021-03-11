import sendRequest from './request';

/* eslint-disable class-methods-use-this */
export default class AppController {
  constructor(layout) {
    this.layout = layout;
  }

  // parserHTML(string) {
  //   return new DOMParser().parseFromString(string, 'text/html');✓
  // }

  init() {
    document.body.insertAdjacentHTML('afterbegin', this.layout.container);
    document.querySelector('.container').innerHTML = this.layout.addButton + this.layout.tickets;
    document.querySelector('.tickets').innerHTML = this.layout.ticket;

    this.container = document.querySelector('.container');
    this.addButton = this.container.querySelector('.adding-button');
    this.addButton.addEventListener('click', () => this.addListener());
    this.tickets = this.container.querySelector('.tickets');
    this.ticket = this.tickets.querySelector('.ticket');
    this.ticket.addEventListener('click', (e) => this.selectListener(e));
    this.ticket.addEventListener('click', (e) => this.editListener(e));
    this.ticket.addEventListener('click', (e) => this.deleteListener(e));
    this.ticketFullname = this.ticket.querySelector('.ticket__fullname');
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
    this.menu.querySelector('[data-action=ok]').addEventListener('click', this.submitForm);
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

  submitForm(e) {
    e.preventDefault();
    // const form = e.target.closest('.menu').querySelector('.form');
    sendRequest('GET', e);
  }

  closeMenu() {
    this.closest('.menu').remove();
  }
}
