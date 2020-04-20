import { Snake }  from './snake.js';
import { Fruit }  from './fruit.js';
import { Render }  from './render.js';
import * as utils from './utils.js';

console.log("Criando canvas.."
    + "\nFPS = " + utils.FPS
    + "\nCANVAS_WIDTH = " + utils.CANVAS_WIDTH
    + "\nCANVAS_HEIGHT = " + utils.CANVAS_HEIGHT
    + "\nBACKGROUND_COLOR = " + utils.BACKGROUND_COLOR
    + "\nGRID_COLOR = " + utils.GRID_COLOR);

/*// canvas DOM
var c = document.getElementById('app').getContext('2d', { alpha: false });
// buffer canvas
var buffer = document.createElement('canvas');
buffer.width = utils.CANVAS_WIDTH;
buffer.height = utils.CANVAS_HEIGHT;
var b = buffer.getContext('2d', { alpha: false });
*/



console.log("Criando player...");
var player1 = utils.newSnake();
//player1.addNBody(20);
console.log(player1);
var fruit = utils.newFruit();
var render = new Render('appcanvas');
render.addObject(player1);
render.addObject(fruit);
console.log(render.objects);

setInterval(update, 1000 / utils.FPS);


/*
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
    fruit.draw(b);

    // draw in canvas
    c.drawImage(buffer, 0, 0);
};
*/

function processCollisions() {
    let newPos;

    for (let i = 0; i < player1.body.length; i++) {
        if ( utils.checkCollision(player1, player1.body[i]) ) {
            newPos = utils.randomPosition();
            player1.x = newPos.x;
            player1.y = newPos.y;
            player1.body = [];
            newPos = utils.randomPosition();
            fruit.x = newPos.x;
            fruit.y = newPos.y;
        }
    }

    if ( utils.checkCollision(player1, fruit) ) {
        player1.addBody();
        newPos = utils.randomPosition();
        fruit.x = newPos.x;
        fruit.y = newPos.y;
    }
}

function update() {
    player1.update();
    fruit.update();
    processCollisions();
    //drawGame();
    render.update();
}

