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
    '0' : document.querySelector(`#s10`),
}

const startButton = document.querySelector(`#startR`);
const stopButton = document.querySelector(`#endR`);
const playButton = document.querySelector(`#playR`);
let recordTime = 0;

addEventListener(`keypress`, (ev) => {
    const key = ev.key;
    // console.log(ev);

    // switch(key) {
    // case `a`: 
    //     clap.currentTime = 0;
    //     clap.play();
    //     break;
    // case `b`: 
    //     kick.currentTime = 0;
    //     kick.play();
    //     break;
    // }
const sound = sounds[key]
sound.currentTime = 0;  
sound.play();
});

let isRecording = false;
let recordedSounds = [];

startButton.addEventListener(`click`, () => {
    isRecording = true;
    recordedSounds = []; // Reset the array when start recording
    recordTime = Date.now();
    console.log(`Recording started`);
    console.log(recordTime);
});

stopButton.addEventListener(`click`, () => {
    isRecording = false;
    console.log(`Recording stopped`);
});

addEventListener(`keypress`, (ev) => {
    const key = ev.key;
    const sound = sounds[key];
    sound.currentTime = 0;  
    sound.play();

    if (isRecording) {
        recordedSounds.push({
            key: key,
            time: Date.now() - recordTime
        });
    }
});

playButton.addEventListener(`click`, () => {
    recordedSounds.forEach((sound) => {
        setTimeout(() => {
            const key = sound.key;
            const soundToPlay = sounds[key];
            soundToPlay.currentTime = 0;
            soundToPlay.play();
        }, sound.time);
    });
}
);