"use strict";

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

//кнопка "Рассчитать" через id

const start = document.getElementById("start");
const btnCancel = document.querySelector("#cancel");

//Кнопки “+” (плюс) через Tag, каждую в своей переменной

const incomePlus = document.getElementsByTagName("button")[0];
const expensesPlus = document.getElementsByTagName("button")[1];

//Чекбокс по id через querySelector

const depositCheck = document.querySelector("#deposit-check");

//Поля для ввода возможных доходов (additional_income-item) при помощи querySelectorAll

const additionalIncomeItem = document.querySelectorAll(
  ".additional_income-item"
);

/*Каждый элемент в правой части программы через класс, которые имеют в имени класса "-value", начиная с class="budget_day-value" и заканчивая class="target_month-value">*/
const budgetMonthValue = document.getElementsByClassName("result-total")[0];

const budgetDayValue = document.getElementsByClassName("result-total")[1];
const expensesMonthValue = document.getElementsByClassName("result-total")[2];
const additionalIncomeValue = document.getElementsByClassName(
  "result-total"
)[3];
const additionalExpensesValue = document.getElementsByClassName(
  "result-total"
)[4];
const incomePeriodValue = document.getElementsByClassName("result-total")[5];
const targetMonthValue = document.getElementsByClassName("result-total")[6];
//console.log(expensesMonth);
/* Оставшиеся поля через querySelector каждый в отдельную переменную:
поля ввода (input) с левой стороны и не забудьте про range.*/

const salaryAmount = document.querySelector(".salary-amount");
const incomeTitle = document.querySelector(".income-title");
let incomeItems = document.querySelectorAll(".income-items");
const expensesTitle = document.querySelector(".expenses-title");
let expensesItems = document.querySelectorAll(".expenses-items");
const additionalExpensesItem = document.querySelector(
  ".additional_expenses-item"
);
const targetAmount = document.querySelector(".target-amount");
const periodSelect = document.querySelector(".period-select");
// input в левой части
const divData = document.querySelector(".data");
let leftInputText = divData.querySelectorAll('input[type="text"]');
const depositBank = document.querySelector(".deposit-bank");
const depositAmount = document.querySelector(".deposit-amount");
const depositPercent = document.querySelector(".deposit-percent");

class AppData {
  constructor() {
    this.budget = 0;
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
  }
  start() {
    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getInfoDeposit();
    this.getBudget();

    this.showResult();
  }
  reset() {
    document.querySelectorAll("input").forEach((item) => {
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
    depositBank.style.display = "none";
    depositAmount.style.display = "none";
    depositPercent.style.display = "none";
    depositCheck.checked = false;
    depositBank.value = "";
    depositAmount.value = "";
    periodSelect.value = 1;
  }
  showResult() {
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(", ");
    additionalIncomeValue.value = this.addIncome.join(", ");
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener(
      "change",
      () => {
        incomePeriodValue.value = _this.calcPeriod();
      },
      false
    );
  }
  addExpensesBlock() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems.forEach(function (item) {
      item.querySelector(".expenses-title").value = "";
      item.querySelector(".expenses-amount").value = "";
    });
    expensesItems[0].before(cloneExpensesItem);
    expensesItems = document.querySelectorAll(".expenses-items");
    leftInputText = divData.querySelectorAll('input[type="text"]');
    let inLetter = function () {
      document
        .querySelectorAll('[placeholder="Наименование"]')
        .forEach((item) => {
          item.addEventListener("keyup", function () {
            this.value = this.value.replace(/[^а-яА-ЯЁё ,.?!]+$/g, "");
          });
        });
    };
    let inNumber = function () {
      document.querySelectorAll('[placeholder="Сумма"]').forEach((item) => {
        item.addEventListener("keyup", function () {
          this.value = this.value.replace(/[^\d]/g, "");
        });
      });
    };
    inLetter();
    inNumber();
    if (expensesItems.length === 3) {
      expensesPlus.style.display = "none";
    }
  }
  getExpenses() {
    expensesItems.forEach((item) => {
      let itemExpenses = item.querySelector(".expenses-title").value;
      let cashExpenses = item.querySelector(".expenses-amount").value;
      if (itemExpenses !== "" && cashExpenses !== "") {
        this.expenses[itemExpenses] = cashExpenses;
      }
    });
  }
  addIncomeBlock() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems.forEach(function (item) {
      item.querySelector(".income-title").value = "";
      item.querySelector(".income-amount").value = "";
    });
    incomeItems[0].before(cloneIncomeItem);
    incomeItems = document.querySelectorAll(".income-items");
    leftInputText = divData.querySelectorAll('input[type="text"]');
    const inLetter = () => {
      document
        .querySelectorAll('[placeholder="Наименование"]')
        .forEach((item) => {
          item.addEventListener("keyup", function () {
            this.value = this.value.replace(/[^а-яА-ЯЁё ,.?!]+$/g, "");
          });
        });
    };
    const inNumber = function () {
      document.querySelectorAll('[placeholder="Сумма"]').forEach((item) => {
        item.addEventListener("keyup", function () {
          this.value = this.value.replace(/[^\d]/g, "");
        });
      });
    };
    inLetter();
    inNumber();
    if (incomeItems.length === 3) {
      incomePlus.style.display = "none";
    }
  }
  getIncome() {
    const _this = this;
    incomeItems.forEach((item) => {
      let itemIncome = item.querySelector(".income-title").value;
      let cashIncome = item.querySelector(".income-amount").value;
      if (itemIncome !== "" && cashIncome !== "") {
        _this.income[itemIncome] = +cashIncome;
      }
    });
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }
  getAddExpenses() {
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(",");
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== "") {
        _this.addExpenses.push(item);
      }
    });
  }
  getAddIncome() {
    const _this = this;
    additionalIncomeItem.forEach((item) => {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        _this.addIncome.push(itemValue);
      }
    });
  }
  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
    return this.expensesMonth;
  }
  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth =
      this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }
  getTargetMonth() {
    return Math.ceil(+targetAmount.value / this.budgetMonth);
  }
  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }
  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }
  changePercent() {
    const valueSelect = this.value;

    if (valueSelect === "other") {
      depositPercent.value = "";
      depositPercent.style.display = "inline-block";

      depositPercent.addEventListener("change", () => {
        /* if (depositPercent.value > 100) {
          depositPercent.value = 0; */
        if (depositPercent.value > 100) {
          alert("Введите корректное значение в поле проценты");
          start.disabled = true;
          depositPercent.value = 0;
        } else if (salaryAmount.value !== "") {
          start.disabled = false;
          return depositPercent.value;
        }
      });
    } else {
      depositPercent.value = valueSelect;
      depositPercent.style.display = "none";
    }
  }
  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = "inline-block";
      depositAmount.style.display = "inline-block";
      this.deposit = true;
      depositBank.addEventListener("change", this.changePercent);
    } else {
      depositBank.style.display = "none";
      depositAmount.style.display = "none";
      depositPercent.style.display = "none";
      depositBank.value = "";
      depositAmount.value = "";
      this.deposit = false;
      depositBank.removeEventListener("change", this.changePercent);
    }
  }

  eventsListeners() {
    start.disabled = true;

    document
      .querySelector('[placeholder="название"]')
      .addEventListener("keyup", function () {
        this.value = this.value.replace(/[^а-яА-ЯЁё ,.?!]+$/g, "");
      });

    salaryAmount.addEventListener("input", () => {
      if (salaryAmount.value !== "") {
        start.disabled = false;
      } else {
        start.disabled = true;
      }
    });
    const inLetter = () => {
      document
        .querySelectorAll('[placeholder="Наименование"]')
        .forEach((item) => {
          item.addEventListener("keyup", function () {
            this.value = this.value.replace(/[^а-яА-ЯЁё ,.?!]+$/g, "");
          });
        });
    };
    const inNumber = () => {
      document.querySelectorAll('[placeholder="Сумма"]').forEach((item) => {
        item.addEventListener("keyup", function () {
          this.value = this.value.replace(/[^\d]/g, "");
        });
      });
    };
    inLetter();
    inNumber();
    depositPercent.addEventListener("keyup", function () {
      this.value = this.value.replace(/[^\d]/g, "");
    });

    start.addEventListener("click", this.start.bind(this));
    start.addEventListener("click", () => {
      leftInputText.forEach((item) => {
        item.disabled = true;
      });
      start.hidden = true;
      incomePlus.disabled = true;
      expensesPlus.disabled = true;
      btnCancel.style.display = "block";
    });
    expensesPlus.addEventListener("click", this.addExpensesBlock);
    incomePlus.addEventListener("click", this.addIncomeBlock);

    const titlePeriodAmount = document.querySelector(".period-amount");
    periodSelect.addEventListener("change", () => {
      titlePeriodAmount.innerHTML = periodSelect.value;
    });

    btnCancel.addEventListener("click", this.reset.bind(this));
    btnCancel.addEventListener("click", () => {
      btnCancel.style.display = "none";
      start.hidden = false;
      start.disabled = true;
      incomePlus.disabled = false;
      expensesPlus.disabled = false;
      leftInputText.forEach((item) => {
        item.disabled = false;
      });
    });
    depositCheck.addEventListener("change", this.depositHandler.bind(this));
  }
}

const appData = new AppData();
appData.eventsListeners();
