document.write("<canvas id='canvas' width='1347' height='587' style='border:2px solid black'></canvas>");
/* Sets up Canvas */
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var army = {
  x : 5000,
  y : 5000,
  troops : 500,
  food: 1000
};

var map = {
  cities: [
    
  ],
  armies: [
    
  ]
}

document.addEventListener("keydown", function(event) {
  if (event.key+""==="ArrowRight") {
    army.x += 3;
  }
  
  if (event.key+""==="ArrowLeft") {
    army.x -= 3;
  }
  
  if (event.key+""==="ArrowUp") {
    army.y += 3;
  }
  
  if (event.key+""==="ArrowDown") {
    army.y -= 3;
  }
});

function generateWorld(minX, maxX, minY, maxY, numCities, numArmies) {
  var people = (Math.random() * (army.troops/50)) + army.troops/3; 
  
  for (var i = 0; i < numCities; i ++) {
    map.cities.push({
      food: (Math.random() * (people)) + 2 * people,
      people: people,
      x: (Math.random() * (maxX - minX)) + minX,
      y: (Math.random() * (maxY - minY)) + minY,
      health: people/25,
    });
  }
  
  for (var i = 0; i < numArmies; i ++) {
    
  }
}

function drawCities() {
  for (var i = 0; i < map.cities.length; i ++) {
    ctx.beginPath();
	  ctx.arc(map.cities[i].x - army.x + canvas.width/2, soldiers[i].y - army.y + canvas.height/2, soldiers[i].radius, 0, 2 * Math.PI);
	  ctx.fillStyle = "green";
	  ctx.fill();
  }
}

function draw() {
  requestAnimationFrame(draw);
}

draw();
