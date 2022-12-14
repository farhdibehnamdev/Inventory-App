export const btn = document.querySelector<HTMLButtonElement>(".inventory__btn");
export const searchBox =
  document.querySelector<HTMLInputElement>(".inventory__search");
//==================================================

/// Menu Elements
export const selectedMenu = <NodeListOf<HTMLAnchorElement>>(
  document.querySelectorAll(".menu a")
);
export const productMenu = document.querySelector(".menu__products");
export const categoryMenu = document.querySelector(".menu__categories");
//==================================================

/// Modal Elements
export const modalPopup = document.querySelector<HTMLElement>("#myModal")!;
export const modalContentCategory =
  document.querySelector<HTMLElement>(".modal__categories");
export const modalContentProduct =
  document.querySelector<HTMLElement>(".modal__products");
export let span = document.querySelector<HTMLElement>(".close");
export const modalHeader =
  document.querySelector<HTMLHeadElement>(".modal__header h2");
//==================================================

/// Modal's Form Elements
export const inputTitle =
  document.querySelector<HTMLInputElement>(".form__title");
export const categoryInputTitle = document.querySelector<HTMLInputElement>(
  ".form__categoryTitle"
);
export const categoryElement = document.querySelector<HTMLSelectElement>(
  ".form__select-category"
);
export const inputQuantity =
  document.querySelector<HTMLInputElement>(".form__quantity");
export const btnSubmit =
  document.querySelector<HTMLButtonElement>(".btn-submit");
//=====================================================
/// Table elements
export const tableElement = document.querySelector<HTMLTableElement>(".table");
export const tableThead =
  document.querySelector<HTMLTableElement>(".table thead tr");
export const tableBody =
  document.querySelector<HTMLTableElement>(".table__tbody");

export const btnEdit = document.querySelector<HTMLButtonElement>(".btn-edit");
export const btnDelete =
  document.querySelector<HTMLButtonElement>(".btn-delete");
//========================================================
/// Delete Modal Elements
export const deleteButtonModal =
  document.querySelector<HTMLElement>("#deletePopup")!;
export const btnOk = document.querySelector<HTMLElement>(".btn-ok");
export const btnCancelDeleteModal =
  document.querySelector<HTMLElement>(".btn-cancelPopup");
