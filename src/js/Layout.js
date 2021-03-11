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

    this.ticket = `
    <div class="ticket">
        <div class="ticket__flag" data-type="select"></div>
        <div class="ticket__shortname">Посеять хлеб</div>
        <div class="ticket__timestamp">09.03.2021 16:11</div>
        <div class="ticket__buttons">
            <div class="ticket__flag" data-type="edit">🖉</div>
            <div class="ticket__flag" data-type="delete">✗</div>
        </div>
    </div>
    `;

    this.ticketFullname = `
    <div class="ticket__fullname ticket__fullname_active">Fullname ticket</div>
    `;

    this.menu = `
    <div class="menu">
        <div class="menu__title"></div>
        <form class="form">
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
}
