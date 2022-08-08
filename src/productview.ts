import {
  btn,
  tableThead,
  tableBody,
  btnSubmit,
  inputTitle,
  categoryElement,
  inputQuantity,
  modalContentCategory,
  modalContentProduct,
} from "./dom";
import { Product } from "./product";
import { Types } from "./entity";
import Entity from "./entity";
import { View } from "./view";
btn?.classList.add("btn-product");

export class ProductView extends View {
  private _product: Entity<IProduct>;
  private _categoryValue: string = "";
  constructor() {
    super();
    this._createHeaderTable();
    this._createModal();
    this._product = new Entity<IProduct>(Types.IProduct);
    btn?.addEventListener("click", this._openModal);
    btnSubmit?.addEventListener("click", this._addButtonHandler);
    categoryElement?.addEventListener("change", this._selectCategoryHandler);
  }
  private _createModal() {
    modalContentCategory?.classList.add("hidden");
    modalContentProduct?.classList.remove("hidden");
  }

  private _selectCategoryHandler(e: Event) {
    const select = document.querySelector<HTMLSelectElement>(
      ".form__select-category"
    );
    this._categoryValue = select?.options[select?.selectedIndex].value!;
  }
  private _addButtonHandler() {
    const newProduct = new Product(
      inputTitle?.value!,
      this._categoryValue,
      Number.parseInt(inputQuantity?.value!)
    );
    this._product.add(newProduct);
    this._renderTable();
    this._closeModal();
  }
  private _createHeaderTable(): void {
    if (tableThead) {
      tableThead.innerHTML = `<th>#</th>
        <th>Title</th>
        <th>Quantity</th>
        <th>Category</th>
        <th></th>`;
    }
  }

  private _renderTable(): void {
    tableBody!.innerText = "";
    const products = this._product.storage;
    const allProduct = products.map((product: IProduct, index) => {
      return this._tableUIBody(<Product>product, index);
    });
    tableBody!.innerHTML += allProduct.join("");
  }
  private _tableUIBody(item: Product, id: number) {
    return `<tr class="table__row ${++id % 2 != 0 ? "odd" : ""}">
    <td>${id}</td>
    <td>${item.title}</td>
    <td>${item.quantity}</td>
    <td>${item.category}</td>
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
