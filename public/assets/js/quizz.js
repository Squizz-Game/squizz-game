// VARIABLES POUR LES QUESTIONS/REPONSES
let questions = [];
let reponses = [];
let question;
let button = [];
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

// EXECUTION POUR L'INSERTION DES QUESTIONS/REPONSES DU QUIZZ

fetch("/api/questions/" + sectionQuestion.dataset.quizz)
  .then((res) => res.json())
  .then((res) => {
    questions = res;
    shuffleQR(questions);
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
  
// FONCTIONS POUR L'INSERTION DES QUESTIONS ET REPONSES DU QUIZZ

// insérer les réponses à la question
function insertAswers() {
  fetch("/api/reponses/" + question.id_question)
    .then((res) => res.json())
    .then((res) => {
      reponses = res;
      shuffleQR(reponses);
      sectionReponse.innerHTML = "";
      button = [];
      reponses.forEach((reponse) => {
        r = document.createElement("button");
        // pousse mes réponses dans un tableau pour pouvoir les vérifier par la suite
        button.push(r);
        r.className = "reponse";
        // insérer le logo(carré,rond ou triangle) sur les boutons réponses
        r.innerHTML = "<i></i>" + reponse.reponse;
        sectionReponse.appendChild(r);
        checkAnswer(r, reponse.correct);
        showAnswerDelay();
        noClickNext();
        // compteur des questions
        counterQuestion.innerHTML = index + 1 + "/" + questions.length;
      });
    });
}

// verifier si la réponse cliqué est correct, si oui incrémenter le score
function checkAnswer(r, correct) {
  r.addEventListener("click", () => {
    showAnswer();
    stopTimer();
    removeDelay();
    noClick();
    removeNoClickNext();
    if (correct) {
      // si réponse correct, incrémente la variable score avec le temps restant multiplié par 10
      score += temps * 10;
      console.log(score);
    } 
  });
}

// afficher les réponses correct et les réponses fausses
function showAnswer() {
  button.forEach((btn, i) => {
    if (reponses[i].correct) {
      btn.classList.add("true");
    } else {
      btn.classList.add("false");
    }
  });
}

// afficher les réponses si l'utilisateur ne répond pas dans le temps imparti
function showAnswerDelay() {
  timers.push(
    setTimeout(() => {
      showAnswer()
      stopTimer();
      noClick();
      removeNoClickNext();
    }, 5000)
  );
}

// stopper le délai pour l'affichage des réponses si l'utilisateur ne répond pas dans le temps imparti
function removeDelay() {
  timers.forEach((timer) => {
    clearTimeout(timer);
  });
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
    window.location.assign(window.location.href + "/end-game?score="+score);
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

// empécher le clic sur le bouton question suivante
function noClickNext() {
  next.style = "pointer-events: none";
}

// réactiver le clic sur le bouton question suivante
function removeNoClickNext() {
  next.style = "pointer-events: auto";
}

// récuperer aléatoirement les questions/réponses
function shuffleQR(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1)); //random index
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
  }
}

// FONCTIONS POUR LE TIMER

// création du timer
function timer() {
  temps = temps <= 0 ? 0 : temps - 1;
  let secondes = parseInt(temps % 60, 10);
  secondes = secondes < 10 ? "0" + secondes : secondes;
  timerElement.innerText = `${secondes}s`;
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