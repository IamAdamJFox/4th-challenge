
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
        question: 'What is 2 + 2?',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 2,
    },
    {
        question:
            "The tallest building in the world is located in which city?",
        choice1: "Dubai",
        choice2: "New York",
        choice3: "Shanghai",
        choice4: "None of the above",
        answer: 1,
    },
    {
        question: "What percent of American adults believe that chocolate milk comes from brown cows?",
        choice1: "20%",
        choice2: "18%",
        choice3: "7%",
        choice4: "33%",
        answer: 3,
    },
    {
        question: "Approximately what percent of U.S. power outages are caused by squirrels?",
        choice1: "10-20%",
        choice2: "5-10%",
        choice3: "15-20%",
        choice4: "30%-40%",
        answer: 1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    startTimer()
    getNewQuestion()
}

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
  }

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
        clearInterval(timerInterval);
        endQuiz();
      }
  }

  function endQuiz() {
    clearInterval(timerInterval);
    acceptingAnswers = false;
  }

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    if (availableQuestions.length > 0)
    
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

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

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

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()