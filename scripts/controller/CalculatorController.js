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

  getLastOperation() {
    return this._operation[this._operation.length-1]; // retorna o ultimo valor do array 
  }

  setLastOperation(value) {
    this._operation[this._operation.length-1] = value;
  }

  isOperator(value) {
    return (['+', '-', '*', '/', '%'].indexOf(value) > -1); // indexOf: busca o (value) dentro do array, se encontrar, retorna o index do array ([0],[1],[2],[3],[4] / caso não encontrar [-1])
  }

  pushOperation(value) {
    this._operation.push(value);
    
    if(this._operation.length > 3) {
      this.calculate();
    }
  }

  calculate() {
    let lastElement = this._operation.pop(); // auxilia para retirar o ultimo elemento caso seja um operador.
    let result = eval(this._operation.join("")); // resultada da operação entre dois números

    this._operation = [result, lastElement];

    this.setLastNumberToDisplay(); // atualiza display
  }

  setLastNumberToDisplay() {
    let lastNumber;

    for(let i = this._operation.length-1; i >= 0; i--) { // variavel i inicia em (numeroDeItensNoArray) e enquanto esse número for menor ou igual a zero, o mesmo decrementará 
      if(!this.isOperator(this._operation[i])) { // se o item na posição i do array operation não for um operador (ou seja, um número)
        lastNumber = this._operation[i];
        break;
      }
    }

    this.displayCalculator = lastNumber; // display recebe o ultimo número digitado
  }

  addOperation(value) {
    // verifica se o ultimo digito é um numero
    if(isNaN(this.getLastOperation())) { // se o que retornar da função getLastOperation for false, não é um número 
      // string
      if(this.isOperator(value)) { // verifica se o ultimo valor digitado é um operador
        // trocar o operador
        console.log(value);
        this.setLastOperation(value);
      } else if(isNaN(value)) {
        console.log('Outra coisa', value);
      } else {
        this.pushOperation(value);
        this.setLastNumberToDisplay(); // atualiza display
      }
    } else {
      // number
      if(this.isOperator(value)) { // verifica se o ultimo valor digitado é um operador
        this.pushOperation(value);
      } else { 
        let valueString = this.getLastOperation().toString() + value.toString(); // último valor será convertido para string e concatena com o valor digitado 
        this.setLastOperation(parseInt(valueString)); 
        this.setLastNumberToDisplay(); // atualiza display
      }
    }
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
        this.addOperation('+');
        break;

      case 'subtracao':
        this.addOperation('-');
        break;

      case 'divisao':
        this.addOperation('/');
        break;

      case 'multiplicacao':
        this.addOperation('*');
        break;

      case 'porcento':
        this.addOperation('%');
        break;

      case 'igual':

        break;

      case 'ponto': 
      this.addOperation('.');
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





