/////// MAIN ///////////////////////////////////////////////////////////////////////////////////////////////////
const FPS = 5;
const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 480;
const GRID_SIZE = 32;
const BACKGROUND_COLOR = '#ffffff';
const GRID_COLOR = '#e6e6e6';

function Chain(x, y, color) {
    this.x = 0;
    this.y = 0;
    this.color = color;
    this.size = GRID_SIZE;
    this.dir = '';
}

function Snake(x, y, color, dir) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = GRID_SIZE;
    this.dir = dir;
    this.oldDir = dir;
    this.chain = new Array();
}

/*var player1 = {
    x: 5*GRID_SIZE,
    y: 5*GRID_SIZE,
    color: '#28bf80',
    size: GRID_SIZE,
    dir: '',
    chain: [{}]
}*/

var player1 = new Snake(5*GRID_SIZE, 1*GRID_SIZE, '#28bf80', 'up');
addNPlayerChain(player1, 20);
console.log(player1);

// canvas DOM
var c = document.getElementById('app').getContext('2d', { alpha: false });
// buffer canvas
var buffer = document.createElement('canvas');
buffer.width = CANVAS_WIDTH;
buffer.height = CANVAS_HEIGHT;
var b = buffer.getContext('2d', { alpha: false });
setInterval(update, 1000 / FPS);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getArrowKeyDirection (keyCode) {
    return {
      37: 'left',
      39: 'right',
      38: 'up',
      40: 'down'
    }[keyCode];
}

function keyUpdate() {

    document.addEventListener('keydown', function (event) {
    var direction,
        keyCode = event.keyCode;
    direction = getArrowKeyDirection(keyCode);
    console.log(direction);
    if (direction != player1.dir) {
        player1.oldDir = player1.dir;
        player1.dir = direction;
    }    
        
    });
}

function addPlayerChain(player) {
    var c = new Chain(0,0,"#8fbfab");
    var cl = player.chain.length;

    if (cl > 0) {
        console.log("Chain " + cl);
        var last = player.chain[cl - 1];
        //c.dir = last.dir;
        c.dir = player.dir;
        // finding the new parts coordinates according to tail
        switch (c.dir) {
            // DOWN
            case 'down':
                c.x = last.x;
                c.y = last.y - GRID_SIZE;
                break;
            // UP
            case 'up':
                c.x = last.x;
                c.y = last.y + GRID_SIZE;
                break;
            // LEFT
            case 'left':
                c.x = last.x + GRID_SIZE;
                c.y = last.y;
                break;
            // RIGHT
            case 'right':
                c.x = last.x - GRID_SIZE;
                c.y = last.y;
                break;
        }
        
    } else {
        console.log("Chain 0");
        c.dir = player.dir;
        // finding the new parts coordinates according to tail
        switch (c.dir) {
            // DOWN
            case 'down':
                c.x = player.x;
                c.y = player.y - GRID_SIZE;
                break;
            // UP
            case 'up':
                c.x = player.x;
                c.y = player.y + GRID_SIZE;
                break;
            // LEFT
            case 'left':
                c.x = player.x + GRID_SIZE;
                c.y = player.y;
                break;
            // RIGHT
            case 'right':
                c.x = player.x - GRID_SIZE;
                c.y = player.y;
                break;
            /*default:
                c.dir = 'up'
                c.y = player.y + GRID_SIZE;
                break;*/
        }
    }

    player.chain.push(c)
}

function addNPlayerChain(player, n) {
    for (let i = 0; i < n; i++) {
        addPlayerChain(player);
    }
}

function moveDir(obj) {
    if (obj.dir == "up") {
        obj.y -= GRID_SIZE;
    } else if (obj.dir == "down") {
        obj.y += GRID_SIZE;
    } else if (obj.dir == "left") {
        obj.x -= GRID_SIZE;
    } else if (obj.dir == "right") {
        obj.x += GRID_SIZE;
    }
    // player1.x += GRID_SIZE;
    // player1.y += GRID_SIZE;
}

// Legado (e também nunca funcionou)
/*function moveSnake(player) {
    moveDir(player);

    if (player.chain.length>0) {
        var oldDir = player.chain[0].dir;
        player.chain[0].dir = player.oldDir;
        moveDir(player.chain[0]);

        /*for (let i = player.chain.length - 1; i > 0; i--) {
            player.chain[i].dir = player.chain[i - 1].dir;
            moveDir(player.chain[i]);
        }*/
        /*for (let i = 0; i < player.chain.length; i++) {
            player.chain[i].dir
        }
    }
}
*/

/*
    Podemos fazer de dois modos. Primeiro varremos do ultimo
    ate o segundo item do corpo, sendo o primeiro item do corpo será especial pois seguirá a cabeça.

    Metodo 1:
**  Remover definitivamente a propiedade "dir" do prototipo "Chain" se for seguir este metodo.
        - Iterar (for ou forEach) o corpo do ultimo até o segundo (n -> 1), e para cada item (corpo) fazer:
            - Copiar a posição do item imediatamente superior ao item iterado (n - 1)
    
    Metodo 2:
        - Iterar (for ou forEach) o corpo do ultimo até o segundo (n -> 1), e para cada item (corpo) fazer:
            - Comparar a posição do item imediatamente superior ao item iterado (n - 1) com a posição do item iterado e com base nisso saber para qual direção o item iterado deve ir.
            - Com base na direção, atualizar a propiedade "dir" do item iterado
            - moveDir(itemIterado)
*/
function moveSnake(player) {
    if (player.chain.length > 0) {
        for (let i = player.chain.length - 1; i > 0; i--) {
            player.chain[i].x = player.chain[i - 1].x;
            player.chain[i].y = player.chain[i - 1].y;
        }

        player.chain[0].x = player.x;
        player.chain[0].y = player.y;
    }

    moveDir(player);
}

function drawSnake(player) {
    // draw player1
    b.fillStyle = player.color;
    b.fillRect(player.x, player.y, player.size, player.size);

    //draw chain
    for (let i = 0; i < player.chain.length; i++) {
        b.fillStyle = player.chain[i].color;
        b.fillRect(player.chain[i].x, player.chain[i].y, player.chain[i].size, player.chain[i].size);
    }
}

function draw() {
    // clear buffer
    b.fillStyle = BACKGROUND_COLOR;
    b.fillRect (0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
    

    b.lineWidth = 1;
    // draw grid
    for (let i = 0; i <= CANVAS_WIDTH / GRID_SIZE; i++) {
        for (let j = 0; j <= CANVAS_HEIGHT / GRID_SIZE; j++) {
            b.strokeStyle = GRID_COLOR;
            b.strokeRect(i*GRID_SIZE, j*GRID_SIZE, i*GRID_SIZE+GRID_SIZE, j*GRID_SIZE+GRID_SIZE);
        }
    }

    drawSnake(player1);

    // draw in canvas
    c.drawImage(buffer, 0, 0);
}

function update() {
    keyUpdate();
    moveSnake(player1);
    draw();
}
