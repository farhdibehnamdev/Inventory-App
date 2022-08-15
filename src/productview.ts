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
  btnOk,
  btnCancelDeleteModal,
} from "./dom";
import { Product } from "./product";
import Entity, { Types } from "./entity";
import { View } from "./view";
import { ActiveEntity } from "./ActiveEntity";
import { CategoryView } from "./categoryview";
btn?.classList.add("btn-product");
export class ProductView extends View {
  private _selectedValue: string;
  private _productStorage: Entity<IProduct>;
  private _activeMenu: ActiveEntity;
  private _categoryDropdownValues: CategoryView;
  private _okButton!: HTMLButtonElement;
  private _updateButton!: HTMLButtonElement;
  private _editMode: boolean;
  private _productId!: string;
  constructor(
    inventory: Entity<IProduct>,
    activeClass: ActiveEntity,
    categoryViewDropdown: CategoryView
  ) {
    super();
    this._categoryDropdownValues = categoryViewDropdown;
    this._productStorage = inventory;
    this._activeMenu = activeClass;
    this._selectedValue = "";
    this._editMode = false;
    // this._okButton = document.createElement("button");
    btn?.addEventListener("click", this._openModal);
    btnSubmit?.addEventListener("click", this._addButtonHandler.bind(this));
    categoryElement?.addEventListener("change", (e: Event) => {
      this._selectCategoryHandler(e);
    });
    tableBody?.addEventListener("click", (e: Event) => {
      this._deleteButtonHandler(e);
      this._editButtonHandler(e);
    });
    btnOk?.addEventListener("click", () => this._deleteProduct());
    btnCancelDeleteModal?.addEventListener("click", () =>
      this._closeDeleteModal()
    );
  }

  private _addButtonHandler() {
    if (this._activeMenu.active === Types.IProduct) {
      const newProduct = new Product(
        inputTitle?.value!,
        this._selectedValue,
        Number.parseInt(inputQuantity?.value!)
      );
      if (!this._editMode) {
        this._productStorage?.add(newProduct);
        this._renderTable();
        this._closeModal();
      } else {
        this._productStorage.edit(this._productId, newProduct);
        this._editMode = false;
        this._renderTable();
        this._closeModal();
      }
    }
  }

  private _editButtonHandler(e: Event) {
    if (this._activeMenu.active === Types.IProduct) {
      const btn = e.target as HTMLButtonElement;
      if (btn.classList.contains("btn-edit")) {
        this._updateButton = btn;
        const id = btn.getAttribute("data-id") as string;
        const data = this._productStorage.getDataById(id);
        this._editProduct(id, data);
      }
    }
  }

  private _deleteButtonHandler(e: Event) {
    const btn = e.target as HTMLButtonElement;
    if (btn.classList.contains("btn-delete")) {
      this._okButton = btn;
      this._openDeleteModal();
    }
  }

  public initUI() {
    this._getDropDownData();
    this._createModal();
    this._createHeaderTable();
    this._renderTable();
  }
  private _getDropDownData() {
    categoryElement!.innerHTML = "";
    const dataCategory = this._categoryDropdownValues.getCategoryData();
    if (dataCategory) {
      const categoryDropdownData = <ICategory[]>(
        JSON.parse(dataCategory.toString())
      );
      let categoryDatas: ICategory[] = [];
      for (let prop in categoryDropdownData) {
        if (categoryDropdownData.hasOwnProperty(prop)) {
          categoryDatas.push(categoryDropdownData[prop]);
        }
      }
      const data = categoryDatas.map((item: ICategory) =>
        this._fillDataIntoDropdown(item)
      );
      const firstOption = <string>(
        "<option value='Select a Category'>Select a Category</option>"
      );
      categoryElement!.innerHTML += firstOption + data;
    }
  }
  private _fillDataIntoDropdown(item: ICategory) {
    return `
    <option data-id=${item.id} value="${item.title}">${item.title}</option>
    `;
  }
  private _deleteProduct(): void {
    const id = <string>this._okButton?.getAttribute("data-id");
    if (id) {
      this._productStorage.delete(id);
      this._closeDeleteModal();
      this._renderTable();
    }
  }

  private _editProduct(id: string, data: IProduct): void {
    this._productId = id;
    inputTitle!.value = data.title;
    inputQuantity!.value = data.quantity.toString();
    modalHeader!.innerHTML = "Edit Product";
    categoryElement!.value = data.category;
    this._selectedValue = data.category;
    this._editMode = true;
    this._openModal();
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
  private _tableUIBody(item: Product, rowId: number) {
    const { title, category, quantity, id } = item;
    return `<tr class="table__row ${++rowId % 2 != 0 ? "odd" : ""}">
    <td>${rowId}</td>
    <td>${title}</td>
    <td>${quantity}</td>
    <td>${category}</td>
    <td><button data-id="${id}" class="btn-delete" >
    <i class="ph-trash-bold"></i>
    <span>Delete</span>
    </button> <button data-id="${id}" class="btn-edit">
    <i class="ph-pencil-simple-bold"></i>
    <span>Edit</span>
    </button></td>
  </tr>`;
  }
  private _selectCategoryHandler(e: Event) {
    const select = document.querySelector<HTMLSelectElement>(
      ".form__select-category"
    );
    const value = select?.options[select?.selectedIndex].value!;
    this._categorySetValue(value);
  }
  private _categorySetValue(value: string) {
    if (value) this._selectedValue = value;
  }

  private _renderTable(): void {
    tableBody!.innerText = "";
    const stringifyData = this._productStorage.storage;
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
