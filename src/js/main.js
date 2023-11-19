import "./../scss/style.scss";
import { toDo } from "./models/toDo";

const toDoContainer = document.querySelector("main");
const title = document.createElement("h3");
const ul = document.createElement("ul");
const sortBtn = document.createElement("button");

title.innerHTML = "To do måndag";
sortBtn.innerHTML = "A-Ö";

toDoContainer.className = "container";
title.className = "container__title";
ul.className = "container__ul";
sortBtn.className = "sortBtn";

let toDo1 = new toDo("Gå ut med hunden", false);
let toDo2 = new toDo("Äta frukost", false);
let toDo3 = new toDo("Göra yoga", false);
let toDo4 = new toDo("Plugga", false);
let toDo5 = new toDo("Handla middag", false);

const toDoList = [toDo1,toDo2,toDo3,toDo4,toDo5];

let stringToDoList = JSON.stringify(toDoList);
localStorage.setItem("toDoList", stringToDoList);

const myListFunction = () => {

    ul.innerHTML = "";

for(let i = 0; i < toDoList.length; i++){

    let taskContainer = document.createElement("li");
    let text = document.createElement("p");
    taskContainer.className = "container__ul--toDos";

    const removeBtn = document.createElement("button");
    removeBtn.className = "removeBtn";

    removeBtn.addEventListener("click", () => {
        toDoList[i].done = true;

        text.className = "doneText";


       console.log(toDoList[i]);
       console.log(toDoList);
    });

    text.innerHTML = toDoList[i].task;

    const sortFunction = () => {
        toDoList.sort(function(a, b){
          let x = a.task.toLowerCase();
          let y = b.task.toLowerCase();
          if (x < y) {return -1;}
          if (x > y) {return 1;}
          return 0;
        });
        text.innerHTML = toDoList[i].task;
    }

    sortBtn.addEventListener("click", () => {
        sortFunction ();
        });

    ul.appendChild(taskContainer);
    taskContainer.appendChild(removeBtn);
    taskContainer.appendChild(text);
}; 
};  

toDoContainer.appendChild(title);
toDoContainer.appendChild(sortBtn);
toDoContainer.appendChild(ul);

window.onload = myListFunction();

const form = document.createElement("form");
let input = document.createElement("input");
const submitBtn = document.createElement("button");

submitBtn.className = "submitBtn";

input.type = "text";
input.placeholder = "Ny uppgift";
submitBtn.innerHTML = "Ny uppgift";

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let textInInput = input.value;
    let newToDo = new toDo(textInInput, false);
    toDoList.push(newToDo);

    myListFunction();
    console.log(toDoList);
});

toDoContainer.appendChild(form);
form.appendChild(input);
form.appendChild(submitBtn);