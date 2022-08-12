import {
  tableBody,
  tableThead,
  categoryInputTitle,
  btn,
  btnSubmit,
  modalContentCategory,
  modalContentProduct,
  modalHeader,
  categoryElement,
} from "./dom";
import Entity, { Types } from "./entity";
import { Category } from "./category";
import { View } from "./view";
import { ActiveEntity } from "./ActiveEntity";

export class CategoryView extends View {
  private _categoryInventory: Entity<ICategory>;
  private _activeMenu: ActiveEntity;
  constructor(categoryInventory: Entity<ICategory>, activeClass: ActiveEntity) {
    super();
    this._categoryInventory = categoryInventory;
    this._activeMenu = activeClass;
    btn?.addEventListener("click", this._openModal);
    btnSubmit?.addEventListener("click", this._addButtonHandler.bind(this));
  }

  initCategoryUI() {
    this._createModal();
    this._createHeaderTable();
    this._renderTable();
  }

  getCategoryData(): ICategory[] {
    const data = <ICategory[]>this._categoryInventory.storage;
    return data;
  }

  private _createModal() {
    modalContentProduct?.classList.add("hidden");
    modalContentCategory?.classList.remove("hidden");
    modalHeader!.innerHTML = "Add Category";
  }
  private _createHeaderTable(): void {
    if (tableThead) {
      tableThead.innerHTML = `<th>#</th>
        <th>Title</th>
        <th></th>`;
    }
  }
  _addButtonHandler() {
    if (this._activeMenu.active === Types.ICategory) {
      const newCategory = new Category(categoryInputTitle?.value!);
      this._categoryInventory.add(newCategory);
      this._renderTable();
      this._closeModal();
    }
  }

  private _renderTable(): void {
    tableBody!.innerText = "";
    const stringifyData = this._categoryInventory.storage;
    if (stringifyData) {
      const obj = JSON.parse(stringifyData.toString());
      let categories: ICategory[] = [];
      for (let i in obj) {
        categories.push(obj[i]);
      }

      const allCategory = categories.map((category: ICategory, index) => {
        return this._tableUIBody(<Category>category, index);
      });
      tableBody!.innerHTML += allCategory.join("");
    } else {
      tableBody!.innerHTML = "";
    }
  }
  private _tableUIBody(item: Category, id: number) {
    return `<tr class="table__row ${++id % 2 != 0 ? "odd" : ""}">
    <td>${id}</td>
    <td>${item.title}</td>
    <td><button data-id="${item.id}" class="btn-delete" >
    <i class="ph-trash-bold "></i>
    <span>Delete</span>
    </button> <button data-id="${item.id}" class="btn-edit">
    <i class="ph-pencil-simple-bold"></i>
    <span>Edit</span>
    </button></td>
  </tr>`;
  }
}
