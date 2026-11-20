
function updateClock(){
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? "PM" : "AM";
    let hour12 = hours % 12 || 12;
    let showHours = String(hour12).padStart(2, "0");
    let showMinutes = String(minutes).padStart(2, "0");
    let showSeconds = String(seconds).padStart(2, "0");
    let time = `${showHours}:${showMinutes}:${showSeconds} ${ampm}`;
   
    document.getElementById("time").textContent = time; 
    let today = now.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
});
    document.getElementById("date").textContent = today;
    
}
updateClock();
setInterval(updateClock, 1000);

let navLinks = document.querySelectorAll("nav a");
let sections = document.querySelectorAll(".center section");

navLinks.forEach(function(link) {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        navLinks.forEach(function(item) {
            item.classList.remove("active");
        });

link.classList.add("active");
        sections.forEach(function(section) {
            section.style.display = "none";
        });

        let selectedSection = document.querySelector(link.getAttribute("href"));
        selectedSection.style.display = "block";
        changeQuote();
        let gif = document.getElementById("section-gif");
        gif.className = "clock-gif";
        if (selectedSection.id === "clock") {
            gif.src = "cat walking.gif";
            gif.className = "clock-gif";
        }
        else if (selectedSection.id === "stopwatch") {
            gif.src = "spider.gif";
            gif.className = "stopwatch-gif";
        }
        else if (selectedSection.id === "countdown") {
            gif.src = "studying.gif";
            gif.className = "countdown-gif";
        }
        else if (selectedSection.id === "alarm") {
            gif.src = "sleeping.gif";
            gif.className = "alarm-gif";
        }
    });
});

    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    let timer = null;
function startwatch(){
    
       if (timer === null) {
        timer = setInterval(updatewatch, 1000);
    }

}
let startbtn = document.getElementById("start").addEventListener("click", startwatch);
function updatewatch(){
    seconds++;
    if (seconds === 60) {
    seconds = 0;
    minutes++;}
    if(minutes=== 60){
        minutes =0;
        hours++;
}
    let showHours = String(hours).padStart(2, "0");
    let showMinutes = String(minutes).padStart(2, "0");
    let showSeconds = String(seconds).padStart(2, "0");
    let stopwatchtime = `${showHours}:${showMinutes}:${showSeconds}`;
    
    document.getElementById('stopwatch-time').textContent = stopwatchtime;
}
function pausewatch(){
    clearInterval(timer);
    timer = null;
}
document.getElementById("pause").addEventListener("click", pausewatch);
function resetwatch(){
    clearInterval(timer);
    seconds = 0-1;
    minutes = 0;
    hours = 0;
    timer= null;
    updatewatch();
}
document.getElementById("reset").addEventListener("click", resetwatch);



let habitList = document.getElementById("habit-list");

function addHabit() {
    let habitName = document.getElementById("habit-input").value.trim();
    if (habitName === "") {
        alert("Please enter a habit!");
        return;
    }
    let habit = document.createElement("div");
    habit.className = "habit";
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    let label = document.createElement("label");
    label.textContent = habitName;
    habit.appendChild(checkbox);
    habit.appendChild(label);
    checkbox.addEventListener("change", updateProgress);
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "×";
    deleteBtn.className = "delete-habit";

    deleteBtn.addEventListener("click", function() {
        habit.remove();
        updateProgress();
    });

    habit.appendChild(deleteBtn);

    habitList.appendChild(habit);
    updateProgress();
    document.getElementById("habit-input").value = "";
}
document.getElementById("add-habit").addEventListener("click", addHabit);
function updateProgress() {
    let total = document.querySelectorAll("#habit-list input").length;
    let completed = document.querySelectorAll("#habit-list input:checked").length;
    document.getElementById("progress").textContent =
        `${completed}/${total} habits completed ♡`;
}


let countSeconds = 0;
let countTimer = null;
function startcountdown(){
    if (countTimer === null) {
        if (countSeconds === 0) {
            let inputhours = Number(document.getElementById("hours").value);
            let inputminutes = Number(document.getElementById("minutes").value);
            let inputseconds = Number(document.getElementById("seconds").value);
            countSeconds = (inputhours * 3600) + (inputminutes * 60) + inputseconds;
        }
        if (countSeconds > 0) {
            countTimer = setInterval(updatecountdown, 1000);
        }
    }
}
document.getElementById("countdown-start").addEventListener("click", startcountdown);

function updatecountdown(){
    if (countSeconds <= 0) {
    clearInterval(countTimer);
    countTimer = null;
    document.getElementById("countdown-time").textContent = "Time's Up!!";
    return;
}
    countSeconds--;
    let showHours = Math.floor(countSeconds / 3600);
    let showMinutes = Math.floor((countSeconds % 3600) / 60);
    let showSeconds = countSeconds % 60;
    let hour = String(showHours).padStart(2, "0");
    let minute = String(showMinutes).padStart(2, "0");
    let second = String(showSeconds).padStart(2, "0");
    let displayTime = `${hour}:${minute}:${second}`;
document.getElementById("countdown-time").textContent = displayTime;
}
function pauseCountdown(){
    clearInterval(countTimer);
    countTimer = null;
    
}
document.getElementById("countdown-pause").addEventListener("click", pauseCountdown);
function resetcountdown(){
    clearInterval(countTimer);
    countSeconds = 0;
    countTimer= null;
    document.getElementById("countdown-time").textContent = "00:00:00";
}
document.getElementById("countdown-reset").addEventListener("click", resetcountdown);
let alarmTimer = null;

function setAlarm() {
    let alarmTime = document.getElementById("alarm-time").value;

    if (alarmTime === "") {
        alert("Please select alarm time!");
        return;
    }
  
    document.getElementById("alarm-message").textContent = "Alarm is set! ";
   

    if (alarmTimer !== null) {
        clearInterval(alarmTimer);
    }
    alarmTimer = setInterval(checkAlarm, 1000);
}
document.getElementById("set-alarm").addEventListener("click", setAlarm);

function checkAlarm() {
    let now = new Date();
    let currentTime = String(now.getHours()).padStart(2, "0") + ":" + String(now.getMinutes()).padStart(2, "0");
    let alarmTime = document.getElementById("alarm-time").value;
    if (currentTime === alarmTime) {
        clearInterval(alarmTimer);
        alarmTimer = null;
        document.getElementById("alarm-message").textContent = "Wake Up!";
        document.getElementById("alarm-sound").play();
    }
}
function stopAlarm() {
    let sound = document.getElementById("alarm-sound");
    sound.pause();
    sound.currentTime = 0;
    document.getElementById("alarm-message").textContent = "Alarm stopped!";
}
document.getElementById("stop-alarm").addEventListener("click", stopAlarm);
document.getElementById("alarm-time").addEventListener("click",function(){
    this.showPicker();
});



let quotes = [
    "Choose peace over perfection!",
    "Kindness makes everything prettier!",
    "Everything takes time..!",
    "Let go and let life flow!",
    "Be present, not perfect!!",
    "Small steps still count!!",
    "Keep growing at your own pace.",
    "Protect your little peace. ",
    "Make time for what matters!!",
    "Every day is a fresh start!",
    "Stay soft, but stay strong!!!",
    "Find joy in little things. "
];
let randomQuote = Math.floor(Math.random() * quotes.length);

document.getElementById("daily-quote").textContent = quotes[randomQuote];
function changeQuote() {
    let randomQuote = Math.floor(Math.random() * quotes.length);
    document.getElementById("daily-quote").textContent = quotes[randomQuote];
}
let namePopup = document.getElementById("name-popup");
let helloScreen = document.getElementById("hello-screen");
let mainContent = document.getElementById("main-content");
document.getElementById("visitor-name").focus();
document.getElementById("welcome-btn").addEventListener("click", function() {
    let visitorName = document.getElementById("visitor-name").value.trim();
    if (visitorName === "") {
        alert("Please enter your name!");
        return;
    }

    namePopup.style.display = "none";
    document.getElementById("hello-name").textContent = "Hello, " + visitorName + "! ♡";
    helloScreen.style.display = "flex";
    setTimeout(function() {
        helloScreen.style.display = "none";
        mainContent.style.display = "block";
    }, 5000);

});
document.getElementById("visitor-name").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("welcome-btn").click();
    }
});
