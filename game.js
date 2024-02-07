const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion ={}
let acceptAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
{
    question: "What is orange?",
    choice1: "name",
    choice2: "color",
    choice3: "fruit",
    choice4: "word",
    answer: 2,
},
{
    question: "What is mouse?",
    choice1: "animal",
    choice2: "mouse",
    choice3: "food",
    choice4: "pet",
    answer: 1,
},
{
    question: "What is nail?",
    choice1: "finger",
    choice2: "iron",
    choice3: "bbq",
    choice4: "armstrong",
    answer: 3,
},
{
    question: "What is cool?",
    choice1: "cold",
    choice2: "fashion",
    choice3: "down",
    choice4: "ok",
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
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
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

        let classToApply  = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

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

startGame()