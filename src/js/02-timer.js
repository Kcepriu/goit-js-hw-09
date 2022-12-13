import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/material_blue.css');

import { Notify } from 'notiflix/build/notiflix-notify-aio';

class CountDownTimer {
  TEXT_MESSAGE_NO_VALID_DATA = 'Please choose a date in the future';

  constructor(flatpickr) {
    this.refs = this.finndElementsWindow();
    this.flatpickr = flatpickr;
    this.selectedDates = null;
    this.inrervalId = null;
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

  setDefaultActiviteElement() {
    // Установити доступнійть елементів форми
    this.disableElement(this.refs.buttonStart);
    this.enableElement(this.refs.inputData);
  }

  showAlarm(message) {
    Notify.failure(message);
  }

  validateData(selectedDates) {
    return selectedDates > Date.now();
  }

  // * Timer
  startTimer() {
    // show curent time
    this.showTime(this.selectedDates - Date.now());
    // set interval
    this.inrervalId = setInterval(this.stepTimer.bind(this), 1000);
  }

  stepTimer() {
    // Треба змінювати лічильник. Коли дійде до кінця то заупит=нити таймер
    if (Date.now() > this.selectedDates) {
      clearInterval(this.inrervalId);
      // Show 00 00 00
      this.showTime(0);
      return;
    }

    this.showTime(this.selectedDates - Date.now());
  }

  showTime(time) {
    const { days, hours, mins, secs } = this.getTimerCOmponents(time);
    this.refs.days.textContent = days;
    this.refs.hours.textContent = hours;
    this.refs.minutes.textContent = mins;
    this.refs.seconds.textContent = secs;
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  getTimerCOmponents(time) {
    const days = this.addLeadingZero(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.addLeadingZero(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.addLeadingZero(
      Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
    );
    const secs = this.addLeadingZero(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
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
    // робимо кнопку і поле вводу недоступним
    this.disableElement(this.refs.buttonStart);
    this.disableElement(this.refs.inputData);

    // Запускаємо таймер
    this.startTimer();
  }

  onSelectedDataTime(selectedDates) {
    if (this.validateData(selectedDates[0])) {
      // Якщо дата валідна то Робимо кнопку активною
      this.enableElement(this.refs.buttonStart);
      this.selectedDates = selectedDates[0];
    } else {
      // Якщо дата не валідна то покажи повідомлення
      this.showAlarm(this.TEXT_MESSAGE_NO_VALID_DATA);
      // Кнопку зробимо неактивною, бо могли раніше вибрати валідну дату і вона тепер активна
      this.disableElement(this.refs.buttonStart);
      this.selectedDates = null;
    }
  }

  // * Disable Enambe elements
  disableElement(element) {
    element.setAttribute('disabled', '');
  }

  enableElement(element) {
    element.removeAttribute('disabled');
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

    //* Вішаємо  обробники
    this.addEvents();

    // * Підключаємо бібліотеку вводу дати
    this.connectFlatpickr();
  }
}

const countDownTimer = new CountDownTimer(flatpickr);
countDownTimer.startScripts();
