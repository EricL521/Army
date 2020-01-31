/* Blockade Button */
document.write("<button onClick='blockading = true;' id='blockade-button'> <p style='font-size: 25px; margin-bottom: 5px;'>Blockade</p><p style='font-size: 25px; margin-top: 5px'>/Starve</p> </button>");
/* Attack Wall Button */
document.write("<button onClick='attacking = true;' id='attack-button'> <p style='font-size: 25px; margin-bottom: 5px;'>Attack</p><p style='font-size: 25px; margin-top: 5px'>City Wall</p> </button>");
/* Close Attack Menu Button */
document.write("<button onClick='citySelected = -1; blockading = false; attacking = false;' id='close-attack-menu-button'>X</button>");

/* Close info box button */
document.write("<button onClick='infoBox = false;' id='close-info-box-button'> <p style='font-size: 20px; position: fixed; left: 195px; bottom: 75px;'>x</p> </button>");
/* Open info box button */
document.write("<button onClick='infoBox = true;' id='open-info-box-button'> <p style='font-size: 15px; position: fixed; left: 23px; bottom: 7px;'>i</p> </button>");

/* Pause/Play button */
document.write("<div id='time-controls' style='display: flex; width: 100px; height: 25px; border: 1px solid black; justify-content: space-evenly;'>" +
							 "<button onClick=' var el = document.getElementById(\'pause-play-button\'); if (el.innerTEXT = \'||\') {el.innerTEXT = \'\u1405\';} else {el.innerTEXT=\'||\';}' style='position: block; width: 25px; height: 25px;'> <p id='pause-play-button' style='position: absolute; top: 0px; font-weight: bold;'>||</p> </button>" + 
							 /*"<button style='position: block; width: 25px; height: 25px;'> <p id='pause-play-button' style='position: absolute; top: 0px; font-weight: lighter; margin-left: -6px;'>\u1405\u1405</p> </button>" + 
						*/ "" + 
							 "" + 
							 "" + 
							 "</div>");

/* Capture City Alert */
document.write("<div id=display-options style='display: none; left: " + (window.innerWidth/2 - 250) + "px; top: " + (window.innerHeight/2 - 150) + "px; border-radius: 10px; position: fixed; height: 300px; width: 500px; background-color: black;'>" +
							 "<div style='border-radius: 10px; position: relative; top: 1px; left: 1px; width: 498px; height: 298px; background-color: white;'>" + 
							 "<h1 style='margin-top: -6px; font-size: 60px; text-align: center; width: 100%; position: absolute;'> City Options </h1>" + 
							 "<div style='display: flex; width: 100%; position: absolute; justify-content: space-evenly; top: 80px;'>" + 
							 "<button style='outline: none; width: 200px; height: 100px; bottom: 10px; border-radius: 10px;'> <h1>Capture City</h1> </button>" + 
							 "<button style='outline: none; width: 200px; height: 100px; bottom: 10px; border-radius: 10px;'> <h1>Raze City</h1> </button>" + 
							 "</div>" +
							 "<div style='display: flex; width: 100%; position: absolute; justify-content: space-evenly; top: 180px;'>" + 
							 "<div style='width: 40%;'>" + 
							 "<p>Make the city yours. It will give you food and some troops over time.</p>" + 
							 "</div>" +
							 "<div style='width: 40%;'>" + 
							 "<p>Recruit all eligible people into your army, steal all the food, and burn the city down.</p>" + 
							 "</div>" + 
							 "</div>" + 
							 "</div>" + 
							 "</div>");

/* Canvas */
document.write("<canvas id='canvas' width='1347' height='587' style='border:2px solid black'></canvas>");

/* Sets up Canvas */
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

/* Pause game */
var pause = false;

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
var attacking = false;

/* If info box is opened or not */
var infoBox = true;

/* display options for cities */
var displayoptions = false;

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

/* Draws info box */
function drawInfoBox() {
	if (infoBox) {
		/* Makes box for info */
		ctx.clearRect(5, canvas.height - 5 - 100, 200, 100);
		ctx.beginPath();
		ctx.rect(6, canvas.height - 6 - 98, 198, 98);
		ctx.stroke();
		
		/* Labels # troops */
		ctx.fillStyle = "black";
		ctx.textAlign = "left";
		ctx.font = "30px Arial";
		ctx.fillText("• Troops: " + Math.floor(army.troops), 10, canvas.height - 25);

		/* Labels # food */
		ctx.fillStyle = "black";
		ctx.textAlign = "left";
		ctx.font = "30px Arial";
		ctx.fillText("• Food: " + Math.floor(army.food), 10, canvas.height - 60);
		
		/* Button for closing menu */
		document.getElementById('close-info-box-button').setAttribute("style", "outline:none; border-radius: 5px; display: block; position: absolute; height: 20px; width: 20px; left: 190px; bottom: 95px;");
		
		/* Disbable button for opening menu */
		document.getElementById('open-info-box-button').setAttribute("style", "outline:none; border-radius: 5px; display: none; position: absolute; height: 20px; width: 20px; left: 15px; bottom: 20px;");
	}
}

/* draws player army */
function drawArmy() {
  /* Draws Circle */
	if (!blockading) {
  	ctx.beginPath();
  	ctx.arc(canvas.width/2, canvas.height/2, 40, 0, 2 * Math.PI);
  	ctx.stroke();
	} else if (blockading) {
		ctx.beginPath();
  	ctx.arc(canvas.width/2, canvas.height/2, 40 * (map.cities[citySelected].people/army.troops) + 10, 0, 2 * Math.PI);
  	ctx.stroke();
	}
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
			map.cities[i].food += map.cities[i].people / 100;
			
			/* Repair city */
			if (map.cities[i].health + map.cities[i].people/750 > map.cities[i].people/25) {
				map.cities[i].health = map.cities[i].people/25;
			} else {
				map.cities[i].health += map.cities[i].people/500;
			}
			
			/* Check if city is defeated */
			if (map.cities[i].food <= 0 || map.cities[i].health <= 0) {
				attacking = false;
				blockading = false;
				
				
				
				map.cities[i].health = 0;
				map.cities[i].food = 0;
			}
		}
		
		/* City being blockaded */
		if (citySelected > -1 && blockading) {
			/* Removes food */
			map.cities[citySelected].food -= map.cities[citySelected].people/50;
			
			/* No population growth when blockading */
			map.cities[citySelected].people /= 1.001;
			
			/* Some troops die */
			army.troops -= map.cities[citySelected].people * 0.001 / 2;
		}
		
		/* City being attacked */
		if (citySelected > -1 && attacking) {
			/* Removes health */
			map.cities[citySelected].health -= army.troops / 500;
			
			/* No population growth when being attacked */
			map.cities[citySelected].people /= 1.001;
			
			/* Some troops die */
			army.troops -= map.cities[citySelected].people * 0.001;
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
	document.getElementById('blockade-button').setAttribute("style", "outline:none; border-radius: 10px; display: block; position: absolute; height: 115px; width: 165px; left: 19px; top: 42px;");
	
	/* Button for attacking a city */
	document.getElementById('attack-button').setAttribute("style", "outline:none; border-radius: 10px; display: block; position: absolute; height: 115px; width: 165px; left: 190px; top: 42px;");
	
	/* Button for closing menu */
	document.getElementById('close-attack-menu-button').setAttribute("style", "outline:none; border-radius: 5px; display: block; position: absolute; height: 25px; width: 25px; right: 23px; top: 17px;");
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

generateWorld(1000, 9000, 1000, 9000, 4000, 0, 100);

function draw() {
	/* Resets all Buttons */
	document.getElementById('blockade-button').setAttribute("style", "outline:none; border-radius: 10px; display: none; position: absolute; height: 115px; width: 165px; left: 19px; top: 42px;");
	document.getElementById('close-attack-menu-button').setAttribute("style", "outline:none; border-radius: 5px; display: none; position: absolute; height: 25px; width: 25px; right: 23px; top: 17px;");
	document.getElementById('close-info-box-button').setAttribute("style", "outline:none; border-radius: 5px; display: none; position: absolute; height: 20px; width: 20px; left: 190px; bottom: 95px;");
	document.getElementById('open-info-box-button').setAttribute("style", "outline:none; border-radius: 5px; display: block; position: absolute; height: 20px; width: 20px; left: 15px; bottom: 20px;");
	document.getElementById('attack-button').setAttribute("style", "outline:none; border-radius: 10px; display: none; position: absolute; height: 115px; width: 165px; left: 190px; top: 42px;");
	
	/* Resize canvas to client's size */
	canvas.width  = window.innerWidth - 25;
	canvas.height = window.innerHeight - 25;
	
	if (!pause) {
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

		/* Draw info box */
		drawInfoBox();

		/* Draws attack menu */
		if (citySelected >= 0) {
			attackMenu();
		}
	} else if (pause) {
		/* Clears Canvas */
  	ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		/* Draws Cities */
		drawCities();

		/* Draws army */
		drawArmy();

		/* Draws attack menu */
		if (citySelected >= 0) {
			attackMenu();
		}
		
		/* Draws grey box */
		ctx.globalAlpha = 0.25;
		ctx.fillStyle = "grey";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.globalAlpha = 1;
		
		/* Draw info box */
		drawInfoBox();
	}
	
  requestAnimationFrame(draw);
}

draw();
