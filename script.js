let questions = [
    {   
        prompt:  "Which of these characters is the first to be shown sick in season four?",
        options: [
            "Patrick", 
            "Bob",
            "Hershel", 
            "Glenn"
    ],
        answer: "Patrick",
    },
    {
        prompt: "Which of Negan's lieutenants defects from the Saviors and helps Alexandria during season seven?",
        options: [
            "Dwight",
            "Simon",
            "Gavin",
            "Arat"
    ],
        answer: "Dwight",
    },
    {
        prompt: "Maggie feels she has to make an example out of a traitor in Hilltop. Which character was this?",
        options: [
            "Earl", 
            "Gregory",
            "Tammy", 
            "Jesus"
        ],
        answer: "Gregory",
    },
    {
        prompt: "Which of these tools does Andrea use to defeat a walker when trapped in the bathroom in the RV?",
        options: [
            "A screwdriver", 
            "A drill", 
            "A hammer", 
            "A wrench"
        ],
        answer: "A screwdriver",
    },
    {
        prompt: "Which of these characters finally reunites with Rick in the finale of season five?",
        options: [
            "Shane", 
            "Morgan",
            "Dr. Jenner",
            "Morales"
        ],
        answer: "Morgan",
    },
]



let questionsEl = document.querySelector("#questions");
let timerEl = document.querySelector('#timer');
let choicesEl = document.querySelector("#options");
let submitBtn = document.querySelector("#submitScore");
let startBtn = document.querySelector("#start");
let nameEL = document.querySelector("#name");
let scoreListEl = document.querySelector("#scoreList");
let reStartBtn = document.querySelector("#restart");


let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;


//First quiz screen 
//hiding initial page
function quizStart() {
    timerId = setInterval(
        clockTick,
        1000
    );
    timerEl.textContent = time;
    let landingScreenEl =
        document.getElementById(
            "firstScreen"
        );
    landingScreenEl.setAttribute(
        "class",
        "hide"
    );
    questionsEl.removeAttribute(
        "class"
    );
    getQuestion();
}

// loop questions & answers
function getQuestion() {
    let currentQuestion =
        questions[currentQuestionIndex];
    let promptEl =
        document.getElementById(
            "questionText"
        );
    promptEl.textContent =
        currentQuestion.prompt;
    choicesEl.innerHTML = "";
    currentQuestion.options.forEach(
        function (choice, i) {
            let choiceBtn =
                document.createElement(
                    "button"
                );
            choiceBtn.setAttribute(
                "value",
                choice
            );
            choiceBtn.textContent =
                i + 1 + ". " + choice;
            choiceBtn.onclick =
                questionClick;
            choicesEl.appendChild(
                choiceBtn
            );
        }
    );
}

//score questions & deduct time for wrong answers

function questionClick() {
    if (
        this.value !==
        questions[currentQuestionIndex]
            .answer
    ) {
        time -= 10;
        if (time < 0) {
            time = 0;
        }
        timerEl.textContent = time;
        scoreListEl.textContent = `Incorrect! The correct answer was 
        ${questions[currentQuestionIndex].answer}.`;
        scoreListEl.style.color = "red";
    } else {
        scoreListEl.textContent =
            "Correct!";
            scoreListEl.style.color =
            "green";
    }
    scoreListEl.setAttribute(
        "class",
        "scoreList"
    );
    setTimeout(function () {
        scoreListEl.setAttribute(
            "class",
            "scoreList hide"
        );
    }, 2000);
    currentQuestionIndex++;
    if (
        currentQuestionIndex ===
        questions.length
    ) {
        quizEnd();
    } else {
        getQuestion();
    }
}

//end quiz & stop timer
function quizEnd() {
    clearInterval(timerId);
    let endScreenEl =
        document.getElementById(
            "quiz-end"
        );
    endScreenEl.removeAttribute(
        "class"
    );
    let finalScoreEl =
        document.getElementById(
            "finalScore"
        );
    finalScoreEl.textContent = time;
    questionsEL.setAttribute(
        "class",
        "hide"
    );
}

//end of quiz if timer reaches 0 
function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        quizEnd();
    }
}

//save score and initials
function saveHighscore() {
    let name = nameEL.value.trim();
    if (name !== "") {
        let highscores =
            JSON.parse(
                window.localStorage.getItem(
                    "highscores"
                )
            ) || [];
        let newScore = {
            score: time,
            initials: initials,
        };
        highscores.push(newScore);
        window.localStorage.setItem(
            "highscores",
            JSON.stringify(highscores)
        );
        alert(
            "Your Score has been Submitted"
        );
    }
}

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
        alert(
            "Your Score has been Submitted"
        );
    }
}
nameEL.onkeyup = checkForEnter;

submitBtn.onclick= saveHighscore;

startBtn.onclick= quizStart;
