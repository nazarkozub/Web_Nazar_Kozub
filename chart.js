// chart.js

const ctx = document.getElementById('myChart');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Ігристе', 'Напівсолодке', 'Нефільтроване', 'Темне', 'Світле', 'Біле'],
        datasets: [{
            label: 'Порівняння цін',
            data: [400, 600, 350, 1000, 650, 440],
            backgroundColor: 'rgba(54, 162, 235, 0.2)', // Задаємо один колір
            borderColor: 'rgba(54, 162, 235, 1)', // Колір рамки
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        responsive: true, // Робимо графік адаптивним
        maintainAspectRatio: false, // Вимикаємо збереження пропорцій
        layout: {
            padding: {
                left: 20, // Збільшуємо відступи для кращого вигляду
                right: 20,
                top: 20,
                bottom: 20
            }
        },
        aspectRatio: 1 // Збільшуємо відношення висоти до ширини графіка
    }
});
