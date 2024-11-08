const soundSwitch = document.getElementById('soundSwitch');
const soundOnImage = '../static/images/globalsImages/soundOnIcon.png';
const soundOffImage = '../static/images/globalsImages/soundOffIcon.png';
const audio = document.getElementById('audio');
const soundOn = document.querySelector(".sound-on")
const soundOff = document.querySelector(".sound-off")

// soundOn.addEventListener('click', () => {
//     localStorage.setItem("sound", "on")
//     document.getElementById("sound-vkl").style.display = 'none';
//     audio.play();
// })
//
// soundOff.addEventListener('click', () => {
//     localStorage.setItem("sound", "off")
//     document.getElementById("sound-vkl").style.display = 'flex';
// })
//
// function playAudio() {
//     audio.play().catch(error => {
//         console.log("Автоматическое воспроизведение заблокировано:", error);
//     });
//     if (localStorage.getItem("sound") === "on") {
//         audio.play()
//     }
// }

soundSwitch.addEventListener('click', function() {
    if (soundSwitch.src.includes('soundOnIcon.png') && !audio.muted) {
        soundSwitch.src = soundOffImage;
        audio.muted = true
        localStorage.setItem("sound", "off")
    } else {
        audio.muted = false
        soundSwitch.src = soundOnImage;
        localStorage.setItem("sound", "on")
    }
});

// window.addEventListener('sound', playAudio);