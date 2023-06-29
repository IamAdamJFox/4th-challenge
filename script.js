const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement =document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');



let shuffledQuestions, currentQuestionindex;
let score = 0

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionindex++
    setNextQuestion()
});


function startGame() {
    console.log('Started')
    startButton.classList.add('hide')
    shuffledQuestions =questions.sort(() => Math.random() - .5)
    currentQuestionindex = 0
    score = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionindex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', showResults)
        answerButtonsElement.appendChild(button)
    })
}
function resetState() {
    clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild
    (answerButtonsElement.firstChild)
  }

}
function showScore() {
  questionElement.innerHTML = 'You scored ${score} out of ${currentQuestindex}!';
  startButton.innerText = 'Restart'
  startButton.classList.remove('hide')
  answerButtonsElement.classList.add('hide')
}

function showResults(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button =>
        {setStatusClass(button, button.dataset.correct)
        })
        if (shuffledQuestions.length > currentQuestionindex + 1) {
        nextButton.classList.remove('hide')
        } else {
            showScore()
        }

}

function setStatusClass(element, correct) {
clearStatusClass(element)
if (correct) {
    element.classList.add('correct')
} else {
    element.classList.add('wrong')
}
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
{question: 'What is 2 + 2',
answers: [
    { text: '4', correct: true },
    { text: '22', correct: false},
     ]
 },
 {
    question: 'Who is the best YouTuber?',
    answers: [
      { text: 'Web Dev Simplified', correct: true },
      { text: 'Traversy Media', correct: true },
      { text: 'Dev Ed', correct: true },
      { text: 'Fun Fun Function', correct: true }
    ]
  },
  {
    question: 'Is web development fun?',
    answers: [
      { text: 'Kinda', correct: false },
      { text: 'YES!!!', correct: true },
      { text: 'Um no', correct: false },
      { text: 'IDK', correct: false }
    ]
  },
  {
    question: 'What is 4 * 2?',
    answers: [
      { text: '6', correct: false },
      { text: '8', correct: true }
    ]
  }
]