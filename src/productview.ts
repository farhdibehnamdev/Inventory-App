const btn = document.querySelector<HTMLButtonElement>(".inventory__btn");
const tableThead = document.querySelector<HTMLTableElement>(
  ".table-products thead tr"
);
const modalPopup = document.querySelector<HTMLElement>("#myModal")!;
let span = document.querySelector<HTMLElement>(".close");
btn?.classList.add("btn-product");

export class ProductView {
  private _span: HTMLElement;
  constructor() {
    this._createTable();
    this._createModal();
    btn?.addEventListener("click", this._openModal.bind(this));
    this._span = document.querySelector<HTMLElement>(".close")!;
    this._span.addEventListener("click", this._closeModal.bind(this));
    document.addEventListener("click", (e: Event) =>
      this._closeModalWindowClicked(e)
    );
  }

  _createTable(): void {
    if (tableThead) {
      tableThead.innerHTML = `<th>#</th>
        <th>title</th>
        <th>Quantity</th>
        <th>Picture</th>
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
  fillTable(obj: Product | Category) {}
}
