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
  btnOk,
  inputTitle,
} from "./dom";
import Entity, { Types } from "./entity";
import { Category } from "./category";
import { View } from "./view";
import { ActiveEntity } from "./ActiveEntity";

export class CategoryView extends View {
  private _categoryStorage: Entity<ICategory>;
  private _activeMenu: ActiveEntity;
  private _okButton: any;
  private _updateButton!: HTMLButtonElement;
  private _editMode: boolean;
  private _categoryId!: string;
  constructor(categoryInventory: Entity<ICategory>, activeClass: ActiveEntity) {
    super();
    this._editMode = false;
    this._categoryStorage = categoryInventory;
    this._activeMenu = activeClass;
    btn?.addEventListener("click", this._openModal);
    btnSubmit?.addEventListener("click", this._addButtonHandler.bind(this));
    tableBody?.addEventListener("click", (e: Event) => {
      this._deleteButtonHandler(e);
      this._editButtonHandler(e);
    });
    btnOk?.addEventListener("click", () => this._deleteCategory());
  }

  initCategoryUI() {
    this._createModal();
    this._createHeaderTable();
    this._renderTable();
  }
  private _addEidtButtonHandler(): void {
    if (this._activeMenu.active === Types.ICategory) {
      const newCategory = new Category(inputTitle!.value);
      if (!this._editMode) {
        this._categoryStorage?.add(newCategory);
        this._renderTable();
        this._closeModal();
      } else {
        this._categoryStorage.edit(this._categoryId, newCategory);
        this._editMode = false;
        this._renderTable();
        this._closeModal();
      }
    }
  }

  private _editButtonHandler(e: Event): void {
    if (this._activeMenu.active === Types.ICategory) {
      const btn = e.target as HTMLButtonElement;
      if (btn.classList.contains("btn-edit")) {
        this._updateButton = btn;
        const id = btn.getAttribute("data-id") as string;
        const data = this._categoryStorage.getDataById(id);
        this._editCategory(id, data);
      }
    }
  }

  private _editCategory(id: string, data: ICategory): void {
    this._categoryId = id;
    inputTitle!.value = data.title;
    modalHeader!.innerHTML = "Edit Category";
    this._editMode = true;
    this._openModal();
  }

  getCategoryData(): ICategory[] {
    const data = <ICategory[]>this._categoryStorage.storage;
    return data;
  }
  private _deleteButtonHandler(e: Event): void {
    const btn = e.target as HTMLButtonElement;
    if (btn.classList.contains("btn-delete")) {
      this._okButton = btn;
      this._openDeleteModal();
    }
  }
  private _deleteCategory(): void {
    const id = <string>this._okButton?.getAttribute("data-id");
    if (id) {
      this._categoryStorage.delete(id);
      this._closeDeleteModal();
      this._renderTable();
    }
  }
  private _createModal(): void {
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
      this._categoryStorage.add(newCategory);
      this._renderTable();
      this._closeModal();
    }
  }
  private _renderTable(): void {
    tableBody!.innerText = "";
    const stringifyData = this._categoryStorage.storage;
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
