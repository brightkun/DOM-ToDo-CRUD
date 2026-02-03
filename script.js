const body = document.querySelector("body");
const darkMode = document.querySelector(".mode");
const form = document.querySelector(".form");
const h1 = document.querySelector("h1");
const name = document.querySelector("#inputName");
const age = document.querySelector("#inputAge");
const btnAdd = document.querySelector(".btnAdd");
const list = document.querySelector(".list");

let isMode = true;

darkMode.addEventListener("click", () => {
  isMode ? (isMode = false) : (isMode = true);

  if (isMode) {
    body.style.background = "orange";
    form.style.background = "white";
    h1.style.color = "black";
    darkMode.style.background = "white";
    darkMode.style.color = "black";
  } else {
    body.style.background = "black";
    form.style.background = "white";
    h1.style.color = "black";
    darkMode.style.color = "white";
    darkMode.style.background = "orange";
  }
});

function reg(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

btnAdd.addEventListener("click", addPerson);

function addPerson() {
  let person = {
    id: Date.now(),
    name: name.value,
    age: age.value,
  };

  if (!person.name) return;

  let data = JSON.parse(localStorage.getItem("persons")) || [];
  data.push(person);
  localStorage.setItem("persons", JSON.stringify(data));

  name.value = "";
  age.value = "";

  renderList();
}

function renderList() {
  list.innerHTML = "";

  let data = JSON.parse(localStorage.getItem("persons")) || [];

  data.forEach((el) => {
    const card = document.createElement("div");
    const h2 = document.createElement("h2");
    const cardInputs = document.createElement("div");
    const inputEditName = document.createElement("input");
    const inputEditAge = document.createElement("input");
    const cardBtns = document.createElement("div");
    const edit = document.createElement("button");
    const del = document.createElement("button");

    card.classList.add("card");
    cardInputs.classList.add("card-inputs");
    cardBtns.classList.add("card-btns");
    del.classList.add("del");
    edit.classList.add("edit");

    del.textContent = "delete";
    edit.textContent = "edit";
    h2.textContent = `${reg(el.name)} — ${el.age}`;

    inputEditName.placeholder = "Name";
    inputEditAge.placeholder = "Age";
    inputEditAge.type = "number";

    edit.addEventListener("click", () => {
      if (card.classList.contains("editing")) {
        editPerson(el.id, inputEditName.value, inputEditAge.value);
      } else {
        card.classList.add("editing");
        inputEditName.value = el.name;
        inputEditAge.value = el.age || "";
        edit.textContent = "save";
      }
    });

    del.addEventListener("click", () => {
      delPerson(el.id);
    });

    cardInputs.append(inputEditName);
    cardInputs.append(inputEditAge);
    cardBtns.append(edit);
    cardBtns.append(del);
    card.append(h2);
    card.append(cardInputs);
    card.append(cardBtns);
    list.append(card);
  });
}

function editPerson(id, newName, newAge) {
  if (!newName) return;

  let data = JSON.parse(localStorage.getItem("persons")) || [];
  data = data.map((el) => {
    if (el.id === id) {
      el.name = newName;
      el.age = newAge;
    }
    return el;
  });
  localStorage.setItem("persons", JSON.stringify(data));

  renderList();
}

function delPerson(id) {
  let data = JSON.parse(localStorage.getItem("persons")) || [];
  data = data.filter((el) => el.id !== id);
  localStorage.setItem("persons", JSON.stringify(data));

  renderList();
}

renderList();
