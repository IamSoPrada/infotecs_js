export default class Table {
  constructor(tbody, tableOnPage) {
    this.tableOnPage = tableOnPage;
    this.tbody = tbody;
    this.arrColumns = [
      { first_name: "Имя" },
      { last_name: "Фамилия" },
      { about: "Описание" },
      { eye_color: "Цвет глаз" },
    ]; // объект где ключи это будущие id колонок, а значения это названия колонок
    this.order = false;
  }

  // Метод создает колонки с названиями
  createCol() {
    const wrapper = document.createElement("tr");
    this.arrColumns.map((el) => {
      const val = Object.values(el);
      const prop = Object.keys(el);
      const th = document.createElement("th");
      th.style.border = "1px solid grey";
      th.innerText = `${val[0]}`;
      th.setAttribute("id", `#${prop[0]}`);
      wrapper.appendChild(th);
    });
    return wrapper;
  }

  //Основной метод генерации строк из приходящих данных
  createAndAppendRows(data) {
    //Функция заполняет строку данными для колонок Имя и Фамилия
    function createFirstAndLastNamesRows(obj, key1, key2) {
      if (key2 === "firstName") {
        const td = document.createElement("td");
        td.classList.add("first_name");
        td.innerText = `${obj[`${key1}`][`${key2}`]}`;
        return td;
      } else {
        const td = document.createElement("td");
        td.classList.add("last_name");
        td.innerText = `${obj[`${key1}`][`${key2}`]}`;
        return td;
      }
    }
    //Функция заполняет строку данными для колонок Описание и Цвет глаз
    function createAboutAndColorRows(obj, key) {
      if (key === "about") {
        const td = document.createElement("td");
        td.classList.add("about");
        td.style.backgroundColor = `${obj[key]}`;
        td.innerText = `${obj[`${key}`]}`;
        return td;
      } else {
        const td = document.createElement("td");
        td.classList.add("eye_color");
        td.innerText = `${obj[key]}`;
        td.style.backgroundColor = `${obj[key]}`;
        return td;
      }
    }

    data.forEach((obj) => {
      // Перебираем пришедшие данные
      const tr = document.createElement("tr"); // Генерируем и заполняем строку
      tr.setAttribute("id", `${obj["id"]}`);
      tr.appendChild(createFirstAndLastNamesRows(obj, "name", "firstName"));
      tr.appendChild(createFirstAndLastNamesRows(obj, "name", "lastName"));
      tr.appendChild(createAboutAndColorRows(obj, "about"));
      tr.appendChild(createAboutAndColorRows(obj, "eyeColor"));
      this.tbody.appendChild(tr); // Вставляем в элемент tbody на странице
    });
    return this.tbody; // возвращаем элемент tbody с новыми данными (метод используется в render() класса PageRender)
  }

  //Метод генерирует строку, которая отображается над названиями с колонками. Отвечает за скр и откр колонок.
  createCloseBtn() {
    const wrapper = document.createElement("tr");
    this.arrColumns.map((el) => {
      const prop = Object.keys(el);
      const th = document.createElement("th");
      th.style.border = "1px solid grey";
      th.innerHTML = `<div id=${prop[0]} class="column_cross">&times</div>`;
      wrapper.appendChild(th);
    });
    return wrapper;
  }
  //Обработчик события клика на скр и откр колонк
  onCloseBtn() {
    Array.from(document.querySelectorAll(".column_cross")).map((btn) => {
      btn.addEventListener("click", () => {
        const attribute = btn.getAttribute("id");
        Array.from(this.tbody.querySelectorAll("td")).map((td) => {
          if (td.classList.contains(attribute)) {
            td.classList.toggle("collapse");
          }
        });
      });
    });
  }

  sortNodeList(target, sorted) {
    let attribute = target.getAttribute("id").slice(1);
    let arr = this.tbody.querySelectorAll(`.${attribute}`);
    this.order === false
      ? (arr = Array.from(arr).sort((a, b) => {
          return a.textContent > b.textContent ? 1 : -1;
        }))
      : (arr = Array.from(arr).sort((a, b) => {
          return a.textContent < b.textContent ? 1 : -1;
        }));
    arr.map((el) => {
      sorted.push(el.parentNode);
    });
  }

  removeChildNodes() {
    let unsorted = Array.from(this.tbody.querySelectorAll("tr")).map((tr) => {
      this.tbody.removeChild(tr);
    });
  }

  appendSortedChildNodes(sorted) {
    sorted.map((tr) => this.tbody.appendChild(tr));
  }

  // Метод сортировки  по убыв. и возр.
  onSort() {
    Array.from(document.querySelectorAll("th")).map((th) => {
      if (th.hasAttribute("id")) {
        th.addEventListener("click", () => {
          const sorted = [];
          this.sortNodeList(th, sorted);
          this.removeChildNodes();
          this.appendSortedChildNodes(sorted);
          this.order = !this.order;
        });
      }
    });
  }

  init() {
    const columns = this.createCol(); // вызывыем метод создания колонок таблицы
    const columnsCLoseBtns = this.createCloseBtn(); // вызываем метод создания кнопок скр. и откр. колонок
    this.tableOnPage.insertBefore(columnsCLoseBtns, this.tbody); // вставляем сгенерированные кнопки и колонки до основного тела таблицы
    this.tableOnPage.insertBefore(columns, this.tbody);
    this.onCloseBtn(); // вызываем метод скр. и откр. колонок таблицы
  }
}
