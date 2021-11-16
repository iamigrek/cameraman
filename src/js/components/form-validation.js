const form = document.querySelectorAll('.form');
const phoneCheck = /^((\+?3)?8)?((0\(\d{2}\)?)|(\(0\d{2}\))|(0\d{2}))\d{7}$/;
const emailCheck =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

for (let j = 0; j < form.length; j++) {
  form[j].addEventListener('submit', e => {
    formCheck(e, form[j].phone, form[j].email, j);

    form[j].addEventListener('input', () => {
      if (
        (form[j].email == '' || form[j].phone != '') &&
        (form[j].email != '' || form[j].phone == '')
      ) {
        form[j].email.parentElement.classList.remove('form__item--error');
        form[j].email.parentElement.querySelector('.form__error').textContent =
          '';
      }
    });

    form[j].phone.addEventListener('input', () => {
      form[j].phone.parentElement.classList.remove('form__item--error');
      form[j].phone.parentElement.querySelector('.form__error').textContent =
        '';
    });
    form[j].email.addEventListener('input', () => {
      form[j].email.parentElement.classList.remove('form__item--error');
      form[j].email.parentElement.querySelector('.form__error').textContent =
        '';
    });
  });
}

function formCheck(e, phone, email, j) {
  if (!phone.value == '') {
    if (phoneCheck.test(phone.value) && emailCheck.test(email.value)) {
      formSend(e, j);

      return false;
    } else if (phoneCheck.test(phone.value) && email.value == '') {
      formSend(e, j);

      return false;
    } else if (emailCheck.test(email.value) || !phoneCheck.test(phone.value)) {
      phone.parentElement.classList.add('form__item--error');
      phone.parentElement.querySelector('.form__error').textContent =
        'Некорректный номер';
      e.preventDefault();
    } else {
      e.preventDefault();
    }
  }

  if (!email.value == '') {
    if (emailCheck.test(email.value) && phoneCheck.test(phone.value)) {
      formSend(e, j);

      return false;
    } else if (emailCheck.test(email.value) && phone.value == '') {
      formSend(e, j);

      return false;
    } else if (phoneCheck.test(phone.value) || !emailCheck.test(email.value)) {
      email.parentElement.classList.add('form__item--error');
      email.parentElement.querySelector('.form__error').textContent =
        'Некорректная почта';
      e.preventDefault();
    } else {
      e.preventDefault();
    }
  }

  if (phone.value == '' && email.value == '') {
    phone.parentElement.classList.add('form__item--error');
    email.parentElement.classList.add('form__item--error');
    phone.parentElement.querySelector('.form__error').textContent =
      'Нужно что то написать';
    email.parentElement.querySelector('.form__error').textContent =
      'Нужно что то написать';
    e.preventDefault();
  }
}

async function formSend(e, j) {
  e.preventDefault();

  let formData = new FormData(form[j]);

  let response = await fetch('../telegram.php', {
    method: 'POST',
    body: formData,
  });
  if (response.ok) {
    alert('ok');
  } else {
    alert('not ok');
  }
}
