// Enemies our player must avoid
//var Enemy = function(x, y, speed) { // parameters set position and varying speed
class Enemy { // enemy class
  constructor(x, y, speed) {
    this.x = x;
    this.y = y + 55; // pads so it's in the middle
    this.reset = -101 // sets off screen
    this.sprite = 'images/enemy-bug.png';
    this.moveX = 101;
    this.speed = speed;
  }
};

Enemy.prototype.update = function(dt) {
    if(this.x < this.moveX * 5) { // if enemy is not passed the boundry
      this.x += this.speed * dt; // move forward, increment by speed * dt
    }
    else {
      this.x = this.reset; // resets pos
    }

};

Enemy.prototype.render = function() { // Draw the enemy on the screen, required method for game
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


class Hero { // hero class
  constructor() {
    this.moveX = 101; // left/right move of the pixel distance
    this.moveY = 83; // up/down
    this.startX = this.moveX * 2; // starts player in the middle of the board
    this.startY = (this.moveY * 4) + 55; // starts the player in the middle of the board and adds padding since he was a bit off
    this.x = this.startX; // this is for the parameters in the render function
    this.y = this.startY;
    this.sprite = 'images/char-boy.png'; // pulls the img
  }
  reset() { // reset method for collisions
    this.x = this.startX;
    this.y = this.startY;
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y); //copied over from above, draws player on screen at the starting position
  }
  handleInput(input) {
    switch(input) { // pulls the object from above to move, doesn't allow the character to walk too far off screen
      case 'left':
        if (this.x > 0) {
          this.x -= this.moveX;
        }
      break;

      case 'up':
        if (this.y > -55) { // technically you can walk off the screen but the reset method kicks in first
          this.y -= this.moveY;
        }
      break;

      case 'right':
        if (this.x < this.moveX * 4) {
          this.x += this.moveX;
        }
      break;

      case 'down':
        if (this.y < this.moveY * 4) {
          this.y += this.moveY;
        }
      break;
    }
  }
  update() {
    for(let enemy of allEnemies) {
      if (this.y === enemy.y && (enemy.x + enemy.moveX / 2 > this.x && enemy.x < this.x + this.moveX / 2)) { // checks to see for collision
        this.reset(); //resets to start x and y
      }
    }
    if (this.y === -28) {
      this.reset()
      alert('You won!'); //add a modal later on, maybe with move count
    }
  }
}

// Now instantiate your objects.
const player = new Hero();
const ladyBug1 = new Enemy(-101, 83, 200); // all the arguments from above. set to -101 to start the bug off screen
const ladyBug2 = new Enemy(-101, 249, 300); // find a way to increment the speed and randomize in the future
const ladyBug3 = new Enemy(-101, 166, 250);
const ladyBug4 = new Enemy((-101 * 2.5), 166, 350);
const ladyBug5 = new Enemy((-101 * 2.5), 83, 350);
const ladyBug6 = new Enemy((-101 * 2.5), 0, 100);
const ladyBug7 = new Enemy(-101, 0, 400);

// Place all enemy objects in an array called allEnemies
const allEnemies = [];
allEnemies.push(ladyBug1, ladyBug2, ladyBug3, ladyBug4, ladyBug5, ladyBug6, ladyBug7);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
