const timeDisplay = document.getElementById('time'),
pauseButton = document.getElementById('pause'),
startButton = document.getElementById('start'),
resetButton = document.getElementById('reset'),
workTimeInput = document.getElementById('work-time'),
breakTimeInput = document.getElementById('break-time'),
longBreakTimeInput = document.getElementById('long-break-time'),
cyclesInput = document.getElementById('cycles'),
controlsToggle = document.getElementById('controls-toggle'),
controls = document.querySelector('.hidden-controls');
let timer = null, //Variable para acceder al temporizador globalmente
timeLeft = 0,
isPaused = null, // Variable es null al empezar y luego se pone en verdadero
currentTime = null,
active = false, // Variable para controlar el estado de los controles
rotateValue = -360, // Valor de rotación inicial para el botón de reinicio
circleAngle = 100, // Variable para el ángulo del círculo
cyclesCompleted = 0, // Variable para calcular los ciclos
updateCircle = null; // Variable para detener el intervalo globalmente

// Inicio del timer
startButton.addEventListener('click', function () {
    if (isPaused == null) {
        timeLeft = workTimeInput.value * 60;
        circleAnim(workTimeInput.value);
    } else if (isPaused == true) {
        timeLeft = currentTime;
        circleAnim(currentTime / 60);
    } else return;

    isPaused = false;

    let isWorkPhase = true;
    let completedWorkBreakCycles = 0;

    timer = setInterval(() => {
        if (timeLeft === 0) {
            if (isWorkPhase) {
                isWorkPhase = false;
                timeLeft = breakTimeInput.value * 60;
                document.querySelector(':root').style.setProperty('--primary-color', '#0099ff');
                timeDisplay.textContent = `${breakTimeInput.value}:00`;
                circleAnim(breakTimeInput.value);
            } else {
                isWorkPhase = true;
                completedWorkBreakCycles++;

                if (completedWorkBreakCycles < cyclesInput.value) {
                    timeLeft = workTimeInput.value * 60;
                    document.querySelector(':root').style.setProperty('--primary-color', '#ff6347');
                    timeDisplay.textContent = `${workTimeInput.value}:00`;
                    circleAnim(workTimeInput.value);
                } else {
                    completedWorkBreakCycles = 0;
                    timeLeft = longBreakTimeInput.value * 60;
                    document.querySelector(':root').style.setProperty('--primary-color', '#85e555');
                    timeDisplay.textContent = `${longBreakTimeInput.value}:00`;
                    circleAnim(longBreakTimeInput.value);
                }
            }
        }

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timeLeft--;
    }, 1000);
});

function circleAnim(total) {
    const startTime = performance.now();// Busca el tiempo actual
    const totalTime = total * 60 * 100;
    let pauseTime = 0;
    if (isPaused == true) {
        pauseTime = performance.now() - startTime;
    };
    updateCircle = () => {
        const elapsedTime = (performance.now() - startTime) - pauseTime; // Calcula el tiempo transcurrido
        circleAngle = ((totalTime * 100)/(workTimeInput.value*60*100)) - ((elapsedTime / totalTime)*10);
        document.querySelector(":root").style.setProperty("--circleAngle", `${circleAngle}%`);

        if (circleAngle !== 0 && isPaused == false) {
            requestAnimationFrame(updateCircle); // Continua la animación del círculo
        } else return;
    }

    requestAnimationFrame(updateCircle); // Empieza la animación del círculo
}

// Botón de pausa
pauseButton.addEventListener('click', function () {
    if (timer){
        clearInterval(timer);
        cancelAnimationFrame(updateCircle);
        currentTime = timeLeft;
        isPaused = true;
    }
});

// Botón de reinicio
resetButton.addEventListener('click', function () {
    if (timeLeft !== 0) {
        clearInterval(timer);
        cancelAnimationFrame(updateCircle);
        resetButton.style.rotate = `${rotateValue}deg`;
        rotateValue -= 360;

        // Reset variables
        timeLeft = workTimeInput.value * 60; // Reset timeLeft to the work time input
        circleAngle = 100; // Reset circleAngle to 100%
        document.querySelector(":root").style.setProperty("--circleAngle", `${circleAngle}%`);
        timeDisplay.textContent = `${workTimeInput.value}:00`; // Reset time display
        isPaused = null; // Reset isPaused to null

        // Call reset animations
        circleRotateBack();
        timeBack();
    }
});

function circleRotateBack() {
    let distanceLeft = 100 - circleAngle;
    let interval = distanceLeft / 100;
    console.log(interval)
    const back = setInterval(() => {
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
    const time = setInterval(() => {
        if (timeDisplay.textContent == `${workTimeInput.value}:00`) {
            clearInterval(time);
            return
        } else {
            timeLeft ++;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        };
    }, 10);
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
    currentTime = null;
    isPaused = null;
    document.querySelector(":root").style.setProperty("--circleAngle", `100%`);

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