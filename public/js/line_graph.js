/**
 * @param {Object} ctx 
 * @param {Array} data 
 * @param {Array} choseYes
 * @param {Array}choseNo
 * @description Renders a line graph on the canvas
 */
export default function lineGraph(ctx, labels, choseYes, choseNo) {
    document.getElementById("line-grap").innerHTML = '&nbsp;';
    document.getElementById("line-grap").innerHTML = '<canvas id="line" width="400" height="400"></canvas>';
    var ctx = document.getElementById("line").getContext("2d");
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Chose Yes',
                borderColor: '#0677A1',
                data: choseYes
            }, {
                label: 'Chose No',
                borderColor: '#4F4A41',
                data: choseNo
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Count'
                    },
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Date"
                    }
                }]
            },
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: "Number of votes for each date"
            }
        }
    });
}