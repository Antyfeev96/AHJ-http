export default class Layout {
  constructor() {
    this.container = `
    <div class="container"></div>
    `;

    this.addButton = `
    <div class="add-button">Добавить тикет</div>
    `;

    this.tickets = `
    <div class="tickets"></div>
    `;

    this.ticket = `
    <div class="ticket">
        <div class="ticket__flag" data-type="choose">✓</div>
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
  }
}
