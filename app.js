const startButton = document.getElementById('start-button')
const nextButton = document.getElementById('next-button')
const questionContainer = document.getElementById('question-container')

let shuffledQuestions, questionIndex
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
let currentQuestion = 0

const questions = [
    {
        question: 'What pagan holiday is Christmas Day based on?',
        answers: [
            {text: 'Candlemas', correct: false},
            {text: 'Saturnalia', correct: true},
            {text: "Jesus' birthday", correct: false},
            {text: 'Kwanzaa', correct: false}
        ]
    },
    {
        question: 'Which U.S. state was the first to recognize Christmas as an official Holiday?',
        answers: [
            {text: 'Florida', correct: false},
            {text: 'Virginia', correct: false},
            {text: 'Colorado', correct: false},
            {text: 'Alabama', correct: true}
        ]
    },
    {
        question: 'What country is credited with starting the tradition of putting up a Christmas Tree?',
        answers: [
            {text: 'Italy', correct: false},
            {text: 'Brazil', correct: false},
            {text: 'Germany', correct: true},
            {text: 'Sweden', correct: false}
        ]
    },
    {
        question: "What is Santa Claus's real name?",
        answers: [
            {text: 'Kris Kringle', correct: false},
            {text: 'Saint Nicholas', correct: true},
            {text: "Simon Cowell", correct: false},
            {text: 'Jesus', correct: false}
        ]
    },
    {
        question: 'Which popular Christmas song was originally a threat crafted by angry servants?',
        answers: [
            {text: "Rockin' Around the Christmas Tree", correct: false},
            {text: 'Frosty the Snowman', correct: false},
            {text: "Silver Bells", correct: false},
            {text: 'We Wish You A Merry Christmas', correct: true}
        ]
    },
    {
        question: "What is Santa's official zip code according to the U.S. postal service?",
        answers: [
            {text: '01010', correct: false},
            {text: 'CLICK-CLICK-CLICK', correct: false},
            {text: '88888', correct: false},
            {text: 'HO-HO-Ho', correct: true}
        ]
    },
    {
        question: 'Which of the following is NOT the name of one of the 13 Santas in Iceland?',
        answers: [
            {text: 'Cookie Crusher', correct: true},
            {text: 'Spoon Licker', correct: false},
            {text: 'Door Sniffer', correct: false},
            {text: 'Meat Hook', correct: false}
        ]
    },
    {
        question: 'How many years does it take to grow a Christmas Tree for selling?',
        answers: [
            {text: '10 years', correct: false},
            {text: '15 years', correct: true},
            {text: '20 years', correct: false},
            {text: '25 years', correct: false}
        ]
    },
    {
        question: 'Which company played a huge role in crafting the image of modern day Santa Cluas?',
        answers: [
            {text: 'Pepsi Co', correct: false},
            {text: 'Johnson & Johnson', correct: false},
            {text: "Macy's", correct: false},
            {text: 'Coca-Cola', correct: true}
        ]
    },
    {
        question: 'Which Christmas classic was originally a Thanksgiving tune?',
        answers: [
            {text: 'Rudolph the Red-Nosed Reindeer', correct: false},
            {text: 'Deck the Halls', correct: false},
            {text: 'Jingle Bells', correct: true},
            {text: "Baby, it's Cold Outside", correct: false}
        ]
    }
]

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    questionIndex++
    setQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    questionIndex = 0
    currentQuestion = 0
    questionContainer.classList.remove('hide')
    setQuestion()
}

//Generates the next question in the series
function setQuestion() {
    resetAll()
    showQuestion(shuffledQuestions[questionIndex])
    incrementCounter()
}

//Resets the answers
function resetAll() {
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

//Sets up the question display
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

//Functionality for selecting an answer
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > questionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart?'
        startButton.classList.remove('hide')
    }
}

//Sets answers as correct or incorrect
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('incorrect')
    }
}

//Resets correctness of answers
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('incorrect')
}

//Increments question number counter
function incrementCounter() {
    currentQuestion += 1;
    let score = document.getElementById('question-counter')
    score.innerText = currentQuestion + '/10'
}