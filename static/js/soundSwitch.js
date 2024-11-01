const soundSwitch = document.getElementById('soundSwitch');
const soundOnImage = '../static/images/soundOnIcon.png';
const soundOffImage = '../static/images/soundOffIcon.png';

soundSwitch.addEventListener('click', function() {
    if (soundSwitch.src.includes('soundOnIcon.png')) {
        soundSwitch.src = soundOffImage;
    } else {
        soundSwitch.src = soundOnImage;
    }
});