import { Snake }  from './snake.js';
import { Fruit }  from './fruit.js';
import * as utils from './utils.js';

console.log("Criando mundo.."
    + "\nFPS = " + utils.FPS
    + "\nCANVAS_WIDTH = " + utils.CANVAS_WIDTH
    + "\nCANVAS_HEIGHT = " + utils.CANVAS_HEIGHT
    + "\nBACKGROUND_COLOR = " + utils.BACKGROUND_COLOR
    + "\nGRID_COLOR = " + utils.GRID_COLOR);

    
var player1 = new Snake("Player1", 5*utils.GRID_SIZE, 5*utils.GRID_SIZE, '#28bf80', utils.GRID_SIZE, 'right');
player1.addNBody(20);
console.log(player1);

// canvas DOM
var c = document.getElementById('app').getContext('2d', { alpha: false });
// buffer canvas
var buffer = document.createElement('canvas');
buffer.width = utils.CANVAS_WIDTH;
buffer.height = utils.CANVAS_HEIGHT;
var b = buffer.getContext('2d', { alpha: false });
setInterval(update, 1000 / utils.FPS);

function drawGame() {
    // clear buffer
    b.fillStyle = utils.BACKGROUND_COLOR;
    b.fillRect (0,0,utils.CANVAS_WIDTH, utils.CANVAS_HEIGHT);
    

    b.lineWidth = 1;
    // draw grid
    for (let i = 0; i <= utils.CANVAS_WIDTH / utils.GRID_SIZE; i++) {
        for (let j = 0; j <= utils.CANVAS_HEIGHT / utils.GRID_SIZE; j++) {
            b.strokeStyle = utils.GRID_COLOR;
            b.strokeRect(i*utils.GRID_SIZE, j*utils.GRID_SIZE, i*utils.GRID_SIZE+utils.GRID_SIZE, j*utils.GRID_SIZE+utils.GRID_SIZE);
        }
    }

    player1.draw(b);

    // draw in canvas
    c.drawImage(buffer, 0, 0);
};

function update() {
    player1.update();
    drawGame();
}