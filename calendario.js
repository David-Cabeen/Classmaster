document.addEventListener('DOMContentLoaded', function () {
    const closeButton = document.getElementById('close');
    const distance = document.getElementById('distance');
    const dayContent = document.getElementById('day-content');
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
    let selectedDateKey = null;
    const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    let currentDate = new Date();
    let today = new Date();
    function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
    monthYear.textContent = `${months[month]} ${year}`;
    daysContainer.innerHTML = '';
    
    //Dias del mes anterior
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDay; i > 0; i--) {
    const dayDiv = document.createElement('div');
    dayDiv.textContent = prevMonthLastDay - i + 1;
    dayDiv.classList.add('fade');
    daysContainer.appendChild(dayDiv);
    };

    //Dias del mes actual
    for (let i = 1; i <= lastDay; i++) {
    const dayDiv = document.createElement('div');
    dayDiv.textContent = i;
    if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
    dayDiv.classList.add('today');
    };
    daysContainer.appendChild(dayDiv);
    };

    //Dias de siguiente mes
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

    closeButton.addEventListener('click', function () {
        events.style.translate = '100%';
        calendar.style.width = '100%';
        setTimeout(() => {
            events.style.boxShadow = 'none';
        }, 300);
    });

    //Abrir ventana de eventos
    daysContainer.addEventListener('click', function (e) {
        if (e.target && e.target.parentElement === daysContainer) {
            events.style.translate = 0;
            events.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
            calendar.style.width = '70%';
            const selectedDay = document.getElementById('day-number');
            selectedDay.textContent = e.target.textContent + ' / ' + months[currentDate.getMonth()] + ' / ' + currentDate.getFullYear();
            distance.textContent = checkDistanceFromToday(e.target.textContent, currentDate.getDate());
            selectedDateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(e.target.textContent).padStart(2, '0')}`;
            loadEvents(selectedDateKey); //Cargar eventos
        }
    });

    //Cargar eventos 
    function loadEvents(dateKey) {
        eventList.innerHTML = ''; 
        const events = JSON.parse(localStorage.getItem(dateKey)) || [];
        events.forEach((event, index) => {
            const li = document.createElement('li');
            li.textContent = event;

            const deleteButton = document.createElement('ion-icon');
            deleteButton.setAttribute('name', 'trash-outline');

            deleteButton.addEventListener('click', (e) => {
                const liElement = e.target.parentElement;
                liElement.style.transition = 'translate 0.3s ease';
                liElement.style.translate = '-100%';
                setTimeout(() => {
                    liElement.remove();
                deleteEvent(dateKey, index);
                }, 300);
            });

            li.appendChild(deleteButton);
            eventList.appendChild(li);

            if (eventList.childElementCount > 0) {
                dayDiv
            };
        });
    };

    //Guardar evento
    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (selectedDateKey) {
            const events = JSON.parse(localStorage.getItem(selectedDateKey)) || [];
            events.push(eventInput.value);
            localStorage.setItem(selectedDateKey, JSON.stringify(events));
            eventInput.value = ''; 
            loadEvents(selectedDateKey);
        }
    });

    //Borrar evento
    function deleteEvent(dateKey, index) {
        const events = JSON.parse(localStorage.getItem(dateKey)) || [];
        events.splice(index, 1); // Remove the event
        localStorage.setItem(dateKey, JSON.stringify(events));
        loadEvents(dateKey); // Reload events
    }

    //Abrir ventana de añadir evento
    eventAdder.addEventListener('click', function () {
        eventWindow.style.display = "block";
        overlay.style.display = "block";
        setTimeout(() => {
            overlay.style.opacity = 1; 
            eventWindow.style.opacity = 1;
            eventWindow.style.top = '50%';
        }, 1);   
    });

    //Cerrar ventana de añadir evento
    closeWindowButton.addEventListener('click', function () {
        eventWindow.style.opacity = 0;
        overlay.style.opacity = 0;
        eventWindow.style.top = '55%';
        setTimeout(() => {
            eventWindow.style.display = "none";
            overlay.style.display = "none";
        }, 300);
    });

    //Error con dias de otros meses
    function checkDistanceFromToday(today, selectedDay){
        let distance = parseInt(today) - parseInt(selectedDay);
        if (distance == 0) {    
            return 'Hoy';
        } else if (distance == 1) {
            return 'Mañana';
        } else if (distance > 1) {
            return 'Faltan ' + distance + ' días';
        } else if (distance == -1) {
            return 'Ayer';
        } else {
            return 'Han pasado ' + (distance*-1) + ' días';
        }
    };
});