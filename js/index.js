// ARRAY OF WORDS
const words = [
  ["counter strike", "Popular Valve game"],
  ["god hand", "PS2 beat em up game"],
  ["doom", "Classic FPS game"],
  ["wolverine", "Mutant"],
  ["batman", "I'm..."],
  ["berserk", "Best Manga"],
  ["resident evil", "Virus"],
  ["the matrix", "Red or Blue?"],
  ["trees", "Oxygen"],
  ["Shark", "Jaws"],
  ["jesus", "Wine and Bread"],
  ["samurai", "Katana"],
  ["valhalla", "Norse"],
  ["pulp fiction", "Le big mac"],
  ["breaking bad", "Hey yo Mr..."],
  ["spongebob", "Bottom of the sea"],
  ["indiana jones", "Hat and whip"],
  ["james bond", "Not stirred"],
  ["kryptonite", "His only weakness"],
  ["tennis", "back and forth"],
  ["rainbow", "colours"],
  ["moon", "Visited once"],
  ["mortal kombat", "Flawless"],
  ["the rock", "can you smell?"],
  ["crocodile", "Death roll"],
  ["the terminator", "Time travel"],
  ["google", "I find things"],
  ["american psycho", "Business Cards"],
  ["jack the ripper", "Never identified"],
  ["cowboy bebop","Anime"],
  ["world cup","Four Years"]
];

// UI VARIABLES
const heading = document.querySelector("h1");
const form = document.querySelector("form");
const hint = document.querySelector(".hint span");

const inputLetter = document.querySelector(".menu__word");
const inputGuess = document.querySelector(".menu__guess");
const wordContainer = document.querySelector(".word-container");

let divBorder = null;

const guessWord = document.querySelector(".buttons__guess");
const revealWord = document.querySelector(".buttons__reveal");
const newWord = document.querySelector(".buttons__new");
const buttons = document.querySelector(".buttons");

// GAME STATE VARIABLES
let gameOver = false;
let isReveal = false;
let word = null;
let winningTemplate = "";

// SOUND VARIABLES
const soundMP3 = new Audio("./sound/select.mp3");
const soundOGG = new Audio("./sound/select.ogg");

// RANDOM WORD FUNCTION
const randomWord = () => {
  let word = Math.floor(Math.random() * words.length);
  return {
    word: words[word][0],
    hint: words[word][1],
  };
};

// INITIALIZE WORD ON STARTUP
word = randomWord();

// KEYUP CHECK
inputLetter.addEventListener("keyup", (e) => {
  if (e.target.value.length >= 1) {
    check();
    form.reset();
  }
});

// CLICK FUNCTIONS
buttons.addEventListener("click", (e) => {
  // IF GUESS-WORD IS CLICKED
  if ((e.target.className === "buttons__guess") & !gameOver) {
    e.preventDefault();
    if (soundMP3.canPlayType("audio/mpeg")) {
      soundMP3.volume = 0.8;
      soundMP3.play();
    } else {
      soundOGG.volume = 0.8;
      soundOGG.play();
    }
    if (form.guess.value.toLowerCase().trim() === word.word.toLowerCase()) {
      e.preventDefault();
      winningTemplate = "";
      heading.innerText = "You guessed correctly!";
      wordContainer.innerHTML = "";
      gameOver = true;
      inputLetter.setAttribute("disabled", "disabled");
      inputGuess.setAttribute("disabled", "disabled");
      guessWord.setAttribute("disabled", "disabled");
      revealWord.setAttribute("disabled", "disabled");
      newWord.focus();

      for (let i = 0; i < word.word.length; i++) {
        if (word.word[i] === " ") {
          winningTemplate += '<div class="border space"></div>';
        } else {
          winningTemplate += `<div class="border correct-guess">${word.word[i]}</div>`;
        }
      }
    } else {
      form.reset();
      return false;
    }
    wordContainer.innerHTML = winningTemplate;
    form.reset();
    e.preventDefault();
  }
  // IF REVEAL-WORD IS CLICKED
  if ((e.target.className === "buttons__reveal") & !isReveal) {
    isReveal = !isReveal;
    e.preventDefault();
    if (soundMP3.canPlayType("audio/mpeg")) {
      soundMP3.volume = 0.8;
      soundMP3.play();
    } else {
      soundOGG.volume = 0.8;
      soundOGG.play();
    }
    form.reset();
    winningTemplate = "";
    for (let i = 0; i < word.word.length; i++) {
      if (word.word[i] === " ") {
        winningTemplate += '<div class="border space"></div>';
      } else {
        winningTemplate += `<div class="border correct-guess">${word.word[i]}</div>`;
      }
    }
    wordContainer.innerHTML = winningTemplate;
    inputLetter.setAttribute("disabled", "disabled");
    inputGuess.setAttribute("disabled", "disabled");
    guessWord.setAttribute("disabled", "disabled");
    revealWord.setAttribute("disabled", "disabled");
    heading.innerText = "You gave up!";
  } else {
    e.preventDefault();
  }

  // IF PLAY-AGAIN IS CLICKED
  if (e.target.className === "buttons__new") {
    e.preventDefault();
    if (soundMP3.canPlayType("audio/mpeg")) {
      soundMP3.volume = 0.8;
      soundMP3.play();
    } else {
      soundOGG.volume = 0.8;
      soundOGG.play();
    }
    guessWord.removeAttribute("disabled");
    revealWord.removeAttribute("disabled");
    inputLetter.removeAttribute("disabled");
    inputGuess.removeAttribute("disabled");
    inputLetter.focus();
    heading.innerText = "What is the word?";
    word = randomWord();
    displayWord(word);
    form.reset();
    gameOver = false;
    isReveal = false;
  }
});

// DISPLAY INITIAL WORD LENGTH IN DIVS
const displayWord = (word) => {
  let wordTemplate = "";
  for (let i = 0; i < word.word.length; i++) {
    if (word.word[i] === " ") {
      wordTemplate += '<div class="border space"></div>';
    } else {
      wordTemplate += '<div class="border"></div>';
    }
  }
  hint.innerText = word.hint;
  wordContainer.innerHTML = wordTemplate;
  divBorder = document.querySelectorAll(".border");
};

// CALL DISPLAYWORD FUNCTION TO DISPLAY THE DIVS ON SCREEN WHEN PAGE LOADS
displayWord(word);

// CHECK IF USER INPUT MATCHES ANY OF THE CHARACTERS IN THE WORD
const check = () => {
  const userInput = form.word.value.toLowerCase();
  for (let i = 0; i < word.word.length; i++) {
    if (
      (word.word.toLowerCase()[i] === userInput) &
      (word.word.toLowerCase(i)[i] !== " ")
    ) {
      divBorder[i].innerText = word.word[i];
      divBorder[i].classList.add("letter-animation");
    }
  }
};

