import { createHeader } from "./header.js";
import { createNav } from "./navigation.js";
import { createMain } from "./mainContent.js";
import { closeModal, createDiv } from "./Domfunctionality.js";
import { folderForm } from "./navigation.js";
import { toDoForm } from "./mainContent.js";

const main = document.getElementById("content");

function application() {
  const app = document.createElement("div");
  app.classList = "application-body";

  const header = createHeader();
  app.appendChild(header);

  const modalBg = createDiv("modal-bg hidden-modal");
  app.appendChild(modalBg);

  const newFolderModal = folderForm();
  app.appendChild(newFolderModal);

  const newToDoForm = toDoForm();
  app.appendChild(newToDoForm);

  const navBar = createNav();
  app.appendChild(navBar);

  const mainContent = createMain();
  app.appendChild(mainContent);

  return app;
}

main.appendChild(application());
