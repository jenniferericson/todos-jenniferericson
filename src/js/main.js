import "./../scss/style.scss";

const toDoContainer = document.querySelector("main");
const title = document.createElement("h3");
const ul = document.createElement("ul");

title.innerHTML = "To dos måndag";

const toDoList = ["Gå ut med hunden", "Äta frukost", "Göra yoga", "Plugga","Handla"];

for(let i = 0; i < toDoList.length; i++) {
    let toDos = document.createElement("li");

    toDos.innerHTML = toDoList[i];

    ul.appendChild(toDos);
}

toDoContainer.appendChild(title);
toDoContainer.appendChild(ul);