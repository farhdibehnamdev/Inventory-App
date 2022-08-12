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
import Entity, { Types } from "./entity";
import { View } from "./view";
import { ActiveEntity } from "./ActiveEntity";
import { CategoryView } from "./categoryview";
btn?.classList.add("btn-product");

export class ProductView extends View {
  private _categoryValue: string = "";
  private _productInventory: Entity<IProduct>;
  private _activeMenu: ActiveEntity;
  private _categoryDropdownValues: CategoryView;
  constructor(
    inventory: Entity<IProduct>,
    activeClass: ActiveEntity,
    categoryViewDropdown: CategoryView
  ) {
    super();
    this._categoryDropdownValues = categoryViewDropdown;
    this._productInventory = inventory;
    this._activeMenu = activeClass;
    btn?.addEventListener("click", this._openModal);
    btnSubmit?.addEventListener("click", this._addButtonHandler.bind(this));
    categoryElement?.addEventListener("change", this._selectCategoryHandler);
  }

  public initUI() {
    this._getDropDownData();
    this._createModal();
    this._createHeaderTable();
    this._renderTable();
  }
  private _getDropDownData() {
    categoryElement!.innerHTML = "";
    const categoryDropdownData = <ICategory[]>(
      JSON.parse(this._categoryDropdownValues.getCategoryData().toString())
    );
    console.log("categoryDropdownData :::", categoryDropdownData);
    let categoryDatas: ICategory[] = [];
    for (let prop in categoryDropdownData) {
      console.log("prop", prop);
      if (categoryDropdownData.hasOwnProperty(prop)) {
        categoryDatas.push(categoryDropdownData[prop]);
      }
    }
    console.log("categoryDatas ::", categoryDatas);
    const data = categoryDatas.map((item: ICategory) =>
      this._fillDataIntoDropdown(item)
    );
    const firstOption = <string>(
      "<option value='Select a Category'>Select a Category</option>"
    );
    console.log(data);
    categoryElement!.innerHTML += firstOption + data;
  }

  _fillDataIntoDropdown(item: ICategory) {
    console.log("item:::", item);
    return `
    <option data-id=${item.id} value="${item.title}">${item.title}</option>
    `;
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
    if (this._activeMenu.active === Types.IProduct) {
      const newProduct = new Product(
        inputTitle?.value!,
        this._categoryValue,
        Number.parseInt(inputQuantity?.value!)
      );
      this._productInventory?.add(newProduct);
      this._renderTable();
      this._closeModal();
    }
  }
  private _renderTable(): void {
    tableBody!.innerText = "";
    const stringifyData = this._productInventory.storage;
    if (stringifyData) {
      const obj = JSON.parse(stringifyData.toString());

      let products: IProduct[] = [];

      for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
          products.push(obj[i]);
        }
      }
      const allProducts = products.map((product: IProduct, index) => {
        return this._tableUIBody(<Product>product, index);
      });
      tableBody!.innerHTML += allProducts.join("");
    } else {
      tableBody!.innerHTML = "";
    }
  }
}
