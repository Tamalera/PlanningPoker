/* 
Author: Florence Meier
Version: 2.5
Last Updated: 30.11.2018
*/

/* GLOBAL CONSTANTS
-----------------------------------------------------------
*/

/* Array of all allowed numbers of the Fibonacci series */
const fibos = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

/* METHODS
-----------------------------------------------------------
*/
/* CARD FLIP FUNCTION */
/* 
This method looks for all cards with id cardWrapper and executes the flipping,
ie a 180° rotation, of the chosen card.
Parameters: none
Return type: none
*/
function ausWahlBestaetigen() {
  var flipCard = document.getElementById("cardWrapper").children;
  var txt = "";
  var counter = 0;
  /* First element is the paragraph -> start count at 1 */
  for (var i = 1; i < flipCard.length; i++) {
    if (flipCard[i].children[0].checked) {
      counter++;
      txt = flipCard[i].children[0].value.toString();
    }
  }
  if (counter === 1) {
    $.cookie("value", txt);
  }
}
/* END CARD FLIP FUNCTION */

/* RESET BUTTON */
/* 
This method resets all relevant elements to the default status.
It removes the value of the storyPoint input fields and 
both total story points and average input fields
Parameters: none
Return type: none
*/
function resetPoints() {
  var array = document.getElementsByClassName("storyPointInput");
  for (var i = 0; i < array.length; i++) {
    array[i].value = "";
    if (array[i].className) {
      array[i].className = "storyPointInput";
    }
  }
  document.getElementById("totalpoints").innerHTML = "";
  document.getElementById("average").innerHTML = "";
}
/* END RESET BUTTON */

/* UPDTE STORY POINTS */
/* 
This method updates the total of story points whenever a story point was added or removed.
It calls the punktValidation which validated, that the value in array is correct and in an allowed format.
It calls the average functions to calculate the average of the story points to update it.
It calls the highlighting function, so the highlighting of the story points is updated whenever a story point changes.
Parameters: none
Return type: none
*/
function updatevalue() {
  let x = 0;
  let totalvalue = 0;
  let count = 0;
  /* Get all story points to an array */
  let array = document.getElementsByClassName("storyPointInput");
  for (let i = 0; i < array.length; i++) {
    /* Check if valid story point to avoid manipulation */
    if (punktValidation(array[i].value)) {
      totalvalue += +array[i].value;
      count += 1;
    }
  }

  /* Calculate the avarage and round to next fibonacci number */
  let average = mittelWertBerechnen(totalvalue, count);
  x = rundenAufFibo(average);

  /* Change values of total and average input fields */
  document.getElementById("totalpoints").innerHTML = totalvalue;
  document.getElementById("average").innerHTML = x;

  /* Adjust the highlighting */
  highlighting();
}
/* END UPDATE STORY POINTS */

/* CALCULATE AVARAGE */
/* 
This method returns the total points devided by the number of points. 
It calls the validate function and returns an error if validation failed.
Parameters: interger, integer
Return type: integer or error
*/
function mittelWertBerechnen(total, zähler) {
  if (validate(total, zähler)) {
    return (average = total / zähler);
  } else {
    throw new TypeError("Inputs have to be numbers!");
  }
}
/* END CALCULATE AVARAGE */

/* VALIDATE THAT POINT BELONGS TO FIBONACCI SERIES */
/* 
This method validated whether the input value is not empty and part of the fibonacci series.
It calls the validation for the fibonacci validation.
Parameters: interger/string
Return type: boolean
*/
function punktValidation(punkt) {
  if (punkt != "" && fibonacciZahl(punkt)) {
    return true;
  } else {
    return false;
  }
}
/* END VALIDATE THAT POINT BELONGS TO FIBONACCI SERIES */

/* CHECK IF FIBONACCIZAHL */
/* 
This method validated whether the input value is part of the fibonacci series.
Parameters: string
Return type: boolean
 */
function fibonacciZahl(punkt) {
  if (fibos.includes(parseInt(punkt))) {
    return true;
  } else {
    return false;
  }
}
/* END CHECK IF FIBONACCIZAHL */

/* HIGNLIGHTING */
/* 
This method highlights the highest and lowest numbers of the story points.
It calls the fibonacci validation function when setting the lowest and highest story piont(s).
The highest story point(s) get(s) highlighted in green.
The lowest story point(s) get(s) highlighted in blue.
Parameters: none
Return type: none
*/
function highlighting() {
  let temp = [];
  let smallest;
  let largest;
  /* Get all story points to an array */
  let array = document.getElementsByClassName("storyPointInput");

  /* Fill temporary array with valid numbers */
  for (let i = 0; i < array.length; i++) {
    if (
      parseInt(array[i].value) != NaN &&
      array[i].value != "-0" &&
      array[i].value != "+0"
    ) {
      temp.push(parseInt(array[i].value));
    }
  }

  /* Sort the temporary array */
  let sorted = temp.slice().sort(function(a, b) {
    return a - b;
  });

  /* Find smallest number */
  while (sorted.length > 0) {
    if (fibonacciZahl(sorted[0])) {
      smallest = sorted[0];
      break;
    } else {
      sorted.shift();
    }
  }

  /* Find highest number */
  while (sorted.length > 0)
    if (fibonacciZahl(sorted[sorted.length - 1])) {
      largest = sorted[sorted.length - 1];
      break;
    } else {
      sorted.pop();
    }

  /* Highlight all story points which correspond to the smallest number blue */
  /* Highlight all story points which correspond to the highest number green */
  /* Leave all story points which do not correspond to the smallest/highest number white */
  for (let j = 0; j < array.length; j++) {
    if (parseInt(array[j].value) != NaN) {
      if (parseInt(array[j].value) === smallest) {
        array[j].className = "storyPointInput bg-info text-white";
      } else if (parseInt(array[j].value) === largest) {
        array[j].className = "storyPointInput bg-success text-white";
      } else {
        array[j].className = "storyPointInput";
      }
    }
  }
}
/* END HIGNLIGHTING */

/* ROUNT TO NEXT FIBONACCI NUMBER */
/* 
This method rounds a number to the next higher number within the fibonacci series.
It calls the validate function to check that the average is of the propper type.
Parameters: integer
Return type: integer or error
*/
function rundenAufFibo(durchschnitt) {
  if (validate(durchschnitt)) {
    for (let i = 0; i < fibos.length; i++) {
      if (durchschnitt == fibos[i]) {
        return (x = fibos[i]);
      }
      if (durchschnitt > fibos[i] && durchschnitt < fibos[i + 1]) {
        if (durchschnitt - fibos[i] < fibos[i + 1] - durchschnitt) {
          return (x = fibos[i]);
        } else {
          return (x = fibos[i + 1]);
        }
      }
    }
  } else {
    throw new TypeError("Inputs have to be numbers!");
  }
}
/* END ROUND TO NEXT FIBONACCI NUMBER */

/* VALIDATE NUMBER */
/* 
This method checks if the input is of type number. The second parameter is optional.
Parameters: any, any
Return type: boolean
*/
function validate(total, zähler) {
  let ok = false;
  if (
    typeof total === "number" &&
    (typeof zähler === "number" || zähler === undefined)
  ) {
    ok = true;
  }
  return ok;
}
/* END VALIDATE NUMBER */

/* SHOW SUMMARY AND TOGGLE BUTTONS */
/* 
This method toggles the buttons for exporting files and displays the summary as graph and as table.
Parameters: none
Return type: none
*/
function erstelleZuFas() {
  generateGraph();
  /* Toggle buttons */
  var exportButton = document.getElementById("exportButton");
  var exportcsv = document.getElementById("exportCSVButton");
  var exportTxt = document.getElementById("exportTxtButton");
  var exportXls = document.getElementById("exportXlsButton");

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

  /* Toggle table with summary */
  var tableContainer = document.getElementById("tableContainer");
  if (tableContainer.hidden === true) {
    tableContainer.hidden = false;
  } else {
    tableContainer.hidden = true;
  }

  /* Create table if unexistant, this check is necessary,
  because otherwise the table will be created multiple times */
  var tabelle = document.getElementById("zusammenfassungTabelle");
  if (typeof tabelle != "undefined" && tabelle != null) {
    tabelle.parentElement.removeChild(tabelle);
  }

  /* Fill table with data */
  var container = document.getElementById("tableContainer");
  var table = document.createElement("table");
  table.className = "table m-4";
  table.id = "zusammenfassungTabelle";
  var tableHead = document.createElement("thead");
  tableHead.className = "thead-light";
  var headRow = document.createElement("tr");
  tableHead.appendChild(headRow);
  for (var index = 0; index < 2; index++) {
    var th_td = document.createElement("td");
    if (index === 0) {
      th_td.textContent = "Story Points";
    } else {
      th_td.textContent = "Teammitglied";
    }
    th_td.appendChild(document.createTextNode("\u0020"));
    headRow.appendChild(th_td);
  }
  var tableBody = document.createElement("tbody");
  var array = document.getElementsByClassName("teammitglied");
  for (var i = 0; i < array.length; i++) {
    var tr = document.createElement("tr");
    for (var j = 0; j < 2; j++) {
      var td = document.createElement("td");
      if (j === 0) {
        td.textContent = array[i].children[0].value.toString();
      } else {
        td.textContent = array[i].children[1].value.toString();
      }
      td.appendChild(document.createTextNode("\u0020"));
      tr.appendChild(td);
    }
    tableBody.appendChild(tr);
  }
  table.appendChild(tableHead);
  table.appendChild(tableBody);
  container.appendChild(table);
}
/* END SHOW SUMMARY AND TOGGLE BUTTONS */

/* PRINT */
/* 
This method is for printing the summary table.
Parameters: string
Return type: boolean
*/
function drucken(title) {
  let fenster = window.open(
    "",
    "PRINT",
    "height=650,width=900,top=100,left=150"
  );

  fenster.document.write(`<html><head><title>${title}</title>`);
  fenster.document.write("</head><body >");
  fenster.document.write(document.getElementById("storyPoints").innerHTML);
  fenster.document.write("</body></html>");

  // IE-Support
  fenster.document.close();
  fenster.focus();

  fenster.print();
  fenster.close();

  return true;
}
/* END PRINT */

/* EXPORT AS PDF */
/* 
This method is for the pdf file export. Detailed description from jsPDF.
Parameters: none
Return type: none
*/
function exportAlsPdf() {
  var zusammenfassung = new jsPDF();
  zusammenfassung.setFillColor(1);
  /* Inhalt: */
  zusammenfassung.addHTML($("#tableContainer").first(), function() {
    /* Direkt in Chrome als pdf anzeigen */
    zusammenfassung.autoPrint();

    /* Abspeichern */
    zusammenfassung.save("zusammenfassung.pdf");
  });
}
/* END EXPORT AS PDF */

/* EXPORT AS CSV */
/* 
This method sets the file type to csv and calls the export method.
Parameters: none
Return type: none
*/
function exportAlsCSV() {
  var csv = "csv";
  exportFiles(csv);
}
/* END EXPORT AS CSV */

/* EXPORT AS TXT */
/* 
This method sets the file type to txt and calls the export method.
Parameters: none
Return type: none
*/
function exportAlsTxt() {
  var txt = "txt";
  exportFiles(txt);
}
/* END EXPORT AS TXT */

/* EXPORT AS XLS */
/* 
This method sets the file type to xls and calls the export method.
Parameters: none
Return type: none
*/
function exportAlsXls() {
  var xls = "xls";
  exportFiles(xls);
}
/* END EXPORT AS XLS */

/* EXPORT FILE IN GIVEN FORMAT */
/* 
This method prepares a file in the given file type. 
It gets filled with the story points and the users associated to the story points.
Then this file is exported.
Parameters: string
Return type: none
*/
function exportFiles(fileType) {
  tempArray = [];
  fullArray = [];
  points = document.getElementsByClassName("storyPointInput");
  names = document.getElementsByClassName("nameInput");
  for (i = 0; i < points.length; i++) {
    if (points[i].value != "" || names[i].value != "") {
      tempArray.push(points[i].value);
      tempArray.push(names[i].value);
      fullArray.push(tempArray);
    }
    tempArray = [];
  }
  var tempFiletype = fileType;
  fileType = "Punkte,Name \n ";
  fullArray.forEach(function(row) {
    fileType += row.join(",");
    fileType += "\n";
  });
  var hiddenElement = document.createElement("a");
  hiddenElement.href =
    `data:text/${tempFiletype};charset=utf-8,` + encodeURI(fileType);
  hiddenElement.target = "_blank";
  hiddenElement.download = `PlanningPoker.${tempFiletype}`;
  hiddenElement.click();
}
/* END EXPORT FILE IN GIVEN FORMAT */

/* GENERATE GRAPH */
/* 
This method uses the charts.js functionality to prepare a graph. Detailed description from charts.js.
Parameters: none
Return type: none
*/
function generateGraph() {
  pointsArray = [];
  countArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  points = document.getElementsByClassName("storyPointInput");
  names = document.getElementsByClassName("nameInput");
  for (i = 0; i < points.length; i++) {
    if (points[i].value != "" || names[i].value != "") {
      pointsArray.push(points[i].value);
    }
  }

  for (i = 0; i < pointsArray.length; i++) {
    switch (pointsArray[i]) {
      case "0":
        countArray[0]++;
        break;

      case "1":
        countArray[1]++;
        break;

      case "2":
        countArray[2]++;
        break;

      case "3":
        countArray[3]++;
        break;

      case "5":
        countArray[4]++;
        break;

      case "8":
        countArray[5]++;
        break;

      case "13":
        countArray[6]++;
        break;

      case "21":
        countArray[7]++;
        break;

      case "34":
        countArray[8]++;
        break;

      case "55":
        countArray[9]++;
        break;

      case "89":
        countArray[10]++;
        break;

      case "144":
        countArray[11]++;
        break;
    }
  }

  var ctx = document.getElementById("myChart").getContext("2d");
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: "bar",

    // The data for our dataset
    data: {
      labels: fibos,
      datasets: [
        {
          label: "Storypoints",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: countArray
        }
      ]
    },

    // Configuration options go here, if needed
    options: {}
  });
}
/* END GENERATE GRAPH */
