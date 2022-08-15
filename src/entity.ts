import { Category } from "./category";
import { Product } from "./product";

export enum Types {
  IProduct = 1,
  ICategory = 2,
}

class Entity<T extends IProduct | ICategory> {
  private _storage: T[];
  constructor(public currentType: Types) {
    this._storage = [];
    this._loadData();
  }
  private _loadData(): void {
    if (this.storage) {
      const data = <T[]>JSON.parse(this.storage.toString());
      for (let i in data) {
        this._storage.push(data[i]);
      }
    }
  }
  add(item: T): void {
    this._storage.push(item);
    this._saveStorage();
  }
  getDataById(id: string): T {
    return this._storage.find((x) => x.id === id) as T;
  }

  edit(id: string, item: T): void {
    const data = this._storage;
    const foundIndex = data.findIndex((x) => x.id === id);
    data[foundIndex] = item;
    this._saveStorage();
  }
  private _checkCurrentType(): string {
    const currentEntityType =
      this.currentType === Types.IProduct ? "Product" : "Category";
    return currentEntityType;
  }
  delete(id: string): void {
    console.log("id ::", id);
    const data = this._storage.filter((x) => x.id !== id);
    this._storage = data;
    const statusType = this._checkCurrentType();
    localStorage.removeItem(statusType);
    this._saveStorage();
  }

  search(title: string): T[] {
    return this._storage.filter((x) => x.title === title);
  }

  _saveStorage(): void {
    if (this.currentType === Types.IProduct)
      localStorage.setItem("Product", JSON.stringify(this._storage));
    else {
      localStorage.setItem("Category", JSON.stringify(this._storage));
    }
  }

  get storage(): T[] {
    const type = this.currentType === Types.IProduct ? "Product" : "Category";
    const stringifyData = JSON.stringify(localStorage.getItem(type));
    const obj: T[] = <T[]>JSON.parse(stringifyData);
    return obj;
  }

  loadAllDataFromStorage() {}
}

export default Entity;
