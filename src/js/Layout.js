export default class Layout {
  constructor() {
    this.container = `
    <div class="container"></div>
    `;

    this.addButton = `
    <div class="adding-button">Добавить тикет</div>
    `;

    this.tickets = `
    <div class="tickets"></div>
    `;

    this.ticketFullname = `
    <div class="ticket__fullname ticket__fullname_active">Fullname ticket</div>
    `;

    this.menu = `
    <div class="menu">
        <div class="menu__title"></div>
        <form name='form' class="form">
            <div class="form__text">Краткое описание</div>
            <textarea name='shorttext' class="form__shorttext"></textarea>
            <div class="form__text">Подробное описание</div>
            <textarea name='fulltext' class="form__fulltext"></textarea>
        </form>
        <div class="menu__buttons">
            <button class="menu__button" data-action="cancel">Отмена</button>
            <button class="menu__button" data-action="ok">Ок</button>
        </div>
    </div>
    `;

    this.deleteMenu = `
    <div class="menu" data-type="delete">
      <div class="menu__title">Удалить тикет</div>
      <div class="menu__text">Вы уверены, что хотите удалить текст? Это действие необратимо.</div>
      <div class="menu__buttons">
        <button class="menu__button" data-action="cancel">Отмена</button>
        <button class="menu__button" data-action="ok">Ок</button>
      </div>
    </div>
    `;
  }

  renderTicket(id, status, shortname, timestamp) {
    this.flag = status === true ? 'ticket__flag_active' : '';
    this.mark = status === true ? '✓' : '';
    return (`
    <div class="ticket" id="ticket_${id}">
        <div class="ticket__flag ${this.flag}" data-type="select">${this.mark}</div>
        <div class="ticket__shortname">${shortname}</div>
        <div class="ticket__timestamp">${timestamp}</div>
        <div class="ticket__buttons">
            <div class="ticket__flag" data-type="edit">🖉</div>
            <div class="ticket__flag" data-type="delete">✗</div>
        </div>
    </div>
    `);
  }

  renderFullname(fullname) {
    this.fullname = fullname;
    return (`
    <div class="ticket__fullname ticket__fullname_active">${this.fullname}</div>
    `);
  }
}
