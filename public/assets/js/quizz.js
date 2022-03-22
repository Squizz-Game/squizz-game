// VARIABLES POUR LES QUESTIONS/REPONSES

let questions = [];
let reponses = [];
let question;
let sectionQuestion = document.querySelector(".question");
let sectionReponse = document.querySelector(".reponses");
let next = document.querySelector(".btn_next");
let counterQuestion = document.querySelector(".counter");
let index = 0;
let score = 0;

// VARIABLES POUR LES TIMER

const timerElement = document.querySelector(".timer");
let intervalTimer = null;
let temps = 30;
let timers = [];


// FONCTIONS POUR L'INSEERTION DES QUESTIONS ET REPONSES DU QUIZZ

// insérer les réponses à la question
function insertAswers() {
  fetch("/api/reponses/" + question.id_question)
    .then((res) => res.json())
    .then((res) => {
      reponses = res;
      sectionReponse.innerHTML = "";
      reponses.forEach((reponse) => {
        r = document.createElement("button");
        r.className = "reponse";
        // insérer le logo(carré,rond ou triangle) sur les boutons réponses
        r.innerHTML = "<i></i>" + reponse.reponse;
        sectionReponse.appendChild(r);
        checkAnswer(r, reponse.correct);
        showAnswerDelay(r, reponse.correct);
        // compteur des questions
        counterQuestion.innerHTML = index+1+"/"+questions.length
      });
    });
}

// verifier si la réponse est correct, si oui incrémenter le score
function checkAnswer(r, correct) {
  r.addEventListener("click", () => {
    if (correct) {
      r.classList.add("true");
      // si réponse correct, incrémente la variable score avec le temps restant multiplié par 10
      score += temps * 10;
      console.log(score);
      stopTimer();
      removeDelay();
      noClick();
    } else {
      r.classList.add("false");
      stopTimer();
      removeDelay();
      noClick();
    }
  });
}

// afficher les réponses
function showAnswer(r, correct) {
  if (correct) {
    r.classList.add("true");
    stopTimer();
  } else {
    r.classList.add("false");
    stopTimer();
  }
}

// afficher les réponses si l'utilisateur ne répond pas dans le temps imparti
function showAnswerDelay(r, correct) {
  timers.push(
    setTimeout(() => {
      showAnswer(r, correct);
      noClick();
    }, 5000)
  );
}

// passer à la question suivante
function nextQuestion() {
  index++;
  // insérer une nouvelle question, limiter a 10 questions par quizz
  if (index < questions.length && index < 10) {
    question = questions[index];
    sectionQuestion.innerHTML = question.question;
    insertAswers();
    startTimer();
    removeNoClick();
  } else {
    // à la fin du quizz, enregistre le score
    let json = JSON.stringify({
      id_user: sectionQuestion.dataset.user ?? null,
      score,
      id_quizz: sectionQuestion.dataset.quizz,
    });
    // si utilasateur connecté, sauvegarde son score dans la bdd
    if (sectionQuestion.dataset.user != null) {
      fetch("/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: json,
      });
    }
    localStorage.result = json;
    // redirection sur la page des scores
    window.location.assign("/score");
  }
}

// empécher le clic sur les autres boutons réponses une fois une réponse selectionner
function noClick() {
  sectionReponse.style = "pointer-events: none";
}

// réactiver le clic sur les boutons réponses
function removeNoClick() {
  sectionReponse.style = "pointer-events: auto";
}

// récuperer aléatoirement les questions
function shuffleQuestions(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1)); //random index
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
  }
}

// FONCTIONS POUR LE TIMER

// création du timer
function timer() {
  let secondes = parseInt(temps % 60, 10);
  secondes = secondes < 10 ? "0" + secondes : secondes;
  timerElement.innerText = `${secondes}s`;
  temps = temps <= 0 ? 0 : temps - 1;
}

// lancer le timer
function startTimer() {
  intervalTimer = setInterval(timer, 1000);
  temps = 30;
}

// stopper le timer
function stopTimer() {
  clearInterval(intervalTimer);
}

// stopper le délai pour l'affichage des réponses si l'utilisateur ne répond pas dans le temps imparti
function removeDelay() {
  timers.forEach((timer) => {
    clearTimeout(timer);
  });
}


// EXECUTION POUR L'INSERTION DES QUESTIONS/REPONSES DU QUIZZ

fetch("/api/questions/" + sectionQuestion.dataset.quizz)
  .then((res) => res.json())
  .then((res) => {
    questions = res;
    shuffleQuestions(questions);
    if (questions.length > 0) {
      question = questions[index];
      sectionQuestion.innerHTML = question.question;
      insertAswers();
      startTimer();
      next.addEventListener("click", () => {
        nextQuestion();
      });
    }
  });
