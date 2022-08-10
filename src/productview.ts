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
  modalHeader,
} from "./dom";
import { Product } from "./product";
import Entity from "./entity";
import { View } from "./view";
btn?.classList.add("btn-product");

export class ProductView extends View {
  private _categoryValue: string = "";
  private _productInventory: Entity<IProduct>;
  constructor(inventory: Entity<IProduct>) {
    super();
    console.log("create Product::", this);

    this._productInventory = inventory;
    btn?.addEventListener("click", this._openModal);
    btnSubmit?.addEventListener("click", this._addButtonHandler.bind(this));
    categoryElement?.addEventListener("change", this._selectCategoryHandler);
  }

  public initUI() {
    this._createModal();
    this._createHeaderTable();
    this._renderTable();
  }

  private _createModal() {
    modalContentCategory?.classList.add("hidden");
    modalContentProduct?.classList.remove("hidden");
    modalHeader!.innerHTML = "Add Product";
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
    this._productInventory?.add(newProduct);
    this._renderTable();
    this._closeModal();
  }
  private _renderTable(): void {
    tableBody!.innerText = "";
    const categories = this._productInventory.storage;
    const allCategory = categories.map((category: ICategory, index) => {
      return this._tableUIBody(<Product>category, index);
    });
    tableBody!.innerHTML += allCategory.join("");
  }
}
