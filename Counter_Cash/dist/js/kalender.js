document.addEventListener("DOMContentLoaded", function() {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: getEventsFromLocalStorage(), // Function to load events
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        dateClick: function(info) {
            const description = prompt("Masukkan deskripsi transaksi:");
            const amount = parseFloat(prompt("Masukkan jumlah transaksi:"));
            const category = prompt("Masukkan kategori transaksi:");
            const type = prompt("Masukkan tipe transaksi (income/expense):");

            const newTransaction = {
                title: description,
                start: info.dateStr,
                amount: amount,
                category: category,
                type: type
            };

            saveEventToLocalStorage(newTransaction);
            calendar.addEvent(newTransaction);
        }
    });

    calendar.render();

    function getEventsFromLocalStorage() {
        const records = JSON.parse(localStorage.getItem('records')) || [];
        return records.map(record => ({
            title: record.description,
            start: record.date,
            backgroundColor: record.type === 'income' ? 'green' : 'red',
            borderColor: record.type === 'income' ? 'green' : 'red',
            amount: record.amount,
            category: record.category,
            type: record.type
        }));
    }

    function saveEventToLocalStorage(event) {
        const records = JSON.parse(localStorage.getItem('records')) || [];
        records.push({
            description: event.title,
            date: event.start,
            amount: event.amount,
            category: event.category,
            type: event.type
        });
        localStorage.setItem('records', JSON.stringify(records));
    }

    // Handle sidebar toggle
    const sidebarToggle = document.querySelector(".sidebar-toggle");
    const sidebarMenu = document.querySelector(".sidebar-menu");
    const sidebarOverlay = document.querySelector(".sidebar-overlay");

    sidebarToggle.addEventListener("click", () => {
        sidebarMenu.classList.toggle("active");
        sidebarOverlay.classList.toggle("active");
    });

    sidebarOverlay.addEventListener("click", () => {
        sidebarMenu.classList.remove("active");
        sidebarOverlay.classList.remove("active");
    });
});