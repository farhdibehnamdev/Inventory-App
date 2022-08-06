import { ProductView } from "./productview";

import "./assets/scss/style.scss";
const productMenu = document.querySelector(".menu__products");
class App {
  constructor() {
    this._init();
  }

  private _init() {
    if (productMenu) {
      const product = new ProductView();
    } else {
      // const category = new Entity<ICategory>();
    }
  }
}

const app = new App();
