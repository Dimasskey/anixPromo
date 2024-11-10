const profileAvatar = document.querySelector('.profile-avatar');
let fio = document.createElement("div");
let addFio = document.createElement("button");
const toyRedCount = parseInt(document.getElementById('toy-red-count').textContent);
const toyGoldCount = parseInt(document.getElementById('toy-gold-count').textContent);
const footerElka = document.querySelector('.footer-elka');
const progressBarCount = document.querySelector('.complete-progress-count');

document.querySelector('.pop-up-cross').addEventListener('click', () => {
    document.querySelector('.pop-up-balls-wrapper').style.display = 'none';
})


// function soundFlex() {
//     if (localStorage.getItem("sound") === null) {
//         document.getElementById("sound-vkl").style.display = 'flex';
//     }
// }

function GetCookie(name) {
    const cookieArray = document.cookie.split('; ');
    for (const cookie of cookieArray) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            return cookieValue;
        }
    }
    return null;
}

async function getCurrentUser () {
    let cookie = GetCookie("token");
    try {
        const response = await fetch('https://promo.tdanix.ru/api/users/me', {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'token': cookie,
            },
        });
        if (response.ok) {
            let user = await response.json();
            user = user.data
            console.log(user)
            show_steps(user.count_steps)
            return user
        } else {
            window.location.href = "/login";
        }
    } catch (error) {
        console.error("Произошла ошибка:", error);
    }
}



function updateDOM(user) {
    updateUserName(user)
    updateTree()
    updateGameButtons(user)
    updateProgressBar(user)
}

window.onload = async () => {
    const user = await getCurrentUser ();
    updateDOM(user);
    document.getElementById('onload').style.display = 'none';
    // setTimeout(soundFlex, 500)
};


const updateUserName = (user) => {
    if (user) {
        fio.className = "profile-avatar-fio";
        fio.textContent = user.fio;
        profileAvatar.append(fio);
    } else {
        addFio.className = "profile-avatar-fio";
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

const updateGameButtons = (user) => {
    const games = user.games
    const redBall = document.querySelector('.toy-red-icon');
    let countGameSuccess = 0
    const treasureHandlers = [
        openTreasureGame,
        openTicTacGame,
        openPuzzleGame,
        openWheelGame
    ];

    const buttons = {
        step_10: document.getElementById('step_10'),
        step_20: document.getElementById('step_20'),
        step_30: document.getElementById('step_30'),
        step_40: document.getElementById('step_40')
    };
    if (games.game_1.game_1 === true) {
        countGameSuccess += 1;
        buttons["step_10"].removeEventListener('click', treasureHandlers[0]);
        buttons["step_10"].style.backgroundImage = 'none';
    }

    Object.entries(games).forEach(([key, game], index) => {
        const buttonKey = `step_${(index + 1) * 10}`;
        if (buttons[buttonKey]) {
            if (game === true) {
                buttons[buttonKey].removeEventListener('click', treasureHandlers[index]);
                buttons[buttonKey].style.backgroundImage = 'none';
                buttons[buttonKey].style.backgroundColor = "orange";
                countGameSuccess += 1;
            }
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

const popUpBalls = (user) =>  {
    const popUpBall = document.querySelector('.pop-up-balls-wrapper');
    const imageBall = document.querySelector('.pop-up-balls-image');
    let popUpBallText = document.querySelector('.pop-up-balls-text').textContent;
    let countGameSuccess = 0
    const games = user.games


    if (games.game_1.game_1 === true) {
        countGameSuccess += 1;
    }

    Object.entries(games).forEach(([key, game], index) => {
        if (game === true) {
            countGameSuccess += 1;
        }
    });

    switch (countGameSuccess) {
        case 1: imageBall.src = "../static/images/globalsImages/toyRedPopUp1.png";
                popUpBall.style.display = 'flex';
            break;
        case 2: imageBall.src = "../static/images/globalsImages/toyRedPopUp2.png";
                popUpBall.style.display = 'flex';
            break;
        case 3: imageBall.src = "../static/images/globalsImages/toyRedPopUp3.png";
                popUpBall.style.display = 'flex';
            break;
        case 4: imageBall.src = "../static/images/globalsImages/toyRedPopUpFull.png";
                popUpBallText = "Поздравляем вы собрали шарик и шанс побороться за главные призы!"
                popUpBall.style.display = 'flex';
            break;
    }
}

const updateProgressBar = (user) => {
    const countSteps = user.count_steps;
    let totalSteps, progressPercent;
    if (countSteps <= 40) {
        totalSteps = 40;
        progressBarCount.textContent = `${countSteps} из ${totalSteps}`;
        progressPercent = (countSteps / totalSteps) * 100;
    } else if (countSteps > 40) {
        totalSteps = 20;
        let countStepsSecond = countSteps - 40;
        progressBarCount.textContent = `${countStepsSecond} из ${totalSteps}`;
        progressPercent = (countStepsSecond / totalSteps) * 100;
    }

    const progressBarComplete = document.querySelector('.complete-progress-bar');

    progressBarComplete.style.width= `${progressPercent}%`

}


function show_steps(countSteps) {
    for (let i = 1; i <= countSteps; i++) {
        let step = document.getElementById('step_'+i);
        step.style.display = 'flex';
    }
}