const fibos = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
/* CARD FLIP FUNCTION */
function ausWahlBestaetigen() {
    var flipCard = document.getElementById("cardWrapper").children;
    var txt = "";
    var counter = 0;
    /* First element is the paragraph -> start count at 1 */
    for (var i = 1; i < flipCard.length; i++) {
        if (flipCard[i].children[0].checked) {
            counter++;
            txt = txt + flipCard[i].children[0].value.toString() + " ";
        }
    }
    if (counter > 1 || counter === 0) {
        document.getElementById("ausWahlAnzeigen").textContent = "Ungültige Wahl!";
        document.getElementById("ausWahlAnzeigen").className = "my-2 bg-danger text-white";
        
    } else {
        document.getElementById("ausWahlAnzeigen").textContent = "Gewählter SP: " + txt;
        document.getElementById("ausWahlAnzeigen").className = "my-2 bg-success text-white";
    }
}
/* END CARD FLIP FUNCTION */


/* RESET BUTTON */
function resetPoints() {
    var array = document.getElementsByClassName("storyPointInput");
    for (var i =0; i < array.length; i++) {
        array[i].value = "";
    }
    document.getElementById("totalpoints").innerHTML = "";
    document.getElementById("average").innerHTML = "";
}
/* END RESET BUTTON */

/* AVERAGE PUNKTE */
function updatevalue() {
    let x = 0;
    let totalvalue = 0;
    let count = 0;
    let array = document.getElementsByClassName("storyPointInput");
    for (let i = 0; i < array.length; i++) {
        if(punktValidation(array[i].value)){        
            totalvalue += +array[i].value;
            count += 1;
        }
    }

    /* Berechnung des Durchschnitts und Runden auf Fibonacci-Zahl */
    let average = mittelWertBerechnen(totalvalue, count);
    x = rundenAufFibo(average);

    document.getElementById("totalpoints").innerHTML = totalvalue;
    document.getElementById("average").innerHTML = x;

    highlighting();
}
/* END AVERAGE PUNKTE */

/* START MITTELWERT BERECHNEN */
function mittelWertBerechnen(total, zähler){
    if(validate(total, zähler)){
        return average = total/zähler;
    }
    else {
        throw new TypeError("Inputs have to be numbers!");
    } 
}
/* END MITTELWERT BERECHNEN */

/*  Validierung Zahlen für Total Punkte */
function punktValidation(punkt) {
    if(punkt != "" && fibonacciZahl(punkt)){
        return true;
    } else {
        return false;
    }
}
/* END Validierung Zahlen für Total Punkte */

/* CHECK IF FIBONACCIZAHL */
function fibonacciZahl(punkt){
    if(fibos.includes(parseInt(punkt))) {
        return true;
    } else {
        return false;
    }
}
/* END CHECK IF FIBONACCIZAHL */

/* HIGNLIGHTING */
function highlighting() {
    let temp = [];
    let smallest;
    let largest;
    let array = document.getElementsByClassName("storyPointInput");    

    for (let i = 0; i < array.length; i++) {
        if(parseInt(array[i].value) != NaN){
            temp.push(parseInt(array[i].value));
        }
    }

    let sorted = temp.slice().sort(function(a, b) {
        return a - b;
    });

    while(sorted.length > 0){
        if(fibonacciZahl(sorted[0])){
            smallest = sorted[0];
            break;
        } else {
            sorted.shift();
        }
    }   

    while(sorted.length > 0)
    if(fibonacciZahl(sorted[sorted.length - 1])){
        largest = sorted[sorted.length - 1];
        break;
    } else {
        sorted.pop();
    }

    for (let j = 0; j < array.length; j++) {
        if(parseInt(array[j].value) != NaN){
            if(parseInt(array[j].value) === smallest){
                array[j].className = "storyPointInput bg-info text-white";
            } else if(parseInt(array[j].value) === largest)  {
                array[j].className = "storyPointInput bg-warning text-white";
            } else {
                array[j].className = "storyPointInput";
            }
        }
    }

}
/* END HIGNLIGHTING */

/* START RUNDEN AUF FIBONACCI BERECHNEN */
function rundenAufFibo(durchschnitt){
    if(validate(durchschnitt)){
        for (let i =0; i < fibos.length; i++){
            if(durchschnitt == fibos[i]){
                return x = fibos[i];
            }
            if(durchschnitt > fibos[i] && durchschnitt < fibos[i+1]) {
                if(durchschnitt - fibos[i] < fibos[i+1] - durchschnitt){
                    return x = fibos[i];
                }
                else{
                    return x = fibos[i+1];
                }
            }
        }
    }
    else {
        throw new TypeError("Inputs have to be numbers!");
    }
}
/* END RUNDEN AUF FIBONACCI BERECHNEN */

/* Validierung Zahlen für Averaging */
function validate(total, zähler){
    let ok = false;
    if(typeof total === 'number' && (typeof zähler === 'number' || zähler === undefined)){
        ok = true;
    }
    return ok;
}
/* END Validierung Zahlen für Averaging */

/* ZUSAMMENFASSUNG ANZEIGEN */
function erstelleZuFas() {
    /* Toggle "Export to PDF" btn */
    var exportButton = document.getElementById("exportButton");
    var exportcsv  = document.getElementById("exportCSVButton");
    var exportTxt  = document.getElementById("exportTxtButton");
    var exportXls  = document.getElementById("exportXlsButton");

    if (exportButton.hidden === true) {
        exportButton.hidden = false;
        exportcsv.hidden = false;
        exportTxt.hidden = false;
        exportXls.hidden = false;
    } else {
        exportButton.hidden = true;
        exportcsv.hidden = true;
        exportTxt.hidden = true;
        exportXls.hidden = true;
    }

    /* ZUSAMMENFASSUNG ANZEIGEN: Erstmal Table-Div anzeigen */
    var tableContainer = document.getElementById("tableContainer");
    if (tableContainer.hidden === true) {
        tableContainer.hidden = false;
    } else {
        tableContainer.hidden = true;
    }

    /* Sicherstellen, dass Tabelle nicht existiert, sonst doppelt */
    var tabelle = document.getElementById('zusammenfassungTabelle');
    if (typeof tabelle != 'undefined' && tabelle != null)
    {
        tabelle.parentElement.removeChild(tabelle);
    }

    var container = document.getElementById('tableContainer');
    var table = document.createElement('table');
    table.className = "table m-4";
    table.id ="zusammenfassungTabelle";
    var tableHead =  document.createElement('thead');
    tableHead.className = "thead-light";
    var headRow = document.createElement('tr');
    tableHead.appendChild(headRow);
    for (var index = 0; index < 2; index++) {
        var th_td = document.createElement('td');
        if (index === 0) {
            th_td.textContent = "Story Points";
        }
        else {
            th_td.textContent = "Teammitglied";
        }
        th_td.appendChild(document.createTextNode('\u0020'));
        headRow.appendChild(th_td);
    }
    var tableBody = document.createElement('tbody');
    var array = document.getElementsByClassName("teammitglied");
    for (var i = 0; i < array.length; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 2; j++) {
            var td = document.createElement('td');
            if (j === 0) {
                td.textContent = array[i].children[0].value.toString();
            }
            else {
                td.textContent = array[i].children[1].value.toString();
            }
            td.appendChild(document.createTextNode('\u0020'))
            tr.appendChild(td)
        }
        tableBody.appendChild(tr);
    }
    table.appendChild(tableHead);
    table.appendChild(tableBody);
    container.appendChild(table)
}
/* ENDE ZUSAMMENFASSUNG ANZEIGEN */

/* DRUCKEN: Wird momentan nicht benötigt... */
function drucken(title) {
    let fenster = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');
    
    fenster.document.write(`<html><head><title>${title}</title>`);
    fenster.document.write('</head><body >');
    fenster.document.write(document.getElementById('storyPoints').innerHTML);
    fenster.document.write('</body></html>');
    
    // IE-Support
    fenster.document.close();
    fenster.focus();
    
    fenster.print();
    fenster.close();
    
    return true;
}
/* END DRUCKEN */

/* EXPORT ALS PDF */
function exportAlsPdf() {
    var zusammenfassung = new jsPDF();
    zusammenfassung.setFillColor(1);
    /* Inhalt: */
    zusammenfassung.addHTML($('#tableContainer').first(),function(){
         /* Direkt in Chrome als pdf anzeigen */
        zusammenfassung.autoPrint()

        /* Abspeichern */
        zusammenfassung.save('zusammenfassung.pdf')
    });
}
/* END EXPORT ALS PDF */

/* EXPORT ALS CSV */
function exportAlsCSV() {
    var csv= "csv";
    exportFiles(csv);
}
/* END EXPORT ALS CSV */

/* EXPORT ALS TXT */
function exportAlsTxt() {
    var txt = "txt";
    exportFiles(txt);
}
/* END EXPORT ALS TXT */

/* EXPORT ALS XLS */
function exportAlsXls() {
    var xls = "xls";
    exportFiles(xls);
}
/* END EXPORT ALS XLS */
function exportFiles(fileType){
    tempArray = [];
    fullArray = [];
    points = document.getElementsByClassName("storyPointInput");
    names =  document.getElementsByClassName("nameInput");
    for(i = 0; i < points.length; i ++){
            if(points[i].value != "" || names[i].value != ""){
                tempArray.push(points[i].value);
                tempArray.push(names[i].value);
                fullArray.push(tempArray);
            }
            
            tempArray = [];
    }
    var tempFiletype = fileType;
    fileType = 'Punkte,Name \n ';
    fullArray.forEach(function(row) {
        fileType += row.join(',');
        fileType += "\n";
    });
    var hiddenElement = document.createElement('a');
    hiddenElement.href = `data:text/${tempFiletype};charset=utf-8,` + encodeURI(fileType);
    hiddenElement.target = '_blank';
    hiddenElement.download = `PlanningPoker.${tempFiletype}`;
    hiddenElement.click();
}
