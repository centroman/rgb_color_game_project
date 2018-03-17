var colors = generateRandomColors(6);
var h1= document.querySelector("h1");
var modeButtons= document.querySelectorAll(".mode");
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var numberSquares = 6;
colorDisplay.textContent = pickedColor;

for(var i=0; i<modeButtons.length; i++) {
	modeButtons[i].addEventListener("click",function(){
	modeButtons[0].classList.remove("selected");
	modeButtons[1].classList.remove("selected");
	this.classList.add("selected");
	this.textContent === "Easy" ? numberSquares = 3: numberSquares = 6;
	reset(); 
});
}

function reset () {

    message.textContent = "";
	colors = generateRandomColors(numberSquares);
	pickedColor = pickColor();
	resetButton.textContent= "New Colors";
	colorDisplay.textContent = pickedColor;
	h1.style.backgroundColor = "steelblue";
	for(var i = 0; i < squares.length; i++) {
		if(colors[i]) 
		{
		squares[i].style.display = "block";
		squares[i].style.backgroundColor = colors[i];	 
		} else { 
		squares[i].style.display = "none";
		}
	 }
}
//Generate's an array of Random colors for each square boxe each time
function generateRandomColors(num) {
var arr = []
for(var i = 0; i < num; i++) {
	arr.push(randomColor());
}
return arr;
}
//Picks a random color that is to be searched by user
function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

//Generate's random color that is passed to array
function randomColor() {
	var r = Math.floor(Math.random()*256);
	var g = Math.floor(Math.random()*256);
	var b = Math.floor(Math.random()*256);

	return "rgb(" + r + "," + g + "," + b + ")";

}

//Assigns each square box its color from color array

for(var i = 0; i < squares.length; i++){
	squares[i].style.backgroundColor = colors[i];

	//Click Listeners to squares
	squares[i].addEventListener("click",function(){
		
		//alert(this.style.backgroundColor);
		var clickedColor = this.style.backgroundColor;

		  if (rgbMatches(clickedColor,pickedColor)) {
		  	message.textContent = "Correct!";
		  	resetButton.textContent = "Play Again?"
		  	// If the answer is correct change the color of all sqaures with correct answer
		  	changeColors(clickedColor);
		  	h1.style.backgroundColor = clickedColor;
		  }
        else {
        	//Fade away square box if color is not right answer
        	this.style.backgroundColor = "#232323";
        	message.textContent = "Try Again";
        }
	});
}
//To change all the squares to same color
function changeColors(color) {

	for(var i = 0; i < colors.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

//To check whether the clickedColor is same as pickedColor
function rgbExtract(s) {
  var match = /^\s*rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\)\s*$/.exec(s);
  if (match === null) {
    return null;
  }
  return { r: parseInt(match[1], 10),
           g: parseInt(match[2], 10),
           b: parseInt(match[3], 10) };
}

function rgbMatches(sText, tText) {
  var sColor = rgbExtract(sText),
      tColor = rgbExtract(tText);
  if (sColor === null || tColor === null) {
    return false;
  }
  var componentNames = [ 'r', 'g', 'b' ];
  for (var i = 0; i < componentNames.length; ++i) {
    var name = componentNames[i];
    if (sColor[name] != tColor[name]) {
      return false;
    }
  } 
  return true;
}

var resetButton = document.querySelector("#reset");
resetButton.addEventListener("click",function()
		{
		reset();
		});  