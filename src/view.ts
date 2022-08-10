import { modalPopup } from "./dom";

export class View {
  private _span: HTMLElement;

  constructor() {
    this._span = document.querySelector<HTMLElement>(".close")!;
    this._span.addEventListener("click", this._closeModal);
    document.addEventListener("click", (e: Event) =>
      this._closeModalWindowClicked(e)
    );
  }

  protected _closeModalWindowClicked(e: Event) {
    if (e.target === modalPopup) modalPopup.style.display = "none";
  }

  protected _openModal() {
    modalPopup.style.display = "block";
  }
  protected _closeModal() {
    modalPopup.style.display = "none";
  }
}
