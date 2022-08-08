import {
  tableBody,
  tableThead,
  inputTitle,
  btn,
  btnSubmit,
  modalContentCategory,
  modalContentProduct,
  modalHeader,
} from "./dom";
import Entity, { Types } from "./entity";
import { Category } from "./category";
import { View } from "./view";

export class CategoryView extends View {
  private _category: Entity<ICategory>;
  constructor() {
    super();
    this._createHeaderTable();
    this._category = new Entity<ICategory>(Types.ICategory);
    this._createModal();
    btn?.addEventListener("click", this._openModal);
    btnSubmit?.addEventListener("click", this._addButtonHandler);
  }
  private _createModal() {
    modalContentProduct?.classList.add("hidden");
    modalContentCategory?.classList.remove("hidden");
    modalHeader!.innerHTML = "Add Category";
  }

  _addButtonHandler() {
    const newProduct = new Category(inputTitle?.value!);
    this._category.add(newProduct);
    this._renderTable();
    this._closeModal();
  }
  private _createHeaderTable(): void {
    if (tableThead) {
      tableThead.innerHTML = `<th>#</th>
        <th>Title</th>
        <th></th>`;
    }
  }

  private _renderTable(): void {
    tableBody!.innerText = "";
    const categories = this._category.storage;
    const allCategory = categories.map((category: ICategory, index) => {
      return this._tableUIBody(<Category>category, index);
    });
    tableBody!.innerHTML += allCategory.join("");
  }
  private _tableUIBody(item: Category, id: number) {
    return `<tr class="table__row ${++id % 2 != 0 ? "odd" : ""}">
    <td>${id}</td>
    <td>${item.title}</td>
    <td><button data-id="${item.id}" class="btn-delete" >
    <i class="ph-trash-bold"></i>
    </button> <button data-id="${item.id}" class="btn-edit">
    <i class="ph-pencil-simple-bold"></i>
    </button></td>
  </tr>`;
  }
}
