document.write("<canvas id='canvas' width='1347' height='587' style='border:2px solid black'></canvas>");
/* Sets up Canvas */
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var army = {
  x : 5000,
  y : 5000,
  troops : 500,
  food: 1000,
  draw: function () {
    ctx.beginPath();
	  ctx.arc(canvas.width/2, canvas.height/2, 25, 0, 2 * Math.PI);
    ctx.stroke();
  }
};

var map = {
  cities: [

  ],
  armies: [

  ]
}

document.addEventListener("keydown", function(event) {
  /* Moving */

  if (event.key+""==="ArrowRight") {
    army.x += 3;
  }

  if (event.key+""==="ArrowLeft") {
    army.x -= 3;
  }

  if (event.key+""==="ArrowUp") {
    army.y -= 3;
  }

  if (event.key+""==="ArrowDown") {
    army.y += 3;
  }
});

function generateWorld(minX, maxX, minY, maxY, numCities, numArmies) {
  var people = Math.floor((Math.random() * (army.troops/50)) + army.troops/3);

  /* Generates Cities */
  for (var i = 0; i < numCities; i ++) {
    map.cities.push({
      food: Math.floor((Math.random() * (people)) + 2 * people),
      people: people,
      x: (Math.random() * (maxX - minX)) + minX,
      y: (Math.random() * (maxY - minY)) + minY,
      health: people/25 + Math.floor(Math.random() * people/50),
    });
  }

  /*for (var i = 0; i < numArmies; i ++) {

  }*/
}

map.cities.push({food:10, people: 10, x: 5100, y: 5100, health: 100});

function drawCities() {
  for (var i = 0; i < map.cities.length; i ++) {
    /* Draws Circles at Cities */
    ctx.beginPath();
	  ctx.arc(map.cities[i].x - army.x + canvas.width/2, map.cities[i].y - army.y + canvas.height/2, 10, 0, 2 * Math.PI);
	  ctx.fillStyle = "green";
	  ctx.fill();
  }
}

function draw() {
  /* Clears Canvas */
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  /* Draws Cities */
  drawCities();

  /* Draws army */
  army.draw();

  requestAnimationFrame(draw);
}

draw();
