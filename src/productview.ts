import { Product } from "./product";
import Entity from "./entity";
const btn = document.querySelector<HTMLButtonElement>(".inventory__btn");
const tableThead = document.querySelector<HTMLTableElement>(
  ".table-products thead tr"
);
const modalPopup = document.querySelector<HTMLElement>("#myModal")!;
let span = document.querySelector<HTMLElement>(".close");
const btnSubmit = document.querySelector<HTMLButtonElement>(".btn-submit");
const inputTitle = document.querySelector<HTMLInputElement>(".form__title");
const inputQuantity =
  document.querySelector<HTMLInputElement>(".form__quantity");
btn?.classList.add("btn-product");

export class ProductView {
  private _span: HTMLElement;
  private _product: Entity<IProduct>;
  constructor() {
    this._createTable();
    this._createModal();
    this._product = new Entity<IProduct>();

    btn?.addEventListener("click", this._openModal.bind(this));
    this._span = document.querySelector<HTMLElement>(".close")!;
    this._span.addEventListener("click", this._closeModal.bind(this));
    document.addEventListener("click", (e: Event) =>
      this._closeModalWindowClicked(e)
    );
    btnSubmit?.addEventListener("click", this._addButtonHandler.bind(this));
  }

  _addButtonHandler() {
    this._product.add(
      new Product(
        inputTitle!.value,
        "software",
        Number.parseInt(inputQuantity!.value)
      )
    );
  }
  _createTable(): void {
    if (tableThead) {
      tableThead.innerHTML = `<th>#</th>
        <th>Title</th>
        <th>Quantity</th>
        <th>Category</th>
        <th></th>`;
    }
  }
  _createModal() {}
  _openModal() {
    modalPopup.style.display = "block";
  }
  _closeModal() {
    modalPopup.style.display = "none";
  }
  _closeModalWindowClicked(e: Event) {
    console.log("biggg", e?.target);
    if (e.target === modalPopup) modalPopup.style.display = "none";
  }
  fillTable(obj: IProduct | ICategory) {}
}
