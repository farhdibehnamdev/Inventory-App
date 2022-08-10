import { selectedMenu, productMenu, categoryMenu } from "./dom";
import { ProductView } from "./productview";
import { CategoryView } from "./categoryview";
import { Types } from "./entity";
import "./assets/scss/style.scss";
import Entity from "./entity";

class App {
  private _productView: ProductView;
  private _categoryView: CategoryView;
  constructor() {
    this._productView = new ProductView(new Entity<IProduct>(Types.IProduct));
    this._categoryView = new CategoryView(
      new Entity<ICategory>(Types.ICategory)
    );
    console.log("check ::", this._categoryView);
    selectedMenu.forEach((el: HTMLAnchorElement) =>
      el.addEventListener("click", (e: Event) => this._selectedMenuHandler(e))
    );
    this._init();
  }
  private _selectedMenuHandler(e: Event): void {
    console.log("test ::", this);
    if (e instanceof PointerEvent) {
      let btn = e.target as HTMLButtonElement;
      if (btn.classList.contains("menu__products")) {
        btn.classList.add("menu__selected");
        categoryMenu?.classList.remove("menu__selected");
        this._productView.initUI();
      } else if (btn.classList.contains("menu__categories")) {
        btn.classList.add("menu__selected");
        productMenu?.classList.remove("menu__selected");
        console.log("what happend in ::", this._categoryView);
        this._categoryView.initCategoryUI();
      }
    }
  }

  private _init() {
    this._productView.initUI();
  }
}

const app = new App();
