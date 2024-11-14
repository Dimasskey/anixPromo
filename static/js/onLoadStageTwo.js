
function updateDOM(user) {
    updateUserName(user)
    updateTree()
    updateBalls(user)
    updateProgressBar(user)
    show_steps(user.count_steps)
}


const updateUserName = (user) => {
    if (user.fio) {
        fio.className = "profile-avatar-fio";
        fio.textContent = user.fio;
        profileAvatar.append(fio);
    } else {
        addFio.className = "profile-avatar-add-fio";
        addFio.innerHTML = "Добавить ФИО";
        profileAvatar.append(addFio);
    }
}

const updateTree = () => {

    if (toyRedCount === 0 && toyGoldCount === 0) {
        footerElka.src = '../static/images/globalsImages/treeZeroGif.gif';
    } else if (toyRedCount === 1 && toyGoldCount === 0) {
        footerElka.src = '../static/images/globalsImages/treeOneGif.gif';
    } else if (toyRedCount === 2 && toyGoldCount === 0) {
        footerElka.src = '../static/images/globalsImages/treeTwoGif.gif';
    } else {
        footerElka.src = '../static/images/globalsImages/treeThreeGif.gif';
    }
}

const updateBalls = (user) => {
    const games = user.games
    const redBall = document.querySelector('.toy-red-icon');
    let countGameSuccess = 0

    if (games.game_1.game_1 === true) {
        countGameSuccess += 1;
    }

    Object.entries(games).forEach(([key, game], index) => {
        if (game === true) {
            countGameSuccess += 1;
        }
    });
    switch (countGameSuccess) {
        case 0: redBall.src = "../static/images/globalsImages/toyRed0.png";
            break;
        case 1: redBall.src = "../static/images/globalsImages/toyRed1.png";
            break;
        case 2: redBall.src = "../static/images/globalsImages/toyRed2.png";
            break;
        case 3: redBall.src = "../static/images/globalsImages/toyRed3.png";
            break;
        case 4: redBall.src = "../static/images/globalsImages/toyRedFull.png";
            break;
    }
}

const updateProgressBar = (user) => {
    const countSteps = user.count_steps;
    let totalSteps, progressPercent;
    totalSteps = 20;
    let countStepsSecond = countSteps - 40;
    progressBarCount.textContent = `${countStepsSecond} из ${totalSteps}`;
    progressPercent = (countStepsSecond / totalSteps) * 100;


    const progressBarComplete = document.querySelector('.complete-progress-bar');

    progressBarComplete.style.width= `${progressPercent}%`

}

function show_steps(countSteps) {
    for (let i = 41; i <= countSteps; i++) {
        let step = document.getElementById('step_'+i);
        step.style.display = 'flex';
    }
}

const suppliers = document.querySelectorAll('.suppliers__image');
suppliers.forEach(supplier => {
    supplier.addEventListener('click', function() {
        const supplierId = this.getAttribute('supplier-id');
        window.location.href = `/suppliers/?id=${supplierId}`;
    });
});

const checkCountSteps = (user) => {
    if (user.count_steps < 40) {
        window.location.href = "/"
    }
}

window.addEventListener('load',   async () => {
    const user = await getCurrentUser ();
    // checkCountSteps(user)
    updateDOM(user);
    document.getElementById('onload').style.display = 'none';
});

const profileAvatar = document.querySelector('.profile-avatar');
let fio = document.createElement("div");
let addFio = document.createElement("button");
const toyRedCount = parseInt(document.getElementById('toy-red-count').textContent);
const toyGoldCount = parseInt(document.getElementById('toy-gold-count').textContent);
const footerElka = document.querySelector('.footer-elka');
const progressBarCount = document.querySelector('.complete-progress-count');