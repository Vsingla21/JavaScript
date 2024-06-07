//array containing the list of words to choose from
const words = [
    // 'JAVASCRIPT',
    // 'HTML',
    // 'CSS',
    // 'NODE',
    // 'REACT',
    // 'ANGULAR',
    // 'JQUERY',
    // 'VUE',
    'SISTER',
    'MOTHER',
    'BROTHER',
    'FATHER',
    'APPLE',
    'BANANA'
];

// Define the maximum number of incorrect guesses allowed
const maxWrongGuesses = 6;

let wordToGuess = ''; //random word that the player needs to guess
let guessedLetters = []; //array of underscores representing the unguessed letters in the word
let wrongGuesses = 0; //to keep track of number of incorrect guesses the player makes
let imageCount = 1; //to determine which melting snowman image to display

//function to select a random words from the words array
function selectRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

//function to initialize the game
function initializeGame() {
    wordToGuess = selectRandomWord();
    guessedLetters = Array(wordToGuess.length).fill('_');
    wrongGuesses = 0;

    //Update the word display
    updateWordDisplay();

    updateMeltingSnowmanGraphic();

    //remove any previously generated buttons
    const lettersContainer = document.querySelector('.letters');
    while (lettersContainer.firstChild) {
        lettersContainer.removeChild(lettersContainer.firstChild);
    }

    //generate letter buttons
    for (let i = 0; i < 26; i++) {
        const letter = String.fromCharCode(65 + i);
        const button = document.createElement('button');
        button.innerText = letter;
        button.addEventListener('click', function () {
            handleGuess(letter);
        });
        lettersContainer.appendChild(button);
    }

    //clear any previous win/lose message
    const messageContainer = document.querySelector('.message');
    messageContainer.innerText = '';
}

//update the word display
function updateWordDisplay() {
    const wordContainer = document.querySelector('.word');
    wordContainer.innerText = guessedLetters.join(' ');
}

//Handle  a letter guess
function handleGuess(letter) {
    if (guessedLetters.includes(letter)) {
        return;
    }

    // Add the letter to the list of guessed letters
    guessedLetters.forEach((guessedLetter, index) => {
        if (wordToGuess[index] === letter) {
            guessedLetters[index] = letter;
        }
    });

    if (!wordToGuess.includes(letter)) {
        wrongGuesses++;
        updateMeltingSnowmanGraphic();
    }

    updateWordDisplay();

    checkWinOrLose();
}

function updateMeltingSnowmanGraphic() {
    const meltingSnowmanContainer = document.querySelector('.MeltingSnowman');
    meltingSnowmanContainer.innerHTML = `<img src="MeltingSnowman${imageCount}.png" alt="MeltingSnowman ${imageCount}" width= "250px">`;
    imageCount++;
}

function checkWinOrLose() {
    if (guessedLetters.join('') === wordToGuess) {
        const messageContainer = document.querySelector('.message');
        messageContainer.innerHTML = 'You win!';
        const letterButtons = document.querySelectorAll('.letters button');
        letterButtons.forEach(button => {
            button.disabled = true
            button.removeEventListener('click', handleGuess);
        });
    }
    else if (wrongGuesses >= maxWrongGuesses) {
        const messageContainer = document.querySelector('.message');
        messageContainer.innerHTML = `You lose! The word was " ${wordToGuess}".`;
        meltingSnowmanContainer.innerHTML = `<img src="gameover.png" alt="gameover" width="250px">`;
        const letterButtons = document.querySelectorAll('.letters button');
        letterButtons.forEach(button => {
            button.disabled = true;
            button.removeEventListener('click', handleGuess);
        });
    }
}

window.addEventListener('load', initializeGame);




