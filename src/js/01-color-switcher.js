class ChangeColor {
  static Status = {
    ACTIVE: true,
    DISABLE: false,
  };

  static NAME_ATRIBUTE_DISABLE = 'disabled';

  constructor() {
    this.refs = this.findeElementWindow();

    this.intervalId = null;
  }

  findeElementWindow() {
    return {
      buttomStart: document.querySelector('[data-start]'),
      buttomStop: document.querySelector('[data-stop]'),
      body: document.querySelector('body'),
    };
  }

  getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  setStartStatus() {
    this.setStatusButton(this.refs.buttomStart, ChangeColor.Status.ACTIVE);
    this.setStatusButton(this.refs.buttomStop, ChangeColor.Status.DISABLE);

    this.statusOperation = ChangeColor.Status.DISABLE;
  }

  // * EVENTS
  addEventsFromButtom() {
    this.refs.buttomStart.addEventListener(
      'click',
      this.onButtonClick.bind(this)
    );
    this.refs.buttomStop.addEventListener(
      'click',
      this.onButtonClick.bind(this)
    );
  }

  onButtonClick(event) {
    //Change status buttom
    this.toogleStatusButton(this.refs.buttomStart);
    this.toogleStatusButton(this.refs.buttomStop);

    //Change status system
    this.toogleStatusOperation();

    this.startStopChangeColor();
  }

  // * Status buttom
  toogleStatusButton(elementButtom) {
    this.setStatusButton(
      elementButtom,
      !this.isButtonActive(elementButtom)
        ? ChangeColor.Status.DISABLE
        : ChangeColor.Status.ACTIVE
    );
  }

  setStatusButton(buttom, status) {
    if (status) {
      buttom.removeAttribute(ChangeColor.NAME_ATRIBUTE_DISABLE);
    } else {
      buttom.setAttribute(ChangeColor.NAME_ATRIBUTE_DISABLE, '');
    }
  }

  //Status operation
  toogleStatusOperation() {
    this.statusOperation = this.statusOperation
      ? ChangeColor.Status.DISABLE
      : ChangeColor.Status.ACTIVE;
  }

  isButtonActive(elementButtom) {
    return elementButtom.hasAttribute(ChangeColor.NAME_ATRIBUTE_DISABLE);
  }

  // *
  startStopChangeColor() {
    if (this.statusOperation) {
      this.intervalId = setInterval(() => {
        this.setColorBody(this.getRandomHexColor());
      }, 1000);
    } else {
      clearInterval(this.intervalId);
    }
  }

  setColorBody(color) {
    this.refs.body.style.backgroundColor = color;
  }

  startScript() {
    this.addEventsFromButtom();

    this.setStartStatus();
  }
}

const changeColor = new ChangeColor();
changeColor.startScript();
