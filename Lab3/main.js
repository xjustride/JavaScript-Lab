const sounds = {
    '1' : document.querySelector(`#s1`),
    '2' : document.querySelector(`#s2`),
    '3' : document.querySelector(`#s3`),
    '4' : document.querySelector(`#s4`),
    '5' : document.querySelector(`#s5`),
    '6' : document.querySelector(`#s6`),
    '7' : document.querySelector(`#s7`),
    '8' : document.querySelector(`#s8`),
    '9' : document.querySelector(`#s9`),
    '0' : document.querySelector(`#s10`)
};

const startButton = document.querySelector(`#startR`);
const stopButton = document.querySelector(`#endR`);
const playButton = document.querySelector(`#playR`);
const playButton1 = document.querySelector(`#playR1`);
const playButton2 = document.querySelector(`#playR2`);
const playButton3 = document.querySelector(`#playR3`);
const playButton4 = document.querySelector(`#playR4`);
const selectChannel1 = document.querySelector(`#selectC1`);
const selectChannel2 = document.querySelector(`#selectC2`);
const selectChannel3 = document.querySelector(`#selectC3`);
const selectChannel4 = document.querySelector(`#selectC4`);
const soundButtons = document.querySelectorAll('.sound-button');

let recordTime = 0;
let isRecording = false;
let currentChannel = 1;
let recordedSounds = [[], [], [], []];

document.addEventListener('keypress', (ev) => {
    playSound(ev.key);
});

soundButtons.forEach(button => {
    button.addEventListener('click', () => {
        const key = button.getAttribute('data-key');
        playSound(key);
    });
});

startButton.addEventListener('click', () => {
    isRecording = true;
    recordTime = Date.now();
    console.log(`Recording started on channel ${currentChannel}`);
});

stopButton.addEventListener('click', () => {
    isRecording = false;
    console.log(`Recording stopped on channel ${currentChannel}`);
});

playButton.addEventListener('click', () => {
    playAllChannels();
});

playButton1.addEventListener('click', () => {
    playChannel(1);
});

playButton2.addEventListener('click', () => {
    playChannel(2);
});

playButton3.addEventListener('click', () => {
    playChannel(3);
});

playButton4.addEventListener('click', () => {
    playChannel(4);
});

selectChannel1.addEventListener('click', () => {
    currentChannel = 1;
    highlightSelectedChannel(1);
    console.log(`Channel 1 selected`);
});

selectChannel2.addEventListener('click', () => {
    currentChannel = 2;
    highlightSelectedChannel(2);
    console.log(`Channel 2 selected`);
});

selectChannel3.addEventListener('click', () => {
    currentChannel = 3;
    highlightSelectedChannel(3);
    console.log(`Channel 3 selected`);
});

selectChannel4.addEventListener('click', () => {
    currentChannel = 4;
    highlightSelectedChannel(4);
    console.log(`Channel 4 selected`);
});

function playSound(key) {
    const sound = sounds[key];
    if (sound) {
        sound.currentTime = 0;
        sound.play();

        if (isRecording) {
            recordedSounds[currentChannel - 1].push({
                key: key,
                time: Date.now() - recordTime
            });
            console.log(`Recorded ${key} on channel ${currentChannel}`);
        }
    }
}

function playChannel(channel) {
    const soundsToPlay = recordedSounds[channel - 1];
    soundsToPlay.forEach((sound) => {
        setTimeout(() => {
            const key = sound.key;
            const soundToPlay = sounds[key];
            if (soundToPlay) {
                soundToPlay.currentTime = 0;
                soundToPlay.play();
                console.log(`Playing ${key} from channel ${channel}`);
            }
        }, sound.time);
    });
}

function playAllChannels() {
    recordedSounds.forEach((soundsToPlay, channelIndex) => {
        soundsToPlay.forEach((sound) => {
            setTimeout(() => {
                const key = sound.key;
                const soundToPlay = sounds[key];
                if (soundToPlay) {
                    soundToPlay.currentTime = 0;
                    soundToPlay.play();
                    console.log(`Playing ${key} from channel ${channelIndex + 1}`);
                }
            }, sound.time);
        });
    });
}

function highlightSelectedChannel(channel) {
    document.querySelectorAll('.select-button').forEach(button => {
        button.classList.remove('selected');
    });
    document.querySelector(`#selectC${channel}`).classList.add('selected');
}
