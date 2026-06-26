// ==========================================================
// MathHeroes
// app.js
// PART 1
// ==========================================================


// ======================================
// GLOBAL VARIABLES
// ======================================

let questions = [];

let currentQuestion = 0;

let score = 0;

let timer = null;

let timeLeft = 0;

let totalTime = 0;

let selectedAnswer = null;


// ======================================
// ELEMENT
// ======================================

const grade =
document.getElementById("grade");

const operation =
document.getElementById("operation");

const questionType =
document.getElementById("questionType");

const language =
document.getElementById("language");

const totalQuestion =
document.getElementById("totalQuestion");

const startBtn =
document.getElementById("startBtn");

const questionText =
document.getElementById("questionText");

const answerContainer =
document.getElementById("answerContainer");

const currentQuestionLabel =
document.getElementById("currentQuestion");

const totalQuestionLabel =
document.getElementById("totalQuestions");

const scoreLabel =
document.getElementById("score");

const timerLabel =
document.getElementById("timer");

const progressBar =
document.getElementById("progressBar");

const nextBtn =
document.getElementById("nextBtn");

const prevBtn =
document.getElementById("prevBtn");

const result =
document.getElementById("result");

const finalScore =
document.getElementById("finalScore");

const restartBtn =
document.getElementById("restartBtn");

const achievement =
document.getElementById("achievement");


// ======================================
// START QUIZ
// ======================================

function startQuiz(){

    questions = QuestionGenerator.generate(

    Number(grade.value),

    operation.value,

    Number(totalQuestion.value),

    language.value,

    questionType.value

);

    currentQuestion = 0;

    score = 0;

    selectedAnswer = null;

    scoreLabel.textContent = 0;

    totalQuestionLabel.textContent =
    questions.length;

    totalTime =
    questions.length * 15;

    timeLeft =
    totalTime;

    result.classList.add("hidden");

    achievement.classList.add("hidden");

    startTimer();

    showQuestion();

}


// ======================================
// START TIMER
// ======================================

function startTimer(){

    clearInterval(timer);

    timerLabel.textContent =
    timeLeft;

    timer = setInterval(function(){

        timeLeft--;

        timerLabel.textContent =
        timeLeft;

        if(timeLeft<=0){

            clearInterval(timer);

            finishQuiz();

        }

    },1000);

}
// ======================================
// SHOW QUESTION
// ======================================

function showQuestion(){

    selectedAnswer = null;
document.getElementById("explanationPanel").classList.add("hidden");

document.getElementById("explanationContent").innerHTML = "";
    const q =
    questions[currentQuestion];

    currentQuestionLabel.textContent =
    currentQuestion + 1;

    questionText.textContent =
    q.question;

    answerContainer.innerHTML = "";

    q.options.forEach(function(option,index){

        const btn =
        document.createElement("button");

        btn.className =
        "answer-btn";

        btn.textContent =
        option;

        btn.onclick = function(){

            chooseAnswer(index);

        };

        answerContainer.appendChild(btn);

    });

    updateProgress();

}


// ======================================
// CHOOSE ANSWER
// ======================================

function chooseAnswer(index){

    selectedAnswer = index;

    const buttons =
    document.querySelectorAll(".answer-btn");

    buttons.forEach(function(btn){

        btn.classList.remove("selected");

    });

    buttons[index].classList.add("selected");

}


// ======================================
// CHECK ANSWER
// ======================================

function checkAnswer(){

    if(selectedAnswer===null){

        return;

    }

    const q =
    questions[currentQuestion];

    const buttons =
    document.querySelectorAll(".answer-btn");

    if(selectedAnswer===q.answer){

        score++;

        buttons[selectedAnswer]
        .classList.add("correct");

    }
    else{

        buttons[selectedAnswer]
        .classList.add("wrong");

        buttons[q.answer]
        .classList.add("correct");

    }

    scoreLabel.textContent =
    score;

const explanation =
Explanation.generate(
    q.operation,
    q.a,
    q.b,
    q.language
);
document.getElementById("explanationTitle").textContent =
    q.language === "en"
        ? "🧠 How to Solve"
        : "🧠 Cara Menghitung";
let html = "";

explanation.steps.forEach(function(step){

    html += `
        <div style="margin-bottom:15px;">
            <strong>${step.title}</strong><br>
            ${step.description}<br>
            <span style="color:#1976d2;font-weight:bold;">
                ${step.value}
            </span>
        </div>
    `;

});

document.getElementById("explanationContent").innerHTML =
html;

document.getElementById("explanationPanel").classList.remove("hidden");
}

// ======================================
// NEXT QUESTION
// ======================================

function nextQuestion(){

    // Jika penjelasan belum tampil,
    // cek jawaban dulu
    if(
        document
        .getElementById("explanationPanel")
        .classList
        .contains("hidden")
    ){

        checkAnswer();
        return;

    }

    currentQuestion++;

    if(
        currentQuestion >=
        questions.length
    ){

        finishQuiz();
        return;

    }

    showQuestion();

}

// ======================================
// PREVIOUS QUESTION
// ======================================

function previousQuestion(){

    if(currentQuestion===0){

        return;

    }

    currentQuestion--;

    showQuestion();

}


// ======================================
// UPDATE PROGRESS
// ======================================

function updateProgress(){

    const percent =

    (
        currentQuestion
        /
        questions.length
    ) * 100;

    progressBar.style.width =
    percent + "%";

}
// ======================================
// FINISH QUIZ
// ======================================

function finishQuiz(){

    clearInterval(timer);

    questionText.textContent =
    "Quiz Selesai";

    answerContainer.innerHTML = "";

    result.classList.remove("hidden");

    finalScore.textContent =
    score + " / " + questions.length;

    progressBar.style.width = "100%";

    checkAchievement();

}


// ======================================
// ACHIEVEMENT
// ======================================

function checkAchievement(){

    let text = "";

    const percent =
    (score / questions.length) * 100;

    if(percent===100){

        text =
        "🏆 Perfect Score!";

    }
    else if(percent>=80){

        text =
        "🥇 Excellent!";

    }
    else if(percent>=60){

        text =
        "🥈 Good Job!";

    }
    else if(percent>=40){

        text =
        "🥉 Keep Learning!";

    }
    else{

        text =
        "📚 Never Give Up!";

    }

    achievement.textContent =
    text;

    achievement.classList.remove(
        "hidden"
    );

}


// ======================================
// EVENT
// ======================================

startBtn.addEventListener(
    "click",
    startQuiz
);

nextBtn.addEventListener(
    "click",
    nextQuestion
);

prevBtn.addEventListener(
    "click",
    previousQuestion
);

restartBtn.addEventListener(
    "click",
    startQuiz
);


// ======================================
// INITIAL STATE
// ======================================

progressBar.style.width = "0%";

scoreLabel.textContent = "0";

timerLabel.textContent = "0";

currentQuestionLabel.textContent = "0";

totalQuestionLabel.textContent = "0";

achievement.classList.add(
    "hidden"
);

result.classList.add(
    "hidden"
);

// ==========================================================
// END OF FILE
// app.js
// ==========================================================