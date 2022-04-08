/** Elements */
const checkboxes = document.querySelectorAll('.checkbox')
const main = document.getElementById('create-quizz')
const question = document.querySelector('.question')
const reponses_p = document.querySelectorAll('.reponse p')
const counter = document.querySelector('.counter')
const id_quizz = main.dataset.quizz
let index = 0
const quizz = {}

// Définis le nombre de questions par quizz (10 par défaut)
const min_questions = parseInt((document.cookie.split('; ').find((e) => {
    return e.startsWith('min_questions')
  }) ?? 'min_questions=10').replace('min_questions=', ''))

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

        refreshButtons()
    })
})

/** Actions */
const refreshButtons = () => {
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
    refreshButtons()
})

prev.addEventListener('click', () => {
    if (index > 0) {
        index--
        displayQuestion()
        next.disabled = false
    }

    if (index < 1) prev.disabled = true
    refreshButtons()
})

const removeQuestion = () => {
    // on supprime la question affichée
    quizz.questions.splice(index, 1)
    if (index > 0) index--

    // s'il n'y a plus de questions du tout, on en crée une vide
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
    refreshButtons()
    displayQuestion()
}

remove.addEventListener('click', () => {
    removeQuestion()
})

question.addEventListener('input', e => {
    quizz.questions[index].question = question.innerHTML
    refreshButtons()
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
        refreshButtons()
    })
})

/**
 * Au moins 10 (ou min_questions) questions non vide,
 * Au moins deux réponses remplies par question
 * Une (et une seule) réponse correcte par question
 */
validate.addEventListener('click', e => {
    if (!quizz.saved) {
        // on place l'index à la fin
        index = quizz.questions.length - 1
        displayQuestion()

        // on utilise un index temporaire
        let i = index
        // on boucle sur nos questions avec setInterval (pour laisser le temps d'afficher les alertes)
        const interval = setInterval(() => {
            // on retire les espaces en trop
            quizz.questions[i].question = quizz.questions[i].question.trim()
            // si la question est vide on la supprime ou on sort de la boucle sans enregistrer
            if (quizz.questions[i].question === '') {
                if (confirm('La question ' + (i + 1) + ' est vide, voulez-vous la supprimer ?')) {
                    removeQuestion()
                } else {
                    clearInterval(interval)
                    validate.disabled = true
                }
            } else {
                // Si plus d'une réponse est vide ou non cochée
                if (!isValid()) {
                    alert('Vous devez avoir au moins deux réponses par question dont une correcte.')
                    clearInterval(interval)
                } else {
                    // si tout est ok, on passe à la question suivante
                    if (index > 0) index--
                    displayQuestion()
                }
                // on réduit l'index temporaire,
                // s'il est trop bas, on sort de la boucle et on revérifie la longueur
                i--
                if (i === -1) {
                    clearInterval(interval)

                    if (quizz.questions.length < min_questions) {
                        createAlert('Vous devez avoir au moins ' + min_questions + ' questions.', 'error')
                        validate.disabled = true
                        index = quizz.questions.length - 1
                        displayQuestion()
                    } else {
                        // si la longueur est correcte, on enregistre les questions
                        saveQuestions()
                    }
                }
            }
        }, 100)

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
                        createAlert(res.err, 'error')
                    }
                })
        }
    } else {
        createAlert('Aucun changement à enregistrer.', 'warning')
    }
})
