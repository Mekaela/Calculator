//used https://www.youtube.com/watch?v=j59qQ7YWLxw as guide

// create class which can call each action
class Calculator {
    constructor(previousOperandTextElement,currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    //for deleting everything
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    //append a number, so more than one can be on display
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return this.currentOperand 
        this.currentOperand = this.currentOperand + number
    }
    // to show currently stored number above number currently being input. connected to classes in CSS
    chooseOperation(operation) {
        if(this.currentOperand === '') return
        if(this.previousOperand !== '') {
            this.equals()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    //to compute amount, depending on which operand is used
    equals() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '/':
                computation = prev / current
                break
            case 'x':
                computation = prev * current
                break
            default:
                return
        }  
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    // to update html text in display area
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        this.previousOperandTextElement.innerText = this.previousOperand
    }
}


//connecting html elements to js. classes need '.' at beginning id using querySelect
const numberButtons = document.querySelectorAll('.number');
const operandButtons = document.querySelectorAll('.operand');

const allClearButtons = document.querySelector('.allClear');
const equalsButton = document.querySelector('.equals');

const previousOperandTextElement = document.querySelector('.output__previous-operation');
const currentOperandTextElement = document.querySelector('.output__current-operation');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
    })
})

operandButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
      })
  })

equalsButton.addEventListener('click', button => {
        calculator.equals()
        calculator.updateDisplay()
    })

    allClearButtons.addEventListener('click', button => {
        calculator.clear()
        calculator.updateDisplay()
    })
