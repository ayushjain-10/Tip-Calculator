const peopleInput = document.querySelector("#people");
const displayTip = document.querySelector("#tip-display");
const displayTotal = document.querySelector("#total-display");
const billInput = document.querySelector("#bill");
const tipInput = document.querySelector("#tip");

peopleInput.addEventListener("input", handleBill);
displayTip.addEventListener("input", handleBillFromTip);
billInput.addEventListener("input", handleBill);
tipInput.addEventListener("input", handleBill);
const all_items_button = Array.from(document.querySelectorAll("button"));

for (let i = 0; i < all_items_button.length; i++) {
  all_items_button[i].addEventListener("click", handleBill);
  all_items_button[i].onclick = function (e) {
    const attr = document.getElementById(e.target.getAttribute("for"));
    if (
      e.target &&
      e.target.classList.contains("minus") &&
      attr.value > attr.min
    ) {
      attr.value--;
      handleBill();
    } else if (e.target && e.target.classList.contains("plus")) {
      document.getElementById(e.target.getAttribute("for")).value++;
      handleBill();
    }
  };
}

function handleBill() {
  let percent = parseFloat(tipInput.value);
  let people = parseInt(peopleInput.value);
  const bill = parseFloat(billInput.value);

  if (people < 1 || isNaN(people)) {
    document.getElementById("people").value = 1;
    people = 1;
  }
  if (percent < 0 || isNaN(percent)) {
    document.getElementById("tip").value = 0;
    percent = 0;
  }

  const tip = (bill * percent) / 100;
  const total = bill + tip;

  if (people == 1) {
    document.getElementById("tip-label").innerHTML = "Tip";
    document.getElementById("total-label").innerHTML = "Total";
    displayTip.value = tip.toFixed(2);
    displayTotal.innerHTML = total.toFixed(2);
  } else {
    document.getElementById("tip-label").innerHTML = "Tip per Person";
    document.getElementById("total-label").innerHTML = "Total per Person";
    displayTip.value = (tip / people).toFixed(2);
    displayTotal.innerHTML = (total / people).toFixed(2);
  }
}

function handleBillFromTip() {
  const bill = parseFloat(billInput.value);
  const people = parseInt(peopleInput.value);
  let tipDisplay = parseFloat(displayTip.value);

  if (tipDisplay < 0 || isNaN(tipDisplay)) {
    document.getElementById("tip-display").value = 0;
    tipDisplay = 0;
  }

  const totalBill = bill * people;
  const percent = (tipDisplay * people * 100) / totalBill;
  const newBill = tipDisplay + totalBill;

  if (people == 1) {
    document.getElementById("tip-label").innerHTML = "Tip";
    document.getElementById("total-label").innerHTML = "Total";
    tipInput.value = parseInt(percent);
    displayTotal.innerHTML = newBill.toFixed(2);
  } else {
    document.getElementById("tip-label").innerHTML = "Tip per Person";
    document.getElementById("total-label").innerHTML = "Total per Person";
    tipInput.value = parseInt(percent * people);
    displayTotal.innerHTML = (newBill / people).toFixed(2);
  }
}
