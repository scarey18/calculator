const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const clear = document.getElementById('clear');
const sqrt = document.getElementById('square-root');
const squared = document.getElementById('squared');
const negative = document.getElementById('negative');
const equals = document.getElementById('equals');
const screen = document.querySelector('.screen');
let currentTotal = 0;
let newNumberToggle = true;

function displayNumber(n) {
	const display = screen.textContent;
	if (newNumberToggle) {
		screen.textContent = n;
		newNumberToggle = false;
		clear.textContent = 'C';
	} else if (checkDisplay(n, display)) {
		screen.textContent = (display == '0') ? n : display + n;
		clear.textContent = 'C';
	}
}

function checkDisplay(n, display) {
	const maxLength = (display.includes('.') || display.includes('-')) ? 10 : 9;
	if (display.length >= maxLength) {return false;}
	if (display.includes('.') && n == '.') {return false;}
	return true;
}

function operate(operator) {
	const display = parseFloat(screen.textContent);
	let answer;
	if (operator == 'divide') {
		answer =  currentTotal / display;
	} else if (operator == 'multiply') {
		answer = currentTotal * display;
	} else if (operator == 'subtract') {
		answer = currentTotal - display;
	} else if (operator == 'add') {
		answer = currentTotal + display;
	}
	return round(answer);
}

function round(n) {
	const str = n.toString();
	const maxLength = (str.includes('.') || str.includes('-')) ? 10 : 9;
	let answer = n;
	if (str.length > maxLength && str.includes('.')) {
		const decimalPlaces = str.slice(str.indexOf('.')+1).length;
		const difference = str.length - maxLength;
		answer = parseFloat(n.toFixed(decimalPlaces - difference));
	}
	if (answer.toString().length > maxLength) {
		return 9999999999;
	}
	return answer;
}

for (let number of numbers) {
	number.addEventListener('click', () => displayNumber(number.id));
}

clear.addEventListener('click', function() {
	const active = document.querySelector('.active');
	if (clear.textContent == 'AC') {
		if (active) {active.classList.remove('active');}
		screen.textContent = '0';
		currentTotal = 0;
	} else {
		screen.textContent = '0';
		clear.textContent = 'AC';
	}
});

negative.addEventListener('click', function() {
	const display = screen.textContent;
	if (display == '0' || display == '.') {return;}
	screen.textContent = (display[0]=='-') ? display.slice(1) : '-'+display;
});

squared.addEventListener('click', function() {
	const display = parseFloat(screen.textContent);
	screen.textContent = round(Math.pow(display, 2));
});

sqrt.addEventListener('click', function() {
	const display = parseFloat(screen.textContent);
	screen.textContent = round(Math.sqrt(display));
});

for (let operator of operators) {
	operator.addEventListener('click', function() {
		const active = document.querySelector('.active');
		if (active) {
			currentTotal = operate(active.id);
			screen.textContent = currentTotal;
			active.classList.remove('active');
		} else {
			currentTotal = parseFloat(screen.textContent);
		}
		operator.classList.add('active');
		newNumberToggle = true;
	});
}

equals.addEventListener('click', function() {
	const active = document.querySelector('.active');
	if (active) {
		screen.textContent = operate(active.id);
		clear.textContent = 'AC';
		currentTotal = 0;
		active.classList.remove('active');
	}
	newNumberToggle = true;
});

window.addEventListener('keypress', function(e) {
	const code = e.keyCode;
	let button;
	if (code >= 48 && code <= 57) {
		button = document.getElementById(code-48);
	} else if (code == 46) {
		button = document.getElementById('.');
	} else if (code == 13) {
		e.preventDefault();
		button = document.getElementById('equals');
	} else if (code == 43) {
		button = document.getElementById('add');
	} else if (code == 45) {
		button = document.getElementById('subtract');
	} else if (code == 42) {
		button = document.getElementById('multiply');
	} else if (code == 47) {
		button = document.getElementById('divide');
	}
	
	if (button) {button.click();}
});