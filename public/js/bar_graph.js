/**
 * @param {Object} ctx 
 * @param {Array} data 
 * @description Renders a bar graph on the canvas
 */

export default function barGraph(ctx,data){
    document.getElementById("bar-graph").innerHTML = '&nbsp;';
    document.getElementById("bar-graph").innerHTML = '<canvas id="bar" width="400" height="400"></canvas>';
    var ctx = document.getElementById("bar").getContext("2d");
    var chart = new Chart(ctx,{
        type : "bar",
        data:{
            labels:["No","Yes"],
            datasets:[
                {
                    label:"Count",
                    backgroundColor: ["#4F4A41", "#0677A1"],
                    data:data
                }
            ]
        },
        options:{
            scales:{
                yAxes:[{
                    scaleLabel:{
                        display:true,
                        labelString:'Count'
                    },
                    ticks: {
                        beginAtZero:true,
                        stepSize:1
                    }
                }],
                xAxes:[{
                    scaleLabel:{
                        display:true,
                        labelString:"Choice"
                    }
                }]
            },
            legend:{display:false},
            title:{
                display:true,
                text:"Number of votes for each choice"
            },
            responsive: true,
            maintainAspectRatio: false        }
    });
}
