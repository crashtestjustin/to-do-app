import { createHeader } from "./header.js";
import { createNav } from "./navigation.js";
import { createMain } from "./mainContent.js";
import { createDiv } from "./Domfunctionality.js";
import { folderForm } from "./navigation.js";
import { toDoForm } from "./mainContent.js";
import { checkPastDue } from "./datecompare.js";
import { loadFolderOnPageLoad, loadToDosOnPageLoad } from "./localstorage.js";

const main = document.getElementById("content");

function application() {
  const app = document.createElement("div");
  app.classList = "application-body";

  const header = createHeader();
  app.appendChild(header);

  const modalBg = createDiv("modal-bg hidden-modal");
  app.appendChild(modalBg);

  const navBar = createNav();
  app.appendChild(navBar);

  const mainContent = createMain();
  app.appendChild(mainContent);

  const newFolderModal = folderForm();
  app.appendChild(newFolderModal);

  const newToDoForm = toDoForm();
  app.appendChild(newToDoForm);

  return app;
}

main.appendChild(application());
loadToDosOnPageLoad();
loadFolderOnPageLoad();
setInterval(checkPastDue, 10000);
