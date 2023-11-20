import "./../scss/style.scss";
import { toDo } from "./models/toDo";

// My array
let toDo1 = new toDo("Gå ut med hunden", false);
let toDo2 = new toDo("Äta frukost", false);
let toDo3 = new toDo("Göra yoga", false);
let toDo4 = new toDo("Plugga", false);
let toDo5 = new toDo("Handla middag", false);

let toDoList = [toDo1,toDo2,toDo3,toDo4,toDo5];

// DOM
const toDoContainer = document.querySelector("main");
const title = document.createElement("h3");
const ul = document.createElement("ul");

const sortBtn = document.createElement("button");

const form = document.createElement("form");
let input = document.createElement("input");
const submitBtn = document.createElement("button");

title.innerHTML = "To do måndag";
sortBtn.innerHTML = "A-Ö";

toDoContainer.className = "container";
title.className = "container__title";
ul.className = "container__ul";
sortBtn.className = "sortBtn";
submitBtn.className = "submitBtn";

input.type = "text";
input.placeholder = "Ny uppgift";
submitBtn.innerHTML = "Lägg till";

// Functions
let myMainFunction = () => {

    if (localStorage.getItem("toDoList") === null) {
        localStorage.setItem("toDoList", JSON.stringify("toDoList"));
      } else {
        toDoList = JSON.parse(localStorage.getItem("toDoList"));
      }

    ul.innerHTML = "";
    
    for(let i = 0; i < toDoList.length; i++){  
        let taskContainer = document.createElement("li");
        let text = document.createElement("p");
        taskContainer.className = "container__ul__toDos";
    
        const removeBtn = document.createElement("button");
        removeBtn.className = "removeBtn";
    
        text.innerHTML = toDoList[i].task;
        
        const sortFunction = () => {
            toDoList.sort(function(a, b){
                let x = a.task.toLowerCase();
                let y = b.task.toLowerCase();
                if (x < y) {return -1;}
                if (x > y) {return 1;}
                return 0;
            });
            localStorage.setItem("toDoList", JSON.stringify(toDoList));
            myMainFunction();
        }
    
        const doneFunction = () => {
            toDoList[i].done = true;

            localStorage.setItem("toDoList", JSON.stringify(toDoList));
    
            console.log(toDoList[i]);
            console.log(toDoList);
        };

        sortBtn.addEventListener("click", () => {
            sortFunction ();
        });

        removeBtn.addEventListener("click", () => {
                doneFunction();
        });
    
        ul.appendChild(taskContainer);
        taskContainer.appendChild(removeBtn);
        taskContainer.appendChild(text);
    }; 

};  

submitBtn.addEventListener("click", (e) => {
    
    let textInInput = input.value;
    let newToDo = new toDo(textInInput, false);
    toDoList.push(newToDo);

    e.preventDefault();
    localStorage.setItem("toDoList", JSON.stringify(toDoList));

    console.log(toDoList);

    myMainFunction();
});

window.onload = myMainFunction();

//DOM
toDoContainer.appendChild(title);
toDoContainer.appendChild(sortBtn);
toDoContainer.appendChild(ul);

toDoContainer.appendChild(form);
form.appendChild(input);
form.appendChild(submitBtn);
