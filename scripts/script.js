var colorSets = [];
var randomize;

function getRandomColors() {
	return "#" + Math.floor(Math.random()*16777215).toString(16);
}

function updateColors() {
	var color1 = getRandomColors();
	var color2 = getRandomColors();
	$("#fancy").css("background-color", color1);
	$("body").css("background-color", color2);
}

function beginRandomization() {
	$("#awesomeBtn").text("Stop awesomenessssss!!");
	$("#fancy").addClass('awesome');
	updateColors();
	randomize = setInterval(() => { 
	  updateColors();
	}, 2500);
}

function stopRandomization() {
	$("#awesomeBtn").text("Start awesomenessssss!!");
	$("#fancy").removeClass('awesome');
	clearTimeout(randomize);
}

function clearFav() {
	colorSets.splice(0, colorSets.length);
}

function viewFav() {
	$(".favBox").show();
}

function hideFav() {
	$(".favBox").hide();
}

function rgbToHex(rgb) {
	var x = rgb.match(/\d+/g, "")+'';
	var y = x.split(',');
	var r = parseInt(y[0]);
	var g = parseInt(y[1]);
	var b = parseInt(y[2]);

    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function addToFav() {
	var bodyElem = $("body")[0];
	var fancyElem = $("#fancy")[0];

	var bodyColorRgb = window.getComputedStyle(bodyElem, null).getPropertyValue("background-color");
	var bodyColorHex = rgbToHex(bodyColorRgb);

	var fancyColorRgb = window.getComputedStyle(fancyElem, null).getPropertyValue("background-color");
	var fancyColorHex = rgbToHex(fancyColorRgb);

	colorSets.push({
		bodyColor: {
			rgb: bodyColorRgb,
			hex: bodyColorHex
		},
		fancyColor: {
			rgb: fancyColorRgb,
			hex: fancyColorHex
		}
	});

	console.log("all colors", colorSets);
}

$(function() {
	// Initializing awesomeness
	updateColors();

	var fancy = $("#fancy");
	fancy.on("click", (ev) => {
		if(fancy.hasClass('awesome')) {
			stopRandomization();
		} else {
			beginRandomization();
		}
	});
});