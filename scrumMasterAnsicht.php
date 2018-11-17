<?php
require_once('Room.php');

if (isset($_COOKIE['value']) && isset($_COOKIE['room']) && isset($_COOKIE['name'])) {
    $value = str_replace('"', '', $_COOKIE['value']);
    $room = str_replace('"', '', $_COOKIE['room']);
    $name = str_replace('"', '', $_COOKIE['name']);

    $roomData = json_decode(file_get_contents("rooms/$room.txt"));
    $foundRoom = new Room();
    $foundRoom->set($roomData);
}

?>

<!DOCTYPE html>
<html>
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">


    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
          integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="styles.css">

    <title>Planning Poker</title>
</head>
<body>
<!-- HEADER -->
<div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
    <a class="my-0 mr-md-auto font-weight-normal" href="index.php">
        <img src="logo.jpg" alt="Logo">
    </a>
    <nav class="my-2 my-md-0 mr-md-3">
        <a class="p-2 text-dark" href="index.php">Benutzeransicht</a>
        <a class="p-2 text-dark" href="./scrumMasterAnsicht.php">Scrum Master Ansicht</a>
    </nav>
</div>
<!-- END HEADER -->

<!-- CONTENT -->
<div class="container" id="storyPoints">
    <p>Teammitglieder und Story Point erfassen:</p>
    <div class="teammitglied">
        <input name="Story Point" onchange="updatevalue()" placeholder="Story Point" class="storyPointInput"
               value="<?php if (isset($foundRoom)) {
                   echo $foundRoom->dev1value;
               } ?>">
        <input name="Name" placeholder="Name des Teammitglieds" class="nameInput" value="<?php if (isset($foundRoom)) {
            echo $foundRoom->dev1name;
        } ?>">
    </div>
    <div class="teammitglied">
        <input name="Story Point" onchange="updatevalue()" placeholder="Story Point" class="storyPointInput"
               value="<?php if (isset($foundRoom)) {
                   echo $foundRoom->dev2value;
               } ?>">
        <input name="Name" placeholder="Name des Teammitglieds" class="nameInput" value="<?php if (isset($foundRoom)) {
            echo $foundRoom->dev2name;
        } ?>">
    </div>
    <div class="teammitglied">
        <input name="Story Point" onchange="updatevalue()" placeholder="Story Point" class="storyPointInput"
               value="<?php if (isset($foundRoom)) {
                   echo $foundRoom->dev3value;
               } ?>">
        <input name="Name" placeholder="Name des Teammitglieds" class="nameInput" value="<?php if (isset($foundRoom)) {
            echo $foundRoom->dev3name;
        } ?>">
    </div>
    <div class="teammitglied">
        <input name="Story Point" onchange="updatevalue()" placeholder="Story Point" class="storyPointInput"
               value="<?php if (isset($foundRoom)) {
                   echo $foundRoom->dev4value;
               } ?>">
        <input name="Name" placeholder="Name des Teammitglieds" class="nameInput" value="<?php if (isset($foundRoom)) {
            echo $foundRoom->dev4name;
        } ?>">
    </div>
    <div class="teammitglied">
        <input name="Story Point" onchange="updatevalue()" placeholder="Story Point" class="storyPointInput"
               value="<?php if (isset($foundRoom)) {
                   echo $foundRoom->dev5value;
               } ?>">
        <input name="Name" placeholder="Name des Teammitglieds" class="nameInput" value="<?php if (isset($foundRoom)) {
            echo $foundRoom->dev5name;
        } ?>">
    </div>
    <div class="teammitglied">
        <input name="Story Point" onchange="updatevalue()" placeholder="Story Point" class="storyPointInput"
               value="<?php if (isset($foundRoom)) {
                   echo $foundRoom->dev6value;
               } ?>">
        <input name="Name" placeholder="Name des Teammitglieds" class="nameInput" value="<?php if (isset($foundRoom)) {
            echo $foundRoom->dev6name;
        } ?>">
    </div>
    <div class="teammitglied">
        <input name="Story Point" onchange="updatevalue()" placeholder="Story Point" class="storyPointInput"
               value="<?php if (isset($foundRoom)) {
                   echo $foundRoom->dev7value;
               } ?>">
        <input name="Name" placeholder="Name des Teammitglieds" class="nameInput" value="<?php if (isset($foundRoom)) {
            echo $foundRoom->dev7name;
        } ?>">
    </div>
    <div class="teammitglied">
        <input name="Story Point" onchange="updatevalue()" placeholder="Story Point" class="storyPointInput"
               value="<?php if (isset($foundRoom)) {
                   echo $foundRoom->dev8value;
               } ?>">
        <input name="Name" placeholder="Name des Teammitglieds" class="nameInput" value="<?php if (isset($foundRoom)) {
            echo $foundRoom->dev8name;
        } ?>">
    </div>
    <div class="teammitglied">
        <input name="Story Point" onchange="updatevalue()" placeholder="Story Point" class="storyPointInput"
               value="<?php if (isset($foundRoom)) {
                   echo $foundRoom->dev9value;
               } ?>">
        <input name="Name" placeholder="Name des Teammitglieds" class="nameInput" value="<?php if (isset($foundRoom)) {
            echo $foundRoom->dev9name;
        } ?>">
    </div>
    <div class="totalStoryPoints">
        <label id="totalpoints"></label>
        <label class="nameInput">Total Story Points</label>
    </div>
    <div class="totalStoryPoints">
        <label id="average"></label>
        <label class="nameInput">Durchschnitt(auf nächste Fibonaccizahl gerundet)</label>
    </div>
    <button type="button" class="btn btn-primary" onclick="resetPoints()">Reset Points</button>
    <a href="scrumMasterAnsicht.php">
        <button type="button" class="btn btn-primary">Reload</button>
    </a>
    <button type="button" class="btn btn-secondary" onclick="erstelleZuFas()">Zusammenfassung</button>
    <button type="button" class="btn btn-secondary" id="exportButton" hidden onclick="exportAlsPdf('Zusammenfassung:')">
        export als PDF
    </button>
    <button type="button" class="btn btn-secondary" id="exportCSVButton" hidden onclick="exportAlsCSV()">Export als
        CSV
    </button>
    <button type="button" class="btn btn-secondary" id="exportTxtButton" hidden onclick="exportAlsTxt()">Export als
        TXT
    </button>
    <button type="button" class="btn btn-secondary" id="exportXlsButton" hidden onclick="exportAlsXls()">Export als
        XLS
    </button>
</div>

<div id="tableContainer" hidden>
    <!-- HIER LEBT DIE ZUSAMMENFASSUNGSTABELLE; NICHTS REINSCHREIBEN! -->
</div>
<!-- END CONTENT -->

<!-- FOOTER -->
<footer class="footer">
    &copy Ersteller: Florence Meier, Pascal Bamert, Nick Dubuis, Niklas Kaesler |
    Erstelldatum: 02.11.18 |
    Version: Alpha 0.4
</footer>
<!-- END FOOTER -->

<!-- SCRIPT AT THE END MAKE CREATION FASTER -->
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
        integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
        crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
        integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
        crossorigin="anonymous"></script>
<script src="https://unpkg.com/jspdf@latest/dist/jspdf.min.js"></script>
<script src="./functions.js"></script>
<script>updatevalue()</script>
</body>
</html>