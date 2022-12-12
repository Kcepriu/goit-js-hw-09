import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

class CountDownTimer {
  TEXT_MESSAGE_NO_VALID_DATA = 'Please choose a date in the future';

  constructor(flatpickr) {
    this.refs = this.finndElementsWindow();
    this.flatpickr = flatpickr;
  }

  finndElementsWindow() {
    return {
      days: document.querySelector('[data-days]'),
      hours: document.querySelector('[data-hours]'),
      minutes: document.querySelector('[data-minutes]'),
      seconds: document.querySelector('[data-seconds]'),
      buttonStart: document.querySelector('[data-start]'),
      inputData: document.querySelector('#datetime-picker'),
    };
  }

  timer() {
    // ! Треба змінювати лічильник. Коли дійде до кінця то заупит=нити таймер
  }

  setDefaultActiviteElement() {
    // ! Установити доступнійть елементів форми
  }

  showAlarm(message) {
    Notify.failure(message);
  }

  validData(selectedDates) {
    // ! Зробити валідацію
    return false;
  }

  //* Events
  addEvents() {
    //На кнопку обробник
    this.refs.buttonStart.addEventListener(
      'click',
      this.onClickStart.bind(this)
    );
  }

  onClickStart(events) {
    // ! робимо кнопку і поле вводу недоступним
    // ! Запускаємо таймер
  }

  onSelectedDataTime(selectedDates) {
    if (this.validData(selectedDates)) {
      // ! 2. Якщо дата валідна то Робимо кнопку активною
    } else {
      //1. Якщо дата не валідна то покажи повідомлення
      this.showAlarm(this.TEXT_MESSAGE_NO_VALID_DATA);
    }
  }

  // * flatpickr
  connectFlatpickr() {
    this.flatpickr(this.refs.inputData, this.getOptionFlatpickr());
  }

  getOptionFlatpickr() {
    return {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,

      onClose: this.onSelectedDataTime.bind(this),
    };
  }

  // * start script
  startScripts() {
    //* Установити доступність кнопки і поля вводу
    this.setDefaultActiviteElement();

    //* Вішаємо  обробник
    this.addEvents();

    // * Підключаємо бібліотеку вводу дати
    this.connectFlatpickr();
  }
}

const countDownTimer = new CountDownTimer(flatpickr);
countDownTimer.startScripts();
