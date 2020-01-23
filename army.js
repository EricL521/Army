document.write("<button onClick='blockading = true;' id='blockade-button' style='display: none; position: absolute; height: 105px; width: 105px; margin-left: 12px; margin-top: 37px;'></button>");
document.write("<canvas id='canvas' width='1347' height='587' style='border:2px solid black'></canvas>");

/* Sets up Canvas */
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

/* Update Timer */
var updateTimer = new Date();

/* Mouse coords */
var mouseX = 0;
var mouseY = 0;

/* Resize canvas to client's size */
canvas.width  = window.innerWidth - 25;
canvas.height = window.innerHeight - 25;

/* City selected */
var citySelected = -1;
var blockading = false;

var keysPressed = [];

/* Player's army */
var army = {
  x : 5000,
  y : 5000,
  troops : 500,
  food: 1000
  /* Size of the army is based on the amount of troops */
};

/* Cities and Armies on the Map */
var map = {
  cities: [

  ],
  armies: [

  ]
};

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

/* Get's mouse position */
canvas.addEventListener("mousemove", function(e) {
	mouseX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - canvas.offsetLeft - 2;
	mouseY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop - canvas.offsetTop - 2;
});

/* Creates the cities and armies */
function generateWorld(minX, maxX, minY, maxY, numCities, numArmies, minDistance) {
  var people = 0;

  /* Generates Cities */
  for (var i = 0; i < numCities; i ++) {
    people = Math.floor((Math.random() * (army.troops/3)) + army.troops/3);
    map.cities.push({
      food: Math.floor((Math.random() * (people)) + 2 * people),
      people: people,
      x: (Math.random() * (maxX - minX)) + minX,
      y: (Math.random() * (maxY - minY)) + minY,
      health: people/25 /* people/25 is max health */
    });
  }

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
	/* Don't move if attacking a city */
	if (citySelected === -1) {

		/* Moves up */
		if (keysPressed[38]) {
			army.y -= 2;
		}

		/* Moves down */
		if (keysPressed[40]) {
			army.y += 2;
		}

		/* Moves right */
		if (keysPressed[39]) {
			army.x += 2;
		}

		/* Moves Left */
		if (keysPressed[37]) {
			army.x -= 2;
		}
	
	}
}

/* draws player army */
function drawArmy() {
  ctx.beginPath();
  ctx.arc(canvas.width/2, canvas.height/2, 40, 0, 2 * Math.PI);
  ctx.stroke();

  /* Draws Circle */
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.font = "60px Arial";
  ctx.fillText("Army", canvas.width/2, canvas.height/2 - 43);

  /* Labels # troops */
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.font = "30px Arial";
  ctx.fillText("Troops: " + army.troops, canvas.width/2, canvas.height/2 + 60);

  /* Labels # food */
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.font = "30px Arial";
  ctx.fillText("Food: " + army.food, canvas.width/2, canvas.height/2 + 90);
}

/* Draws all cities */
function drawCities() {
  for (var i = 0; i < map.cities.length; i ++) {
		/* Check if city is on screen */
    if ((map.cities[i].x - army.x)/army.troops * 1000 + canvas.width/2 > - 100 &&
      (map.cities[i].x - army.x)/army.troops * 1000 + canvas.width/2 < canvas.width + 100 &&
      (map.cities[i].y - army.y)/army.troops * 1000 + canvas.height/2 > - 100 &&
      (map.cities[i].y - army.y)/army.troops * 1000 + canvas.height/2 < canvas.height + 100) {

    	/* Draws Circles at Cities */
      ctx.beginPath();
	    ctx.arc((map.cities[i].x - army.x)/army.troops * 1000 + canvas.width/2, (map.cities[i].y - army.y)/army.troops * 1000 + canvas.height/2, 40 * (map.cities[i].people/army.troops), 0, 2 * Math.PI);
	    ctx.fillStyle = "green";
	    ctx.fill();

      /*  Text to label cities */
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.font = 30 * (map.cities[i].people/army.troops) + "px Arial";
      ctx.fillText("City " + (i + 1), (map.cities[i].x - army.x)/army.troops * 1000 + canvas.width/2, (map.cities[i].y - army.y)/army.troops * 1000 + canvas.height/2 - 45 * (map.cities[i].people/army.troops) - 20 * (map.cities[i].people/army.troops));

      /* Population */
      ctx.font = 20 * (map.cities[i].people/army.troops) + "px Arial";
      ctx.fillText(Math.floor(map.cities[i].people) + " people", (map.cities[i].x - army.x)/army.troops * 1000 + canvas.width/2, (map.cities[i].y - army.y)/army.troops * 1000 + canvas.height/2 + 57 * (map.cities[i].people/army.troops));

      /* Food */
      ctx.font = 20 * (map.cities[i].people/army.troops) + "px Arial";
      ctx.fillText(Math.floor(map.cities[i].food) + " food", (map.cities[i].x - army.x)/army.troops * 1000 + canvas.width/2, (map.cities[i].y - army.y)/army.troops * 1000 + canvas.height/2 + 77 * (map.cities[i].people/army.troops));
    	
			/* Health Bar */
			ctx.fillStyle = "red";
			ctx.fillRect((map.cities[i].x - army.x)/army.troops * 1000 + canvas.width/2 - 50 * (map.cities[i].people/army.troops), (map.cities[i].y - army.y)/army.troops * 1000 + canvas.height/2 - 40 * (map.cities[i].people/army.troops) - 18 * (map.cities[i].people/army.troops), 100 * (map.cities[i].people/army.troops), 15 * (map.cities[i].people/army.troops));
			ctx.fillStyle = "green";
			ctx.fillRect((map.cities[i].x - army.x)/army.troops * 1000 + canvas.width/2 - 50 * (map.cities[i].people/army.troops), (map.cities[i].y - army.y)/army.troops * 1000 + canvas.height/2 - 40 * (map.cities[i].people/army.troops) - 18 * (map.cities[i].people/army.troops), 100 * (map.cities[i].people/army.troops) * map.cities[i].health / (map.cities[i].people/25), 15 * (map.cities[i].people/army.troops));
		}
  }
}

/* Updates Cities */
function updateCities() {
	/* Timer for 1 second */
	if (new Date() - updateTimer > 1000) {
	
		for (var i = 0; i < map.cities.length; i ++) {
			/* Population Growth */
			map.cities[i].people *= 1.001;

			/* Food Increase */
			map.cities[i].food += map.cities[i].people / 1000;
			
			/* Repair city */
			if (map.cities[i].health + map.cities[i].people/750 > map.cities[i].people/25) {
				map.cities[i].health = map.cities[i].people/25;
			} else {
				map.cities[i].health += map.cities[i].people/750;
			}
		}
			
		updateTimer = new Date();
	}
	
}

/* Attack menu */
function attackMenu() {
	/* Move your army to city */
	army.x = map.cities[citySelected].x;
	army.y = map.cities[citySelected].y;
	
	/* Box for menu */
	ctx.clearRect(5, 5, canvas.width - 10, 150);
	ctx.beginPath();
	ctx.rect(5, 5, canvas.width - 10, 150);
	ctx.stroke();
	
	/* City you're attacking */
	ctx.fillStyle = "black";
	ctx.textAlign = "left";
  ctx.font = "20px Arial";
	ctx.fillText("Attacking city " + (citySelected + 1), 10, 25);
	
	/* Button for blockading a city */
	document.getElementById('blockade-button').setAttribute("style", "display: block; position: absolute; height: 105px; width: 105px; margin-left: 10px; margin-top: 35px;");
	ctx.fillStyle = "black";
	ctx.textAlign = "center";
	ctx.font = "11px Arial";
	ctx.fillText("Blockade/Starve", 60, 150);
}

/* When mouse is clicked */
document.onmouseup = function() {
	/* Check if city is clicked */
	for (var i = 0; i < map.cities.length; i ++) {
		/* Check if city is rendered */
		if ((map.cities[i].x - army.x)/army.troops * 1000 + canvas.width/2 > - 100 &&
      (map.cities[i].x - army.x)/army.troops * 1000 + canvas.width/2 < canvas.width + 100 &&
      (map.cities[i].y - army.y)/army.troops * 1000 + canvas.height/2 > - 100 &&
      (map.cities[i].y - army.y)/army.troops * 1000 + canvas.height/2 < canvas.height + 100) {
			
			if (Math.sqrt(Math.pow((map.cities[i].x - army.x)/army.troops * 1000, 2) + Math.pow((map.cities[i].y - army.y)/army.troops * 1000, 2)) < 40 + 40 * (map.cities[i].people/army.troops) && Math.sqrt(Math.pow((map.cities[i].x - army.x)/army.troops * 1000 + canvas.width/2 - mouseX, 2) + Math.pow((map.cities[i].y - army.y)/army.troops * 1000 - mouseY + canvas.height/2, 2)) < 40 * (map.cities[i].people/army.troops)) {
					citySelected = i;
			}
			
		}
	}
};

generateWorld(2000, 8000, 2000, 8000, 4000, 0, 100);

function draw() {
	/* Resets Blockade Buttons */
	document.getElementById('blockade-button').setAttribute("style", "display: none; position: absolute; height: 105px; width: 105px; margin-left: 10px; margin-top: 35px;");
	
	/* Resize canvas to client's size */
	canvas.width  = window.innerWidth - 25;
	canvas.height = window.innerHeight - 25;
	
  /* Clears Canvas */
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  /* Draws Cities */
  drawCities();
	
	/* Updates Cities */
	updateCities();

  /* Draws army */
  drawArmy();

  /* Moves your army */
  move();
	
	if (citySelected >= 0) {
		attackMenu();
	}
	
  requestAnimationFrame(draw);
}

draw();
