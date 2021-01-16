/**
 * @description Returns the modified arrays
 * @param {Array} choseYes 
 * @param {Array} choseNo 
 */
export function arrayHelper(choseYes,choseNo){
    
    //Get all the dates in our data
    const dates = new Set();
    [...choseNo,...choseYes].forEach(element=>{
        dates.add(element.submissionDate);
    })

    //change date->x and count->y
    for (let i = 0; i < choseYes.length; i++) {
        choseYes[i].x = choseYes[i]['submissionDate'];
        choseYes[i].y = choseYes[i]['count'];
        delete choseYes[i].submissionDate;
        delete choseYes[i].count;
    }

    for (let i = 0; i < choseNo.length; i++) {
        choseNo[i].x = choseNo[i]['submissionDate'];
        choseNo[i].y = choseNo[i]['count'];
        delete choseNo[i].submissionDate;
        delete choseNo[i].count;
    }

    //Add dates if its present in onr and not in other
    Array.from(dates).forEach(date => {
        let found = choseYes.some(el => el.x === date);
        if (!found) choseYes.push({
            x: date,
            y: 0
        });
        found = [];
        found = choseNo.some(el => el.x === date);
        if (!found) choseNo.push({
            x: date,
            y: 0
        });
    });

    //Sort each array according to the dates
    choseYes.sort(function (a, b) {
        return new Date(a.x) - new Date(b.x);
    });
    choseNo.sort(function (a, b) {
        return new Date(a.x) - new Date(b.x);
    });
    return {choseYes:choseYes,choseNo:choseNo,dates:Array.from(dates).sort()};
}

/**
 * 
 * @param {Object} myTable 
 * @param {Array} data 
 * @description Append row to the table
 */
export function addRowToTable(myTable,data){
    const tBodyRef = myTable.getElementsByTagName('tbody')[0];
    let newRow = tBodyRef.insertRow();
    let cell1 = newRow.insertCell();
    let cell2 = newRow.insertCell();
    let cell3 = newRow.insertCell();
    var cellData1 = document.createTextNode(data.name);
    var cellData2 = document.createTextNode(data.choice);
    var cellData3 = document.createTextNode(data.submissionDate.slice(0,10));
    cell1.appendChild(cellData1);
    cell2.appendChild(cellData2);
    cell3.appendChild(cellData3);
}
