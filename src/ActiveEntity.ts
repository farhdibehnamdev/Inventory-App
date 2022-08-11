import { Types } from "./entity";

export class ActiveEntity {
  private _activeClass: Types;
  constructor(public activeMember: Types) {
    this._activeClass = activeMember;
  }

  public activeMenu(value: Types) {
    try {
      if (value) this._activeClass = value;
    } catch (err: unknown) {
      const errEx = err as Error;
      console.error(errEx.message);
    }
  }

  public get active() {
    return this._activeClass;
  }
}
