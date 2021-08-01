$(window).on('load', function() {
    var ctx = $('#myChart');
    var myChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
                ],
            datasets: [{
                label: 'Birthdays Percentage',
                data: [8.52,
                    7.78,
                    8.43,
                    6.64,
                    7.34,
                    7.62,
                    8.34,
                    9.14,
                    9.63,
                    9.22,
                    9.00,
                    8.61
                    ],
                backgroundColor: 'rgba(117, 79, 255, 0.2)',
                borderColor: 'rgba(117, 79, 255, 1)',
                borderWidth: 1
            }]
        },
    });
  })
