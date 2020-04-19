export class Fruit {

    constructor (x, y, color, size) {
        this._x = x;
        this._y = y;
        this._color = color;
        this._size = size;
    }

    get x() {return this._x}
    set x(x) {this._x = x}
    get y() {return this._y}
    set y(y) {this._y}
    get color() {return this._color}
    set color(color) {this._color}
    get size() {return this._size}
    set size(size) {this._size}

    draw(context) {
        // draw player
        context.fillStyle = this._color;
        context.fillRect(this._x, this._y, this._size, this._size);
    }

    update(/*elapsedTime*/) {
        //
    }
}
