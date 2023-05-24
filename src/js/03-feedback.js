import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

const STORAGE_KEY = 'feedback-form-state';
let formData = {};

fillInTheForm();

form.addEventListener('input', throttle(onMessageEntry, 500));

form.addEventListener('submit', onBtnSubmit);

function onBtnSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
  formData = {};
}

function onMessageEntry(e) {
  formData[e.target.name] = e.target.value.trim();
  const stringifyData = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, stringifyData);
}

function fillInTheForm() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return;

    const formData = JSON.parse(data);
    Object.entries(formData).forEach(([key, val]) => {
      form.elements[key].value = val;
    });
  } catch (error) {
    console.log(error.messages);
  }
}
