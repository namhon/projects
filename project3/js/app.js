// Enemies our player must avoid
let Enemy = function(x, y, z) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x; // start x position
    this.y = y; // start y position
    this.speed = z; // speed
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // boundary for enemy
    // enemy's speed vary depending on the speed
    if(this.x > -100 && this.x < 500){
        this.x = this.x + dt * this.speed;
    }
    else {
        this.x = -50;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// define collision as false 
//let collision = boolean(false);

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class player_HN {
    constructor() {
        this.xStart = 200; // start x position
        this.yStart = 400; // start y position
        this.x = this.xStart; // 101 for each horizontal
        this.y = this.yStart;  // 83 for each vertical

        this.sprite = 'images/char-boy.png';
    }

    update(){
        // checking collision with each enemy and player_HN
        for (let enemy of allEnemies){
            // checking collision with vertical 
            if (this.y <= enemy.y + 70 && this.y >= enemy.y){
                // checking collision with horizontal 
                if(enemy.x + 100 >= this.x && this.x + 80 >= enemy.x){
                    console.log("collision_x");
                    console.log("x: " + this.x + ", " + enemy.x);
                    collision_alarm();
                }
            }
        }

        // if player goes to top portion (water), game win
        if (this.y === 0){
            game_win();
        }

    }

    // reset
    reset(){
        this.x = this.xStart;
        this.y = this.yStart;
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(key_code){
        // 37
        if(key_code == 'left'){
            // boundary
            if(this.x > -20){
            this.x = this.x - 10;
            }
        }
        // 38
        if(key_code == 'up'){
            // boundary
            if(this.y > 0){
            this.y = this.y - 10;
            }
        }
        // 39
        if(key_code == 'right'){
            // boundary
            if(this.x < 420){
            this.x = this.x + 10;
            }
        }
        // 40
        if(key_code == 'down'){
            // boundary
            if(this.y < 450){
            this.y = this.y + 10;
            }
        }
    }
};

// if collision occurred:
function collision_alarm(){
    let flag = confirm(`Collision Occurred at ${GameTime} \n Game Over \n Press OK for New Game`);
    if (flag == true){
        player.reset();
    }   
};

// if player win the game 
function game_win(){
    let flag = confirm(`You win!! at ${GameTime} \n Conglaturation!!! \n Press OK for New Game`);
    if (flag == true){
        player.reset();
    }   
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
const player = new player_HN;
const enemy1 = new Enemy(0, 60, 20);
const enemy2 = new Enemy(400, 100, 40);
const enemy3 = new Enemy(150, 150, 60);
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    //console.log(e);
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'jump', // space ,, 27 for esc
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


// timer
let second = 0;
function toStr(time){
    if(time > 9){
        return time;
    } else {
        return "0" + time;
    }
};

let GameTime = '';

countTime = setInterval(function(){
                document.getElementById("second").innerHTML = toStr(++second%60);
                document.getElementById("minute").innerHTML = toStr(parseInt(second/60));
                GameTime = toStr(parseInt(second/60)) + ":" + toStr(second%60);
                }, 1000);  