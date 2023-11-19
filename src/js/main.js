import "./../scss/style.scss";

const toDoContainer = document.querySelector("main");
const title = document.createElement("h3");
const ul = document.createElement("ul");

title.innerHTML = "To dos måndag";

toDoContainer.className = "container";
title.className = "container__title";
ul.className = "container__ul";

const toDoList = ["Gå ut med hunden", "Äta frukost", "Göra yoga", "Plugga","Handla"];

const stringToDoList = JSON.stringify(toDoList);
localStorage.setItem("toDoList", stringToDoList);

for(let i = 0; i < toDoList.length; i++) {
    let toDos = document.createElement("li");
    toDos.className = "container__ul--toDos";

    const doneBtn = document.createElement("button");
    doneBtn.className = "doneBtn";

    toDos.innerHTML = toDoList[i];

    ul.appendChild(toDos);
    toDos.appendChild(doneBtn);
}

toDoContainer.appendChild(title);
toDoContainer.appendChild(ul);