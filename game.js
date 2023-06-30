
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorALL('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    { question: 'What is 2 + 2?',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 2,
    },
    { question: 'What is 5 + 2?',
        choice1: '7',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 1,
    },
    { question: 'What is 0 + 2?',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 1,
    },
    { question: 'What is 15 + 2?',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 4,
    },
    { question: 'What is 19 + 2?',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

function startGame() {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {

    //Keep track of the score
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
      localStorage.setItem('mostRecentScore', score)
  
      return window.location.assign('end.html')
    }
    //questions changing to next one each click
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}` //backticks helps to contain any js expressions
  
  
    //Keep track of what question in present
    //randomizes question
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question
  
  
  
    //Choices
  
    choices.forEach(choice => {
      const number = choice.dataset['number']
      choice.innerText = currentQuestion['choice' + number]
    })
  
    availableQuestions.splice(questionsIndex, 1) //removes element from an array by only 1 , then returns what you remove
  
    acceptingAnswers = true //keeps track of correct answers
  }
  
  
  //checking if answers are correct or incorrect
  console.log(choices);
  choices.forEach(choice => {
    choice.addEventListener('click', e => {
      if (!acceptingAnswers) return //if the answer is wrong just continue without changing anything
      acceptingAnswers = false
      const selectedChoice = e.target //if user clicks this add the event
      const selectedAnswer = selectedChoice.dataset['number'] //the answer is the selectedchoice variable from the array's index number
  
  
      /*if the selected answer is the correct answer from the index with the variable answer then if its true
      then call the class from the CSS that changes the color accordingly if the selected answer is correct IF NOT then call the class that changes color for wrong answers*/
      let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
  
  
  
      if (classToApply === 'correct') {
        incrementScore(SCORE_POINTS)
      }
  
  
  
      selectedChoice.parentElement.classList.add(classToApply)
  
  
      //setTimeOut(function,miliseconds,...)
  
      //remove the color by 1 second then move on to the next question
      setTimeout(() => {
  
        selectedChoice.parentElement.classList.remove(classToApply)
        getNewQuestion()
      }, 1000)
  
  
    })
  
  
    incrementScore = num => {
      score += num
      scoreText.innerText = score
    }
  
  
    //Moves to the next question
    startGame()
  
  })