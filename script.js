
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const timerElement =document.querySelector('#timer');
const timePerQuestion = 100; //Time in seconds per question
const timePenalty = 5; // Time penalty in seconds

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []
let timeRemaining = timePerQuestion;
let timerInterval;

let questions = [
    {
        question: 'JavaScript is a ___-side programming language?',
        choice1: 'Client',
        choice2: 'Server',
        choice3: 'Both',
        choice4: 'None',
        answer: 3,
    },
    {
        question:
            "Inside which HTML element do we put the JavaScript?",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<scripting>",
        choice4: "<js>",
        answer: 1,
    },
    {
        question: "Where is the correct place to insert a JavaScript?",
        choice1: "The <head> section",
        choice2: "The <body> section",
        choice3: "Both the <head> and the <body> section are correct",
        choice4: "None of the above",
        answer: 3,
    },
    {
        question: "How do you create a function in JavaScript?",
        choice1: "call function myFunction()",
        choice2: "call myFunction()",
        choice3: "myFunction()",
        choice4: "None of the above",
        answer: 3,
    },
    {
        question: "How to write an IF statement for executing some code if i is NOT equal to 5?",
        choice1: "if (i != 5)",
        choice2: "if i =! 5 then",
        choice3: "if i <> 5",
        choice4: "if (i <> 5)",
        answer: 1,
    },
    {
        question: "How does a WHILE loop start?",
        choice1: "while i = 1 to 10",
        choice2: "while (i <= 10)",
        choice3: "while (i <= 10; i++)",
        choice4: "None of the above",
        answer: 2,
    },
    {
        question: "How does a FOR loop start?",
        choice1: "for (i = 0; i <= 5)",
        choice2: "for (i = 0; i <= 5)",
        choice3: "for i = 1 to 5",
        choice4: "for (i = 0; i <= 5; i++)",
        answer: 4,
    },
    {
        question: "How do you round the number 7.25, to the nearest integer?",
        choice1: "rnd(7.25)",
        choice2: "Math.round(7.25)",
        choice3: "Math.rnd(7.25)",
        choice4: "round(7.25)",
        answer: 2,
    },
    {
        question: "How do you find the number with the highest value of x and y?",
        choice1: "Math.ceil(x, y)",
        choice2: "top(x, y)",
        choice3: "ceil(x, y)",
        choice4: "Math.max(x, y)",
        answer: 4,
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        choice1: "onclick",
        choice2: "onmouseover",
        choice3: "onchange",
        choice4: "onmouseclick",
        answer: 1,
    }
]
// stores quiz questions, each containing the question, choices, and the correct answer

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    startTimer()
    getNewQuestion()
}
// initializes quiz, rests counter and score, starts the timer, and calls getNewQuestion

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
  }
// sets an interval to update the timer element
  function updateTimer() {
    timeRemaining--
    timerElement.innerText = `Time: ${timeRemaining}`

    if (timeRemaining <= 0) {
        clearInterval(timerInterval)
        if (timeRemaining <= 0) {
            clearInterval(timerInterval)
            acceptingAnswers = false
            setTimeout(getNewQuestion, 1000)
          }
    }
    if (timeRemaining <= 0) {
        clearInterval(timerInterval)
        endQuiz();
      }
  }
// decreases time for wrong answers and handles end of the quiz when timer runs out
  function endQuiz() {
    clearInterval(timerInterval)
    acceptingAnswers = false
    window.location.assign('./end.html') // Redirect to end.html
  }
// when the quiz ends it clears timer interval, prevents further answers, and redirects to end.html
  function getNewQuestion() {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }

    if (timeRemaining <= 0) {
        endQuiz();
        return;
      }
    
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
        
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}
// retrieves a new question from availableQuestions array, updates the question counter and progress text, and fills question and choices
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers || timeRemaining <= 0) return;

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        } else {
            timeRemaining -= timePenalty; // Deduct time for incorrect answer
            if (timeRemaining < 0) {
              timeRemaining = 0 // Ensure the timer doesn't go negative
            }
          }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})
// adds eventlisteners, checks if answer is correct or incorrect, applies css classes to the slected choice to indictate correctness then removes them
incrementScore = num => {
    score +=num
    scoreText.innerText = score
}
//updates the score and displays it in the html element
startGame()
//STARTS THE QUIZ