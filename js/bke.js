/************************************************
 Hieronder staan alle globale variabelen
 ************************************************/

// CONSTANTEN
var GAME_BUTTON_ELEMENT = document.getElementsByClassName('game-button')[0];
var GAME_FIELD_ELEMENT = document.getElementById('speelveld').getElementsByTagName('img');
var SCORE_PLAYER1_ELEMENT = document.getElementsByClassName('rounds-info')[0]
    .getElementsByTagName('td')[1];
var SCORE_PLAYER2_ELEMENT = document.getElementsByClassName('rounds-info')[0]
    .getElementsByTagName('td')[3];
var CURRENT_ROUND_ELEMENT = document.getElementsByClassName('rounds-info')[0]
    .getElementsByTagName('td')[5];
var TURN_PLAYERIMAGE_ELEMENT = document.getElementsByClassName('players-turn')[0]
    .getElementsByTagName('img')[0];
var TURN_PLAYERNUMBER_ELEMENT = document.getElementsByClassName('players-turn')[0]
    .getElementsByTagName('td')[2];
var PLAYER_IMAGES = [ 'img/empty.jpg', 'img/cross.jpg', 'img/circle.jpg' ];
//                       index 0           index 1          index 2

// VARIABLES
var score_player1 = 0;          // Score van speler 1
var score_player2 = 0;          // Score van speler 2
var current_round = 0;          // In welke ronde zitten we nu
var player_turn = 0;            // Welke speler is aan de beurt, 1 of 2

/************************************************************
 Hieronder begint de code van het spel
 ************************************************************/

/*
 window.onload
 -------------
 Dit is het gedeelte waar we, als de pagina net klaar is met laden in de browser,
 ons programma initialiseren. Oftewel klaar maken voor eerste gebruik.
 */
window.onload = function() {
    // 1. Button klikbaar maken
    GAME_BUTTON_ELEMENT.onclick = buttonClickHandler;

    // 2. Scores resetten
    score_player1 = 0;
    score_player2 = 0;
    current_round = 0;

    // 3. Beurt bepalen en tonen
    player_turn = Math.round( Math.random() + 1);
    TURN_PLAYERIMAGE_ELEMENT.src = PLAYER_IMAGES[player_turn];
    TURN_PLAYERNUMBER_ELEMENT.innerHTML = player_turn;

    // 4. Speelveld leegmaken
    clearGameField();

    window.ondragstart = function () { return false;};

}   // EINDE FUNCTION window.onload



/*
 clearGameField
 --------------
 Deze functie maakt het speelveld helemaal leeg door
 alle img-tags te vullen met empty.jpg.
 */
function clearGameField() {
    for(var celnum = 0; celnum < 9; celnum++) {
        GAME_FIELD_ELEMENT[celnum].src = PLAYER_IMAGES[0];
    }
}   // EINDE FUNCTION clearGameField



/*
 buttonClickHandler
 ------------------
 Deze functie wordt steeds gestart/aangeroepen op het moment
 dat er op de button geklikt wordt en handelt alles af wat
 nodig is na een klik.
 */
function buttonClickHandler() {
    // a) Tekst op de button veranderen
    GAME_BUTTON_ELEMENT.innerHTML = 'Reset spel';

    //b) Speelveld (cellen) klikbaar maken
    for(var celnum = 0; celnum < 9; celnum++) {
        GAME_FIELD_ELEMENT[celnum].onclick = cellClickHandler;
    }

    // c) Ronde verhogen en tonen
    current_round = current_round + 1;
    CURRENT_ROUND_ELEMENT.innerHTML = current_round;

    // d) speelveld leegmaken
    clearGameField();

    // e) de countdown timer starten
    countdown();

}   // EINDE FUNCTION buttonClickHandler


function cellClickHandler(event_info) {
    if(event_info.target.src.search('empty') > -1) {

        // 1. Plaatje van de huidige speler tonen
        event_info.target.src = PLAYER_IMAGES[player_turn];

        // 2. Checken of iemand gewonnen heeft
        if(checkWinner(1)) {
            alert('speler 1 wint');
            clearGameField();
            score_player1 ++;
            SCORE_PLAYER1_ELEMENT.innerHTML = score_player1;
            current_round ++;
            CURRENT_ROUND_ELEMENT.innerHTML = current_round;

        }if(checkWinner(2)) {
            alert('speler 2 wint');
            clearGameField();
            score_player2 ++;
            SCORE_PLAYER2_ELEMENT.innerHTML = score_player2;
            current_round ++;
            CURRENT_ROUND_ELEMENT.innerHTML = current_round;

        }

        // 3. Beurt doorgeven
        if(player_turn == 1)
            player_turn = 2;
        else
            player_turn = 1;

        TURN_PLAYERNUMBER_ELEMENT.innerHTML = player_turn;
        TURN_PLAYERIMAGE_ELEMENT.src = PLAYER_IMAGES[player_turn];
    }
}

function checkWinner(player_num) {
    //rij 1 - 0, 1, 2
    if  (GAME_FIELD_ELEMENT[0].src.search(PLAYER_IMAGES[player_num]) > -1 &&
        GAME_FIELD_ELEMENT[1].src.search(PLAYER_IMAGES[player_num]) > -1 &&
        GAME_FIELD_ELEMENT[2].src.search(PLAYER_IMAGES[player_num]) > -1 )
        return true;

    //rij 2 - 3, 4, 5
    if  (GAME_FIELD_ELEMENT[3].src.search(PLAYER_IMAGES[player_num]) > -1 &&
        GAME_FIELD_ELEMENT[4].src.search(PLAYER_IMAGES[player_num]) > -1 &&
        GAME_FIELD_ELEMENT[5].src.search(PLAYER_IMAGES[player_num]) > -1 )
        return true;

    //rij 3 - 6, 7, 8
    if  (GAME_FIELD_ELEMENT[6].src.search(PLAYER_IMAGES[player_num]) > -1 &&
        GAME_FIELD_ELEMENT[7].src.search(PLAYER_IMAGES[player_num]) > -1 &&
        GAME_FIELD_ELEMENT[8].src.search(PLAYER_IMAGES[player_num]) > -1 )
        return true;

    //verticale rij 1 - 0, 3, 6
    if  (GAME_FIELD_ELEMENT[0].src.search(PLAYER_IMAGES[player_num]) > -1 &&
        GAME_FIELD_ELEMENT[3].src.search(PLAYER_IMAGES[player_num]) > -1 &&
        GAME_FIELD_ELEMENT[6].src.search(PLAYER_IMAGES[player_num]) > -1 )
        return true;

    //verticale rij 2 - 1, 4, 7
    if  (GAME_FIELD_ELEMENT[1].src.search(PLAYER_IMAGES[player_num]) > -1 &&
        GAME_FIELD_ELEMENT[4].src.search(PLAYER_IMAGES[player_num]) > -1 &&
        GAME_FIELD_ELEMENT[7].src.search(PLAYER_IMAGES[player_num]) > -1 )
        return true;

    //verticale rij 3 - 2, 5, 8
    if  (GAME_FIELD_ELEMENT[2].src.search(PLAYER_IMAGES[player_num]) > -1 &&
        GAME_FIELD_ELEMENT[5].src.search(PLAYER_IMAGES[player_num]) > -1 &&
        GAME_FIELD_ELEMENT[8].src.search(PLAYER_IMAGES[player_num]) > -1 )
        return true;

    //diagonale rij 1 - 0, 4,8
    if  (GAME_FIELD_ELEMENT[0].src.search(PLAYER_IMAGES[player_num]) > -1 &&
        GAME_FIELD_ELEMENT[4].src.search(PLAYER_IMAGES[player_num]) > -1 &&
        GAME_FIELD_ELEMENT[8].src.search(PLAYER_IMAGES[player_num]) > -1 )
        return true;

    //diagonale rij 2 - 2, 4,6
    if  (GAME_FIELD_ELEMENT[2].src.search(PLAYER_IMAGES[player_num]) > -1 &&
        GAME_FIELD_ELEMENT[4].src.search(PLAYER_IMAGES[player_num]) > -1 &&
        GAME_FIELD_ELEMENT[6].src.search(PLAYER_IMAGES[player_num]) > -1 )
        return true;

    return false;
}

/* deze functie start een countdown timer als het spel gestart word en zorgt ervoor dat na verloop
 van tijd het spel gestopt wordt en dat er dan een nieuwe html pagina wordt geopent met game over en de scores van player 1 en 2.
 */

var seconds = 600;
var t;

function secondPassed() {
    var minutes = Math.round((seconds - 30) / 60);
    var remainingSeconds = seconds % 60;
    if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
    }
    document.getElementById('countdown').innerHTML = minutes + ":" + remainingSeconds;

}

function countdown() {

    // hier start de counter
    secondPassed();
    if (seconds == 0) {
        window.open("winner.html");
        savedscores();
        window.close("index.html");
    } else {
        seconds--;
        t = setTimeout("countdown()", 1000); //als je de 1000 verkleint naar bijv 10 gaat de counter sneller
    }

}

/* Deze functie zorgt ervoor dat de variabelen score_player1 en score_player2 worden opgeslagen bij de local
* hiermee kunnen de variabelen worden geladen op andere pagina's op deze functie ben ik eerlijk gezegt heel trots :)*/

function savedscores() {
    if(typeof(Storage)!=="undefined")
    {
        localStorage.scoreplayer1= score_player1;
        localStorage.scoreplayer2= score_player2;
    }
}

/*dit stuk code zorgt ervoor dat als de start knop is ingedrukt en de timer van start gaat
dat er dan geen bug komt waardoor de timer sneller gaat tellen als de reset knop meerdere keren is ingedrukt
 */

// Helaas is dit deel van mijn code niet gelukt :(


/*Einde code*/