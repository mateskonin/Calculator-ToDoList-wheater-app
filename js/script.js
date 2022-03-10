// CALCULATOR

let buttons = document.querySelectorAll(".button")
let display = document.querySelector(".display")
let sum

buttons.forEach(button => {
    button.addEventListener("click", (e) => {

            if (button.classList.contains("result")) {
                try {
                    display.innerText = ""
                    // Nie używać eval w bardziej skomplikowanych aplikacjach
                    display.innerText = Math.round(eval(sum) * 1000) / 1000
                } catch {
                    display.innerText = "Error"
                }
            } else if (button.classList.contains("cancel")) {
                display.innerText = ""
            } else if (button.classList.contains("back")) {
                display.innerText = display.innerText.slice(0, -1)
            } else {
                display.innerText += e.target.innerText
                sum = display.innerText
            }
        }

    )
})

// WHEATER APP

const input = document.querySelector('input')
const button = document.querySelector('.button-wheater')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')

const URL = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=54fb5ef89e54cd496b72f4706b28a3e8"
fetch(URL).then(data => data.json()).then(data => console.log(data))
console.log(URL);

const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q="
const API_KEY = "&appid=54fb5ef89e54cd496b72f4706b28a3e8"
const API_UNITS = "&units=metric"

const getWeather = () => {


    const city = input.value || "London"
    const URL = API_LINK + city + API_KEY + API_UNITS
    axios.get(URL).then(res => {
        const temp = res.data.main.temp
        const hum = res.data.main.humidity
        const status = res.data.weather[0]
        const id = status.id

        warning.textContent = ""
        input.value = ""

        if (id < 300 && id >= 200) {
            photo.setAttribute("src", "./img/thunderstorm.png")
        } else if (id < 400 && id >= 300) {
            photo.setAttribute("src", "./img/drizzle.png")

            // https://openweathermap.org/weather-conditions   Tu znajdują się kody i ikony-nie trzeba korzystać z własnych obrazów
            // photo.setAttribute("src", "http://openweathermap.org/img/wn/13d@2x.png")
        } else if (id < 500 && id >= 400) {
            photo.setAttribute("src", "./img/rain.png")
        } else if (id < 600 && id >= 500) {
            photo.setAttribute("src", "./img/ice.png")
        } else if (id < 700 && id >= 600) {
            photo.setAttribute("src", "./img/fog.png")
        } else if (id === 800) {
            photo.setAttribute("src", "./img/sun.png")
        } else if (id < 900 && id > 800) {
            photo.setAttribute("src", "./img/cloud.png")
        } else {
            photo.setAttribute("src", "./img/unknown.png")
        }

        weather.textContent = status.main
        cityName.textContent = res.data.name
        temperature.textContent = Math.floor(temp) + "°C"
        humidity.textContent = hum + "%"
        console.log(status.id);
    }).catch(() => warning.textContent = "Wpisz poprawną nazwę miasta")
}

const checkEnter = (e) => {
    if (e.key === "Enter") {
        getWeather()
    }
}

// getWeather()
button.addEventListener("click", getWeather)
input.addEventListener("keypress", checkEnter)


// Todo lista
let todoInput, errorInfo, addBtn, ulList, newTodo, newTools, newBtnComplete, newBtnEdit, newBtnDelete, newApprovedSign, newDeleteSign

let popup
let popupInfo
let todoEdit
let popupInput
let popupAddBtn
let popupCloseBtn

const main = () => {
    prepareDOMElements()
    prepareDOMEvents()
}

const prepareDOMElements = () => {
    todoInput = document.querySelector('.todo-input')
    errorInfo = document.querySelector('.error-info')
    addBtn = document.querySelector('.btn-add')
    ulList = document.querySelector('.todolist ul')

    popup = document.querySelector('.popup')
    popupInfo = document.querySelector('.popup-info')
    popupInput = document.querySelector('.popup-input')
    popupAddBtn = document.querySelector('.accept')
    popupCloseBtn = document.querySelector('.canc')
}


const prepareDOMEvents = () => {
    addBtn.addEventListener('click', addNewTask)
    document.addEventListener('click', checkClick)
    popupCloseBtn.addEventListener('click', closePopup)
    popupAddBtn.addEventListener('click', changeTodoText)
    todoInput.addEventListener('keyup', enterKeyCheck)
}


const addNewTask = () => {
    if (todoInput.value !== "") {
        newTodo = document.createElement('li')
        newTodo.textContent = todoInput.value
        ulList.append(newTodo)


        createToolsArea()
        todoInput.value = ""
        errorInfo.textContent = ""

    } else {
        errorInfo.textContent = "Wpisz treść zadania"
    }
}

const createToolsArea = () => {
    // 1 SPOSÓB

    newTools = document.createElement("div")
    newTools.classList.add("tools")
    newTodo.append(newTools)

    newBtnComplete = document.createElement("button")
    newBtnComplete.classList.add("complete")
    newTools.append(newBtnComplete)
    // A) SPOSÓB
    newBtnComplete.innerHTML = `<i class="fas fa-check"></i>`

    // B) SPOSÓB
    // newApprovedSign = document.createElement("i")
    // newApprovedSign.classList.add("fas", "fa-check")
    // newBtnComplete.append(newApprovedSign)

    newBtnEdit = document.createElement("button")
    newBtnEdit.classList.add("edit")
    newBtnEdit.textContent = "EDIT"
    newTools.append(newBtnEdit)

    newBtnDelete = document.createElement("button")
    newBtnDelete.classList.add("delete")
    newTools.append(newBtnDelete)
    // A) SPOSÓB
    newBtnDelete.innerHTML = `<i class="fas fa-times"></i>`

    // B) SPOSÓB

    // newDeleteSign = document.createElement("i")
    // newDeleteSign.classList.add("fas", "fa-times")
    // newBtnDelete.append(newDeleteSign)



    // 2 SPOSÓB-NIE STOSOWAĆ

    //     newTodo.innerHTML = `${todoInput.value}<div class="tools">
    //     <button class="complete"><i class="fas fa-check"></i></button>
    //     <button class="edit">EDIT</button>
    //     <button class="delete"><i class="fas fa-times"></i></button>
    // </div>`

}

const checkClick = (e) => {
    if (e.target.matches(".complete")) {
        e.target.closest('li').classList.toggle("completed")
        e.target.classList.toggle("completed")

    } else if (e.target.matches(".edit")) {
        editTodo(e)
    } else if (e.target.matches(".delete")) {
        deleteTodo(e)
    }
}

const editTodo = (e) => {
    todoEdit = e.target.closest('li');
    popupInput.value = todoEdit.firstChild.textContent
    popup.style.display = 'flex'
    popupInfo.textContent = ""
}

const changeTodoText = () => {
    if (popupInput.value !== "") {
        todoEdit.firstChild.textContent = popupInput.value
        popup.style.display = 'none'
    } else(
        popupInfo.textContent = "Musisz podać jakąś treść"
    )
}

const closePopup = () => {
    popup.style.display = 'none'
    popupInfo.textContent = ""
}

const deleteTodo = (e) => {
    e.target.closest('li').remove();
    const allTodos = ulList.querySelectorAll('li');
    // if (allTodos.length === 0) {
    //     errorInfo.textContent = 'Brak zadań na liście'
    // }

}

const enterKeyCheck = (e) => {
    if (e.key === "Enter") {
        addNewTask()
    }
}


document.addEventListener("DOMContentLoaded", main)