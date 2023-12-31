//To store username and number of questions to local storage.
function storeUserInfo() {
  let userName = document.getElementById("firstName").value;
  let numberOfQuestions = document.getElementById("number").value;

  localStorage.setItem("name", userName);
  localStorage.setItem("numOfQuestions", numberOfQuestions);
  window.location.href = "study.html";
}

//arrary containing all the questions and answers
let questionsAndAnswers = [
  { question: "Which continent is India part of?", answer: "Asia" },
  { question: "Which is the largest continent in area?", answer: "Asia" },
  { question: "Which is the smallest continent in area?", answer: "Australia" },
  {
    question: "Which continent is also called as an 'Island-Continent'?",
    answer: "Australia",
  },
  {
    question:
      "The largest mountain in the world, Mount Everest is situated in which continent?",
    answer: "Asia",
  },
  {
    question: "On Which Continent Is Egypt?",
    answer: "Africa",
  },
  {
    question: "On which continent can you find France?",
    answer: "Europe",
  },
  {
    question: "Which is the Second biggest continent of the world?",
    answer: "Africa",
  },
  {
    question: "Columbus found which continent?",
    answer: "North America",
  },
  {
    question: "Where is Amazon River?",
    answer: "South America",
  },
];

let pickedQuestions = [];

//function to pick n random questions index values.
const pickRandomQuestions = () => {
  for (i = 0; i < localStorage.getItem("numOfQuestions"); ) {
    const random = Math.floor(Math.random() * 10);
    if (pickedQuestions.includes(random)) {
      continue;
    } else {
      pickedQuestions.push(random);
      i++;
    }
  }
};

let currentQuestionIndex = 0;

//function to change the question in the html
const updateQuestion = () => {
  const questionElement = document.getElementById("question");
  questionElement.textContent =
    questionsAndAnswers[pickedQuestions[currentQuestionIndex]].question;
  document
    .querySelector(".card-text")
    .setAttribute("style", "visibility: hidden");

  let nextButton = document.getElementById("next-button");
  nextButton.setAttribute("onclick", "");
  nextButton.setAttribute("style", "opacity: 0.5; cursor: not-allowed;");
  updateQuestionCounter();

  //   document.querySelector('map[name="image-map"]').innerHTML = "";
};

//function to move to next question
const nextQuestion = () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < pickedQuestions.length) {
    updateQuestion();
  } else {
    alert("Congratulations! You have completed all questions.");
  }
};

// Function to initialize the game by picking random questions and updating the UI
const enterGame = () => {
  pickRandomQuestions();
  console.log(pickedQuestions);
  updateQuestion();
  timer();
};

let score = 0;

// Get references to the audio elements
const correctSound = document.getElementById("correctSound");
const incorrectSound = document.getElementById("incorrectSound");

const checkAnswer = (areaName) => {
  document
    .querySelector(".card-text")
    .setAttribute("style", "visibility: visible");

  if (
    areaName ===
    questionsAndAnswers[pickedQuestions[currentQuestionIndex]].answer
  ) {
    // Correct answer
    score++;
    localStorage.setItem("score", score);

    // Play correct sound
    correctSound.play();

    document.querySelector(".card-text strong").textContent =
      "Correct answer!!";
    document
      .querySelector(".card-text strong")
      .setAttribute("style", "color: green");
  } else {
    // Incorrect answer
    rightanswer = questionsAndAnswers[pickedQuestions[currentQuestionIndex]];

    // Play incorrect sound
    incorrectSound.play();

    document.querySelector(".card-text strong").textContent =
      "Wrong answer!! right answer is " + rightanswer.answer;
    document
      .querySelector(".card-text strong")
      .setAttribute("style", "color: red");
  }

  document
    .getElementById("next-button")
    .setAttribute("onclick", "nextQuestion()");
  if (currentQuestionIndex === pickedQuestions.length - 1) {
    document.getElementById("next-button").textContent = "Finish Quiz";
    document
      .getElementById("next-button")
      .setAttribute("onclick", "finishQuiz()");
  }
};

//function to finish quiz and move to score.html page
const finishQuiz = () => {
  console.log(score);
  window.location.href = "score.html";
};

// Function to get the clicked area and check the answer
const getArea = (areaName) => {
  console.log(areaName);
  let nextButton = document.getElementById("next-button");
  nextButton.setAttribute("style", "opacity: 1; cursor: pointer;");
  checkAnswer(areaName);
};

// Function to update the question counter in the UI
const updateQuestionCounter = () => {
  let questionCounter = document.querySelector(".question-counter h4");
  questionCounter.textContent =
    currentQuestionIndex + 1 + "/" + pickedQuestions.length + " questions";
};

// Function to display the user's score and feedback
const displayScore = () => {
  const score = localStorage.getItem("score");
  const usernameDisplay = document.getElementById("usernameDisplay");
  usernameDisplay.textContent = localStorage.getItem("name");

  const scoreDisplay = document.getElementById("scoreDisplay");
  if (score === null || score === undefined || score === NaN || score === 0) {
    scoreDisplay.textContent = 0 + "/" + localStorage.getItem("numOfQuestions");
  } else {
    scoreDisplay.textContent =
      score + " / " + localStorage.getItem("numOfQuestions");
  }
  const scoreMessage = document.getElementById("scoreMessage");

  // Display score message in the HTML
  const numberOfQuestions = localStorage.getItem("numOfQuestions");

  const ratio = (score / numberOfQuestions) * 100;

  if (ratio <= 50.0) {
    scoreMessage.textContent = "Try Harder";
  } else if (ratio > 50.0 && ratio <= 75.0) {
    scoreMessage.textContent = "Can be better";
  } else if (ratio > 75.0 && ratio <= 100.0) {
    scoreMessage.textContent = "Hooooooooorayyyyyyyyy!";
  }
};

// Function to disable the start button until a username is entered
const disableStartButton = () => {
  localStorage.clear();
  document
    .getElementById("get_start_button")
    .setAttribute("style", "opacity: 0.5; cursor: not-allowed;");

  document.getElementById("get_start_button").setAttribute("onclick", "");
  document.getElementById("firstName").addEventListener("input", (event) => {
    // The event handler function will be called when the input value changes
    const inputValue = event.target.value;
    console.log(inputValue);
    if (inputValue.length >= 1) {
      document
        .getElementById("get_start_button")
        .setAttribute("style", "opacity: 1; cursor:pointer;");

      document
        .getElementById("get_start_button")
        .setAttribute("onclick", "storeUserInfo()");
    } else {
      document
        .getElementById("get_start_button")
        .setAttribute("style", "opacity: 0.5; cursor: not-allowed;");
      document.getElementById("get_start_button").setAttribute("onclick", "");
    }
  });
};

// Function to set up a countdown timer for the quiz
const timer = () => {
  let timeleft = 5 * localStorage.getItem("numOfQuestions");
  let downloadTimer = setInterval(function () {
    console.log(timeleft);
    if (timeleft <= 0) {
      clearInterval(downloadTimer);
      document.getElementById("countdown").innerHTML = "Done";
      window.location.href = "score.html";
    } else {
      document.getElementById("countdown").innerHTML = timeleft + " sec";
    }
    timeleft -= 1;
  }, 1000);
};
