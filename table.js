export default class Table {
  constructor(tbody, isTableVisible) {
    this.tbody = tbody;
    this.arrColumns = [
      { first_name: "Имя" },
      { last_name: "Фамилия" },
      { about: "Описание" },
      { eye_color: "Цвет глаз" },
    ];
    this.order = false;
    this.isTableVisible = isTableVisible;
  }

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

  createRows(data) {
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
      const tr = document.createElement("tr");
      tr.setAttribute("id", `${obj["id"]}`);
      tr.appendChild(createFirstAndLastNamesRows(obj, "name", "firstName"));
      tr.appendChild(createFirstAndLastNamesRows(obj, "name", "lastName"));
      tr.appendChild(createAboutAndColorRows(obj, "about"));
      tr.appendChild(createAboutAndColorRows(obj, "eyeColor"));
      this.tbody.appendChild(tr);
    });
    return this.tbody;
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
}
