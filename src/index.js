import { createHeader } from "./header.js";
import { createNav } from "./navigation.js";
import { createMain } from "./mainContent.js";
const main = document.getElementById("content");

function application() {
  const app = document.createElement("div");
  app.classList = "application-body";

  const header = createHeader();
  app.appendChild(header);

  const navBar = createNav();
  app.appendChild(navBar);

  const mainContent = createMain();
  app.appendChild(mainContent);

  return app;
}

main.appendChild(application());
