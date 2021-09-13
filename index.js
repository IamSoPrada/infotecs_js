import FetchData from "./fetch.js";
import PageRender from "./pagerender.js";
import Table from "./table.js";
import EditForm from "./form.js";

window.addEventListener("DOMContentLoaded", () => {
  const jsonDB = "db.json";
  const tableOnPage = document.querySelector("table");
  const formOnPage = document.querySelector(".form_edit");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  const tbody = document.querySelector("tbody");

  const fetch = new FetchData();
  const table = new Table(tbody);

  const columns = table.createCol();
  const columnsCLoseBtns = table.createCloseBtn();
  tableOnPage.insertBefore(columnsCLoseBtns, tbody);
  tableOnPage.insertBefore(columns, tbody);
  table.onCloseBtn();
  fetch.getData(jsonDB).then((data) => {
    const form = new EditForm(data, formOnPage, jsonDB);
    const pageRender = new PageRender(
      prevBtn,
      nextBtn,
      data,
      table,
      tableOnPage,
      tbody,
      form
    );

    pageRender.init();
    pageRender.onCheckItems();
    pageRender.onHandlePagination();
    table.onSort();
  });
});
