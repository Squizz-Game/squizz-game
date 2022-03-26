/** Checkboxes */
const checkboxes = document.querySelectorAll('.checkbox')

checkboxes.forEach((checked, i) => {
    checked.addEventListener('click', e => {
        if (questions[index].reponses[i] === undefined) {
            questions[index].reponses[i] = { ...empty_rep }
        }

        checkboxes.forEach(c => {
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
const empty_rep = {
    correct: 0,
    reponse: '',
}
const empty_quest = {
    id_question: null,
    question: '',
    id_quizz,
    reponses: [{ ...empty_rep, correct: 1 }],
}

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
    console.log(questions)
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
        questions.push({ ...empty_quest })
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
            questions[index].reponses[i] = { ...empty_rep }
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

    const verify = () => {
        let len = questions.length
        if (len < 10) {
            return alert('Vous devez avoir au moins 10 questions.')
        }
    }
    index = questions.length - 1
    displayQuestion()

    let i = index
    const interval = setInterval(() => {
        if (questions[i].question === '') {
            if (confirm('La question ' + (i + 1) + ' est vide, voulez-vous la supprimer ?')) {
                questions.splice(i, 1)
                localStorage.questions = JSON.stringify(questions)
                if (index > 0) index--
            } else {
                clearInterval(interval)
            }
        } else {
            if (index > 0) index--
        }
        displayQuestion()
        i--

        if (i === -1) {
            clearInterval(interval)
            verify()
        }
    }, 100)
})

// ----------------------------------------------

// let questions = []
// let reponses = []
// let type = 1

// // erreur : certaines réponses sont créées 2 fois
// validate.addEventListener('click', () => {
//     let body_reponses = []
//     let are_true = 0
//     let total = 0

//     const getResponses = (question_id) => {
//         body_reponses = []
//         are_true = 0
//         total = 0
//         // récupérer les réponses
//         reponses_p.forEach((r, i) => {
//             body_reponses.push({
//                 reponse: r.innerHTML,
//                 correct: checkboxes[i].classList.contains('checked') ? 1 : 0,
//                 id_reponse: reponses[i]?.id_reponse,
//                 id_question: question_id
//             })
//             if (r.innerHTML !== '') {
//                 are_true += body_reponses[i].correct
//                 total++
//             }
//         })
//     }

//     const updateResponses = () => {
//         body_reponses.forEach(body => {
//             fetch('/api/update/reponse', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(body)
//             })
//                 .then(res => res.json())
//                 .then(res => console.log(res.data))
//         })
//     }

//     getResponses(questions[index].id_question)

//     // si la question n'est pas vide et il y a au moins deux réponses dont une correcte
//     if (question.innerHTML !== '' && total > 1 && are_true === 1) {
//         // Si la question existe déjà
//         if (questions[index].id_question) {
//             console.log('todo')
//             // update question
//             fetch('/api/update/question', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     question: question.innerHTML,
//                     id_question: questions[index].id_question
//                 })
//             })
//             .then(res => res.json())
//             .then(res => {
//                 questions[index] = res
//                 updateResponses()
//             })

//         // Si la question n'existe pas encore
//         } else {
//             // create question
//             fetch('/api/create/question', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     question: question.innerHTML,
//                     id_quizz: quizz_id
//                 })
//             })
//                 .then(res => res.json())
//                 .then(res => {
//                     getResponses(res.data)
//                     updateResponses()
//                 })
//         }
//     } else {
//         alert('La question ne peut être vide et vous devez avoir au moins deux réponses dont une correcte.')
//     }
// })
