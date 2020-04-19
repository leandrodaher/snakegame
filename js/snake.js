// import './utils.js'
import * as utils from './utils.js';

/*export */class Body {

    constructor (x, y, color, size) {
        this._x = x;
        this._y = y;
        this._color = color;
        this._size = size;
        this._dir = ''
    }

    // https://stackoverflow.com/questions/41427296/es6-set-function-isnt-recognized
    get x() {return this._x}
    set x(x) {this._x = x}
    get y() {return this._y}
    set y(y) {this._y = y}
    get color() {return this._color}
    set color(color) {this._color = color}
    get size() {return this._size}
    set size(size) {this._size = size}
    get dir() {return this._dir}
    set dir(dir) {this._dir = dir}
}

export class Snake {
    /* Não existe uma declaração de propiedades privadas (private color, por exmeplo)
       assim não podemos ter uma propiedade "color" e um getter "color"
       por isso por convensão, colocamos as propiedades no formato _nome

       https://www.sitepoint.com/javascript-private-class-fields/
       https://cursos.alura.com.br/forum/topico-uncaught-typeerror-cannot-set-property-saldo-of-conta-which-has-only-a-getter-44102
    */
    constructor (nome, x, y, color, size, dir) {
        this._nome = nome;
        this._x = x;
        this._y = y;
        this._color = color;
        this._size = size;
        this._dir = dir;
        this._oldDir = dir;
        this._body = new Array();

        // Processa eventos de tecla em this.handleEvent (função padrão)
        // https://dev.to/rikschennink/the-fantastically-magical-handleevent-function-1bp4
        // https://developer.mozilla.org/pt-BR/docs/Web/API/Element/addEventListener
        document.addEventListener('keydown', this);
    }

    get x() {return this._x}
    set x(x) {this._x = x}
    get y() {return this._y}
    set y(y) {this._y = y}
    get color() {return this._color}
    set color(color) {this._color = color}
    get size() {return this._size}
    set size(size) {this._size = size}
    get dir() {return this._dir}
    set dir(dir) {this._dir = dir}
    get body() {return this._body}
    set body(body) {this._body = body}

    // Adicionar um corpo snake
    addBody() {
        let c = new Body(0, 0, "#8fbfab", utils.GRID_SIZE);
        let cl = this._body.length;
    
        if (cl > 0) {
            //console.log("Chain " + cl);
            let last = this._body[cl - 1];
            //c.dir = last._dir;
            c.dir = this._dir;
            // finding the new parts coordinates according to tail
            switch (c.dir) {
                // DOWN
                case 'down':
                    c.x = last.x;
                    c.y = last.y - utils.GRID_SIZE;
                    break;
                // UP
                case 'up':
                    c.x = last.x;
                    c.y = last.y + utils.GRID_SIZE;
                    break;
                // LEFT
                case 'left':
                    c.x = last.x + utils.GRID_SIZE;
                    c.y = last.y;
                    break;
                // RIGHT
                case 'right':
                    c.x = last.x - utils.GRID_SIZE;
                    c.y = last.y;
                    break;
            }
            
        } else {
            //console.log("Chain 0");
            c.dir = this._dir;
            // finding the new parts coordinates according to tail
            switch (c.dir) {
                // DOWN
                case 'down':
                    c.x = this._x;
                    c.y = this._y - utils.GRID_SIZE;
                    break;
                // UP
                case 'up':
                    c.x = this._x;
                    c.y = this._y + utils.GRID_SIZE;
                    break;
                // LEFT
                case 'left':
                    c.x = this._x + utils.GRID_SIZE;
                    c.y = this._y;
                    break;
                // RIGHT
                case 'right':
                    c.x = this._x - utils.GRID_SIZE;
                    c.y = this._y;
                    break;
                /*default:
                    c.dir = 'up'
                    c.y = this._y + utils.GRID_SIZE;
                    break;*/
            }
        }
    
        this._body.push(c);
    }
    
    // Adicionar n corpos na snake
    addNBody(n) {
        for (let i = 0; i < n; i++) {
            this.addBody();
        }
    }
    
    // Movimenta a snake de acordo com sua direção
    // Metodo privado
    _moveDir() {
        if (this._dir == "up") {
            this._y -= utils.GRID_SIZE;
        } else if (this._dir == "down") {
            this._y += utils.GRID_SIZE;
        } else if (this._dir == "left") {
            this._x -= utils.GRID_SIZE;
        } else if (this._dir == "right") {
            this._x += utils.GRID_SIZE;
        }
        // player1.x += GRID_SIZE;
        // player1.y += GRID_SIZE;
    }

    _moveSnake() {
        if (this._body.length > 0) {
            for (let i = this._body.length - 1; i > 0; i--) {
                this._body[i].x = this._body[i - 1].x;
                this._body[i].y = this._body[i - 1].y;
            }
    
            this._body[0].x = this._x;
            this._body[0].y = this._y;
        }
    
        this._moveDir();
    }

    // Processa eventos do teclado
    handleEvent(event) {
        var direction,
            keyCode = event.keyCode;
        direction = utils.getArrowKeyDirection(keyCode);
        console.log(direction);
        if (direction != this._dir) {
            this._oldDir = this._dir;
            this._dir = direction;
            console.log(this._nome + "\nthis: " + this._dir);
        }  
    }

    draw(context) {
        // draw player
        context.fillStyle = this._color;
        context.fillRect(this._x, this._y, this._size, this._size);

        //draw chain
        for (let i = 0; i < this._body.length; i++) {
            context.fillStyle = this._body[i]._color;
            context.fillRect(this._body[i]._x, this._body[i]._y, this._body[i]._size, this._body[i]._size);
        }
    }
    
    /* Implementações futuras, movimento baseado em tempo */
    /*
    update(elapsedTime) {
        console.log("Draw snake");
    }
    */

    update() {
        this._moveSnake();
    }
}