/* 
Author: Pascal Bamert
Version: 1.0
Last Updated: 26.11.2018
 */
$.cookie.raw = true;
$.cookie.json = true;

function showHiddenElement(id = []) {
  id.forEach(id => (document.getElementById(id).style.display = "block"));
}

function hideAll() {
  var all = ["container-configuration-join", "container-configuration-create"];
  all.forEach(id => (document.getElementById(id).style.display = "none"));
}

function checkIfViable() {
  var flipCard = document.getElementById("cardWrapper").children;
  var counter = 0;
  /* First element is the paragraph -> start count at 1 */
  for (var i = 1; i < flipCard.length; i++) {
    if (flipCard[i].children[0].checked) {
      counter++;
      document.getElementById("ausWahlAnzeigen").value = flipCard[
        i
      ].children[0].value.toString();
    }
  }
  if (counter === 1) {
    document.getElementById("ausWahlBestaetigenButton").disabled = false;
    document.getElementById("ausWahlBestaetigenButton").textContent =
      "Gültige Wahl!";
    document.getElementById("ausWahlBestaetigenButton").className =
      "btn btn-success text-white";
  } else {
    document.getElementById("ausWahlBestaetigenButton").disabled = true;
    document.getElementById("ausWahlBestaetigenButton").textContent =
      "Ungültige Wahl!";
    document.getElementById("ausWahlBestaetigenButton").className =
      "btn btn-danger text-white";
  }
}

function writeConfig() {
  var nameByInput = document.getElementById("nameBlockInput").value;
  var roomByInput = document.getElementById("roomBlockInput").value;

  $.cookie("name", nameByInput);
  $.cookie("room", roomByInput);
}
