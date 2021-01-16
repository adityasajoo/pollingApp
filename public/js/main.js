import { fetchLineGraph,fetchBarGraph,fetchTable } from './fetch.js';
import {addRowToTable} from './helper.js';

var socket = io();
var lineCtx = document.getElementById('line').getContext('2d');
var barCtx = document.getElementById('bar').getContext('2d');
var myTable = document.getElementById('myTable');

//Show the graphs
fetchLineGraph(lineCtx);
fetchBarGraph(barCtx);
fetchTable(myTable);

//socket event
socket.on("pollAdded",(response)=>{
    console.log("New poll added",response);
    fetchLineGraph(lineCtx);
    fetchBarGraph(barCtx);
    addRowToTable(myTable,response);
});


//Handle form
const form = document.getElementById("myform");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = form.name.value;
    const date = form.submissionDate.value;
    const choice = form.choice.value;
    if (name == "" || date == "" || choice == "") {
        M.toast({
            html: 'All fields are madatory !'
        });
    } else {
        var url = 'https://polling-app-adi.herokuapp.com/vote';
        var data = {
            name: name,
            submissionDate: date,
            choice: choice
        };
        fetch(url, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then(response => {
                console.log('Success:', JSON.stringify(response))
                //emit to other users 
                socket.emit("pollAdded",response);
                form.name.value = form.submissionDate.value=form.choice.value = "";
                M.toast({
                    html: 'Poll Added successfully !!'
                });
            })
            .catch(error => console.error('Error:', error));
    }
});

