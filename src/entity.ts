export enum Types {
  IProduct = 1,
  ICategory = 2,
}

class Entity<T extends IProduct | ICategory> {
  private _storage: T[];
  constructor(public currentType: Types) {
    this._storage = [];
  }
  add(item: T): void {
    this._storage.push(item);
    this._saveStorage(item);
  }

  edit(id: string, item: T): T {
    return this._storage.find((x) => x.id === id) as T;
  }
  delete(id: string): T[] {
    return this._storage.filter((x) => x.id !== id);
  }
  search(title: string): T[] {
    return this._storage.filter((x) => x.title === title);
  }
  _saveStorage(item: T): void {
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
