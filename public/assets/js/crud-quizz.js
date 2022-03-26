/** Checkboxes */
const checkboxes = document.querySelectorAll('.checkbox')

checkboxes.forEach((checked, i) => {
    checked.addEventListener('click', e => {
        // on retire préalablement le check des autres réponses
        checkboxes.forEach((c, i) => {
            if (questions[index].reponses[i] === undefined) {
                questions[index].reponses[i] = {reponse: ''}
            }
            questions[index].reponses[i].correct = 0
            c.classList.remove('checked')
        })

        questions[index].reponses[i].correct = 1
        checked.classList.add('checked')

        localStorage.questions = JSON.stringify(questions)
    })
})

/** Afficher les questions - réponses */

// Elements
const main = document.getElementById('create-quizz')
const question = document.querySelector('.question')
const reponses_p = document.querySelectorAll('.reponse p')
const counter = document.querySelector('.counter')
const id_quizz = main.dataset.quizz
let index = 0
let questions = []

const displayReponses = () => {
    // Réinitialise les checkboxes
    checkboxes.forEach(c => {
        c.classList.remove('checked')
    })

    // Réinitialiser les blocks réponses
    reponses_p.forEach(rep => {
        rep.innerText = ''
    })

    questions[index].reponses?.forEach((r, i) => {
        // Met à jour les blocks réponses
        reponses_p[i].innerText = r.reponse

        // Met à jour les checkboxes
        if (r.correct === 1) {
            checkboxes[i].classList.add('checked')
        }
    })
}

const updateCounter = () => {
    counter.innerText = index + 1 + '/' + questions.length
}

const displayQuestion = () => {
    question.innerHTML = questions[index]?.question
    displayReponses()
    updateCounter()
}

const init = async () => {
    // Récupérer toutes les questions liées au quizz
    questions = (await (await fetch('/api/quizz/' + id_quizz)).json()).data
    localStorage.questions = JSON.stringify(questions)
    index = questions.length - 1
    displayQuestion()
}

init()

// Actions
next.addEventListener('click', () => {
    if (index === questions.length - 1) {
        questions.push({
            id_question: null,
            question: '',
            id_quizz,
            reponses: [{
                correct: 1,
                reponse: ''
            }]
        })
        localStorage.questions = JSON.stringify(questions)
    }
    index++
    displayQuestion()
})

prev.addEventListener('click', () => {
    if (index > 0) {
        index--
        displayQuestion()
    }
})

remove.addEventListener('click', () => {
    questions.splice(index, 1)
    localStorage.questions = JSON.stringify(questions)
    if (index > 0) index--
    displayQuestion()
})

question.addEventListener('input', e => {
    questions[index].question = question.innerHTML
    localStorage.questions = JSON.stringify(questions)
})

reponses_p.forEach((p, i) => {
    p.addEventListener('input', e => {
        if (questions[index].reponses[i] === undefined) {
            questions[index].reponses[i] = {
                correct: 0,
                reponse: ''
            }
        }
        questions[index].reponses[i].reponse = p.innerHTML
        localStorage.questions = JSON.stringify(questions)
    })
})

validate.addEventListener('click', e => {
    // conditions :
    // 10 ou plus questions non vides
    // au moins deux réponses remplies par question
    // une réponse correcte

    index = questions.length - 1
    displayQuestion()

    let i = index
    const interval = setInterval(() => {
        if (questions[i].question === '') { // Si la question est vide
            if (confirm('La question ' + (i + 1) + ' est vide, voulez-vous la supprimer ?')) {
                questions.splice(i, 1)
                localStorage.questions = JSON.stringify(questions)
                if (index > 0) index--
            } else { // S'il arrête la vérification et sort de la boucle
                clearInterval(interval)
            }
        } else {
            // Si plus d'une réponse est vide ou non cochée
            let are_true = 0
            let total_reps = 0
            questions[i].reponses.forEach(rep => {
                if (rep.reponse !== '') {
                    total_reps++
                    if (rep.correct) are_true++
                }
            })

            if (are_true !== 1 && total_reps !== (2|3)) {
                alert('Vous devez avoir au moins deux réponses par question dont une correcte.')
                clearInterval(interval)
            } else {
                // si tout est ok, on passe à la question suivante
                if (index > 0) index--
            }
        }
        displayQuestion()
        i--

        if (i === -1) { // S'il sort de la boucle après vérification, on revérifie la longueur
            clearInterval(interval)
            verify()
        }
    }, 100)

    const verify = () => {
        let len = questions.length
        if (len < 10) {
            return alert('Vous devez avoir au moins 10 questions.')
        } else {
            saveQuestions()
        }
    }
})

const saveQuestions = () => {
    fetch('/api/quizz/' + id_quizz, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: localStorage.questions
    })
        .then(res => res.json())
        .then(res => {
            if (!res.err) {
                questions = res.data
                localStorage.questions = JSON.stringify(questions)
                index = questions.length - 1
                displayQuestion()
            } else {
                console.log(res.data)
            }
        })
}