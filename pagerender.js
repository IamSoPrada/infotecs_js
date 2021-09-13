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
    this.counter = 1;
    this.usersToRender = 10;
    this.start = (this.counter - 1) * this.usersToRender;
    this.end = this.start + this.usersToRender;
    this.items = this.data.length;
  }

  init() {
    const dataCopy = this.data.slice(this.start, this.end);
    const rows = this.table.createRows(dataCopy);
    this.tableOnPage.appendChild(rows);

    this.form.onRowEdit();
  }

  removePrevChildNodes() {
    const allTr = this.tbody.querySelectorAll("tr");
    Array.from(allTr).map((tr) => {
      this.tbody.removeChild(tr);
    });
  }

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
      btn.addEventListener("click", (e) => {
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
        this.init();
      });
    });
  }
}
