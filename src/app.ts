import { selectedMenu, productMenu, categoryMenu, btnDelete } from "./dom";
import { ProductView } from "./productview";
import { CategoryView } from "./categoryview";
import { Types } from "./entity";
import "./assets/scss/style.scss";
import Entity from "./entity";
import { ActiveEntity } from "./ActiveEntity";

class App {
  private _productView: ProductView;
  private _categoryView: CategoryView;
  private _currentEntity: ActiveEntity;
  constructor() {
    this._currentEntity = new ActiveEntity(Types.IProduct);
    this._categoryView = new CategoryView(
      new Entity<ICategory>(Types.ICategory),
      this._currentEntity
    );
    this._productView = new ProductView(
      new Entity<IProduct>(Types.IProduct),
      this._currentEntity,
      this._categoryView
    );

    selectedMenu.forEach((el: HTMLAnchorElement) =>
      el.addEventListener("click", (e: Event) => this._selectedMenuHandler(e))
    );
    this._init();
  }

  private _selectedMenuHandler(e: Event): void {
    if (e instanceof PointerEvent) {
      let btn = e.target as HTMLButtonElement;
      if (btn.classList.contains("menu__products")) {
        btn.classList.add("menu__selected");
        categoryMenu?.classList.remove("menu__selected");
        this._productView.initUI();
        this._currentEntity.activeMenu(Types.IProduct);
      } else if (btn.classList.contains("menu__categories")) {
        btn.classList.add("menu__selected");
        productMenu?.classList.remove("menu__selected");
        this._categoryView.initCategoryUI();
        this._currentEntity.activeMenu(Types.ICategory);
      }
    }
  }

  private _init() {
    this._productView.initUI();
  }
}

const app = new App();
