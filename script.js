let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [
  { question: "What is HTML?", answer: "A markup language for web pages" }
];

let currentIndex = 0;

const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const card = document.getElementById("card");
const modal = document.getElementById("modal");

function saveToLocalStorage() {
  localStorage.setItem("flashcards", JSON.stringify(flashcards));
}

function displayCard() {
  questionEl.textContent = flashcards[currentIndex].question;
  answerEl.textContent = flashcards[currentIndex].answer;
  card.classList.remove("flip");
}

displayCard();

/* Flip card */
document.getElementById("showAnswerBtn").addEventListener("click", () => {
  card.classList.toggle("flip");
});

/* Navigation */
document.getElementById("nextBtn").addEventListener("click", () => {
  if (currentIndex < flashcards.length - 1) {
    currentIndex++;
    displayCard();
  }
});

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    displayCard();
  }
});

/* Delete card */
document.getElementById("deleteBtn").addEventListener("click", () => {
  if (flashcards.length > 1) {
    flashcards.splice(currentIndex, 1);
    currentIndex = Math.max(0, currentIndex - 1);
    saveToLocalStorage();
    displayCard();
  }
});

/* Dark mode */
document.getElementById("darkModeBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

/* Open modal */
document.getElementById("addCardBtn").addEventListener("click", () => {
  modal.classList.remove("hidden");
});

/* Close modal */
document.getElementById("closeModalBtn").addEventListener("click", () => {
  modal.classList.add("hidden");
});

/* Save new card */
document.getElementById("saveCardBtn").addEventListener("click", () => {
  const q = document.getElementById("questionInput").value;
  const a = document.getElementById("answerInput").value;

  if (q && a) {
    flashcards.push({ question: q, answer: a });
    currentIndex = flashcards.length - 1;
    saveToLocalStorage();
    displayCard();

    document.getElementById("questionInput").value = "";
    document.getElementById("answerInput").value = "";
    modal.classList.add("hidden");
  }
});
