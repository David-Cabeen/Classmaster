document.addEventListener('DOMContentLoaded', function () {
    const closeButton = document.getElementById('close');
    const distance = document.getElementById('distance');
    const events = document.getElementById('events');
    const calendar = document.getElementById('calendar');
    const monthYear = document.getElementById('month-year');
    const daysContainer = document.getElementById('days');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const eventForm = document.getElementById('event-form');
    const eventAdder = document.getElementById('event-adder');
    const eventWindow = document.getElementById('event-window');
    const eventInput = document.getElementById('event-input');
    const eventList = document.getElementById('event-list');
    const closeWindowButton = document.getElementById('close-event');
    let selectedDay = document.getElementById('day-number');
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    let currentDate = new Date();
    let today = new Date();

    // Renderizar el calendario
    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();
        monthYear.textContent = `${months[month]} ${year}`;
        daysContainer.innerHTML = '';

        // Días del mes anterior
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = firstDay; i > 0; i--) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = prevMonthLastDay - i + 1;
            dayDiv.classList.add('fade');
            daysContainer.appendChild(dayDiv);
        }

        // Días del mes actual
        for (let i = 1; i <= lastDay; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = i;

            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayDiv.classList.add('today');
            }
            daysContainer.appendChild(dayDiv);
        }

        // Días del siguiente mes
        const nextMonthStartDay = 7 - new Date(year, month + 1, 0).getDay() - 1;
        for (let i = 1; i <= nextMonthStartDay; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = i;
            dayDiv.classList.add('fade');
            daysContainer.appendChild(dayDiv);
        }
    }

    prevButton.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextButton.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    renderCalendar(currentDate);



    // Cerrar ventana de eventos
    closeButton.addEventListener('click', function () {
        events.style.translate = '100%';
        calendar.style.width = '100%';
        setTimeout(() => {
            events.style.boxShadow = 'none';
        }, 300);
        daysContainer.querySelectorAll('div').forEach(div => {
            div.classList.remove('selected');
        }
        );
    });

    // Abrir ventana de eventos
    daysContainer.addEventListener('click', function (e) {
        if (e.target && e.target.parentElement === daysContainer) {
            if (e.target.classList.contains('fade')) {
                return;
            }
            events.style.translate = 0;
            events.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
            calendar.style.width = '70%';
            selectedDay.textContent = e.target.textContent + ' / ' + months[currentDate.getMonth()] + ' / ' + currentDate.getFullYear();
            distance.textContent = checkDistanceFromToday(currentDate.getDate(), selectedDay.textContent);
            daysContainer.querySelectorAll('div').forEach(div => {
                div.classList.remove('selected');
            }
            );
            e.target.classList.add('selected');
            loadEvent(); // Cargar eventos para el día seleccionado
        }
    });

    // Crear evento
    eventForm.addEventListener('submit', function (e) {
        e.preventDefault();
        let li = document.createElement('li');
        li.innerHTML = eventInput.value;

        // Crear botón de eliminar
        let deleteButton = document.createElement('ion-icon');
        deleteButton.setAttribute('name', 'trash-outline');
        deleteButton.addEventListener('click', (e) => {
            const liElement = e.target.parentElement;
            liElement.style.transition = 'translate 0.3s ease';
            liElement.style.translate = '-100%';
            setTimeout(() => {
                liElement.remove();
                saveEvent();
            }, 300);
        });
        li.appendChild(deleteButton);

        eventList.appendChild(li);
        saveEvent();
        eventInput.value = '';
    });

    // Guardar eventos en localStorage
    function saveEvent() {
        const events = JSON.parse(localStorage.getItem('events')) || {};
        events[selectedDay.textContent] = eventList.innerHTML;
        localStorage.setItem('events', JSON.stringify(events));
    }

    // Cargar eventos desde localStorage
    function loadEvent() {
        const events = JSON.parse(localStorage.getItem('events')) || {};
        eventList.innerHTML = events[selectedDay.textContent] || '';

        const deleteButtons = eventList.querySelectorAll('ion-icon[name="trash-outline"]');
        deleteButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                const liElement = e.target.parentElement;
                liElement.style.transition = 'translate 0.3s ease';
                liElement.style.translate = '-100%';
                setTimeout(() => {
                    liElement.remove();
                    saveEvent();
                }, 300);
            });
        });
    }

    // Abrir ventana de añadir evento
    eventAdder.addEventListener('click', function () {
        eventWindow.style.display = "block";
        overlay.style.display = "block";
        setTimeout(() => {
            overlay.style.opacity = 1;
            eventWindow.style.opacity = 1;
            eventWindow.style.top = '50%';
        }, 1);
    });

    // Cerrar ventana de añadir evento
    closeWindowButton.addEventListener('click', function () {
        eventWindow.style.opacity = 0;
        overlay.style.opacity = 0;
        eventWindow.style.top = '55%';
        setTimeout(() => {
            eventWindow.style.display = "none";
            overlay.style.display = "none";
        }, 300);
    });



    // Calcular distancia desde hoy
    function checkDistanceFromToday(today, selectedDay) {
        selectedDay = selectedDay.split(' / ');
        let distance = 0;
        switch (selectedDay[1]) {
            case 'Enero':
                selectedDay[1] = 1;
                break;
            case 'Febrero':
                selectedDay[1] = 2;
                break;
            case 'Marzo':
                selectedDay[1] = 3;
                break;
            case 'Abril':
                selectedDay[1] = 4;
                break;
            case 'Mayo':
                selectedDay[1] = 5;
                break;
            case 'Junio':
                selectedDay[1] = 6;
                break;
            case 'Julio':
                selectedDay[1] = 7;
                break;
            case 'Agosto':
                selectedDay[1] = 8;
                break;
            case 'Septiembre':
                selectedDay[1] = 9;
                break;
            case 'Octubre':
                selectedDay[1] = 10;
                break;
            case 'Noviembre':
                selectedDay[1] = 11;
                break;
            case 'Diciembre':
                selectedDay[1] = 12;
                break;
        }
        //console.log(selectedDay[1], currentDate.getMonth() + 1);
        //console.log(currentDate)
        if (selectedDay[1] == currentDate.getMonth() + 1) {
            distance = parseInt(selectedDay[0]) - parseInt(today);
            return distanceCalc(distance);
        } else {
            let monthDiff = parseInt(selectedDay[1]) - (currentDate.getMonth() + 1);
            let yearDiff = parseInt(selectedDay[2]) - currentDate.getFullYear();
            distance = (monthDiff * 30) + (yearDiff * 365) + (parseInt(selectedDay[0]) - parseInt(today));
            return distanceCalc(distance);
        }
        
        function distanceCalc(distance) {
            if (distance == 0) {
                return 'Hoy';
            } else if (distance == 1) {
                return 'Mañana';
            } else if (distance > 1) {
                return 'Faltan ' + distance + ' días';
            } else if (distance == -1) {
                return 'Ayer';
            } else {
                return 'Han pasado ' + (distance * -1) + ' días';
            }
        };
    };
});