document.write("<canvas id='canvas' width='1347' height='587' style='border:2px solid black'></canvas>");
/* Sets up Canvas */
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var keysPressed = [];

/* Player's army */
var army = {
  x : 5000,
  y : 5000,
  troops : 1000,
  food: 1000
  /* Size of the army is based on the amount of troops */
};

/* Cities and Armies on the Map */
var map = {
  cities: [

  ],
  armies: [

  ]
}

window.addEventListener("keydown", function(event) {
  /* Get's keys pressed */

  keysPressed[event.keyCode] = true;

  return true;
});

window.addEventListener("keyup", function(event) {
  /* Get's keys unpressed */

  keysPressed[event.keyCode] = false;

  return true;
});

/* Creates the cities and armies */
function generateWorld(minX, maxX, minY, maxY, numCities, numArmies, minDistance) {
  var people = 0;

  /* Generates Cities */
  for (var i = 0; i < numCities; i ++) {
    people = Math.floor((Math.random() * (army.troops/25)) + army.troops/3);
    map.cities.push({
      food: Math.floor((Math.random() * (people)) + 2 * people),
      people: people,
      x: (Math.random() * (maxX - minX)) + minX,
      y: (Math.random() * (maxY - minY)) + minY,
      health: people/25 + Math.floor(Math.random() * people/50),
    });
  }

  console.log(map.cities);

  /* Deletes cities that are too close to each other */
  for (var i = 0; i < map.cities.length; i ++) {
    for (var j = i + 1; j < map.cities.length; j ++) {
      if (Math.sqrt(Math.pow(map.cities[i].x - map.cities[j].x, 2) + Math.pow(map.cities[i].y - map.cities[j].y, 2), 2) < minDistance) {
        map.cities.splice(i, 1);
        if (i > 0) {
          i -= 1;
        }
        if (j > 0) {
          j -= 1;
        }
      }
    }
  }

  /*for (var i = 0; i < numArmies; i ++) {

  }*/
}

/* Moves your army */
function move() {
  /* Moves up */
  if (keysPressed[38]) {
    army.y -= 0.5;
  }

  /* Moves down */
  if (keysPressed[40]) {
    army.y += 0.5;
  }

  /* Moves right */
  if (keysPressed[39]) {
    army.x += 0.5;
  }

  /* Moves Left */
  if (keysPressed[37]) {
    army.x -= 0.5;
  }
}

/* draws player army */
function drawArmy() {
  ctx.beginPath();
  ctx.arc(canvas.width/2, canvas.height/2, 20, 0, 2 * Math.PI);
  ctx.stroke();

  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.font = "30px Arial";
  ctx.fillText("Army", canvas.width/2, canvas.height/2 - 23);
}

/* Draws all cities */
function drawCities() {
  for (var i = 0; i < map.cities.length; i ++) {
    if ((map.cities[i].x - army.x)/army.troops * 1000 + canvas.width/2 > - 100 &&
      (map.cities[i].x - army.x)/army.troops * 1000 + canvas.width/2 < canvas.width + 100 &&
      (map.cities[i].y - army.y)/army.troops * 1000 + canvas.height/2 > - 100 &&
      (map.cities[i].y - army.y)/army.troops * 1000 + canvas.height/2 + 100) {

    /* Draws Circles at Cities */
      ctx.beginPath();
	    ctx.arc((map.cities[i].x - army.x)/army.troops * 1000 + canvas.width/2, (map.cities[i].y - army.y)/army.troops * 1000 + canvas.height/2, 10/army.troops * 1000, 0, 2 * Math.PI);
	    ctx.fillStyle = "green";
	    ctx.fill();

      /*  Text to label cities */
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.font = "30px Arial";
      ctx.fillText("City", (map.cities[i].x - army.x)/army.troops * 1000 + canvas.width/2, (map.cities[i].y - army.y)/army.troops * 1000 + canvas.height/2 + army.troops/50 - 33);

      /* Population */
      ctx.font = "20px Arial";
      ctx.fillText(map.cities[i].people + " people", (map.cities[i].x - army.x)/army.troops * 1000 + canvas.width/2, (map.cities[i].y - army.y)/army.troops * 1000 + canvas.height/2 - 11*army.troops/500 + 46);

      /* Food */
      ctx.font = "20px Arial";
      ctx.fillText(map.cities[i].food + " food", (map.cities[i].x - army.x)/army.troops * 1000 + canvas.width/2, (map.cities[i].y - army.y)/army.troops * 1000 + canvas.height/2 - 13*army.troops/500 + 71);
    }
  }
}

generateWorld(4000, 6000, 4000, 6000, 1000, 0, 100);

function draw() {
  /* Clears Canvas */
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  /* Draws Cities */
  drawCities();

  /* Draws army */
  drawArmy();

  /* Moves your army */
  move();

  requestAnimationFrame(draw);
}

draw();
