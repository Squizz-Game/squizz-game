/** Elements */
const checkboxes = document.querySelectorAll('.checkbox')
const main = document.getElementById('create-quizz')
const question = document.querySelector('.question')
const reponses_p = document.querySelectorAll('.reponse p')
const counter = document.querySelector('.counter')
const id_quizz = main.dataset.quizz
let index = 0
const quizz = {}

/** Afficher les questions - réponses */
const displayReponses = () => {
    // Réinitialise les checkboxes
    checkboxes.forEach(c => {
        c.classList.remove('checked')
    })

    // Réinitialiser les blocks réponses
    reponses_p.forEach(rep => {
        rep.innerText = ''
    })

    quizz.questions[index]?.reponses?.forEach((r, i) => {
        // Met à jour les blocks réponses
        reponses_p[i].innerText = r.reponse

        // Met à jour les checkboxes
        if (r.correct === 1) {
            checkboxes[i].classList.add('checked')
        }
    })
}

const updateCounter = () => {
    counter.innerText = index + 1 + '/' + quizz.questions.length
}

const displayQuestion = () => {
    question.innerHTML = quizz.questions[index]?.question
    displayReponses()
    updateCounter()
}

const isValid = () => {
    if (quizz.questions[index].question === '') return false
    let are_true = 0
    let total_reps = 0

    quizz.questions[index].reponses.forEach(rep => {
        if (rep.reponse !== '') {
            total_reps++
            if (rep.correct) are_true++
        }
    })

    return !(are_true !== 1 || total_reps < 2 || total_reps > 3)
}

const init = (async () => {
    // Récupérer toutes les questions liées au quizz
    quizz.questions = (await (await fetch('/api/quizz/' + id_quizz)).json()).data
    if (quizz.questions.length === 0) {
        quizz.questions.push({
            id_question: null,
            question: '',
            id_quizz,
            reponses: [{
                correct: 1,
                reponse: ''
            }]
        })
    }
    quizz.saved = true
    
    index = quizz.questions.length - 1
    displayQuestion()

    validate.disabled = true
    if (index === 0) prev.disabled = true
    if (!isValid() && index === quizz.questions.length - 1) next.disabled = true
})()

/** Checkboxes */
checkboxes.forEach((checked, i) => {
    checked.addEventListener('click', e => {
        // on retire préalablement le check des autres réponses
        checkboxes.forEach((c, i) => {
            if (quizz.questions[index].reponses[i] === undefined) {
                quizz.questions[index].reponses[i] = {reponse: ''}
            }
            quizz.questions[index].reponses[i].correct = 0
            c.classList.remove('checked')
        })

        quizz.questions[index].reponses[i].correct = 1
        checked.classList.add('checked')

        persistChanges()
    })
})

/** Actions */
const persistChanges = () => {
    quizz.saved = false
    if (!isValid()) {
        validate.disabled = true
        if (index === quizz.questions.length - 1) {
            next.disabled = true
        } else {
            next.disabled = false
        }
    } else {
        next.disabled = false
        validate.disabled = false
    }
}

next.addEventListener('click', () => {
    if (isValid()) {
        if (index === quizz.questions.length - 1) {
            quizz.questions.push({
                id_question: null,
                question: '',
                id_quizz,
                reponses: [{
                    correct: 1,
                    reponse: ''
                }]
            })
        }
    }
    if (index < quizz.questions.length - 1) {
        index ++
        prev.disabled = false
        displayQuestion()
    }
    persistChanges()
})

prev.addEventListener('click', () => {
    if (index > 0) {
        index--
        displayQuestion()
        next.disabled = false
    }

    if (index < 1) prev.disabled = true
    persistChanges
})

remove.addEventListener('click', () => {
    quizz.questions.splice(index, 1)
    if (index > 0) index--

    if (quizz.questions.length < 1) {
        quizz.questions.push({
            id_question: null,
            question: '',
            id_quizz,
            reponses: [{
                correct: 1,
                reponse: ''
            }]
        })
    }
    persistChanges()
    displayQuestion()
})

question.addEventListener('input', e => {
    quizz.questions[index].question = question.innerHTML
    persistChanges()
})

reponses_p.forEach((p, i) => {
    p.addEventListener('input', e => {
        if (quizz.questions[index].reponses[i] === undefined) {
            quizz.questions[index].reponses[i] = {
                correct: 0,
                reponse: ''
            }
        }
        quizz.questions[index].reponses[i].reponse = p.innerHTML
        persistChanges()
    })
})

/**
 * Au moins 10 questions non vide,
 * Au moins deux réponses remplies par question
 * Une (et une seule) réponse correcte par question
 */
validate.addEventListener('click', e => {
    if (!quizz.saved) {
        index = quizz.questions.length - 1
        displayQuestion()

        let i = index
        const interval = setInterval(() => {
            quizz.questions[i].question = quizz.questions[i].question.trim()
            if (quizz.questions[i].question === '') { // Si la question est vide
                if (confirm('La question ' + (i + 1) + ' est vide, voulez-vous la supprimer ?')) {
                    quizz.questions.splice(index, 1)
                    if (index > 0) index--

                    if (quizz.questions.length < 1) {
                        quizz.questions.push({
                            id_question: null,
                            question: '',
                            id_quizz,
                            reponses: [{
                                correct: 1,
                                reponse: ''
                            }]
                        })
                    }
                    persistChanges()
                    displayQuestion()
                } else { // S'il arrête la vérification et sort de la boucle
                    clearInterval(interval)
                    validate.disabled = true
                }
            } else {
                // Si plus d'une réponse est vide ou non cochée
                let are_true = 0
                let total_reps = 0
                quizz.questions[i].reponses.forEach((rep, j) => {
                    quizz.questions[i].reponses[j].reponse = rep.reponse
                    if (rep.reponse !== '') {
                        total_reps++
                        if (rep.correct) are_true++
                    }
                })

                if (are_true !== 1 || total_reps < 2 || total_reps > 3) {
                    alert('Vous devez avoir au moins deux réponses par question dont une correcte.')
                    validate.disabled = true
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
            let len = quizz.questions.length
            if (len < 10) {
                createAlert('Vous devez avoir au moins 10 questions.', 'error')
                validate.disabled = true
                index = quizz.questions.length - 1
                displayQuestion()
            } else {
                saveQuestions()
            }
        }

        const saveQuestions = () => {
            fetch('/api/quizz/' + id_quizz, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(quizz.questions)
            })
                .then(res => res.json())
                .then(res => {
                    if (!res.err) {
                        quizz.questions = res.data
                        quizz.saved = true
                        validate.disabled = true
                        index = quizz.questions.length - 1
                        displayQuestion()
                        createAlert('Questions enregistrées', 'success')
                    } else {
                        createAlert('Une erreur s\'est produite.', 'error')
                    }
                })
        }
    } else {
        createAlert('Aucun changement à enregistrer.', 'warning')
    }
})
