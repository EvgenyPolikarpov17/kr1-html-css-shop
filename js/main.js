"use strict";


/* ===============================
   1. Модальное окно на главной
   =============================== */

const orderDialog = document.getElementById("order-dialog");

const orderButtons =
  document.querySelectorAll(".product-card__button");

const closeDialogButton =
  document.getElementById("close-order-dialog");

const cancelDialogButton =
  document.getElementById("cancel-order-dialog");

const selectedProductInput =
  document.getElementById("selected-product");

const selectedProductText =
  document.getElementById("selected-product-text");

const orderForm =
  document.getElementById("order-form");

const successMessage =
  document.getElementById("success-message");


if (orderDialog && orderForm) {

  orderButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const productName = button.dataset.product;

      selectedProductInput.value = productName;

      selectedProductText.textContent =
        `Выбранный товар: ${productName}`;

      successMessage.hidden = true;

      orderDialog.showModal();

    });

  });


  function closeDialog() {
    orderDialog.close();
  }


  if (closeDialogButton) {
    closeDialogButton.addEventListener(
      "click",
      closeDialog
    );
  }


  if (cancelDialogButton) {
    cancelDialogButton.addEventListener(
      "click",
      closeDialog
    );
  }


  orderForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const formElements =
      Array.from(orderForm.elements);


    formElements.forEach((element) => {

      if (element.willValidate) {
        element.removeAttribute("aria-invalid");
      }

    });


    if (!orderForm.checkValidity()) {

      formElements.forEach((element) => {

        if (
          element.willValidate &&
          !element.checkValidity()
        ) {
          element.setAttribute(
            "aria-invalid",
            "true"
          );
        }

      });

      orderForm.reportValidity();

      return;
    }


    successMessage.hidden = false;

    orderForm.reset();

    selectedProductText.textContent =
      "Выбранный товар будет указан автоматически.";

    orderDialog.close();

  });

}


/* ===============================
   2. Форма на странице order.html
   =============================== */

const pageOrderForm =
  document.getElementById("page-order-form");

const pageSuccessMessage =
  document.getElementById("page-success-message");


if (pageOrderForm && pageSuccessMessage) {

  pageOrderForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      const formElements =
        Array.from(pageOrderForm.elements);


      formElements.forEach((element) => {

        if (element.willValidate) {
          element.removeAttribute(
            "aria-invalid"
          );
        }

      });


      if (!pageOrderForm.checkValidity()) {

        formElements.forEach((element) => {

          if (
            element.willValidate &&
            !element.checkValidity()
          ) {
            element.setAttribute(
              "aria-invalid",
              "true"
            );
          }

        });


        pageOrderForm.reportValidity();

        return;
      }


      pageSuccessMessage.hidden = false;

      pageOrderForm.reset();


      pageSuccessMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    }
  );

}