const puzzleContainer = document.querySelector('.puzzle-board');
const pieces = Array.from(document.querySelectorAll('.puzzle-piece'));
let draggedPiece = null;

document.getElementById('step_30').addEventListener('click', function() {
    document.getElementById('puzzleGame').style.display = 'flex';
});

document.querySelector('.puzzle-game-heading-cross').addEventListener('click', function() {
    document.getElementById('puzzleGame').style.display = 'none';
});

// Обработка перетаскивания
pieces.forEach(piece => {
    piece.addEventListener('dragstart', (e) => {
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

        if (draggedPiece && e.target !== draggedPiece) {
            const targetPiece = e.target;

            if (targetPiece.classList.contains('puzzle-piece')) {

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
            }
        }
    });
});

function shufflePuzzle() {
    const shuffledPieces = pieces.sort(() => Math.random() - 0.5);
    puzzleContainer.innerHTML = '';
    shuffledPieces.forEach(piece => puzzleContainer.appendChild(piece));
}

document.addEventListener('DOMContentLoaded', shufflePuzzle);