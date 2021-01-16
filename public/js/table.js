/**
 * @param {Object} myTable 
 * @param {Array} data 
 * @description Initialize the table
 */
export default function table(myTable,data){
    const tBodyRef = myTable.getElementsByTagName('tbody')[0];    
    data.forEach(element => {
        let newRow = tBodyRef.insertRow();
        let cell1 = newRow.insertCell();
        let cell2 = newRow.insertCell();
        let cell3 = newRow.insertCell();
        var cellData1 = document.createTextNode(element.name);
        var cellData2 = document.createTextNode(element.choice);
        var cellData3 = document.createTextNode(element.submissionDate.slice(0,10));
        cell1.appendChild(cellData1);
        cell2.appendChild(cellData2);
        cell3.appendChild(cellData3);
    });

}