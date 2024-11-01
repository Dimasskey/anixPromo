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
            piece.style.opacity = '0.5'; // Уменьшаем непрозрачность при перетаскивании
        }, 0);
    });

    piece.addEventListener('dragend', () => {
        setTimeout(() => {
            draggedPiece.style.opacity = '1'; // Восстанавливаем непрозрачность
            draggedPiece = null;
        }, 0);
    });

    piece.addEventListener('dragover', (e) => {
        e.preventDefault(); // Позволяем сбрасывать элемент
    });

    piece.addEventListener('drop', (e) => {
        e.preventDefault(); // Предотвращаем стандартное поведение

        if (draggedPiece && e.target !== draggedPiece) {
            const targetPiece = e.target;

            // Проверяем, что целевой элемент - это элемент пазла
            if (targetPiece.classList.contains('puzzle-piece')) {
                // Меняем местами элементы в DOM
                const draggedIndex = pieces.indexOf(draggedPiece);
                const targetIndex = pieces.indexOf(targetPiece);

                // Обмениваем местами элементы в DOM
                if (draggedIndex < targetIndex) {
                    puzzleContainer.insertBefore(draggedPiece, targetPiece.nextSibling);
                    puzzleContainer.insertBefore(targetPiece, puzzleContainer.children[draggedIndex]);
                } else {
                    puzzleContainer.insertBefore(targetPiece, draggedPiece);
                    puzzleContainer.insertBefore(draggedPiece, puzzleContainer.children[targetIndex]);
                }

                // Обновляем массив pieces
                pieces[draggedIndex] = targetPiece; // Обновляем индекс перетаскиваемого элемента
                pieces[targetIndex] = draggedPiece; // Обновляем индекс целевого элемента
            }
        }
    });
});

// Функция для перемешивания элементов пазла
function shufflePuzzle() {
    const shuffledPieces = pieces.sort(() => Math.random() - 0.5);
    puzzleContainer.innerHTML = ''; // Очищаем контейнер
    shuffledPieces.forEach(piece => puzzleContainer.appendChild(piece)); // Добавляем перемешанные элементы
}

// Перемешиваем пазл при загрузке страницы
document.addEventListener('DOMContentLoaded', shufflePuzzle);