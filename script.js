"use strict";

const erroMesgEl = document.querySelector(".error");
const budgetInputEl = document.querySelector(".budget_input");
const expensesDesEl = document.querySelector(".expenses_input");
const expenseAmountEl = document.querySelector(".expenses_amount");
const tblRecordEl = document.querySelector(".tbl_data");
const cardsContainer = document.querySelector(".cards");

// cards content

const budgetCardEl = document.querySelector(".budget_card");
const expensesCardEl = document.querySelector(".expenses_card");
const balanceCardEl = document.querySelector(".balance_card");

let itemList = [];
let itemId = 1;

// Button Events

function btnEvents() {
  const btnBudgetCal = document.querySelector("#btn_budget");
  const btnExpensesCal = document.querySelector("#btn_expenses");

  btnBudgetCal.addEventListener("click", (e) => {
    e.preventDefault();
    budgetFun();
  });

  btnExpensesCal.addEventListener("click", (e) => {
    e.preventDefault();
    expensesFun();
  });
}

document.addEventListener("DOMContentLoaded", btnEvents);

function expensesFun() {
  let expensesDescValue = expensesDesEl.value;
  let expenseAmountValue = expenseAmountEl.value;

  if (
    expensesDescValue == "" ||
    expenseAmountValue == "" ||
    budgetInputEl < 0
  ) {
    errorMessage("Please Enter Expenses Name or Expense Amount!");
  } else {
    let amount = parseInt(expenseAmountValue);
    expenseAmountEl.value = "";
    expensesDesEl.value = "";

    let expenses = {
      id: itemId,
      title: expensesDescValue,
      amount: amount,
    };
    itemId++;
    itemList.push(expenses);

    addExpenses(expenses);
    showBalance();
  }
}

function addExpenses(expensesPara) {
  const html = `<ul class="tbl_tr_content">
                    <li data-id=${expensesPara.id}>${
    expensesPara.id
  }</li>
                    <li data-id=${expensesPara.title}>${expensesPara.title}</li>
                    <li data-id=${expensesPara.amount}><span>₹</span>${
    expensesPara.amount
  }</li>
                    <li>
                        <button type="button" class="btn_edit">Edit</button>
                        <button type="button" class="btn_delete">Delete</button>
                    </li>
                </ul>`;

  tblRecordEl.insertAdjacentHTML("beforeend", html);

  const btnEdit = document.querySelectorAll(".btn_edit");
  const btnDel = document.querySelectorAll(".btn_delete");
  const content_id = document.querySelectorAll(".tbl_tr_content");

  btnEdit.forEach((btnedit) => {
    btnedit.addEventListener("click", (el) => {
      let id;
      content_id.forEach((ids) => {
        id = ids.firstElementChild.dataset.id;
      });

      let element = el.target.parentElement.parentElement;
      element.remove();

      let expenses= itemList.filter(function (item){
        return item.id == id;
      });
      expensesDesEl.value = expenses[0].title;
      expenseAmountEl.value = expenses[0].amount;

      let temp_list = itemList.filter(function(item){
        return item.id != id;
      });

      itemList = temp_list

    });
 });

 btnDel.forEach((btndel) => {
    btndel.addEventListener("click", (el) => {
      let id;
      content_id.forEach((ids) => {
        id = ids.firstElementChild.dataset.id;
      });

      let element = el.target.parentElement.parentElement;
      element.remove();

      let temp_list = itemList.filter(function(item){
        return item.id != id;
      });     
      itemList = temp_list;
      showBalance();
  });
 });
}

function budgetFun() {
  const budgetValue = budgetInputEl.value;
  if (budgetValue == "" || budgetValue < 0) {
    errorMessage("Please Enter Budget or Budget Must be greater than 0");
  } else {
    budgetCardEl.textContent = budgetValue;
    budgetInputEl.value = "";
    showBalance();
  }
}

function showBalance() {
  const expenses = totalExpenses();
  const total = parseInt(budgetCardEl.textContent) - expenses;
  balanceCardEl.textContent = total;
}

function totalExpenses() {
  let total = 0;

  if (itemList.length > 0) {
    total = itemList.reduce(function (acc, curr) {
      return (acc += curr.amount);
      return acc;
    }, 0);
  }

  expensesCardEl.textContent = total;
  return total;
}

function errorMessage(message) {
  erroMesgEl.innerHTML = `<p>${message}</p>`;
  erroMesgEl.classList.add("err");
  setTimeout(() => {
    erroMesgEl.classList.remove("err");
  }, 2500);
}
