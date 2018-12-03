<?php
/* 
PHP-Part I
Author: Pascal Bamert
Version: 1.1
Last Updated: 26.11.2018
 */
require_once('Room.php');

if (isset($_POST['letsGoButton'])) {
    $name = $_POST['nameBlockInput'];
    $room = $_POST['roomBlockInput'];

    $roomData = json_decode(file_get_contents("rooms/$room.txt"));
    $foundRoom = new Room();
    $foundRoom->set($roomData);
    setDevName($foundRoom, $name);

    $roomJSON = json_encode($foundRoom);
    $openFile = fopen("rooms/$room.txt", "w");
    fwrite($openFile, $roomJSON);
    fclose($openFile);
}

if (isset($_POST['createRoomButton'])) {
    $createRoom = $_POST['createRoomBlockInput'];
    $openFile = fopen("rooms/$createRoom.txt", "w");

    $room = new Room();
    $roomJSON = json_encode($room);

    fwrite($openFile, $roomJSON);
    fclose($openFile);
}

if (isset($_POST['ausWahlBestaetigenButton'])) {
    $value = $_POST['ausWahlAnzeigen'];
    $room = str_replace('"', '', $_COOKIE['room']);
    $name = str_replace('"', '', $_COOKIE['name']);

    $roomData = json_decode(file_get_contents("rooms/$room.txt"));
    $foundRoom = new Room();
    $foundRoom->set($roomData);
    setDevValue($foundRoom, $name, $value);

    $roomJSON = json_encode($foundRoom);
    $openFile = fopen("rooms/$room.txt", "w");
    fwrite($openFile, $roomJSON);
    fclose($openFile);
    header('Location: scrumMasterAnsicht.php');
}

function setDevValue($room, $name, $finalValue)
{
    $position = null;
    foreach ($room AS $key => $value) {
        if ($value === $name) {
            $position = substr($key, 3, 1);
        }
    }

    foreach ($room AS $key => $value) {
        if (strpos($key, $position . "value") == true && $position != null) {
            $room->$key = $finalValue;
        }
    }
}

function setDevName($room, $name)
{
    $nameCounter = 0;
    $valueUsed = false;

    foreach ($room AS $key => $value) {
        if ($value == $name) {
            $valueUsed = true;
        }
    }

    foreach ($room AS $key => $value) {
        if (strpos($key, "name") == true && $valueUsed == false) {
            if ($value == null) {
                $room->$key = $name;
                return;
            } else {
                $nameCounter++;
            }
        }
    }
    if ($nameCounter === 9) {
        echo '<script language="javascript">';
        echo 'alert("Room is already full!")';
        echo '</script>';
    }

    if ($valueUsed == true) {
        echo '<script language="javascript">';
        echo 'alert("Name already in use!")';
        echo '</script>';
    }
}

?>

<!DOCTYPE html>
<html>
<!-- 
    HTML-Part
    Author: Florence Meier
    Version: 2.5
    Last Updated: 30.11.2018
-->
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

<div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
    <a class="my-0 mr-md-auto font-weight-normal" href="./index.php">
        <img src="logo.jpg" alt="Logo">
    </a>
    <nav class="my-2 my-md-0 mr-md-3">
        <a class="p-2 text-dark" href="./index.php">Benutzeransicht</a>
        <a class="p-2 text-dark" href="scrumMasterAnsicht.php">Scrum Master Ansicht</a>
    </nav>
</div>

<div class="config-wrapper">
    <button type="button" class="joinRoomButton btn btn-primary"
            onclick="hideAll(); showHiddenElement(['container-configuration-join']);">Join Room!
    </button>
    <button type="button" class="createRoomButton btn btn-primary"
            onclick="hideAll(); showHiddenElement(['container-configuration-create']);">Create Room!
    </button>
</div>

<form id="container-configuration-join" class="container-configuration" method="post">
    <div id="nameBlock">
        <p id="nameBlockP">Nickname:</p>
        <input type="text" id="nameBlockInput" name="nameBlockInput">
    </div>
    <div id="roomBlock">
        <p id="roomBlockP">Roomname:</p>
        <input type="text" id="roomBlockInput" name="roomBlockInput">
    </div>
    <button id="letsGoButton" name="letsGoButton" type="submit" class="btn btn-primary" onclick="writeConfig();">Lets
        Go!
    </button>
</form>

<form id="container-configuration-create" class="container-configuration" method="post">
    <div id="createRoomBlock">
        <p id="createRoomBlockP">Choose your roomname:</p>
        <input type="text" id="createRoomBlockInput" name="createRoomBlockInput">
    </div>
    <button id="createRoomButton" name="createRoomButton" type="submit" class="btn btn-primary">Add!</button>
</form>

<?php
/* 
PHP-Part II
Author: Pascal Bamert
Version: 1.1
Last Updated: 26.11.2018
 */
if (isset($_COOKIE['name']) && isset($_COOKIE['room'])) {
    echo '
                <form id="container-cards" class="container" method="post" action="">
<!-- BENUTZERANSICHT -->
<div id="cardWrapper">
    <p>Story Points (bitte wählen):</p>
    <label class="flipContainer">
        <input id="flip" type="checkbox" value="0" name="flipCard" onchange="checkIfViable()"/>
        <div class="flip">
            <div class="flipFront">0</div>
            <div class="flipBack"><strong>0</strong></div>
        </div>
    </label>
    <label class="flipContainer">
        <input id="flip" type="checkbox" value="1" name="flipCard" onchange="checkIfViable()"/>
        <div class="flip">
            <div class="flipFront">1</div>
            <div class="flipBack"><strong>1</strong></div>
        </div>
    </label>
    <label class="flipContainer">
        <input id="flip" type="checkbox" value="2" name="flipCard" onchange="checkIfViable()"/>
        <div class="flip">
            <div class="flipFront">2</div>
            <div class="flipBack"><strong>2</strong></div>
        </div>
    </label>
    <label class="flipContainer">
        <input id="flip" type="checkbox" value="3" name="flipCard" onchange="checkIfViable()"/>
        <div class="flip">
            <div class="flipFront">3</div>
            <div class="flipBack"><strong>3</strong></div>
        </div>
    </label>
    <label class="flipContainer">
        <input id="flip" type="checkbox" value="5" name="flipCard" onchange="checkIfViable()"/>
        <div class="flip">
            <div class="flipFront">5</div>
            <div class="flipBack"><strong>5</strong></div>
        </div>
    </label>
    <label class="flipContainer">
        <input id="flip" type="checkbox" value="8" name="flipCard" onchange="checkIfViable()"/>
        <div class="flip">
            <div class="flipFront">8</div>
            <div class="flipBack"><strong>8</strong></div>
        </div>
    </label>
    <label class="flipContainer">
        <input id="flip" type="checkbox" value="13" name="flipCard" onchange="checkIfViable()"/>
        <div class="flip">
            <div class="flipFront">13</div>
            <div class="flipBack"><strong>13</strong></div>
        </div>
    </label>
    <label class="flipContainer">
        <input id="flip" type="checkbox" value="21" name="flipCard" onchange="checkIfViable()"/>
        <div class="flip">
            <div class="flipFront">21</div>
            <div class="flipBack"><strong>21</strong></div>
        </div>
    </label>
    <label class="flipContainer">
        <input id="flip" type="checkbox" value="34" name="flipCard" onchange="checkIfViable()"/>
        <div class="flip">
            <div class="flipFront">34</div>
            <div class="flipBack"><strong>34</strong></div>
        </div>
    </label>
    <label class="flipContainer">
        <input id="flip" type="checkbox" value="55" name="flipCard" onchange="checkIfViable()"/>
        <div class="flip">
            <div class="flipFront">55</div>
            <div class="flipBack"><strong>55</strong></div>
        </div>
    </label>
    <label class="flipContainer">
        <input id="flip" type="checkbox" value="89" name="flipCard" onchange="checkIfViable()"/>
        <div class="flip">
            <div class="flipFront">89</div>
            <div class="flipBack"><strong>89</strong></div>
        </div>
    </label>
    <label class="flipContainer">
        <input id="flip" type="checkbox" value="144" name="flipCard" onchange="checkIfViable()"/>
        <div class="flip">
            <div class="flipFront">144</div>
            <div class="flipBack"><strong>144</strong></div>
        </div>
    </label>
</div>
<div>
    <button id="ausWahlBestaetigenButton" name="ausWahlBestaetigenButton" disabled type="submit" class="btn btn-success" onclick="ausWahlBestaetigen();">Bestätigen</button>
</div>
<input id="ausWahlAnzeigen" name="ausWahlAnzeigen">
</form>';
}
?>

        <footer class="footer">
            &copy Ersteller: Florence Meier, Pascal Bamert, Nick Dubuis, Niklas Kaesler |
            Erstelldatum: 03.12.18 |
            Version: 2.5
        </footer>

        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
                integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
                crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
                integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
                crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
                integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
                crossorigin="anonymous"></script>
        <script src="functions.js"></script>
        <script src="cookies.js"></script>
        <script src="configuration.js"></script>
    </body>
</html>