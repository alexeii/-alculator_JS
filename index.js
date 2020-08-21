"use strict";

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

//кнопка "Рассчитать" через id

let start = document.getElementById("start");

//Кнопки “+” (плюс) через Tag, каждую в своей переменной

let incomePlus = document.getElementsByTagName("button")[0];
let expensesPlus = document.getElementsByTagName("button")[1];

//Чекбокс по id через querySelector

let depositCheck = document.querySelector("#deposit-check");

//Поля для ввода возможных доходов (additional_income-item) при помощи querySelectorAll

let additionalIncomeItem = document.querySelectorAll(".additional_income-item");

/*Каждый элемент в правой части программы через класс, которые имеют в имени класса "-value", начиная с class="budget_day-value" и заканчивая class="target_month-value">*/
let budgetMonthValue = document.getElementsByClassName("result-total")[0];

let budgetDayValue = document.getElementsByClassName("result-total")[1];
let expensesMonthValue = document.getElementsByClassName("result-total")[2];
let additionalIncomeValue = document.getElementsByClassName("result-total")[3];
let additionalExpensesValue = document.getElementsByClassName(
  "result-total"
)[4];
let incomePeriodValue = document.getElementsByClassName("result-total")[5];
let targetMonthValue = document.getElementsByClassName("result-total")[6];
//console.log(expensesMonth);
/* Оставшиеся поля через querySelector каждый в отдельную переменную:
поля ввода (input) с левой стороны и не забудьте про range.*/

let salaryAmount = document.querySelector(".salary-amount");
let incomeTitle = document.querySelector(".income-title");
let incomeItems = document.querySelectorAll(".income-items");
let expensesTitle = document.querySelector(".expenses-title");
let expensesItems = document.querySelectorAll(".expenses-items");
let additionalExpensesItem = document.querySelector(
  ".additional_expenses-item"
);
let targetAmount = document.querySelector(".target-amount");
let periodSelect = document.querySelector(".period-select");

let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  expensesMonth: 0,
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  start: function () {
    appData.budget = +salaryAmount.value;

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();

    appData.showResult();
  },
  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(", ");
    additionalIncomeValue.value = appData.addIncome.join(", ");
    targetMonthValue.value = appData.getTargetMonth();
    incomePeriodValue.value = appData.calcPeriod();
    periodSelect.addEventListener(
      "change",
      function () {
        incomePeriodValue.value = appData.calcPeriod();
      },
      false
    );
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);

    expensesItems[0].after(cloneExpensesItem);
    expensesItems = document.querySelectorAll(".expenses-items");
    if (expensesItems.length === 3) {
      expensesPlus.style.display = "none";
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector(".expenses-title").value;
      let cashExpenses = item.querySelector(".expenses-amount").value;
      if (itemExpenses !== "" && cashExpenses !== "") {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);

    incomeItems[0].after(cloneIncomeItem);
    incomeItems = document.querySelectorAll(".income-items");
    if (incomeItems.length === 3) {
      incomePlus.style.display = "none";
    }
  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector(".income-title").value;
      let cashIncome = item.querySelector(".income-amount").value;
      if (itemIncome !== "" && cashIncome !== "") {
        appData.income[itemIncome] = +cashIncome;
      }
    });
    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(",");
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== "") {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        appData.addIncome.push(itemValue);
      }
    });
  },
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
    return appData.expensesMonth;
  },
  getBudget: function () {
    appData.budgetMonth =
      appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / appData.budgetMonth);
  },
  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      return "У вас высокий уровень дохода";
    } else if (appData.budgetDay < 1200 && appData.budgetDay >= 600) {
      return "У вас средний уровень дохода";
    } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
      return "К сожалению у вас уровень дохода ниже среднего";
    } else if (appData.budgetDay < 0) {
      return "Что то пошло не так";
    }
  },
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt("Какой годовой процент?", 10);
      } while (!isNumber(appData.percentDeposit));
      do {
        appData.moneyDeposit = prompt("Какая сумма на депозите?", 10000);
      } while (!isNumber(appData.moneyDeposit));
    }
  },
  calcPeriod: function () {
    return appData.budgetMonth * periodSelect.value;
  },
};
start.disabled = true;
salaryAmount.oninput = function () {
  if (salaryAmount.value !== "") {
    start.disabled = false;
  } else {
    start.disabled = true;
  }
};

start.addEventListener("click", appData.start);
expensesPlus.addEventListener("click", appData.addExpensesBlock);
incomePlus.addEventListener("click", appData.addIncomeBlock);

let titlePeriodAmount = document.querySelector(".period-amount");
periodSelect.addEventListener("change", function () {
  titlePeriodAmount.innerHTML = periodSelect.value;
});
