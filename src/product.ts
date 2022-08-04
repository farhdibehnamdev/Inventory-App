import idGenerator from "./libs/utility";
export class Product implements IProduct {
  private _id: string;
  constructor(
    public title: string,
    public category: string,
    public quantity: number
  ) {
    this._id = idGenerator();
  }

  get id() {
    return this._id;
  }
}
