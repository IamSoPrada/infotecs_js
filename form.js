export default class EditForm {
  constructor(data, formOnPage, jsonDB) {
    this.data = data;
    this.jsonDB = jsonDB;
    this.formOnPage = formOnPage;
    this.tableRowsArr = document.querySelector("table").rows;
  }

  onRowEdit() {
    Array.from(this.tableRowsArr).map((row) => {
      row.addEventListener("click", () => {
        this.findItemInDB(row.id);
      });
    });
  }

  findItemInDB(id) {
    let copyId = id;
    let copyData = this.data.slice();
    copyData.map((obj) => {
      if (obj["id"] === copyId) {
        this.showEditForm(obj, copyId);
      }
    });
  }

  onSubmitEditedData(copyId) {
    document.querySelector("form").addEventListener("submit", function (e) {
      e.preventDefault();
      const firstName = document.querySelectorAll("input")[0].value;
      const lastName = document.querySelectorAll("input")[1].value;
      const eyeColor = document.querySelectorAll("input")[2].value;
      const textArea = document.querySelector("textarea").value;
      const row = Array.from(document.querySelectorAll("tr")).filter(
        (tr) => tr.id === copyId
      );
      row[0].children[0].textContent = firstName;
      row[0].children[1].textContent = lastName;
      row[0].children[2].textContent = textArea;
      row[0].children[3].textContent = eyeColor;
    });
  }

  showEditForm(obj, copyId) {
    this.formOnPage.innerHTML = `
    <form method="post">
            <div class="form_cross">&times</div>
            <div id="firstName">
              <label >Имя:</label>
              <input type="text" id="firstName" name="first_name" placeholder  = ${obj["name"]["firstName"]} />
            </div>

            <div id="lastName">
              <label >Фамилия:</label>
              <input
                type="text"
                name="last_name"
                placeholder = ${obj["name"]["lastName"]}
              />
            </div>

            <div id="eyeColor">
              <label >Цвет глаз:</label>
              <input type="text"  name="eyeColor"  placeholder = ${obj["eyeColor"]}
              />
            </div>
            <div id="about">
              <label >Описание:</label>
              <textarea id="msg" rows="5" cols="50" name="about" >${obj["about"]}</textarea>
            </div>

            <div class="form_btn">
              <button id="form_btn" type="submit">Сохранить</button>
            </div>
          </form>
    `;
    this.onSubmitEditedData(copyId);
    this.closeEditForm();
    this.formOnPage.classList.add("active");
  }

  closeEditForm() {
    document.querySelector(".form_cross").addEventListener("click", () => {
      this.formOnPage.classList.toggle("active");
    });
  }
}
