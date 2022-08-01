const btn = document.querySelector<HTMLButtonElement>(".inventory__btn");
const tableThead = document.querySelector<HTMLTableElement>(
  ".table-products thead tr"
);
btn?.classList.add("btn-product");

export class ProductView {
  constructor() {
    this._createTable();
    this._createModal();
    btn?.addEventListener("click", this._openModal.bind(this));
  }

  _createTable(): void {
    if (tableThead) {
      tableThead.innerHTML = `<th>#</th>
        <th>Name</th>
        <th>Quantity</th>
        <th>Picture</th>
        <th>Category</th>
        <th></th>`;
    }
  }
  _createModal() {}
  _openModal() {}
  fillTable(obj: Product | Category) {}
}
