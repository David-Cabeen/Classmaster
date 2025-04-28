const timeDisplay = document.getElementById('time');
const pauseButton = document.getElementById('pause');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const workTimeInput = document.getElementById('work-time');
const breakTimeInput = document.getElementById('break-time');
const controlsToggle = document.getElementById('controls-toggle');
const controls = document.querySelector('.hidden-controls');
let timer = null; //Variable para acceder al temporizador globalmente
let timeLeft = 0;
let isPaused = null; // Variable es null al empezar y luego se pone en verdadero
let currentTime = null;
let active = false; // Variable para controlar el estado de los controles
let rotateValue = -360; // Valor de rotación inicial para el botón de reinicio
let circleAngle = 100; // Variable para el ángulo del círculo
let cyclesCompleted = 0 // Variable para calcular los ciclos
let circleInterval = null // Variable para detener el intervalo globalmente

startButton.addEventListener('click', function () {
    if (isPaused == null){
        timeLeft = workTimeInput.value * 60;
    } else if (isPaused == true) {
        timeLeft = currentTime;
    }
    isPaused = false
    if(cyclesCompleted==0){
        
        circleAnim()
        timer = setInterval(() => {
            if (timeLeft == 0){
                document.querySelector(':root').style.setProperty('--primary-color', '#0099ff')
                timeLeft = breakTimeInput.value * 60;
                cyclesCompleted ++;
                circleText.textContent = 'Es hora de \n un descanso';
                showCircleText();
                circleAnim();
            }
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
            timeLeft --;
        }, 1000);
    };
});

function showCircleText() {
    circleText.style.opacity = 1
    setTimeout(() => {
        circleText.style.opacity = 0
    }, 2000);
}

function circleAnim() {
    let localTime = timeLeft * 100
    setTimeout(() => {
        circleInterval = setInterval(() => {
            if(circleAngle == 0) {
                clearInterval(circleInterval)
            }
            circleAngle = localTime  / (workTimeInput.value * 60);
            localTime --
            document.querySelector(":root").style.setProperty("--circleAngle", `${circleAngle}%`);
        }, 10);
    }, 1000);
}

pauseButton.addEventListener('click', function () {
    if (timer){
        clearInterval(timer);
        clearInterval(circleInterval);
        currentTime = timeLeft;
        isPaused = true;
    }
});

resetButton.addEventListener('click', function () {
    if (timeLeft !== 0) {
        clearInterval(circleInterval);
        clearInterval(timer);
        resetButton.style.rotate = `${rotateValue}deg`;
        rotateValue -= 360;
        circleRotateBack();
        timeBack();
    }
});

function circleRotateBack() {
    let distanceLeft = 100 - circleAngle;
    let interval = distanceLeft / 100;
    console.log(interval)
    setInterval((back) => {
        if (circleAngle >= 100) {
            clearInterval(back);
            return;
        } else {
            circleAngle ++;
            document.querySelector(":root").style.setProperty("--circleAngle", `${circleAngle}%`);
        };
    }, interval);
}

function timeBack() {
    let interval = (100 - (timeLeft  / (workTimeInput.value * 60))) / 100;
    console.log(interval)
    setInterval((timeBack) => {
        if (timeLeft >= workTimeInput.value * 60) {
            clearInterval(timeBack);
            return;
        } else {
            timeLeft ++;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        };
    }, interval);
}

controlsToggle.addEventListener('click', function() {
    controlsToggle.classList.toggle('active');
    const controls = document.querySelectorAll('.controls input');
    if (!active) {
        controlsToggle.nextElementSibling.classList.add('deployed');
        controls.forEach(control => {
            control.classList.remove('hidden');
            setTimeout(() => {
                control.style.translate =  '125%';
            }, 0);
        });
        active = true;
    } else {
        controlsToggle.nextElementSibling.classList.remove('deployed');
        controls.forEach(control => {
            control.style.translate = '-500%';
        setTimeout(() => {
            control.classList.add('hidden');
        }, 500);
        });
        active = false;
    }
});

// Editar el valor de los controles con el scroll
controls.addEventListener('wheel', function (e) {
    const minValue = 1;
    const maxValue = 60;
    const p = controls.parentElement.querySelector('p');

    let currentValue = parseInt(e.target.value);

    if (checkScrollDirectionIsUp(e)) {
        currentValue = Math.min(currentValue + 1, maxValue); 
    } else {
        currentValue = Math.max(currentValue - 1, minValue);
    }

    e.target.value = currentValue;

    timeDisplay.textContent = `${workTimeInput.value}:00`;

    // Poner una descripción del control que se está editando
    switch (e.target.id) {
        case 'work-time':
            p.textContent = 'Tiempo de trabajo';
            break;
        case 'break-time':
            p.textContent = 'Tiempo de descanso';
            break;
        case 'long-break-time':
            p.textContent = 'Tiempo de descanso largo';
            break;
        case 'cycles':
            p.textContent = 'Cantidad de ciclos';
            break;
    }
    if (p.style.opacity == 0) {
        p.style.opacity = 1;
        setTimeout(() => {
            p.style.opacity = 0;
        }, 5000);
    }

    function checkScrollDirectionIsUp(event) {
        if (event.wheelDelta) {
            return event.wheelDelta > 0;
        }
        return event.deltaY < 0;
    }
});