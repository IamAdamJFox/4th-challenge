const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const username = document.querySelector('#username')
const saveScorebtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('#mostRecentScore')
const highScoresList = document.querySelector('#highScoresList')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 5

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

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
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
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

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
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



finalScore.innerText = mostRecentScore

username.addEventListener('keyup', () => {
    saveScorebtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefault()

    const score ={
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores((a,b) => {})
        return b.score -a.score

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('/')
    }

    highScoresList.innerHTML =
    highScores.map(score => {
        return `<li class="high-score">${score.name} - ${score.score}</li>`
    }).join("")