var calculator = require('./calculator');

console.log('[@calculatorClient.js]', calculator);
var x = 100,
	y = 50;

console.log(calculator.add(x,y));
console.log(calculator.subtract(x,y));
console.log(calculator.multiply(x,y));
console.log(calculator.divide(x,y));