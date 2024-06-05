let aktualny = 0;
const slajdy = document.querySelectorAll('.slajd');
const kropki = document.querySelectorAll('.kropka');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const start = document.querySelector('.start');
const stop = document.querySelector('.stop');



const lenSlaid = slajdy.length;
let intervalId; 

function aktualizujSlajd(indeks) {
    aktualny = (indeks + lenSlaid) % lenSlaid;
    const x = -aktualny * 100;
    document.querySelector('.box').style.transform = `translateX(${x}%)`;
    zaktualizujKropki();
}

function zaktualizujKropki() {
    kropki.forEach((kropka, indeks) => {
        if (indeks === aktualny) {
            kropka.classList.add('aktywna');
        } else {
            kropka.classList.remove('aktywna');
        }
    });
}

next.addEventListener('click', () => {
    aktualizujSlajd(aktualny + 1);
});

prev.addEventListener('click', () => {
    aktualizujSlajd(aktualny - 1);
});

kropki.forEach((kropka, indeks) => {
    kropka.addEventListener('click', () => {
        aktualizujSlajd(indeks);
    });
});

function startSlider() {
    intervalId = setInterval(() => {
        aktualizujSlajd(aktualny + 1);
    }, 1000);
}

function stopSlider() {
    clearInterval(intervalId);
}

startSlider();

start.addEventListener('click', () => {
    stopSlider(); 
    startSlider(); 
});

stop.addEventListener('click', () => {
    stopSlider();
});

zaktualizujKropki();
