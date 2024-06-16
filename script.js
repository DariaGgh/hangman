document.getElementById('start-game').addEventListener('click', function() {
    const wordLength = parseInt(document.getElementById('word-length').value);
    if (isNaN(wordLength) || wordLength <= 0) {
        alert('Please enter a valid value for the word length.');
        return;
    }
    
    startGame(wordLength);
});

document.getElementById('restart-game').addEventListener('click', function() {
    resetGame();
});

const words = {
    3: ["CAT", "DOG"],
    4: ["FISH", "BIRD"],
    5: ["HORSE", "SHEEP"],
    6: ["MONKEY", "DONKEY"],
    7: ["GIRAFFE", "CROCODILE"]
};

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let selectedWord = '';
let guessedWord = '';
let mistakes = 0;

function startGame(wordLength) {
    const wordList = words[wordLength];
    if (!wordList) {
        alert('We do not have words of this length.');
        return;
    }

    selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
    guessedWord = '_'.repeat(selectedWord.length);
    
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    
    document.getElementById('word').textContent = guessedWord.split('').join(' ');

    generateKeyboard();

    drawHangman();
}

function generateKeyboard() {
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = '';
    for (let letter of letters) {
        const button = document.createElement('button');
        button.textContent = letter;
        button.addEventListener('click', function() {
            checkLetter(letter, button);
        });
        keyboard.appendChild(button);
    }
}

function checkLetter(letter, button) {
    let newGuessedWord = '';
    let guessedCorrectly = false;

    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === letter) {
            newGuessedWord += letter;
            guessedCorrectly = true;
        } else {
            newGuessedWord += guessedWord[i];
        }
    }

    guessedWord = newGuessedWord;
    document.getElementById('word').textContent = guessedWord.split('').join(' ');

    if (guessedCorrectly) {
        button.classList.add('correct');
    } else {
        button.classList.add('incorrect');
        mistakes++;
        drawHangman();
    }

    button.disabled = true;
    button.classList.add('disabled'); // Adăugăm clasa disabled

    if (mistakes >= 10) { // Actualizare număr de greșeli permise
        endGame('You lost! The word was: ' + selectedWord);
    }

    if (guessedWord.indexOf('_') === -1) {
        endGame('You won!');
    }
}

function drawHangman() {
    const canvas = document.getElementById('hangman');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#000';
    ctx.lineWidth = 2;

    // Base
    if (mistakes > 0) ctx.fillRect(10, 180, 80, 10);
    // Pole
    if (mistakes > 1) ctx.fillRect(40, 20, 10, 160);
    // Top bar
    if (mistakes > 2) ctx.fillRect(40, 20, 60, 10);
    // Rope
    if (mistakes > 3) ctx.fillRect(100, 20, 10, 30);
    // Head
    if (mistakes > 4) {
        ctx.beginPath();
        ctx.arc(105, 60, 10, 0, Math.PI * 2);
        ctx.stroke();
    }
    // Body
    if (mistakes > 5) {
        ctx.beginPath();
        ctx.moveTo(105, 70);
        ctx.lineTo(105, 110);
        ctx.stroke();
    }
    // Left arm
    if (mistakes > 6) {
        ctx.beginPath();
        ctx.moveTo(105, 80);
        ctx.lineTo(85, 100);
        ctx.stroke();
    }
    // Right arm
    if (mistakes > 7) {
        ctx.beginPath();
        ctx.moveTo(105, 80);
        ctx.lineTo(125, 100);
        ctx.stroke();
    }
    // Left leg
    if (mistakes > 8) {
        ctx.beginPath();
        ctx.moveTo(105, 110);
        ctx.lineTo(85, 140);
        ctx.stroke();
    }
    // Right leg
    if (mistakes > 9) {
        ctx.beginPath();
        ctx.moveTo(105, 110);
        ctx.lineTo(125, 140);
        ctx.stroke();
    }
}

function endGame(message) {
    document.getElementById('message').textContent = message;
    document.getElementById('restart-container').style.display = 'block';
    const buttons = document.querySelectorAll('#keyboard button');
    buttons.forEach(button => button.disabled = true);
    buttons.forEach(button => button.classList.add('disabled'));
}

function resetGame() {
    mistakes = 0;
    document.getElementById('message').textContent = '';
    document.getElementById('restart-container').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('word-length').value = '';
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = '';
    drawHangman();
}
