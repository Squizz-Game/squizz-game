/** Checkboxes */

const checkboxes = document.querySelectorAll('.checkbox')

checkboxes.forEach(checked => {
    checked.addEventListener('click', e => {
        checkboxes.forEach(c => {
            c.classList.remove('checked')
        })
        checked.classList.add('checked')
    })
})

/** Afficher les questions - réponses */

// Elements
const main = document.getElementById('create-quizz')
const quizz_id = main.dataset.quizz
const question = document.querySelector('.question')
const reponses = document.querySelectorAll('.reponse p')
const counter = document.querySelector('.counter')

// Vars
let index = 0
let questions = []

// Boutons
const remove = document.getElementById('remove')
const next = document.getElementById('next')
const prev = document.getElementById('prev')
const validate = document.getElementById('validate')

// Récupérer toutes les questions liées au quizz
fetch('/api/questions/' + quizz_id)
    .then(res => res.json())
    .then(res => {
        questions = res
        displayQuestion()
    })

// Afficher la question actuelle
const displayQuestion = () => {
    console.log(questions)
    question.innerHTML = questions[index].question
    displayResponses(questions[index].id_question)
    updateCounter()
}

const updateCounter = () => {
    counter.innerText = (index + 1) + '/' + questions.length
}

// Afficher les réponses de la question actuelle
const displayResponses = (question_id) => {
    fetch('/api/reponses/' + question_id)
        .then(res => res.json())
        .then(res => {
            res.forEach((r, i) => {
                reponses[i].innerText = r.reponse

                // Mettre à jour les checkboxes
                checkboxes.forEach(c => {
                    c.classList.remove('checked')
                })

                if (r.correct === 1) {
                    checkboxes[i].classList.add('checked')
                }
            })
        })
}

// Actions
next.addEventListener('click', () => {
    if (index < questions.length -1) {
        index++
        displayQuestion()
    }
})

prev.addEventListener('click', () => {
    if (index > 0) {
        index--
        displayQuestion()
    }
})