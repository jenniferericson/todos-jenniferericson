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
const date = document.createElement("p");
const ul = document.createElement("ul");

const sortBtn = document.createElement("button");

const form = document.createElement("form");
let input = document.createElement("input");
const submitBtn = document.createElement("button");

title.innerHTML = "To do måndag";
date.innerHTML = "21 november 2023"
sortBtn.innerHTML = "A-Ö";

toDoContainer.className = "container";
title.className = "container__title";
date.className = "container__date";
ul.className = "container__ul";
sortBtn.className = "sortBtn";
submitBtn.className = "submitBtn";

input.type = "text";
input.placeholder = "Ny uppgift";
submitBtn.innerHTML = "Lägg till";

// Functions
let myMainFunction = () => {

    if (localStorage.getItem("toDoList") === null) {
        const stringToDoList = JSON.stringify(toDoList);
        localStorage.setItem("toDoList", stringToDoList);
      } else {
        toDoList = JSON.parse(localStorage.getItem("toDoList"));
      }

    ul.innerHTML = "";
    
    for(let i = 0; i < toDoList.length; i++){  

        let taskContainer = document.createElement("li");
        let text = document.createElement("p");
        const completeBtn = document.createElement("button");

        taskContainer.className = "container__ul__toDos";
        
        text.innerHTML = toDoList[i].task;

        const doneOrNotFunction = () => {
        if (toDoList[i].done == true) {
            text.classList = "doneText";
            completeBtn.classList = "doneBtn";
        } else {
            text.classList.remove("doneText");
            completeBtn.classList.remove("doneBtn");
            completeBtn.className = "completeBtn";
        }
        };

        doneOrNotFunction();

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
            };
        
        const doneFunction = () => {
            toDoList[i].done = true;
            
            localStorage.setItem("toDoList", JSON.stringify(toDoList));
            
            completeBtn.removeEventListener("click", () => {
                doneFunction();
            });
            
            completeBtn.addEventListener ("click",() => {
                toDoList[i].done = false;
                
                localStorage.setItem("toDoList", JSON.stringify(toDoList));

                doneOrNotFunction();
            });
        };

        sortBtn.addEventListener("click", () => {
            sortFunction ();
        });
    
        completeBtn.addEventListener("click", () => {
                doneFunction();
                doneOrNotFunction();
        });

        ul.appendChild(taskContainer);
        taskContainer.appendChild(completeBtn);
        taskContainer.appendChild(text);
    };   
}; 
  

submitBtn.addEventListener("click", (e) => {
    
    e.preventDefault();
    let textInInput = input.value;
    let newToDo = new toDo(textInInput, false);
    toDoList.push(newToDo);

    localStorage.setItem("toDoList", JSON.stringify(toDoList));

    input.value = "";

    myMainFunction();
});

window.onload = myMainFunction();

//DOM
toDoContainer.appendChild(title);
toDoContainer.appendChild(date);
toDoContainer.appendChild(sortBtn);
toDoContainer.appendChild(ul);

toDoContainer.appendChild(form);
form.appendChild(input);
form.appendChild(submitBtn);
