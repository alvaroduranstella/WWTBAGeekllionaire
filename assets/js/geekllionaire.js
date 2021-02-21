const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Choose the correct HTML element for the largest heading:" ,
        choice1: "<heading>" ,
        choice2: "<head>" ,
        choice3: "<h6>" ,
        choice4: "<h1>" ,
        answer: 4
    } ,
    {
        question: "Choose the correct HTML element to define important text" ,
        choice1: "<strong>" ,
        choice2: "<important>" ,
        choice3: "<b>" ,
        choice4: "<i>" ,
        answer: 1
    } ,
    {
        question: "Which HTML element is used to display a scalar measurement within a range?" ,
        choice1: "<range>" ,
        choice2: "<measure>" ,
        choice3: "<gauge>" ,
        choice4: "<meter>" ,
        answer: 4
    } ,
    {
        question: "Which HTML attribute is used to define inline styles?" ,
        choice1: "styles" ,
        choice2: "font" ,
        choice3: "style" ,
        choice4: "class" ,
        answer: 3
    } ,
    {
        question: "Which is the correct CSS syntax?" ,
        choice1: "body:color=black;" ,
        choice2: "{body;color:black;}" ,
        choice3: "body {color: black;}" ,
        choice4: "{body:color=black;}" ,
        answer: 3
    } ,
    {
        question: "What is the correct CSS syntax for making all the <p> elements bold?",
        choice1: "<p style=text-size:bold>",
        choice2: "p {font-weight:bold;}",
        choice3: "p {text-size:bold;}",
        choice4: "<p style=font-size:bold;>",
        answer: 2
    } ,
    {
        question: "Inside which HTML element do we put the JavaScript?" ,
        choice1: "<js>" ,
        choice2: "<javascript>" ,
        choice3: "<scripting>" ,
        choice4: "<script>" ,
        answer: 4
    } ,
    {
        question: "How do you round the number 7.25, to the nearest integer?" ,
        choice1: "Math.round(7.25)" ,
        choice2: "round(7.25)" ,
        choice3: "Math.rnd(7.25)" ,
        choice4: "rnd(7.25)" ,
        answer: 1
    } ,
    {
        question: "How to write an IF statement in JavaScript?",
        choice1: "if (i == 5)",
        choice2: "if i = 5",
        choice3: "if i == 5 then",
        choice4: "if i = 5 then",
        answer: 1
    },
    {
        question: "How does a FOR loop start?",
        choice1: "for (i <= 5; i++)",
        choice2: "for i = 1 to 5",
        choice3: "for (i = 0; i <= 5; i++)",
        choice4: "for (i = 0; i <= 5)",
        answer: 3
    }
]

//----------------------------------------------------------------------//
//---------------------------CONSTANTS----------------------------//
//---------------------------------------------------------------------//
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('lastScore', score);
        //go to the end page
        return window.location.assign("/end.html");
    }

    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(
        choice => {
            const number = choice.dataset["number"];
            choice.innerText = currentQuestion["choice" + number];
        }
    );

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if(classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply); 
        
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}

startGame();