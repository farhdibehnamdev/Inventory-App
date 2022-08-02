class Entity<T extends Product | Category> {
  private _storage: T[];
  constructor() {
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
    localStorage.setItem(`${typeof item}`, JSON.stringify(item));
  }
  loadAllDataFromStorage() {}
}
