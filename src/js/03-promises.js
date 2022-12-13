import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = findElementWindow();

function findElementWindow() {
  const elemForm = document.querySelector('.form');
  return {
    form: elemForm,
    inputDelay: elemForm.querySelector('input[name="delay"]'),
    inputStep: elemForm.querySelector('input[name="step"]'),
    inputAmount: elemForm.querySelector('input[name="amount"]'),
    button: elemForm.querySelector('button'),
  };
}

// * events
function addEvents() {
  refs.form.addEventListener('submit', onSubmit);
}

function onSubmit(event) {
  event.preventDefault();
  createPromises();
}

// * Promise
function createPromises() {
  const delay = Number(refs.inputDelay.value);
  const step = Number(refs.inputStep.value);
  const amount = Number(refs.inputAmount.value);

  setTimeOutNotify((delay + step * amount) * 0.5);

  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, delay + step * i)
      .then(resolvPromise)
      .catch(rejectPromise);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// * function Promise
function resolvPromise({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function rejectPromise({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

// * Notify
function setTimeOutNotify(time) {
  Notify.init({
    useIcon: false,
    timeout: time,
    cssAnimationStyle: 'zoom',
  });
}

function initialyzeScript() {
  addEvents();
  createPromises();
}

initialyzeScript();
