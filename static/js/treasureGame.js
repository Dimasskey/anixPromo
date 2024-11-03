let chestOpened = false;

document.getElementById('step_10').addEventListener('click', function() {
    document.getElementById('treasureGame').style.display = 'flex';
});

document.querySelector('.treasure-game-heading-cross').addEventListener('click', function() {
    document.getElementById('treasureGame').style.display = 'none';
});

function changeChestImage(chestId, newImageSrc) {
    const chest = document.getElementById(chestId);
    chest.src = newImageSrc;
    chestOpened = true;
}

document.getElementById('chest1').addEventListener('click', function() {
    if (!chestOpened) {
        changeChestImage('chest1', '../static/images/miniGameImages/openChest1.png');
    }
});

document.getElementById('chest2').addEventListener('click', function() {
    if (!chestOpened) {
        changeChestImage('chest2', '../static/images/miniGameImages/openChest2.png');
    }
});

document.getElementById('chest3').addEventListener('click', function() {
    if (!chestOpened) {
        changeChestImage('chest3', '../static/images/miniGameImages/openChest3.png');
    }
});