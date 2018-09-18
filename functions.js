var x = 0;
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

function resetPoints(){
    var array = document.getElementsByClassName("storyPointInput");
    for (var i =0; i < array.length; i++) {
        array[i].value = "";
    }
    document.getElementById("totalpoints").innerHTML = "";
    document.getElementById("average").innerHTML = "";
}

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