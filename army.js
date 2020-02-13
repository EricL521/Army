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
document.write("<div id='time-controls' style='position: fixed; right: 10px; bottom: 20px; display: flex; width: 50px; height: 25px; justify-content: space-evenly;'>" +
	"<button id='pause-play-button-real' onClick=\"pause = !pause; var el = document.getElementById('pause-play-button'); if (el.innerText == '||') {el.innerText = '\u1405'; el.setAttribute('style', 'position: absolute; top: 0px; font-weight: lighter; margin-left: 0px; margin-top: 4px;');} else {el.innerText='||'; el.setAttribute('style', 'position: absolute; top: 0px; font-weight: bold; margin-left: 0px; margin-top: 3px;');}\" style='outline: none; border-radius: 5px; position: block; width: 25px; height: 25px;'> <p id='pause-play-button' style='position: absolute; top: 0px; font-weight: bold; margin-left: 0px; margin-top: 3px;'>||</p> </button>" +
	/*"<button style='position: block; width: 25px; height: 25px;'> <p id='pause-play-button' style='position: absolute; top: 0px; font-weight: lighter; margin-left: -6px;'>\u1405\u1405</p> </button>" +
	*/ "" +
	"" +
	"" +
	"</div>");

/* Capture City Alert */
document.write("<div id=display-options style='display: none; left: " + (window.innerWidth/2 - 250) + "px; top: " + (window.innerHeight/2 - 150) + "px; border-radius: 10px; position: fixed; height: 300px; width: 500px; background-color: black;'>" +
	"<div style='border-radius: 10px; position: relative; top: 1px; left: 1px; width: 498px; height: 298px; background-color: white;'>" +
	"<h1 style='margin-top: 0px; font-size: 60px; text-align: center; width: 100%; position: absolute;'> City Options </h1>" +
	"<div style='display: flex; width: 100%; position: absolute; justify-content: space-evenly; top: 80px;'>" +
	"<button onClick=\"document.getElementById('pause-play-button-real').disabled = false; document.getElementById('display-options').setAttribute('style', 'display: none; left: ' + (window.innerWidth/2 - 250) + 'px; top: ' + (window.innerHeight/2 - 150) + 'px; border-radius: 10px; position: fixed; height: 300px; width: 500px; background-color: black;'); pause = false; map.cities[citySelected].team='player'; citySelected = -1;\" style='outline: none; width: 200px; height: 100px; bottom: 10px; border-radius: 10px;'> <h1>Capture City</h1> </button>" +
	"<button onClick=\"document.getElementById('pause-play-button-real').disabled = false; document.getElementById('display-options').setAttribute('style', 'display: none; left: ' + (window.innerWidth/2 - 250) + 'px; top: ' + (window.innerHeight/2 - 150) + 'px; border-radius: 10px; position: fixed; height: 300px; width: 500px; background-color: black;'); pause = false; army.troops += map.cities[citySelected].people/15; army.food += map.cities[citySelected].food; map.cities.splice(citySelected, 1); citySelected = -1;\" style='outline: none; width: 200px; height: 100px; bottom: 10px; border-radius: 10px;'> <h1>Raze City</h1> </button>" +
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

/* Pause game when unloaded */
window.onblur = function () {
	pause = true;
	document.getElementById('pause-play-button').innerText = "\u1405";
	document.getElementById('pause-play-button').setAttribute('style', 'position: absolute; top: 0px; font-weight: lighter; margin-left: 0px; margin-top: 4px;');
};

/* Canvas */
document.write("<canvas id='canvas' width='1347' height='587' style='border:2px solid black'></canvas>");

/* Sets up Canvas */
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

/* Pause game */
var pause = false;

/* Used to determine time since last frame */
var timeSinceLastFrame = new Date();

/* Mouse coords */
var mouseX = 0;
var mouseY = 0;

/* Letters */
var consonants = ['ph', 'gl', 'st', 'cr', 'q', 'w', 'r', 't', 'y', 'p', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
var vowels =['a', 'e', 'i', 'o', 'u', 'ai'] ;

/* Resize canvas to client's size */
canvas.width	= window.innerWidth - 25;
canvas.height = window.innerHeight - 25;

/* City selected */
var citySelected = -1;
var blockading = false;
var attacking = false;

/* If info box is opened or not */
var infoBox = true;

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
			health: people/25 /* people/25 is max health */,
			fps: Math.random() * 250 + 1000 /* Food per second */, 
			team: "neutral",
			name: "" + consonants[Math.floor(Math.random() * (consonants.length - 1))] + vowels[Math.floor(Math.random() * (vowels.length - 1))] + consonants[Math.floor(Math.random() * (consonants.length - 1))] + vowels[Math.floor(Math.random() * (vowels.length - 1))] + consonants[Math.floor(Math.random() * (consonants.length - 1))]
		});
		
		map.cities[i].name = map.cities[i].name.charAt(0).toUpperCase() + map.cities[i].name.slice(1);
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
	ctx.beginPath();
	ctx.arc(canvas.width/2, canvas.height/2, 40, 0, 2 * Math.PI);
	ctx.stroke();
}

/* Draws all cities */
function drawCities() {
	for (var i = 0; i < map.cities.length; i ++) {
		/* Check if city is on screen */
		if ((map.cities[i].x - army.x)/500 * 1000 + canvas.width/2 > - 100 &&
			(map.cities[i].x - army.x)/500 * 1000 + canvas.width/2 < canvas.width + 100 &&
			(map.cities[i].y - army.y)/500 * 1000 + canvas.height/2 > - 100 &&
			(map.cities[i].y - army.y)/500 * 1000 + canvas.height/2 < canvas.height + 100) {

			/* Draws Circles at Cities */
			ctx.beginPath();
			ctx.arc((map.cities[i].x - army.x)/500 * 1000 + canvas.width/2, (map.cities[i].y - army.y)/500 * 1000 + canvas.height/2, 40 * (25/40), 0, 2 * Math.PI);
			ctx.fillStyle = "grey";
			if (map.cities[i].team == "player") {ctx.fillStyle = "green";}
			else if (map.cities[i].team != "neutral") {ctx.fillStyle = "red";}
			ctx.fill();

			/*	Text to label cities */
			ctx.fillStyle = "black";
			ctx.textAlign = "center";
			ctx.font = 30 * (25/40) + "px Arial";
			ctx.fillText(map.cities[i].name, (map.cities[i].x - army.x)/500 * 1000 + canvas.width/2, (map.cities[i].y - army.y)/500 * 1000 + canvas.height/2 - 45 * (25/40) - 20 * (25/40));

			/* Population */
			ctx.font = 20 * (25/40) + "px Arial";
			ctx.fillText(Math.floor(map.cities[i].people) + " people", (map.cities[i].x - army.x)/500 * 1000 + canvas.width/2, (map.cities[i].y - army.y)/500 * 1000 + canvas.height/2 + 57 * (25/40));

			/* Food */
			ctx.font = 20 * (25/40) + "px Arial";
			ctx.fillText(Math.floor(map.cities[i].food) + " food", (map.cities[i].x - army.x)/500 * 1000 + canvas.width/2, (map.cities[i].y - army.y)/500 * 1000 + canvas.height/2 + 77 * (25/40));

			/* Health Bar */
			ctx.fillStyle = "red";
			ctx.fillRect((map.cities[i].x - army.x)/500 * 1000 + canvas.width/2 - 50 * (25/40), (map.cities[i].y - army.y)/500 * 1000 + canvas.height/2 - 40 * (25/40) - 18 * (25/40), 100 * (25/40), 15 * (25/40));
			ctx.fillStyle = "grey";
			if (map.cities[i].team == "player") {ctx.fillStyle = "green";}
			else if (map.cities[i].team != "neutral") {ctx.fillStyle = "red";}
			ctx.fillRect((map.cities[i].x - army.x)/500 * 1000 + canvas.width/2 - 50 * (25/40), (map.cities[i].y - army.y)/500 * 1000 + canvas.height/2 - 40 * (25/40) - 18 * (25/40), 100 * (25/40) * map.cities[i].health / (map.cities[i].people/25), 15 * (25/40));
		}
	}
}

/* Updates Cities */
function updateCities() {
	/* If game is not paused */
	if (!pause) {
		for (var i = 0; i < map.cities.length; i ++) {
			/* Pay food to owner */
			if (map.cities[i].team == "player") {
				army.food += (10000/map.cities[i].people + 5) * 0.05;
				map.cities[i].food -= (10000/map.cities[i].people + 5) * 0.05;
			}
			
			/* Population Growth */
			map.cities[i].people *= 1.00001 + 50/map.cities[i].people;

			/* Food Increase */
			map.cities[i].food += 10000/map.cities[i].people + 5;

			/* Repair city */
			if (map.cities[i].health + map.cities[i].people/750 > map.cities[i].people/25) {
				map.cities[i].health = map.cities[i].people/25;
			} else {
				map.cities[i].health += map.cities[i].people/1000;
			}
			
			/* Pay people to owner */
			if (map.cities[i].team == "player") {
				army.troops += ((1.0001 + 50/map.cities[i].people) * map.cities[i].people - map.cities[i].people) * 0.05;
				map.cities[i].people -= ((1.0001 + 50/map.cities[i].people) * map.cities[i].people - map.cities[i].people) * 0.05;
			}

		}

		/* City being blockaded */
		if (citySelected > -1 && blockading) {
			/* Removes food */
			map.cities[citySelected].food -= map.cities[citySelected].people/50;

			/* No population growth when blockading */
			map.cities[citySelected].people /= 1.00001 + 50/map.cities[citySelected].people;

			/* Some troops die */
			army.troops -= map.cities[citySelected].people * 0.001 / 2;
		}

		/* City being attacked */
		if (citySelected > -1 && attacking) {
			/* Removes health */
			map.cities[citySelected].health -= army.troops / 500;

			/* Population declines */
			map.cities[citySelected].people /= 1 + 1.1 * (0.00001 + 50/map.cities[citySelected].people);

			/* Some troops die */
			army.troops -= map.cities[citySelected].people * 0.001;
		}
		
		/* If city health > city health max, set city health to max */
		if (citySelected > -1 && map.cities[citySelected].health > map.cities[citySelected].people / 25) {
			map.cities[citySelected].health = map.cities[citySelected].people / 25;
		}

		/* Check if city is defeated */
		if (citySelected > -1 && (map.cities[citySelected].food <= 0 || map.cities[citySelected].health <= 0)) {
			attacking = false;
			blockading = false;

			map.cities[citySelected].health = map.cities[citySelected].people/25;
			if (map.cities[citySelected].food < 0) {
				map.cities[citySelected].food = 0;
			}

			/* Pauses Game and Brings up menu */
			pause = true;
			document.getElementById('display-options').setAttribute("style", "display: block; left: " + (window.innerWidth/2 - 250) + "px; top: " + (window.innerHeight/2 - 150) + "px; border-radius: 10px; position: fixed; height: 300px; width: 500px; background-color: black;");
			document.getElementById('pause-play-button-real').disabled = true;
		}
	}

	/* Timer for 1 second */
	setTimeout(updateCities, 1000);
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
	ctx.fillText("Attacking: " + map.cities[citySelected].name, 10, 25);

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
		if ((map.cities[i].x - army.x)/500 * 1000 + canvas.width/2 > - 100 &&
			(map.cities[i].x - army.x)/500 * 1000 + canvas.width/2 < canvas.width + 100 &&
			(map.cities[i].y - army.y)/500 * 1000 + canvas.height/2 > - 100 &&
			(map.cities[i].y - army.y)/500 * 1000 + canvas.height/2 < canvas.height + 100) {

			if (Math.sqrt(Math.pow((map.cities[i].x - army.x)/500 * 1000, 2) + Math.pow((map.cities[i].y - army.y)/500 * 1000, 2)) < 40 + 40 * (25/40) && Math.sqrt(Math.pow((map.cities[i].x - army.x)/500 * 1000 + canvas.width/2 - mouseX, 2) + Math.pow((map.cities[i].y - army.y)/500 * 1000 - mouseY + canvas.height/2, 2)) < 40 * (25/40)) {
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
	canvas.width = window.innerWidth - 25;
	canvas.height = window.innerHeight - 25;

	if (!pause) {
		/* Clears Canvas */
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		/* Draws Cities */
		drawCities();

		/* Draws army */
		drawArmy();

		/* Moves your army */
		move();

		/* Soldiers eat food */
		army.food -= army.troops/50000;

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

	timeSinceLastFrame = new Date();

	requestAnimationFrame(draw);
}

draw();
updateCities();
