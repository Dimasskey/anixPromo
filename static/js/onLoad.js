
document.addEventListener('DOMContentLoaded', function() {
const toyRedCountElement = document.getElementById('toy-red-count');
const toyRedCount = parseInt(toyRedCountElement.textContent); // Преобразуем текст в число
const toyGoldCountElement = document.getElementById('toy-gold-count');
const toyGoldCount = parseInt(toyGoldCountElement.textContent); // Преобразуем текст в число
const footerElka = document.querySelector('.footer-elka');

if (toyRedCount === 0 && toyGoldCount === 0) {
        footerElka.src = '../static/images/globalsImages/treeZeroGif.gif';
    } else if (toyRedCount === 1 && toyGoldCount === 0) {
        footerElka.src = '../static/images/globalsImages/treeOneGif.gif';
    } else if (toyRedCount === 2 && toyGoldCount === 0) {
        footerElka.src = '../static/images/globalsImages/treeTwoGif.gif';
    } else {
        footerElka.src = '../static/images/globalsImages/treeThreeGif.gif';
    }
});

function show_steps(countSteps) {
    for (let i = 1; i <= countSteps; i++) {
        let step = document.getElementById('step_'+i);
        step.style.display = 'flex';
    }
}

function updateProgressBar(countSteps, totalSteps) {
    const progressCountElement = document.querySelector('.complete-progress-count');
    const progressBarElement = document.querySelector('.complete-progress-bar');

    progressCountElement.textContent = `${countSteps} из 40`;

    const percentage = (countSteps / totalSteps) * 100;

    progressBarElement.style.width = `${percentage}%`;
}