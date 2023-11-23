import "./../scss/style.scss";
import { toDo } from "./models/toDo";

// My array
let toDo1 = new toDo("Gå ut med hunden", false);
let toDo2 = new toDo("Äta frukost", false);
let toDo3 = new toDo("Göra yoga", false);
let toDo4 = new toDo("Plugga", false);
let toDo5 = new toDo("Handla middag", false);

let toDoList = [toDo1,toDo2,toDo3,toDo4,toDo5];

if (localStorage.getItem("toDoList")) {
    toDoList = JSON.parse(localStorage.getItem("toDoList"));
  }

// DOM
const container = document.querySelector("main");
const header = document.createElement("header");
const title = document.createElement("h3");
const date = document.createElement("p");
const sortBtn = document.createElement("button");
const toDos = document.createElement("ul");

const form = document.createElement("form");
let input = document.createElement("input");
const submitBtn = document.createElement("button");

title.innerHTML = "To do måndag";
date.innerHTML = "21 november 2023"
sortBtn.innerHTML = "A-Ö";

container.className = "container";
header.className = "header";
title.className = "header__title";
date.className = "header__date";
sortBtn.className = "header__sortBtn";
toDos.className = "toDos";
form.className = "form";
input.className = "form__input"
submitBtn.className = "form__submitBtn";

input.type = "text";
input.placeholder = "Ny uppgift";
submitBtn.innerHTML = "Lägg till";

// Functions
let myMainFunction = () => {

    toDos.innerHTML = "";

    localStorage.setItem("toDoList", JSON.stringify(toDoList));
    
    for(let i = 0; i < toDoList.length; i++){  

        let li = document.createElement("li");
        let text = document.createElement("p");
        const completeBtn = document.createElement("button");

        li.className = "toDos__li";
        
        text.innerHTML = toDoList[i].task;

        if (toDoList[i].done == true) {
            text.className = "toDos__li__p--done";
            completeBtn.className = "toDos__li__completeBtn--done";
            completeBtn.addEventListener("click", () => {
                toDoList[i].done = false;

                myMainFunction();
            });
        } else {
            text.className = "toDos__li__p"
            completeBtn.className = "toDos__li__completeBtn";
            completeBtn.addEventListener("click", () => {
                toDoList[i].done = true;

                myMainFunction();
            });
        };
       
        sortBtn.addEventListener("click", () => {
            toDoList.sort(function(a, b){
                let x = a.task.toLowerCase();
                let y = b.task.toLowerCase();
                if (x < y) {return -1;}
                if (x > y) {return 1;}
                return 0;
            });

            myMainFunction();
        });
    
        toDos.appendChild(li);
        li.appendChild(completeBtn);
        li.appendChild(text);
    };   
}; 

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let textInInput = input.value;
    let newToDo = new toDo(textInInput, false);
    toDoList.push(newToDo);

    input.value = "";

    myMainFunction();
});

window.onload = myMainFunction();

//DOM
container.appendChild(header);
header.appendChild(title);
header.appendChild(date);
header.appendChild(sortBtn);

container.appendChild(toDos);
container.appendChild(form);
form.appendChild(input);
form.appendChild(submitBtn);
