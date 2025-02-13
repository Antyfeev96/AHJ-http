/* eslint-disable prefer-destructuring */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import editRequest from './requests/editRequest';
import deleteRequest from './requests/deleteRequest';
import getRequest from './requests/getTicketsRequest';
import postRequest from './requests/postRequest';
import getFullRequest from './requests/getFullRequest';
import renderResponse from './requests/renderResponse';

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
        this.tickets.innerHTML += this.layout.renderTicket(
          ticket.id,
          ticket.status,
          ticket.name,
          ticket.created,
        );
      }
      document.querySelectorAll('.ticket').forEach((ticket) => {
        ticket.addEventListener('click', (event) => this.selectListener(event));
        ticket.addEventListener('click', (event) => this.editListener(event));
        ticket.addEventListener('click', (event) => this.deleteListener(event));
        ticket.addEventListener('click', (event) => this.showListener(event));
      });
    });
  }

  addListener() {
    if (document.querySelector('.menu') !== null) {
      return;
    }
    this.showAddMenu();
  }

  showListener(e) {
    if (!e.target.classList.contains('ticket__shorttext')) return;
    let { id } = e.target.closest('.ticket');
    id = id.match(/\d/)[0];

    this.showFullTicket(e, id);
  }

  selectListener(e) {
    if (e.target.dataset.type !== 'select') {
      return;
    }

    e.target.classList.toggle('ticket__flag_active');
    e.target.textContent = e.target.classList.contains('ticket__flag_active')
      ? '✓'
      : '';
  }

  editListener(e) {
    if (
      e.target.dataset.type !== 'edit' || document.querySelector('.menu') !== null
    ) {
      return;
    }

    let { id } = e.target.closest('.ticket');
    id = id.match(/\d/)[0];

    this.showEditMenu(e, id);
  }

  deleteListener(e) {
    if (
      e.target.dataset.type !== 'delete' || document.querySelector('.menu') !== null
    ) {
      return;
    }

    let { id } = e.target.closest('.ticket');
    id = id.match(/\d/)[0];

    this.showDeleteMenu(e, id);
  }

  showAddMenu() {
    document.body.insertAdjacentHTML('afterbegin', this.layout.menu);
    this.menu = document.querySelector('.menu');
    this.menu.querySelector('.menu__title').textContent = 'Добавить тикет';
    this.menu
      .querySelector('[data-action=cancel]')
      .addEventListener('click', this.closeMenu);
    this.menu
      .querySelector('[data-action=ok]')
      .addEventListener('click', (e) => this.submitForm(e));
  }

  showEditMenu(e, id) {
    document.body.insertAdjacentHTML('afterbegin', this.layout.menu);
    this.menu = document.querySelector('.menu');
    this.form = this.menu.querySelector('form');
    this.menu.querySelector('.menu__title').textContent = 'Изменить тикет';
    this.menu
      .querySelector('[data-action=cancel]')
      .addEventListener('click', this.closeMenu);
    this.menu
      .querySelector('[data-action=ok]')
      .addEventListener('click', () => this.editTicket(e, id));
  }

  showDeleteMenu(e, id) {
    document.body.insertAdjacentHTML('afterbegin', this.layout.deleteMenu);
    this.menu = document.querySelector('.menu');
    this.menu
      .querySelector('[data-action=cancel]')
      .addEventListener('click', this.closeMenu);
    this.menu
      .querySelector('[data-action=ok]')
      .addEventListener('click', () => this.deleteTicket(e, id));
  }

  async submitForm(e) {
    e.preventDefault();
    const form = this.menu.querySelector('.form');
    const data = await renderResponse(postRequest, 'POST', e, form);
    const {
      id, name, status, created,
    } = data;
    this.tickets.innerHTML += this.layout.renderTicket(
      id,
      status,
      name,
      created,
    );
    this.closeMenu();
    document.querySelectorAll('.ticket').forEach((ticket) => {
      ticket.addEventListener('click', (event) => this.selectListener(event));
      ticket.addEventListener('click', (event) => this.editListener(event));
      ticket.addEventListener('click', (event) => this.deleteListener(event));
      ticket.addEventListener('click', (event) => this.showListener(event));
    });
  }

  async editTicket(e, id) {
    const shorttext = this.form.querySelector('.form__shorttext').value;
    const fulltext = this.form.querySelector('.form__fulltext').value;
    const obj = {
      id,
      shorttext,
      fulltext,
    };
    await renderResponse(editRequest, 'GET', e, obj);
    while (this.container.querySelector('.ticket') !== null) {
      this.container.querySelector('.ticket').remove();
    }
    this.dataTickets = await renderResponse(getRequest, 'GET', e);
    for (const ticket of this.dataTickets) {
      this.tickets.innerHTML += this.layout.renderTicket(
        ticket.id,
        ticket.status,
        ticket.name,
        ticket.created,
      );
    }
    document.querySelectorAll('.ticket').forEach((ticket) => {
      ticket.addEventListener('click', (event) => this.selectListener(event));
      ticket.addEventListener('click', (event) => this.editListener(event));
      ticket.addEventListener('click', (event) => this.deleteListener(event));
      ticket.addEventListener('click', (event) => this.showListener(event));
    });
    this.closeMenu();
  }

  async deleteTicket(e, id) {
    await renderResponse(deleteRequest, 'GET', e, id);
    while (this.container.querySelector('.ticket') !== null) {
      this.container.querySelector('.ticket').remove();
    }
    this.dataTickets = await renderResponse(getRequest, 'GET', e);
    for (const ticket of this.dataTickets) {
      this.tickets.innerHTML += this.layout.renderTicket(
        ticket.id,
        ticket.status,
        ticket.name,
        ticket.created,
      );
    }
    document.querySelectorAll('.ticket').forEach((ticket) => {
      ticket.addEventListener('click', (event) => this.selectListener(event));
      ticket.addEventListener('click', (event) => this.editListener(event));
      ticket.addEventListener('click', (event) => this.deleteListener(event));
      ticket.addEventListener('click', (event) => this.showListener(event));
    });
    this.closeMenu();
  }

  async showFullTicket(e, id) {
    if (e.target.closest('.ticket').querySelector('.ticket__fullname') !== null) {
      e.target.closest('.ticket').querySelector('.ticket__fullname').remove();
      return;
    }
    if (document.querySelector('.ticket__fullname') !== null) {
      document.querySelector('.ticket__fullname').remove();
    }
    const data = await renderResponse(getFullRequest, 'GET', e, id);
    const { description } = data;
    document
      .getElementById(`ticket_${data.id}`)
      .insertAdjacentHTML('beforeend', this.layout.renderFullname(description));
  }

  closeMenu() {
    document.querySelector('.menu').remove();
  }
}
