import { Product } from "./product";
import Entity from "./entity";
const btn = document.querySelector<HTMLButtonElement>(".inventory__btn");
const tableThead = document.querySelector<HTMLTableElement>(
  ".table-products thead tr"
);
const tableBody = document.querySelector<HTMLTableElement>(".table__tbody");
const modalPopup = document.querySelector<HTMLElement>("#myModal")!;
let span = document.querySelector<HTMLElement>(".close");
const btnSubmit = document.querySelector<HTMLButtonElement>(".btn-submit");
const inputTitle = document.querySelector<HTMLInputElement>(".form__title");
const categoryElement = document.querySelector<HTMLSelectElement>(
  ".form__select-category"
);
const inputQuantity =
  document.querySelector<HTMLInputElement>(".form__quantity");

btn?.classList.add("btn-product");

export class ProductView {
  private _span: HTMLElement;
  private _product: Entity<IProduct>;
  private _categoryValue: string = "";
  constructor() {
    this._createHeaderTable();
    this._product = new Entity<IProduct>();
    btn?.addEventListener("click", this._openModal.bind(this));
    this._span = document.querySelector<HTMLElement>(".close")!;
    this._span.addEventListener("click", this._closeModal.bind(this));

    document.addEventListener("click", (e: Event) =>
      this._closeModalWindowClicked(e)
    );

    categoryElement?.addEventListener("change", (e: Event) =>
      this._selectCategoryHandler(e)
    );

    btnSubmit?.addEventListener("click", this._addButtonHandler.bind(this));
  }
  private _selectCategoryHandler(e: Event) {
    const categoryElement = document.querySelector<HTMLSelectElement>("option");
    const element = categoryElement?.value;
    // this._categoryValue = element.value;
    console.log(
      "salam :: ",
      categoryElement?.options[categoryElement.selectedIndex].value
    );
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
  private _openModal() {
    modalPopup.style.display = "block";
  }
  private _closeModal() {
    modalPopup.style.display = "none";
  }
  private _closeModalWindowClicked(e: Event) {
    if (e.target === modalPopup) modalPopup.style.display = "none";
  }
  private _renderTable(): void {
    tableBody!.innerText = "";
    const products = this._product.storage;
    console.log("storage__product ::", products);
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
    <td>Delete and Edit</td>
  </tr>`;
  }
}
