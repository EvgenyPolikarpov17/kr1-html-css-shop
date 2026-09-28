'use strict';

// Получаем модальное окно.
const orderDialog = document.getElementById('order-dialog');

// Получаем кнопки заказа.
const orderButtons = document.querySelectorAll('.product-card__button');

// Получаем кнопку закрытия модального окна.
const closeDialogButton = document.getElementById('close-order-dialog');

// Получаем скрытое поле выбранного товара.
const selectedProductInput = document.getElementById('selected-product');

// Получаем форму.
const orderForm = document.getElementById('order-form');

// Получаем сообщение об успешной отправке.
const successMessage = document.getElementById('success-message');


// Открытие модального окна.
orderButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const productName = button.dataset.product;

    selectedProductInput.value = productName;

    orderDialog.showModal();
  });
});


// Закрытие модального окна.
closeDialogButton.addEventListener('click', () => {
  orderDialog.close();
});


// Проверка и отправка формы.
orderForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formElements = Array.from(orderForm.elements);

  formElements.forEach((element) => {
    if (element.willValidate) {
      element.removeAttribute('aria-invalid');
    }
  });


  if (!orderForm.checkValidity()) {

    formElements.forEach((element) => {
      if (
        element.willValidate &&
        !element.checkValidity()
      ) {
        element.setAttribute(
          'aria-invalid',
          'true'
        );
      }
    });

    orderForm.reportValidity();

    return;
  }


  successMessage.hidden = false;

  orderForm.reset();

  orderDialog.close();
});