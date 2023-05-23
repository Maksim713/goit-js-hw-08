import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.getElementsByName('email'),
  message: document.getElementsByName('message'),
};

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

fillInTheform();

refs.form.addEventListener('input', throttle(onMessageEntry, 500));

refs.form.addEventListener('submit', onBtnSubmit);

function onBtnSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  const objData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  localStorage.removeItem(STORAGE_KEY);
  console.log(objData);
}

function onMessageEntry(e) {
  formData[e.target.name] = e.target.value.trim();
  const stringifyData = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, stringifyData);
}

function fillInTheform() {
  const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (storedData === null) {
    // console.log(storedData);
    return;
  }

  refs.message.value = storedData['message'] || '';
  refs.email.value = storedData['email'] || '';
}
