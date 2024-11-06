document.getElementById('step_40').addEventListener('click', openWheelGame = function() {
    document.getElementById('wheelGame').style.display = 'flex';
});

document.querySelector('.wheel-game-heading-cross').addEventListener('click', function() {
    document.getElementById('wheelGame').style.display = 'none';
});

function spinWheel() {
    const wheel = document.getElementById('wheel');
    const degreeSegment = 45;
    const randomGift = Math.floor(Math.random() * (9 - 1) + 1);
    wheel.style.transition = 'transform 6s cubic-bezier(0.10, 0, 0, 1)'; // Устанавливаем плавный переход
    wheel.style.transform = `rotate(${(-randomGift * degreeSegment + Math.floor(Math.random() * ((degreeSegment - 1) - 2) + 2) + 3600)}deg)`; // Применяем вращение
}