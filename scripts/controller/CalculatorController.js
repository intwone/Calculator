class CalculatorController {

  /**
   * special methods
   * constructor(parameters)
   */
  constructor() { 
    this._operation = [];
    this._language = 'pt-BR'
    this._displayCalculatorEl = document.querySelector("#display");
    this._dateEl = document.querySelector("#data");
    this._timeEl = document.querySelector("#hora");
    this._currentDate;
    this.initialize();
    this.initButtonEvents();
  }

  /**
   * methods
   */
  initialize() { 
    this.setDisplayDateTime();

    setInterval(() => {
      this.setDisplayDateTime();
    }, 1000);
  }

  addEventListenerAll(element, events, functions) {
    events.split(' ').forEach(event => { // split transforma cada evento em um indíce de um array. forEach em cada event (no caso, btn)
      element.addEventListener(event, functions, false);
    }); 
  }

  clearAll() {
    this._operation = []; // limpa a tela, zerando o array
  }

  clearEntry() {
    this._operation.pop(); // pop: remove um item no array
  }

  addOperation(value) {
    this._operation.push(value); // push: adiciona um item no array 
    console.log(this._operation);
  }

  setError() {
    this.displayCalculator = "ERROR!";
  }


  executeButton(value) { // (valordobotão)
    switch(value) {
      case 'ac':
        this.clearAll();
        break;

      case 'ce':
        this.clearEntry();
        break;

      case 'soma':

        break;

      case 'subtracao':
      
        break;

      case 'divisao':

        break;

      case 'multiplicacao':

        break;

      case 'porcento':

        break;

      case 'igual':

        break;
        
      case '0':

      case '1':

      case '2':

      case '3':

      case '4':

      case '5':

      case '6':
        
      case '7':

      case '8': 

      case '9':
        this.addOperation(parseInt(value));
        break;

      default: 
        this.setError();
        break;
    }
  }

  initButtonEvents() {
    let buttons = document.querySelectorAll("#buttons > g, #parts > g"); // pegue todas as tags buttons com child g

    buttons.forEach((btn, index) => {
      this.addEventListenerAll(btn, "click drag", functionEvent => { // addEventListenerAll('evento', função)
        let textButton = btn.className.baseVal.replace("btn-", ""); // className pega o nome da classe. replace("o que será tirado", "o que será colocado")
        this.executeButton(textButton);
      });

      this.addEventListenerAll(btn, "mouseup mousedown", functionEvent => {
        btn.style.cursor = "pointer"; // muda o estilo do cursor do mouse para "mão clicavel" 
      })
    }); 
  }

  setDisplayDateTime() {
    this.displayDate = this.currentDate.toLocaleDateString(this._language, {
      day: "2-digit", 
      month: "long", 
      year: "numeric"
    });

    this.displayTime = this.currentDate.toLocaleTimeString(this._language);    
  }

  /**
   * getters
   */
  get displayCalculator() {
    return this._displayCalculatorEl.innerHTML;
  }

  get currentDate() {
    return new Date();
  }

  get displayTime() {
    return this._timeEl.innerHTML;
  }

  get displayDate() {
    return this._dateEl.innerHTML;
  }

  /**
   * setters
   */
  set displayCalculator(value) {
    this._displayCalculatorEl.innerHTML = value;
  }

  set currentDate(value) {
    this._displayCalculator = value;
  }

  set displayTime(value) {
    this._timeEl.innerHTML = value;
  }

  set displayDate(value) {
    this._dateEl.innerHTML = value;
  }
}





