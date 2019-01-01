//My Own Original Timer :)
function startTimer() {
    var s = 0;
    var m = 0;
    var h = 0;
    var setTimer = setInterval(myTimer, 1000);
    function myTimer() {
        timer(h, m, s);

        var clockBox = document.getElementById("clock");
        if (clockBox != null) {
            var parameters = timer(h, m, s);
            h = parameters[0];
            m = parameters[1];
            s = parameters[2];
        }
    }

}
function timer(h, m, s) {
    s++;
    if (s == 60) {
        s = 0;
        m++;
    }
    if (m == 60) {
        m = 0;
        h++;
    }
    if (s < 10) {
        s = "0" + s;
    }
    if (m < 10) {
        m = "0" + parseInt(m);
    }
    if (h < 10) {
        h = "0" + parseInt(h);
    }
    var clockBox = document.getElementById("clock");
    if (clockBox != null) {
        clockBox.innerText = h + ":" + m + ":" + s;
        return [h, m, s];
    }
}

//Return a Random Number Between 1-20
function imgRandom() {
    var x = Math.random() * 20 + 1;
    x = parseInt(x);
    return x;
}

//Insert Card Images Randomly
function setImage() {
    var cardsSet = new Array();
    var x = imgRandom();

    for (var i = 1; i <= 10; i++) {
        for (var j = 1; j <= 2; j++) {
            while (cardsSet.includes(x) == true) {
                x = imgRandom();
            }
            cardsSet.push(x);
            document.getElementById("card" + x).innerHTML = "<img id='pic" + x + "' onclick='turnCard(this.id)' onmousedown='return false' src='assets/images/" + i + ".jpg'>"
            document.getElementById("pic" + x).style.opacity = "0";
        }
    }
    //Resetting Score
    var score = 0;
    var scoreBox = document.getElementById("points");
    scoreBox.innerHTML = score;

}

//Show Image After Click
function turnCard(x) {
    //Making sure function works only if there are less than 2 cards showing at the moment.
    var k = 0;
    for (i = 1; i <= 20; i++) {
        if (document.getElementById("pic" + i) != null) {
            cardOpacity = document.getElementById("pic" + i).style.opacity;
            if (cardOpacity != 0) {
                k++;
            }
        }
    }
    if (k < 2) {
        document.getElementById(x).style.opacity = "1";
        document.getElementById(x).style.animation = "fade 1s";

        checkCards();
    }
}

//Check Cards After Every Click
function checkCards() {
    var i;
    var cardOpacity;
    var x = 0;
    var shownCards = new Array();
    var firstCardID;
    var secondCardID;

    //Check How Many Cards Are Shown At the Moment, Add ID's of Shown Cards into an Array
    for (i = 1; i <= 20; i++) {
        if (document.getElementById("pic" + i) != null) {
            cardOpacity = document.getElementById("pic" + i).style.opacity;
            if (cardOpacity != 0) {
                x++;
                shownCards.push(i);
            }
            //When 2 Cards Are Face Up - Hide Them if They Match / Turn Them Over if They Don't
            if (x == 2) {
                firstCardID = document.getElementById("pic" + shownCards[0]);
                secondCardID = document.getElementById("pic" + shownCards[1]);

                if (firstCardID.src == secondCardID.src) {
                    firstCardID.insertAdjacentHTML('afterend', '<p id="match">MATCH!</p>');
                    secondCardID.insertAdjacentHTML('afterend', '<p id="match">MATCH!</p>');

                    setTimeout(function () {
                        firstCardID.parentElement.style.background = "transparent";
                        secondCardID.parentElement.style.background = "transparent";
                        firstCardID.parentElement.innerHTML = "<img style='opacity: 0'>";
                        secondCardID.parentElement.innerHTML = "<img style='opacity: 0'>";

                        checkIfFinished();
                    }, 1500);

                    //Flying Image Effect
                    var firstSrc = firstCardID.src;
                    var fileNum = firstSrc.charAt(firstSrc.length - 5);
                    //Shuffle Animation Angle
                    var shuffleAnim = parseInt(Math.random() * 4 + 1);

                    document.body.insertAdjacentHTML('beforeend', '<div id="flyingImg" style="animation: imgFly' + shuffleAnim + ' 1.2s"><img src="assets/images/wallpapers/' + fileNum + '.png"></div>');


                    //Play Success Audio + Add Points to Score
                    var audio1 = document.getElementById("success");
                    audio1.play();

                    //Add Points
                    var scoreBox = document.getElementById("points");
                    var score = scoreBox.innerHTML;
                    score = parseInt(score) + 5;
                    scoreBox.innerHTML = score;


                }
                else {

                    setTimeout(function () {
                        firstCardID.style.animation = "fadeOut 0.5s";
                        secondCardID.style.animation = "fadeOut 0.5s";


                    }, 1000);
                    setTimeout(function () {
                        firstCardID.style.opacity = 0;
                        secondCardID.style.opacity = 0;
                    }, 1500);
                    var scoreBox = document.getElementById("points");
                    var score = scoreBox.innerHTML;
                    score = score - 1;
                    scoreBox.innerHTML = score;

                }
                x = 0;
            }
        }
    }
}

function checkIfFinished() {
    for (var i = 1; i <= 20; i++) {
        var cardBox = document.getElementById("card" + i);
        if (cardBox.children[0].src != "") {
            break;
        }
        if (i === 20) {
            showModal();

            //Win Music
            var audio2 = document.getElementById("win");
            audio2.volume = 0.5;
            audio2.play();

            //Hide Clock
            var clockBox = document.getElementById("clock");
            clockBox.remove();

        }
    }
}

function showModal() {
    //Add Parameters to Modal
    var scoreBox = document.getElementById("points");
    var score = scoreBox.innerHTML;
    var subHeader = document.getElementById("subHeader");
    var timePassed = document.getElementById("clock").innerHTML;

    subHeader.innerHTML = "Your Score Is: " + score + "<br>Time Passed: " + timePassed;

    //Show Modal:
    var modal = document.getElementById("modal");
    modal.style.display = "block";
    modal.style.animation = "fade 1s";
    setTimeout(function () {
        modal.style.opacity = "1";
    }, 990);
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}