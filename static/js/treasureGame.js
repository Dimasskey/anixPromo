let chestOpened = false;
const stepTreasure = document.getElementById('step_10');
const close = document.querySelector('.treasure-game-heading-cross');
const treasureContainer = document.getElementById('treasureGame')
const treasureGift = document.querySelector('.treasure-game-gift__text')

stepTreasure.addEventListener('click',  openTreasureGame = function() {
    treasureContainer.style.display = 'flex';
});

close.addEventListener('click', async function() {
    treasureContainer.style.display = 'none';
    const user = await getCurrentUser ();
    updateGameButtons(user);
});

async function getGiftTreasureGame(chestId, newImageSrc) {
    const chest = document.getElementById(chestId);
    chest.src = newImageSrc;
    chestOpened = true;

    const response = await fetch('https://promo.tdanix.ru/api/users_gifts?game_number=1', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'token': GetCookie("token")
        },
    });
    const result = await response.json();
    if (response.ok) {
        treasureGift.innerHTML = `Поздравляю!<br>Вы выиграли: ${result.data.name}`
    }
}

document.getElementById('chest1').addEventListener('click', function() {
    if (!chestOpened) {
        getGiftTreasureGame('chest1', '../static/images/miniGameImages/openChest1.png');;
    }
});

document.getElementById('chest2').addEventListener('click', function() {
    if (!chestOpened) {
        getGiftTreasureGame('chest2', '../static/images/miniGameImages/openChest2.png');
    }
});

document.getElementById('chest3').addEventListener('click', function() {
    if (!chestOpened) {
        getGiftTreasureGame('chest3', '../static/images/miniGameImages/openChest3.png');
    }
});