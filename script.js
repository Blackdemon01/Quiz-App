let questions = [];
let current = 0;
let score = 0;

let timeLeft = 1200;
let timer;
function startQuiz() {

  const name = document.getElementById("studentName").value.trim();
  const subject = document.getElementById("subject").value;

  if (name === "" || subject === "") {
    alert("Please enter your name and select a subject.");
    return;
  }

  questions = quizData[subject];
  current = 0;
  score = 0;

  document.getElementById("home").style.display = "none";
  document.getElementById("quiz").style.display = "block";

  document.getElementById("subjectTitle").innerHTML =
    subject.toUpperCase() + " QUIZ";

  showQuestion();
  startTimer();
}

function showQuestion() {

  document.getElementById("counter").innerHTML =
    "Question " + (current + 1) + " of " + questions.length;
  let percent=((current+1)/questions.length)*100;

document.getElementById("progressBar").style.width=
percent+"%";

  document.getElementById("question").innerHTML =
    questions[current].question;

  let html = "";

  for (let i = 0; i < questions[current].options.length; i++) {

    html += `
      <div class="option" onclick="selectAnswer(${i})">
        ${questions[current].options[i]}
      </div>
    `;
  }

  document.getElementById("options").innerHTML = html;
}

function selectAnswer(choice) {

  if (choice === questions[current].answer) {
    score++;
  }

  nextQuestion();
}

function nextQuestion() {

  current++;

  if (current >= questions.length) {

    document.getElementById("quiz").innerHTML = `
      <h2>Quiz Completed!</h2>
      <h3>Your Score: ${score} / ${questions.length}</h3>
      <button onclick="location.reload()">Restart Quiz</button>
    `;

    return;
  }

  showQuestion();
}
function startTimer(){

timer = setInterval(function(){

timeLeft--;

let minutes = Math.floor(timeLeft / 60);

let seconds = timeLeft % 60;

if(seconds < 10){
seconds = "0" + seconds;
}

document.getElementById("timer").innerHTML =
"⏰ Time Left: " + minutes + ":" + seconds;

if(timeLeft <= 0){

clearInterval(timer);

document.getElementById("quiz").innerHTML = `
<h2>Time Up!</h2>
<h3>Your Score: ${score}/${questions.length}</h3>
<button onclick="location.reload()">Restart Quiz</button>
`;

}

},1000);

}
