import FetchData from "./fetch.js";
import PageRender from "./pagerender.js";
import Table from "./table.js";
import EditForm from "./form.js";

window.addEventListener("DOMContentLoaded", () => {
  const jsonDB = "db.json"; // БД
  const tableOnPage = document.querySelector("table"); // Тег таблица
  const formOnPage = document.querySelector(".form_edit"); // Div где будет сгенерирована форма
  const nextBtn = document.querySelector(".next"); // Кнопки пагинации
  const prevBtn = document.querySelector(".prev");
  const tbody = document.querySelector("tbody"); // Тело таблицы

  const fetch = new FetchData(); // класс получения данных
  const table = new Table(tbody, tableOnPage); // класс генерации таблицы

  fetch.getData(jsonDB).then((data) => {
    // получаем данные с БД

    table.init(); // отрисовываем колонки с названиями и кнопками скр. и откр. колонок
    const form = new EditForm(data, formOnPage, jsonDB); // класс формы редактирования
    const pageRender = new PageRender( // класс отрисовки старниц с данными БД
      prevBtn,
      nextBtn,
      data,
      table,
      tableOnPage,
      tbody,
      form
    );
    pageRender.render(); // метод отрисовки страниц
    table.onSort(); // метод сортировки таблицы
  });
});
