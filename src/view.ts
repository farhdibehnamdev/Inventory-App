import { modalPopup, deleteButtonModal } from "./dom";

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

  protected _openModal(): void {
    modalPopup.style.display = "block";
  }
  protected _openDeleteModal() {
    deleteButtonModal.style.display = "block";
  }

  protected _closeDeleteModal() {
    deleteButtonModal.style.display = "none";
  }
  protected _closeModal(): void {
    modalPopup.style.display = "none";
  }
}
