'use strict';

//кнопка "Рассчитать" через id

let btnStart = document.getElementById('start');

//Кнопки “+” (плюс) через Tag, каждую в своей переменной

let btnPlus1 = document.getElementsByTagName('button')[0];
let btnPlus2 = document.getElementsByTagName('button')[1];

//Чекбокс по id через querySelector

let deposit = document.querySelector('#deposit-check');

//Поля для ввода возможных доходов (additional_income-item) при помощи querySelectorAll

let addIncomeItem = document.querySelectorAll('.additional_income-item');

/*Каждый элемент в правой части программы через класс, которые имеют в имени класса "-value", начиная с class="budget_day-value" и заканчивая class="target_month-value">*/
// let budgetMonth = document.querySelector('.budget_month-value');

let budgetDay = document.querySelector('.budget_day-value');
let expensesMonth = document.querySelector('.expenses_month-value');
let addIncome = document.querySelector('.additional_income-value');
let addExpenses = document.querySelector('.additional_expenses-value');
let incomePeriod = document.querySelector('.income_period-value');
let targetMonth = document.querySelector('.target_month-value');

/* Оставшиеся поля через querySelector каждый в отдельную переменную:
поля ввода (input) с левой стороны и не забудьте про range.*/

let money = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('.income-title');
let incomeAmount = document.querySelector('.income-amount');
let expensesTitle = document.querySelector('.expenses-title');
let expensesAmount = document.querySelector('.expenses-amount');
let addExpensesItem = document.querySelector('.additional_expenses-item');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');