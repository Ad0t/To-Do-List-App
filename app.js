import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://todolist-68a1f-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const taskInDB = ref(database, "tasks")


const inputField = document.getElementById("input-field");
const addButton = document.getElementById("add-button");
const taskList = document.getElementById("task-list")

addButton.addEventListener("click", function () {
    const inputText = inputField.value.trim();
    
    push(taskInDB, inputText)

    clearInput()
    
    // apendTaskToTaskList(inputText)
    // console.log(`${inputText} added to database.`)
})

onValue(taskInDB, function(snapshot) {
    if (snapshot.exists()) {
        let taskArray = Object.entries(snapshot.val()) 
    
        // clearInput()
        clearTasklist()
        for (let i = 0; i < taskArray.length; i++ ) {
            let currentTaskEntry = taskArray[i];
            let currentTaskID = currentTaskEntry[0]
            let currentTask = currentTaskEntry[1]
            appendTaskToTaskList(currentTaskEntry)
        }
    } else {
        taskList.innerHTML = "No task pending..."
    }

})
function clearInput() {
    inputField.value = "";
}
function clearTasklist() {
    taskList.innerHTML = "";

}
function appendTaskToTaskList(item) {
    // taskList.innerHTML += `<li>${itemValue}</li>`
    let taskId = item[0]
    let task = item[1]
    let newTask = document.createElement("li")
    newTask.textContent = task

    newTask.addEventListener("dblclick", function() {
        let exactLocation = ref(database, `tasks/${taskId}`)

        remove(exactLocation)
    })
    taskList.append(newTask)
}