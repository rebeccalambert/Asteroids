const Asteroid = require("./asteroid.js");
const Util = require("./util.js");


function Game () {
  this.DIM_X = 600;
  this.DIM_Y = 400;
  this.NUM_ASTEROIDS = 5;
  this.asteroids = [];
  this.addAsteroids();
}

Game.prototype.addAsteroids = function() {
  for(let i = 0; i < this.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid(this.randomPosition(), this));
  }
};

Game.prototype.randomPosition = function() {
  return { pos: [Util.getRandomInt(this.DIM_X), Util.getRandomInt(this.DIM_Y) ]};
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  this.asteroids.forEach(function(asteroid) {
    asteroid.draw(ctx);
  });
};

Game.prototype.moveObjects = function () {
  this.asteroids.forEach(function (asteroid) {
    asteroid.move();
  });
};

Game.prototype.wrap = function(pos) {
  let MARGIN = 50;
  let x = pos[0];
  let y = pos[1];
  if (x>this.DIM_X+MARGIN) {
    x = (x - this.DIM_X - MARGIN);
  }
  if (x < 0 - MARGIN) {
    x = (x + this.DIM_X + MARGIN);
  }
  if (y>this.DIM_Y+MARGIN) {
    y = (y - this.DIM_Y - MARGIN);
  }
  if (y < 0 - MARGIN) {
    y = (y + this.DIM_Y + MARGIN);
  }
  return [x, y];
};

Game.prototype.checkCollisions = function() {
  for (let i = 0; i < this.asteroids.length-1; i++) {
    for (let j = i+1; j < this.asteroids.length; j++) {
      if (this.asteroids[i].isCollidedWith(this.asteroids[j])) {
        alert("COLLISION");
        this.asteroids[i].collideWith(this.asteroids[j]);
        
      }
    }
  }
};

Game.prototype.step = function() {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function(asteroid) {
  this.asteroids = this.asteroids.filter( function (el) {
    return el !== asteroid;
  });
};


module.exports = Game;