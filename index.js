var fieldW = 408;
var fieldH = 119;
var selection = [];

var brickStartY = 0;
var brickRows = 7;
var brickColor = [
    // Block color styling
    "hsl(220, 100%, 50%)",
    "hsl(190, 100%, 50%)",
    "hsl(220, 100%, 50%)",
    "hsl(190, 100%, 50%)",
    "hsl(220, 100%, 50%)",
    "hsl(190, 100%, 50%)",
    "hsl(220, 100%, 50%)",
];

var brickW = 17;
var brickH = 17;

var white = "#ffffff";

var canvas;

var brickColumns = fieldW / brickW;

var bricks = [];

function destroyBricks() {
    var x, y;
    for (y = 0; y < brickRows; y++) {
        for (x = 0; x < brickColumns; x++) {
            bricks[x + y * brickColumns] = false;
        }
    }
selection = []
document.getElementById('tL').innerHTML= selection; 
}

// Set all bricks to 'true'
function setupBricks() {
    var x, y;
    for (y = 0; y < brickRows; y++) {
        for (x = 0; x < brickColumns; x++) {
            bricks[x + y * brickColumns] = true;
        }
    }
selection = []
document.getElementById('tL').innerHTML= selection; 
}

function drawPicture(){
    
var context = canvas.getContext('2d');
context.clearRect ( 0 , 0 , canvas.width, canvas.height );
    // Draws bricks
    var x, y;
    for (y = 0; y < brickRows; y++) {
        context.fillStyle = brickColor[y];
        context.strokeStyle = white;
        for (x = 0; x < brickColumns; x++) {
            if (bricks[x + y * brickColumns] ) {
                context.strokeRect(brickW * x, brickStartY + brickH * y,
                                 brickW, brickH);
                context.fillRect(brickW * x, brickStartY + brickH * y,
                                 brickW, brickH);
            }
        }       
    }
}

var canvas = document.getElementById('gameCanvas');

function game() {
    setupBricks(); 
    setInterval(drawPicture, 15);
}

//Get Mouse Position
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

document.getElementById("gameCanvas").addEventListener("click", reportGrid);

function reportGrid(event) {
  
 var found = "false";
  
 var rect = canvas.getBoundingClientRect();
 var tileSelect = Math.ceil(((event.clientX - rect.left)/brickW))-1 + Math.floor((event.clientY - rect.top)/brickH)*(fieldW/brickW);
  
        if (bricks[tileSelect]) {
            bricks[tileSelect] = false;
        }
  else{
    bricks[tileSelect] = true;
  }
  
}

function tileLayout(){
  selection = []
  
  for (i = 0; i < bricks.length; i++) { 
    if (bricks[i] == false) {
      selection.push(i);
    }
}
  if (selection.length == 0) {
    selection = "[No Tiles Removed]";
  }
  document.getElementById('tL').innerHTML= selection; 
}

