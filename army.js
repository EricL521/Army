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

/* Arrays for troops and city guards */
var armyTroops = [];
var cityTroops = [];

/* Used to determine time since last frame */
var timeSinceLastFrame = new Date();

/* if player has city surrounded */
var surroundingCity = false;
/* Dark portion of clicking */
var darkSize = 0;

/* Used for transitions */
var transition = 0;

/* Mouse coords */
var mouseX = 0;
var mouseY = 0;

/* Letters */
var consonants = ['ph', 'gl', 'st', 'cr', 'q', 'w', 'r', 't', 'y', 'p', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
var vowels =['a', 'e', 'i', 'o', 'u', 'ai'] ;

/* Resize canvas to client's size */
canvas.width = window.innerWidth - 25;
canvas.height = window.innerHeight - 25;

/* City selected */
var citySelected = -1;

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
			health: people/25,
			fps: Math.random()/2 + 0.75 /* Food per second */,
			team: "neutral",
			wallHealth: [wall1: 100, wall2: 100, wall3: 100, wall4: 100, wall5: 100, wall6: 10],
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
			
			if (citySelected != i) {
				
				/* Population Growth */
				var x = 0;
				map.cities[i].people = map.cities[i].fps * ((-100000000)/(200+Math.E^(0.0000075 * x)) + 500000);

				/* Food Increase */
				map.cities[i].food += map.cities[i].fps * 10;

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

		}

		/* Check if city is defeated */
		if (citySelected > -1 && (map.cities[citySelected].food <= 0 || map.cities[citySelected].health <= 0)) {

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

/* Update Attack screen */
function updateAttackMenu() {

	/* If city is still defending */
	if (cityTroops.length > 0 && !surroundingCity) {

		for (var i = 0; i < armyTroops.length; i ++) {
			if (armyTroops.length > 0 && cityTroops.length > 0) {

				var troop = armyTroops[i];

				/* If targeting is not in range */
				if (Math.sqrt(Math.pow(troop.x - cityTroops[troop.targeting].x, 2) + Math.pow(troop.y - cityTroops[troop.targeting].y, 2)) > troop.range) {
					/* a-dif in x, b-dif in y, c-hyp */
					var a = cityTroops[troop.targeting].x - troop.x;
					var b = cityTroops[troop.targeting].y - troop.y;
					var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

					/* move troop */
					troop.x += 3 * (a/c);
					troop.y += 3 * (b/c);
				}

				if (new Date() - troop.shootTimer > 1000 && Math.sqrt(Math.pow(troop.x - cityTroops[troop.targeting].x, 2) + Math.pow(troop.y - cityTroops[troop.targeting].y, 2)) < troop.range) {
					/* Shoot */
					cityTroops[troop.targeting].health -= troop.damage;

					/* Move backwards */
					var a = cityTroops[troop.targeting].x - troop.x;
					var b = cityTroops[troop.targeting].y - troop.y;
					var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

					troop.x += -50 * (a/c);
					troop.y += -50 * (b/c);

					if (cityTroops[troop.targeting].health <= 0) {
						/* compensate for splicing */
						for (var j = 0; j < armyTroops.length; j ++) {
							if (armyTroops[j].targeting > troop.targeting) {
								armyTroops[j].targeting --;
							}
						}

						cityTroops.splice(troop.targeting, 1);

						for (var j = 0; j < armyTroops.length; j ++) {
							if (armyTroops[j].targeting < 0) {
								armyTroops[j].targeting = 0;
							}

							if (armyTroops[j].targeting >= cityTroops.length) {
								armyTroops[j].targeting = cityTroops.length - 1;
							}
						}

						troop.targeting = Math.floor(Math.random() * cityTroops.length);
					}

					troop.shootTimer = new Date();
				}

			}
		}

		for (var i = 0; i < cityTroops.length; i ++) {
			if (armyTroops.length > 0 && cityTroops.length > 0) {

				var troop = cityTroops[i];

				/* If targeting is not in range */
				if (Math.sqrt(Math.pow(troop.x - armyTroops[troop.targeting].x, 2) + Math.pow(troop.y - armyTroops[troop.targeting].y, 2)) > troop.range) {
					/* a-dif in x, b-dif in y, c-hyp */
					var a = armyTroops[troop.targeting].x - troop.x;
					var b = armyTroops[troop.targeting].y - troop.y;
					var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

					/* move troop */
					troop.x += 3 * (a/c);
					troop.y += 3 * (b/c);
				}

				if (new Date() - troop.shootTimer > 1000 && Math.sqrt(Math.pow(troop.x - armyTroops[troop.targeting].x, 2) + Math.pow(troop.y - armyTroops[troop.targeting].y, 2)) < troop.range) {
					/* Shoot */
					armyTroops[troop.targeting].health -= troop.damage;

					/* Move backwards */
					var a = armyTroops[troop.targeting].x - troop.x;
					var b = armyTroops[troop.targeting].y - troop.y;
					var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

					troop.x += -50 * (a/c);
					troop.y += -50 * (b/c);

					if (armyTroops[troop.targeting].health <= 0) {
						/* compensate for splicing */
						for (var j = 0; j < cityTroops.length; j ++) {
							if (cityTroops[j].targeting >= troop.targeting) {
								cityTroops[j].targeting --;
							}
						}

						armyTroops.splice(troop.targeting, 1);

						for (var j = 0; j < cityTroops.length; j ++) {
							if (cityTroops[j].targeting < 0) {
								cityTroops[j].targeting = 0;
							}

							if (cityTroops[j].targeting >= armyTroops.length) {
								cityTroops[j].targeting = armyTroops.length - 1;
							}
						}

						troop.targeting = Math.floor(Math.random() * cityTroops.length);
					}

					troop.shootTimer = new Date();
				}

			}
		}

	}

	if (armyTroops.length < army.troops/200) {
		/* Lost */
		
		map.cities[citySelected].people += 50 * (cityTroops.length - map.cities[citySelected].people * 0.05 / 50) * (Math.random() / 10 + .7);
		
		citySelected = -1;

		army.troops += 50 * (armyTroops.length - (army.troops/50)) * (Math.random() / 10 + .7);
	}
	
	if (surroundingCity) {
		updateAttackCity();
	} else if (cityTroops.length == 0) {
		if (transition == 100) {
			/* Blockade or Attack Wall */
			for (var i = 0; i < armyTroops.length; i ++) {
				armyTroops[i].x = canvas.width/2;
				armyTroops[i].y = canvas.height/2;

				armyTroops[i].x += 250 * Math.cos((2*Math.PI) / armyTroops.length * i);
				armyTroops[i].y += 250 * Math.sin((2*Math.PI) / armyTroops.length * i);
			}
		}
		
		transition += 2;
		
		if (transition >= 200) {
			surroundingCity = true;
			transition = 0;
		}
	}
}

function updateAttackCity() {
	/* Increases dark portion of clicable areas */
	darkSize += (darkSize >= 25)? -1 * darkSize : 0.4;
}

/* Draw Attack menu */
function drawAttackMenu() {
	if (surroundingCity || transition >= 100) {
		/* Draw city */
		ctx.beginPath();
		ctx.arc(canvas.width/2, canvas.height/2, 225, 0, 2 * Math.PI);
		ctx.strokeStyle = "black";
		ctx.lineWidth = 2;
		ctx.stroke();
		ctx.lineWidth = 1;
		
		ctx.beginPath();
		ctx.arc(canvas.width/2, canvas.height/2, 224, 0, 2 * Math.PI);
		ctx.fillStyle = "grey";
		ctx.fill();
		
		ctx.beginPath();
		ctx.arc(canvas.width/2, canvas.height/2, 199, 0, 2 * Math.PI);
		ctx.fillStyle = "white";
		ctx.fill();
		
		ctx.beginPath();
		ctx.arc(canvas.width/2, canvas.height/2, 200, 0, 2 * Math.PI);
		ctx.strokeStyle = "black";
		ctx.lineWidth = 2;
		ctx.stroke();
		ctx.lineWidth = 1;
		
		/* Draws lines seperating the walls */
		for (var i = 0; i < 6; i ++) {
			ctx.beginPath();
			ctx.moveTo(canvas.width/2 + 225 * Math.cos((2*Math.PI / 6) * i), canvas.height/2 + 225 * Math.sin((2*Math.PI / 6) * i));
			ctx.lineTo(canvas.width/2 + 200 * Math.cos((2*Math.PI / 6) * i), canvas.height/2 + 200 * Math.sin((2*Math.PI / 6) * i));
			ctx.lineWidth = 2;
			ctx.stroke();
			ctx.lineWidth = 1;
		}
		
		/* Draws clickable areas */
		for (var i = 0; i < 6; i ++) {
			ctx.beginPath();
			ctx.arc(canvas.width/2 + 212.5 * Math.cos((2*Math.PI / 6) * i + (Math.PI / 6)), canvas.height/2 + 212.5 * Math.sin((2*Math.PI / 6) * i + (Math.PI / 6)), 25, 0, 2 * Math.PI);
			ctx.fillStyle = "red";
			ctx.globalAlpha = 0.25;
			ctx.fill();
			ctx.globalAlpha = 1;
			
			ctx.beginPath();
			ctx.arc(canvas.width/2 + 212.5 * Math.cos((2*Math.PI / 6) * i + (Math.PI / 6)), canvas.height/2 + 212.5 * Math.sin((2*Math.PI / 6) * i + (Math.PI / 6)), darkSize, 0, 2 * Math.PI);
			ctx.fillStyle = "red";
			ctx.globalAlpha = 0.75;
			ctx.fill();
			ctx.globalAlpha = 1;
		}
	}
	
	for (var i = 0; i < armyTroops.length; i ++) {
		var troop = armyTroops[i];

		ctx.beginPath();
		ctx.arc(troop.x, troop.y, 10, 0, 2 * Math.PI);
		ctx.fillStyle = "green";
		ctx.fill();
	}

	for (var i = 0; i < cityTroops.length; i ++) {
		var troop = cityTroops[i];

		ctx.beginPath();
		ctx.arc(troop.x, troop.y, 10, 0, 2 * Math.PI);
		ctx.fillStyle = "red";
		ctx.fill();
	}
	
	/* Fade in & out */
	ctx.globalAlpha = 1 - (Math.abs(transition - 100) / 100);
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.globalAlpha = 1;
}

/* When mouse is clicked */
document.onmouseup = function() {
	/* If city is surrounded */
	if (surroundingCity) {
		
	}
	
	/* Check if city is clicked */
	if (!surroundingCity) {
		for (var i = 0; i < map.cities.length; i ++) {
			/* Check if city is rendered */
			if ((map.cities[i].x - army.x)/500 * 1000 + canvas.width/2 > - 100 &&
				(map.cities[i].x - army.x)/500 * 1000 + canvas.width/2 < canvas.width + 100 &&
				(map.cities[i].y - army.y)/500 * 1000 + canvas.height/2 > - 100 &&
				(map.cities[i].y - army.y)/500 * 1000 + canvas.height/2 < canvas.height + 100) {

				if (map.cities[i].team != "player" && Math.sqrt(Math.pow((map.cities[i].x - army.x)/500 * 1000, 2) + Math.pow((map.cities[i].y - army.y)/500 * 1000, 2)) < 40 + 40 * (25/40) && Math.sqrt(Math.pow((map.cities[i].x - army.x)/500 * 1000 + canvas.width/2 - mouseX, 2) + Math.pow((map.cities[i].y - army.y)/500 * 1000 - mouseY + canvas.height/2, 2)) < 40 * (25/40)) {
					citySelected = i;
				}

			}
		}
	}

	if (!surroundingCity && citySelected > -1 && (armyTroops.length == 0 || cityTroops.length == 0)) {
		/* resets arrays */
		armyTroops = [];
		cityTroops = [];
		
		/* resets city vars */
		surroundingCity = false;

		/* sets up army array */
		for (var i = 0; i < army.troops / 50; i ++) {
			armyTroops.push({x: 12, y: (Math.random() * (canvas.height - 22)) + 11, health: 100, damage: 10, targeting: -1, shootTimer: new Date(), range: 250});
		}

		/* sets up city array */
		for (var i = 0; i < map.cities[citySelected].people * 0.05 / 50; i ++) {
			cityTroops.push({x: canvas.width - 12, y: (Math.random() * (canvas.height - 22)) + 11, health: 100, damage: 20, targeting: -1, shootTimer: new Date(), range: 250});
		}

		/* sets up army array */
		for (var i = 0; i < armyTroops.length; i ++) {
			armyTroops[i].targeting = Math.floor(Math.random() * cityTroops.length);
		}

		/* sets up city array */
		for (var i = 0; i < cityTroops.length; i ++) {
			cityTroops[i].targeting = Math.floor(Math.random() * armyTroops.length);
		}
	}
};

generateWorld(1000, 9000, 1000, 9000, 4000, 0, 100);

function draw() {
	/* Resets all Buttons */
	document.getElementById('close-info-box-button').setAttribute("style", "outline:none; border-radius: 5px; display: none; position: absolute; height: 20px; width: 20px; left: 190px; bottom: 95px;");
	document.getElementById('open-info-box-button').setAttribute("style", "outline:none; border-radius: 5px; display: block; position: absolute; height: 20px; width: 20px; left: 15px; bottom: 20px;");

	/* Resize canvas to client's size */
	canvas.width = window.innerWidth - 25;
	canvas.height = window.innerHeight - 25;

	if (!pause) {
		/* Clears Canvas */
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		if (citySelected == -1) {
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
		}

		if (citySelected > -1) {
			updateAttackMenu();
			drawAttackMenu();
		}

	} else if (pause) {
		/* Clears Canvas */
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		if (citySelected == -1) {
			/* Draws Cities */
			drawCities();

			/* Draw info box */
			drawInfoBox();

			/* Draws army */
			drawArmy();
		}

		if (citySelected > -1) {
			drawAttackMenu();
		}

		/* Draws grey box */
		ctx.globalAlpha = 0.25;
		ctx.fillStyle = "grey";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.globalAlpha = 1;
	}

	timeSinceLastFrame = new Date();

	requestAnimationFrame(draw);
}

draw();
updateCities();
