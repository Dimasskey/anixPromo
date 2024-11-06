const profileAvatar = document.querySelector('.profile-avatar');
let fio = document.createElement("div");
let addFio = document.createElement("button");
const toyRedCount = parseInt(document.getElementById('toy-red-count').textContent);
const toyGoldCount = parseInt(document.getElementById('toy-gold-count').textContent);
const footerElka = document.querySelector('.footer-elka');

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
            console.log("Текущий пользователь:", user);
            console.log("user.data" ,user.data.games)
            user = user.data
            return user
        } else {
            window.location.href = "/login";
        }
    } catch (error) {
        console.error("Произошла ошибка:", error);
    }
}

function updateDOM(user) {
    console.log(user)
    updateUserName(user)
    updateTree()
    updateGameButtons(user)

}

window.onload = async () => {
    const user = await getCurrentUser ();
    updateDOM(user);
    document.getElementById('onload').style.display = 'none';
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

    games.forEach((game, index) => {
        const gameNumber = index + 1;
        const buttonKey = `step_${gameNumber * 10}`;

        if (buttons[buttonKey]) {
            if (games[index].gift !== null) {
                buttons[buttonKey].removeEventListener('click', treasureHandlers[index]);
                buttons[buttonKey].style.backgroundImage = ('none');
                countGameSuccess += 1
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

// const updateBall = (user) => {
//     let games = user.games
//     const redBall = document.querySelector('.toy-red-icon');
//
//     games.forEach((game, index) => {
//         const gameNumber = index + 1;
//         const buttonKey = `step_${gameNumber * 10}`;
//
//         if (buttons[buttonKey]) {
//             if (games[index].gift !== null) {
//                 buttons[buttonKey].removeEventListener('click', treasureHandlers[index]);
//                 buttons[buttonKey].style.backgroundImage = ('none');
//             }
//         }
//     });
// }

// function show_steps(countSteps) {
//     for (let i = 1; i <= countSteps; i++) {
//         let step = document.getElementById('step_'+i);
//         step.style.display = 'flex';
//     }
// }