function ausWahlBestaetigen() {
    var flipCard = document.getElementById("cardWrapper").children;
    var txt = "";
    var counter = 0;
    /* First elemet is the paragraph -> start count at 1 */
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