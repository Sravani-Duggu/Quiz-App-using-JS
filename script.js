const quizData = {
    "General Knowledge": [
      { question: "What is the capital of Japan?", options: ["Seoul", "Beijing", "Tokyo", "Bangkok"], answer: "Tokyo" },
      { question: "What currency is used in the United Kingdom?", options: ["Euro", "Pound", "Dollar", "Yen"], answer: "Pound" },
      { question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Saturn", "Jupiter"], answer: "Mars" },
      { question: "Who wrote the play 'Romeo and Juliet'?", options: ["Charles Dickens", "Jane Austen", "Mark Twain", "William Shakespeare"], answer: "William Shakespeare" },
      { question: "Which ocean is the largest by surface area?", options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], answer: "Pacific Ocean" },
      { question: "What is the national language of Brazil?", options: ["Spanish", "Portuguese", "French", "Italian"], answer: "Portuguese" },
      { question: "How many continents are there on Earth?", options: ["5", "6", "7", "8"], answer: "7" },
      { question: "In which country is the Great Wall located?", options: ["Japan", "China", "Korea", "Mongolia"], answer: "China" },
      { question: "What is the smallest country in the world by land area?", options: ["Monaco", "Vatican City", "Malta", "San Marino"], answer: "Vatican City" },
      { question: "Which is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], answer: "Nile" }
    ],
    "Science": [
      { question: "What is the chemical formula for water?", options: ["H2O", "CO2", "O2", "NaCl"], answer: "H2O" },
      { question: "What is the largest planet in our solar system?", options: ["Earth", "Saturn", "Jupiter", "Mars"], answer: "Jupiter" },
      { question: "Who is known as the father of modern physics?", options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Stephen Hawking"], answer: "Albert Einstein" },
      { question: "Which organ in the human body is responsible for pumping blood?", options: ["Liver", "Heart", "Kidney", "Lung"], answer: "Heart" },
      { question: "Which gas is most abundant in Earth’s atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Hydrogen", "Nitrogen"], answer: "Nitrogen" },
      { question: "What planet is closest to the Sun?", options: ["Venus", "Mars", "Mercury", "Earth"], answer: "Mercury" },
      { question: "What force keeps us on the ground?", options: ["Magnetism", "Gravity", "Friction", "Inertia"], answer: "Gravity" },
      { question: "What is the process by which plants make their own food?", options: ["Respiration", "Digestion", "Photosynthesis", "Fermentation"], answer: "Photosynthesis" },
      { question: "Which part of the cell contains genetic material?", options: ["Cytoplasm", "Cell membrane", "Nucleus", "Ribosome"], answer: "Nucleus" },
      { question: "What is the boiling point of water in Celsius?", options: ["50°C", "100°C", "150°C", "200°C"], answer: "100°C" }
    ],
    "Math": [
      { question: "What is 12 x 12?", options: ["144", "124", "134", "154"], answer: "144" },
      { question: "What is the square root of 49?", options: ["6", "7", "8", "9"], answer: "7" },
      { question: "Solve: 25 + 30 - 15 = ?", options: ["30", "40", "35", "45"], answer: "40" },
      { question: "What is 8 squared (8^2)?", options: ["64", "56", "72", "81"], answer: "64" },
      { question: "Which of the following is an even number?", options: ["13", "25", "44", "71"], answer: "44" },
      { question: "What is 100 divided by 4?", options: ["20", "25", "30", "40"], answer: "25" },
      { question: "What is 15% of 200?", options: ["25", "30", "35", "40"], answer: "30" },
      { question: "Which shape has three sides?", options: ["Square", "Circle", "Triangle", "Rectangle"], answer: "Triangle" },
      { question: "What is the result of 7 x 8?", options: ["56", "48", "60", "72"], answer: "56" },
      { question: "How many degrees are in a right angle?", options: ["45°", "60°", "90°", "180°"], answer: "90°" }
    ],
    "History": [
      { question: "Who discovered America?", options: ["Marco Polo", "Christopher Columbus", "Ferdinand Magellan", "Vasco da Gama"], answer: "Christopher Columbus" },
      { question: "When did World War II end?", options: ["1939", "1941", "1945", "1950"], answer: "1945" },
      { question: "Who was the first president of the United States?", options: ["Thomas Jefferson", "John Adams", "George Washington", "Abraham Lincoln"], answer: "George Washington" },
      { question: "Which Egyptian ruler was known for her beauty and her alliance with Rome?", options: ["Nefertiti", "Cleopatra", "Hatshepsut", "Ramses II"], answer: "Cleopatra" },
      { question: "In which year did the Titanic sink?", options: ["1910", "1912", "1915", "1920"], answer: "1912" },
      { question: "Which ancient civilization built the pyramids?", options: ["Mesopotamian", "Egyptian", "Roman", "Greek"], answer: "Egyptian" },
      { question: "Who wrote the American Declaration of Independence?", options: ["George Washington", "Thomas Jefferson", "John Adams", "James Madison"], answer: "Thomas Jefferson" },
      { question: "Which city was the center of the Renaissance?", options: ["Paris", "London", "Florence", "Rome"], answer: "Florence" },
      { question: "What wall symbolized the division between East and West during the Cold War?", options: ["Great Wall", "Berlin Wall", "Hadrian’s Wall", "Iron Curtain"], answer: "Berlin Wall" },
      { question: "Who was the leader of the Soviet Union during World War II?", options: ["Lenin", "Stalin", "Trotsky", "Khrushchev"], answer: "Stalin" }
    ]
  };

  
let currentCategory = "";
let currentQuestionIndex = 0;
let score = 0;
let timerInterval;

function startQuiz(category) {
  currentCategory = category;
  currentQuestionIndex = 0;
  score = 0;
  
  document.getElementById("category-selection").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";

  nextQuestion();
  startTimer();
}

function nextQuestion() {
  const questionData = quizData[currentCategory][currentQuestionIndex];
  document.getElementById("question-text").textContent = questionData.question;
  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  questionData.options.forEach(option => {
    const optionButton = document.createElement("button");
    optionButton.textContent = option;
    optionButton.onclick = () => selectAnswer(option);
    optionsContainer.appendChild(optionButton);
  });

  updateProgressBar();
}

function selectAnswer(answer) {
  const correctAnswer = quizData[currentCategory][currentQuestionIndex].answer;
  if (answer === correctAnswer) score++;
  
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData[currentCategory].length) {
    nextQuestion();
  } else {
    endQuiz();
  }
}

function startTimer() {
  let timeLeft = 15;
  document.getElementById("time-left").textContent = timeLeft;
  
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("time-left").textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

function updateProgressBar() {
  const progressBar = document.getElementById("progress-bar");
  progressBar.innerHTML = "";
  const bar = document.createElement("div");
  
  bar.className = `${currentCategory.toLowerCase().replace(" ", "-")}-progress`;
  bar.style.width = `${((currentQuestionIndex + 1) / quizData[currentCategory].length) * 100}%`;
  progressBar.appendChild(bar);
}

function endQuiz() {
  clearInterval(timerInterval);
  document.getElementById("quiz-container").style.display = "none";
  const resultContainer = document.getElementById("result");
  resultContainer.style.display = "block";
  document.getElementById("score").textContent = `${score} / ${quizData[currentCategory].length}`;

  const highScoreThreshold = 7;
  if (score >= highScoreThreshold) {
    showCelebration();
  }
}

function showCelebration() {
  const celebrationContainer = document.getElementById("celebration");
  celebrationContainer.style.display = "block";

  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;
    confetti.style.backgroundColor = randomColor();

    celebrationContainer.appendChild(confetti);
  }

  const highScoreMessage = document.getElementById("high-score-message");
  highScoreMessage.textContent = "🎉 Congratulations! You scored high! 🎉";
}

function randomColor() {
  const colors = ["#FF5733", "#FFBD33", "#28B463", "#5DADE2", "#AF7AC5"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function resetQuiz() {
  document.getElementById("result").style.display = "none";
  document.getElementById("celebration").style.display = "none";
  document.getElementById("category-selection").style.display = "block";
}