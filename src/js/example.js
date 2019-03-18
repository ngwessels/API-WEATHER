import $ from 'jquery';


// This example.js should contain all the back-end logic, the index.js is the front end-logic
// To Access API Keys use this: "process.env.API-Key-Name"

export class isMath {
  getInputs() {
    var number1 = parseInt($("#input1").val());
    var number2 = parseInt($("#input2").val());
    var operator = $("input:radio[name=operator]:checked").val();
    var array = [number1, number2, operator];
    return array;
  }

  add(num1, num2) {
    return num1 + num2;
  }
  subtract(num1, num2) {
    return num1 - num2;
  }
  multiply(num1, num2) {
    return num1 * num2;
  }
  divide(num1, num2) {
    return num1 / num2;
  }

  math() {
    const array = this.getInputs();
    const num1 = array[0];
    const num2 = array[1];
    const operator = array[2];
    let total;
    if (operator == "add") {
      total = this.add(num1, num2);
    } else if (operator == "subtract") {
      total = this.subtract(num1, num2);
    } else if (operator == "multiply") {
      total = this.multiply(num1, num2);
    } else if (operator == "divide") {
      total = this.divide(num1, num2);
    }
    return total;
  }
}
