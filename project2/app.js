/*
 * Create a list that holds all of your cards
 */

// list of all cards
let cards = ['fa-diamond', 'fa-diamond',
                 'fa-paper-plane-o', 'fa-paper-plane-o',
                 'fa-anchor', 'fa-anchor',
                 'fa-bolt', 'fa-bolt',
                 'fa-cube', 'fa-cube',
                 'fa-leaf', 'fa-leaf',
                 'fa-bicycle', 'fa-bicycle',
                 'fa-bomb', 'fa-bomb'];

// generate card
function generateCard(card){
    return `<li class="card"><i class="fa ${card}"></i></li>`;
}

// gameStart with shuffle
function gameStart(){
    let deck = document.querySelector('.deck');
    
    let cardCreateHTML = shuffle(cards).map(function(card){
        return generateCard(card);
    });
    deck.innerHTML = cardCreateHTML.join('');
};

gameStart();

let allCards = [...document.querySelectorAll('.card')];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    //console.log(array);
    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

var arr_Card = [];
let count = 0;
let scoreCount = 0;

// card flipping over with click event
for (let card of allCards) {
    card.addEventListener("click", function(e){      
        
        //check card is not clicked if card is open or match
        if((!card.classList.contains('open')) && (!card.classList.contains('match'))){
            arr_Card.push(card);
            count++;
            upCount(count);
            removeStarCount(count);
            if (arr_Card.length <= 2){
                card.classList.add('open', 'show');
        
                // checking match
                if(arr_Card.length == 2){
                    if (matchCard(arr_Card)){
                        // lock the card since match
                        for (let i = 0; i < arr_Card.length; i++) {
                            arr_Card[i].classList.remove('open', 'show');
                            arr_Card[i].classList.add('match');
                            scoreCount++;
                            setTimeout(finalScore, 400, scoreCount, count);
                        }
                        arr_Card = [];

                    // remove the card since not match
                    } else {
                        setTimeout(removeFunc, 400, arr_Card);
                        arr_Card = [];
                    }
                }
            } else if (arr_Card.length > 2){
                console.log("already opened 2 cards!!");
            }
        }
    })
};

//display final scores when the game is over
function finalScore(fCount, count){
    if (fCount == allCards.length){
        fCount_display = fCount / 2;
        let result = removeStarCount(count);
        let press = confirm(`Congratulation! You got all scores with ${fCount_display} matches! \n ${result} Star(s) achieved in ${cur_Time} time.
        \n Press Ok for Play Again!`);
            if (press == true){
                reStartGame();
            }
    }
}

//remove function
function removeFunc(array){
    for (let i = 0; i < array.length; i++) {
        array[i].classList.remove('open', 'show');
    }
}

// function for checking match
function matchCard(array) {
    let content_Arr = [];
    for (let i = 0; i < array.length; i++) {
        content_Arr[i] = array[i].querySelector('i').className;
    }
    if(content_Arr[0] === content_Arr[1]){
        return true;
    } else {
       return false;
   }
};

//restart click
let restartBtn = document.querySelector('.restart');
restartBtn.addEventListener("click", function(e){      
    reStartGame();
});

// restart function
function reStartGame(){
    count = 0;
    //refresh the screen to restart the game
    document.location.reload(true);
    
    // change the move count to 0
    upCount(count);
};

// update the move count
function upCount(count){
    let count_ = document.getElementsByClassName("moves")[0];
    count_.innerHTML = count;
};

// remove star depending on the moves
function removeStarCount(count){
    let fStar = 5;
    let star = document.querySelectorAll('.stars_li');

    if (count > 15){
        star[0].classList.add('close');
        fStar = 4;
    }
    if (count > 25){
        star[1].classList.add('close');
        fStar = 3;
    }
    if (count > 35){
        star[2].classList.add('close');
        fStar = 2;
    }
    if (count > 45){
        star[3].classList.add('close');
        fStar = 1;
    }
    if (count > 55){
        star[4].classList.add('close');
        fStar = 0;
    }
    return fStar;
};

// timer
let second = 0;
function toStr(time){
    if(time > 9){
        return time;
    } else {
        return "0" + time;
    }
};

let cur_Time = '';

countTime = setInterval(function(){
                    document.getElementById("second").innerHTML = toStr(++second%60);
                    document.getElementById("minute").innerHTML = toStr(parseInt(second/60));
                    cur_Time = toStr(parseInt(second/60)) + ':' + toStr(second%60);
                    }, 1000);