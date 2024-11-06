const cells = document.querySelectorAll('.tic-tac-cell');
const playerImage = '../static/images/miniGameImages/crossGameIcon.png';
const computerImage = '../static/images/miniGameImages/circleGameIcon.png';
let currentPlayer = 'player';
let gameActive = true;


document.getElementById('step_20').addEventListener('click', openTicTacGame = function  () {
    document.getElementById('ticTacGame').style.display = 'flex';
});

document.querySelector('.tic-tac-game-heading-cross').addEventListener('click', function() {
    document.getElementById('ticTacGame').style.display = 'none';
});


function checkWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (cells[a].innerHTML && cells[a].innerHTML === cells[b].innerHTML && cells[a].innerHTML === cells[c].innerHTML) {
            setTimeout(() => alert(`${currentPlayer === 'player' ? 'Игрок' : 'Компьютер'} выиграл!`), 100);
            gameActive = false;
            return;
        }
    }


    if ([...cells].every(cell => cell.innerHTML)) {
        setTimeout(() => alert('Ничья!'), 100);
        gameActive = false;
    }
}

function playerMove(cell) {
    if (gameActive && !cell.innerHTML) {
        currentPlayer = 'player';
        cell.innerHTML = `<img src="${playerImage}" alt="Крестик" style="width: 60%; height: 60%;">`;
        checkWin();
        if (gameActive) {
            computerMove();
        }
    }
}

function computerMove() {
    const emptyCells = [...cells].filter(cell => !cell.innerHTML);
    if (emptyCells.length > 0) {
        currentPlayer = "computer"
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        randomCell.innerHTML = `<img src="${computerImage}" alt="Нолик" style="width: 60%; height: 60%;">`;
        checkWin();
    }
}

cells.forEach(cell => {
    cell.addEventListener('click', () => playerMove(cell));
});