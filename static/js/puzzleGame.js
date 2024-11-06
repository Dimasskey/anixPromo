const puzzleContainer = document.querySelector('.puzzle-board');
const pieces = Array.from(document.querySelectorAll('.puzzle-piece'));
let draggedPiece = null;
let offsetX, offsetY;
let gameCompleted = false;

document.getElementById('step_30').addEventListener('click', function() {
    document.getElementById('puzzleGame').style.display = 'flex';
});

document.querySelector('.puzzle-game-heading-cross').addEventListener('click', function() {
    document.getElementById('puzzleGame').style.display = 'none';
});

pieces.forEach(piece => {
    piece.addEventListener('dragstart', (e) => {
        if (gameCompleted) return;
        draggedPiece = piece;
        setTimeout(() => {
            piece.style.opacity = '0.5';
        }, 0);
    });

    piece.addEventListener('dragend', () => {
        setTimeout(() => {
            draggedPiece.style.opacity = '1';
            draggedPiece = null;
        }, 0);
    });

    piece.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    piece.addEventListener('drop', (e) => {
        e.preventDefault();
        handleDrop(e.target);
    });
});

pieces.forEach(piece => {
    piece.addEventListener('touchstart', (e) => {
        if (gameCompleted) return;
        draggedPiece = piece;
        const touch = e.touches[0];


        ghostElement = draggedPiece.cloneNode(true);
        ghostElement.style.position = 'absolute';
        ghostElement.style.pointerEvents = 'none';
        ghostElement.style.opacity = '0.7';
        ghostElement.style.zIndex = '1000';
        document.body.appendChild(ghostElement);

        const rect = piece.getBoundingClientRect();
        offsetX = touch.clientX - rect.left;
        offsetY = touch.clientY - rect.top;

        moveAt(touch.pageX, touch.pageY);
        e.preventDefault();
    });

    piece.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        moveAt(touch.pageX, touch.pageY);
    });

    piece.addEventListener('touchend', (e) => {
        const touch = e.changedTouches[0];
        const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);

        if (targetElement && targetElement.classList.contains('puzzle-piece') && targetElement !== draggedPiece) {
            handleDrop(targetElement);
        }

        if (ghostElement) {
            document.body.removeChild(ghostElement);
            ghostElement = null;
        }

        draggedPiece = null;
    });
});

function moveAt(pageX, pageY) {
    if (ghostElement) {
        ghostElement.style.left = `${pageX - offsetX}px`;
        ghostElement.style.top = `${pageY - offsetY}px`;
    }
}

function handleDrop(targetPiece) {
    if (draggedPiece && targetPiece !== draggedPiece) {
        const draggedIndex = pieces.indexOf(draggedPiece);
        const targetIndex = pieces.indexOf(targetPiece);

        if (draggedIndex < targetIndex) {
            puzzleContainer.insertBefore(draggedPiece, targetPiece.nextSibling);
            puzzleContainer.insertBefore(targetPiece, puzzleContainer.children[draggedIndex]);
        } else {
            puzzleContainer.insertBefore(targetPiece, draggedPiece);
            puzzleContainer.insertBefore(draggedPiece, puzzleContainer.children[targetIndex]);
        }

        pieces[draggedIndex] = targetPiece;
        pieces[targetIndex] = draggedPiece;
        checkGameCompletion();
    }
}

function checkGameCompletion() {
    // Проверяем, все ли элементы на своих местах
    const isCompleted = pieces.every((piece, index) => puzzleContainer.children[index] === piece);

    if (isCompleted) {
        gameCompleted = true;
        alert("Игра завершена!");
    }
}

function shufflePuzzle() {
    const shuffledPieces = pieces.sort(() => Math.random() - 0.5);
    puzzleContainer.innerHTML = '';
    shuffledPieces.forEach(piece => puzzleContainer.appendChild(piece));
}

document.addEventListener('DOMContentLoaded', shufflePuzzle);









