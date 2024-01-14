const questions = [
  {
    question: "What does HTML stand for ? ",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Hyperlinks and Text Markup Language", correct: false },
      { text: "Home Tool Markup Language", correct: false },
      { text: "High-Level Text Markup Language", correct: false },
    ],
  },
  {
    question: "Which tag is used to create a hyperlink in HTML ? ",
    answers: [
      { text: "link", correct: false },
      { text: "a", correct: true },
      { text: "hlink", correct: false },
      { text: "url", correct: false },
    ],
  },
  {
    question: "In HTML, which attribute is used to define inline styles ? ",
    answers: [
      { text: "style", correct: true },
      { text: "font", correct: false },
      { text: "css", correct: false },
      { text: "inline", correct: false },
    ],
  },
  {
    question: "What does CSS stand for ? ",
    answers: [
      { text: "Computer Style Sheets", correct: false },
      { text: "Creative Style Sheets", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "Colorful Style Sheets", correct: false },
    ],
  },
  {
    question: "Which property is used to change the background color in CSS ? ",
    answers: [
      { text: "text-color", correct: false },
      { text: "background-color", correct: true },
      { text: "color", correct: false },
      { text: "bgcolor", correct: false },
    ],
  },
  {
    question: "How can you select an element with class : example in CSS ? ",
    answers: [
      { text: "#example", correct: false },
      { text: ".example", correct: true },
      { text: "example", correct: false },
      { text: "element[example]", correct: false },
    ],
  },
  {
    question: "What is the purpose of the let keyword in JavaScript ? ",
    answers: [
      { text: "To create a constant variable", correct: false },
      { text: "To declare a variable with block scope", correct: true },
      { text: "To define a function", correct: false },
      { text: "To initialize a global variable", correct: false },
    ],
  },
  {
    question: `What will be the result of the following JavaScript code ? console.log(5 + "5") `,
    answers: [
      { text: "10", correct: false },
      { text: "55", correct: true },
      { text: `5 + "5"`, correct: false },
      { text: "Error", correct: false },
    ],
  },
  {
    question: "Which of the following is a falsy value in JavaScript ? ",
    answers: [
      { text: "0", correct: false },
      { text: "true", correct: false },
      { text: "null", correct: false },
      { text: "All of the above", correct: true },
    ],
  },
  {
    question:
      "What is the purpose of the addEventListener method in JavaScript ? ",
    answers: [
      { text: "To add a style to an element", correct: false },
      { text: "To listen for events and execute a function", correct: true },
      { text: "To create an array", correct: false },
      { text: "To define a class", correct: false },
    ],
  },
];

const questionElement = document.querySelector(".question");
const answerButtons = document.querySelector("#answer-buttons");
const nextButton = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function showScore() {
  resetState();
  questionElement.innerHTML = `Your Score is ${score} out of ${questions.length} ! `;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

startQuiz();
