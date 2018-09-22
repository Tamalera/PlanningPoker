/* CARD FLP FUNCTION */
var x = 0;
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
function resetPoints(){
    var array = document.getElementsByClassName("storyPointInput");
    for (var i =0; i < array.length; i++) {
        array[i].value = "";
    }
    document.getElementById("totalpoints").innerHTML = "";
    document.getElementById("average").innerHTML = "";
}
/* END RESET BUTTON */

/* AVERAGE PUNKTE */
function updatevalue(){
    var totalvalue = 0;
    var count = 0;
    var fibos = [0,1,2,3,5,8,13,21,34,55,89,144]
    var array = document.getElementsByClassName("storyPointInput");
    for (var i =0; i < array.length; i++) {
        if( array[i].value != ""){
        
        totalvalue += +array[i].value;
        count += 1;
    }
    document.getElementById("totalpoints").innerHTML = totalvalue;
    console.log(totalvalue, "lol");
    var average = totalvalue / count;
    for (var i =0; i < fibos.length; i++){
        if( average == fibos[i]){
            x = fibos[i];
            console.log("fuck this shit");
        }
        else if(average > fibos[i] && average < fibos[i+1]) {
            console.log(average, fibos[i], fibos[i+1])
            x = fibos[i+1];
        }
        else{
            console.log("mieep");
        }
    }
    document.getElementById("average").innerHTML = x;
    }
}
/* END AVERAGE PUNKTE */

/* ZUSAMMENFASSUNG ANZEIGEN */
function erstelleZuFas(){
    /* Toggle "Export to PDF" btn */
    var exportButton = document.getElementById("exportButton");
    if (exportButton.hidden === true) {
        exportButton.hidden = false;
    } else {
        exportButton.hidden = true;
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
