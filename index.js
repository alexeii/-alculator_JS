"use strict";

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

//кнопка "Рассчитать" через id

let start = document.getElementById("start");
let btnCancel = document.querySelector("#cancel");

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
// input в левой части
let divData = document.querySelector(".data");
let leftInputText = divData.querySelectorAll('input[type="text"]');

//let leftInput = document.querySelectorAll("");

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
    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();

    this.showResult();
  },
  reset: function () {
    document.querySelectorAll("input").forEach(function (item) {
      item.value = "";
    });
    this.budget = 0;
    this.addExpenses = [];
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    periodSelect.value = 1;
  },
  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(", ");
    additionalIncomeValue.value = this.addIncome.join(", ");
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
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
    expensesItems.forEach(function (item) {
      item.querySelector(".expenses-title").value = "";
      item.querySelector(".expenses-amount").value = "";
    });
    expensesItems[0].before(cloneExpensesItem);
    expensesItems = document.querySelectorAll(".expenses-items");
    leftInputText = divData.querySelectorAll('input[type="text"]');
    inLetter();
    inNumber();
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
    incomeItems.forEach(function (item) {
      item.querySelector(".income-title").value = "";
      item.querySelector(".income-amount").value = "";
    });
    incomeItems[0].before(cloneIncomeItem);
    incomeItems = document.querySelectorAll(".income-items");
    leftInputText = divData.querySelectorAll('input[type="text"]');
    inLetter();
    inNumber();
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
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
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
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
    return this.expensesMonth;
  },
  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return Math.ceil(+targetAmount.value / this.budgetMonth);
  },

  /* getStatusIncome: function () {
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
  /* getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt("Какой годовой процент?", 10);
      } while (!isNumber(appData.percentDeposit));
      do {
        appData.moneyDeposit = prompt("Какая сумма на депозите?", 10000);
      } while (!isNumber(appData.moneyDeposit));
    } 
  },*/
  calcPeriod: function () {
    return appData.budgetMonth * periodSelect.value;
  },
};
start.disabled = true;
//console.log(document.querySelectorAll('[placeholder="Наименование"]'));
//ввод только цифр
function inNumber() {
  document.querySelectorAll('[placeholder="Сумма"]').forEach(function (item) {
    item.addEventListener("keyup", function () {
      this.value = this.value.replace(/[^\d]/g, "");
    });
  });
}
//ввод только букв
function inLetter() {
  document
    .querySelectorAll('[placeholder="Наименование"]')
    .forEach(function (item) {
      item.addEventListener("keyup", function () {
        this.value = this.value.replace(/[^а-яА-ЯЁё ,.?!]+$/g, "");
      });
    });
}
//возможные расходы ввод только русских букв, пробелов, знаков препинания
document
  .querySelector('[placeholder="название"]')
  .addEventListener("keyup", function () {
    this.value = this.value.replace(/[^а-яА-ЯЁё ,.?!]+$/g, "");
  });

salaryAmount.addEventListener("input", function () {
  if (salaryAmount.value !== "") {
    start.disabled = false;
  } else {
    start.disabled = true;
  }
});
inLetter();
inNumber();

let startBind = appData.start.bind(appData);
let resetBind = appData.reset.bind(appData);

start.addEventListener("click", startBind);
start.addEventListener("click", function () {
  leftInputText.forEach(function (item) {
    item.disabled = true;
  });
  start.hidden = true;
  incomePlus.disabled = true;
  expensesPlus.disabled = true;
  btnCancel.style.display = "block";
});
expensesPlus.addEventListener("click", appData.addExpensesBlock);
incomePlus.addEventListener("click", appData.addIncomeBlock);

let titlePeriodAmount = document.querySelector(".period-amount");
periodSelect.addEventListener("change", function () {
  titlePeriodAmount.innerHTML = periodSelect.value;
});

btnCancel.addEventListener("click", resetBind);
btnCancel.addEventListener("click", function () {
  btnCancel.style.display = "none";
  start.hidden = false;
  start.disabled = true;
  incomePlus.disabled = false;
  expensesPlus.disabled = false;
  leftInputText.forEach(function (item) {
    item.disabled = false;
  });
});
