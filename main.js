// Define subjects for the chart
let subjects = ['HTML', 'CSS', 'JavaScript', 'All'];

// Chart creation
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: subjects,
        datasets: [{
            label: 'Time Spent Studying (minutes)',
            data: [0, 0, 0, 0], // Initialize data with zeros
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Time (minutes)'
                }
            }]
        }
    }
});


// Arrays to store time spent studying each subject
let studyTimes = [0, 0, 0, 0];

// Function to prompt the user for study time input
function runPrompt(subjectIndex) {
    let userInput = prompt("Time spent (minutes)");
    if (userInput === null) {
        console.log("Operation cancelled by user.");
        return;
    }
    let timespent = parseFloat(userInput);
    if (isNaN(timespent) || timespent <= 0) {
        console.log("Invalid input. Please enter a valid number greater than 0.");
        return;
    }

    studyTimes[subjectIndex] += timespent;

    // Update chart data
    myChart.data.datasets[0].data = studyTimes;
    myChart.update();

    // Save updated data to local storage
    saveDataToLocalStorage();
}

// Function to add to-do list item
function runTodo() {
    let todoInput = document.querySelector("#todoInput").value;
    const taskElement = document.createElement("li");
    taskElement.style.listStyleType = "none";
    taskElement.style.fontFamily = "monospace";
    taskElement.style.padding = "10px";
    taskElement.style.fontWeight = "200";
    taskElement.style.fontSize = "20px";

    taskElement.textContent = todoInput;
    let todoContainer = document.querySelector(".todoContainer ul");
    todoContainer.appendChild(taskElement);
    let completeButton = document.createElement("button");
  
    completeButton.style.boxShadow = "10px 5px 10px rgba(46, 35, 199, 0.979)";
    completeButton.style.marginLeft = "10px"
    completeButton.textContent = "Complete";
    completeButton.classList.add("finishButton");
    taskElement.appendChild(completeButton);
    // Save updated data to local storage
    saveDataToLocalStorage();
}

// Function to remove completed to-do list item
function runComplete(event) {
    let taskItem = event.target.parentElement;
    taskItem.remove();
    // Save updated data to local storage
    saveDataToLocalStorage();
}

// Function to save data to local storage
function saveDataToLocalStorage() {
    localStorage.setItem("studyTimes", JSON.stringify(studyTimes));
    localStorage.setItem("todoListHTML", document.querySelector(".todoContainer").innerHTML);
}

// Load data from local storage when the page loads
window.onload = function () {
    // Retrieve data from local storage
    let storedStudyTimes = JSON.parse(localStorage.getItem('studyTimes'));
    let storedTodoListHTML = localStorage.getItem('todoListHTML');

    // Update chart data if exists
    if (storedStudyTimes) {
        studyTimes = storedStudyTimes;
        myChart.data.datasets[0].data = studyTimes;
        myChart.update();
    }

    // Update to-do list if HTML exists
    if (storedTodoListHTML) {
        document.querySelector(".todoContainer").innerHTML = storedTodoListHTML;
    }

    // Add event listeners for completion buttons
    document.querySelector('.todoContainer ul').addEventListener('click', function(event) {
        if (event.target.classList.contains('finishButton')) {
            runComplete(event);
        }
    });

    // Add event listeners for study time buttons
    document.querySelector("#html").addEventListener("click", () => runPrompt(0));
    document.querySelector("#css").addEventListener("click", () => runPrompt(1));
    document.querySelector("#js").addEventListener("click", () => runPrompt(2));
    document.querySelector("#all").addEventListener("click", () => runPrompt(3));

    // Add event listener for the "ADD" button
    document.getElementById("todoButton").addEventListener("click", runTodo);
};

// Fetch a random quote
const category = 'success';
const apiKey = 'RqrbC/ZGwrc0jCwMpPZijA==268D0dgn2diirdW0';
fetch('https://api.api-ninjas.com/v1/quotes?category=' + category, {
    method: 'GET',
    headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json'
    }
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        document.querySelector("#randomQ").innerText = data[0].quote;
    })
    .catch(error => {
        console.error('Error:', error);
    });
