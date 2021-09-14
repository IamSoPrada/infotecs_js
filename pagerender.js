export default class PageRender {
  constructor(prevBtn, nextBtn, data, table, tableOnPage, tbody, form) {
    this.prevBtn = prevBtn;
    this.nextBtn = nextBtn;
    this.btns = [prevBtn, nextBtn];
    this.data = data;
    this.table = table;
    this.form = form;
    this.tbody = tbody;
    this.tableOnPage = tableOnPage;
    this.counter = 1; // счетчик нумерации страницы
    this.usersToRender = 10; // кол-во строк для отображения в таблицы
    this.start = (this.counter - 1) * this.usersToRender;
    this.end = this.start + this.usersToRender;
    this.items = this.data.length; // кол-во объектов в БД
  }

  //Метод первой отрисовки старницы

  render() {
    const dataCopy = this.data.slice(this.start, this.end); // Получаем данные в зависимости от задонного числа строк для отображения
    const rows = this.table.createAndAppendRows(dataCopy); // Метод createRows возвращает элемент tbody с генерированными строками внутри
    this.onCheckItems(); // Метод навешивает класс disabled на кнопки пагинации
    this.onHandlePagination();
    this.form.init(); // метод генерирует форму редактирования для выбранной строки
  }

  // Метод удаления предыдущих строк со страницы
  removePrevChildNodes() {
    const allTr = this.tbody.querySelectorAll("tr");
    allTr.forEach((tr) => {
      this.tbody.removeChild(tr);
    });
  }

  // Метод проверяет находимся ли мы в начале массива данных или в конце и в зависимости от этого
  // навешивает атрибут disabled на кнопки пагинации
  onCheckItems() {
    this.prevBtn && this.items - this.data.length <= 0
      ? this.prevBtn.setAttribute("disabled", "disabled")
      : this.items - this.data.length > 0 && this.items >= 1
      ? this.prevBtn.removeAttribute("disabled")
      : null;
    this.nextBtn &&
    this.items - this.data.length + this.usersToRender >= this.data.length
      ? this.nextBtn.setAttribute("disabled", "disabled")
      : this.nextBtn.removeAttribute("disabled");
  }

  onHandlePagination() {
    this.btns.map((btn) => {
      btn.addEventListener("click", () => {
        btn === this.prevBtn
          ? this.counter--
          : btn === this.nextBtn
          ? this.counter++
          : null;
        btn === this.prevBtn
          ? (this.items = this.items - this.usersToRender)
          : btn === this.nextBtn
          ? (this.items = this.items + this.usersToRender)
          : null;
        this.onCheckItems(btn);
        this.start = (this.counter - 1) * this.usersToRender;
        this.end = this.start + this.usersToRender;
        document.querySelector(".page_num").innerText = `${this.counter}`;
        this.removePrevChildNodes();
        const dataCopy = this.data.slice(this.start, this.end);
        this.table.createAndAppendRows(dataCopy);
        this.form.init();
      });
    });
  }
}
