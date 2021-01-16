import lineGraph from './line_graph.js';
import barGraph from './bar_graph.js';
import {arrayHelper} from './helper.js';
import table from './table.js';

/**
 * 
 * @param {Object} ctx
 * @description Fetch the line graph data from the server
 */
export function fetchLineGraph(ctx){
    Promise.all([
        fetch("http://localhost:3000/count/Yes"),
        fetch("http://localhost:3000/count/No"),
    ]).then(allResponses => {
        const response1 = allResponses[0].json();
        const response2 = allResponses[1].json();
        Promise.all([response1, response2])
            .then(allresp => {
                let canvas = document.getElementById('line');
                ctx.clearRect(0,0,canvas.width,canvas.height);
                let choseYes = allresp[0].data;
                let choseNo = allresp[1].data;
                let arrays = arrayHelper(choseYes, choseNo);    
                lineGraph(ctx, arrays.dates, arrays.choseYes, arrays.choseNo);
            })
    });

}

/**
 * 
 * @param {Object} ctx
 * @description Fetch the Bar graph data from the server
 */
export function fetchBarGraph(ctx){
    Promise.all([
        fetch("http://localhost:3000/result")
    ]).then(response=>{
        const resp = response[0].json();
        Promise.all([resp])
            .then(allresp=>{
                const gotData = allresp[0].data;   // [{choice:no},{choice:yes}]
                let data = [0,0];
                gotData.forEach(element => {
                    if(element.choice === "Yes") data[1] = element.count;
                    else data[0] = element.count;
                });
                let canvas = document.getElementById('bar');
                ctx.clearRect(0,0,canvas.width,canvas.height);
                barGraph(ctx,data);
            })
    });

}

/**
 * 
 * @param {Object} myTable
 * @description Fetch the Table graph data from the server
 */
export function fetchTable(myTable){
    Promise.all([
        fetch("http://localhost:3000/data")
    ]).then(response=>{
        const resp = response[0].json();
        Promise.all([resp])
            .then(allresp=>{
                const gotData = allresp[0].data;   // [{choice:no},{choice:yes}]
                table(myTable,gotData);
            })
    });

}