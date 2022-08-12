import idGenerator from "./libs/utility";
export class Category implements ICategory {
  private _id: string;
  constructor(public title: string) {
    this._id = idGenerator();
  }

  get id(): string {
    return this._id;
  }
}
