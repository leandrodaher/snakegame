import * as utils from './utils.js';

export class Render {

    constructor (canvas_id) {
        this._objects = new Array();
        // canvas DOM get context
        this._canvasctx = document.getElementById(canvas_id).getContext('2d', { alpha: false });
        // buffer canvas
        this._buffer = document.createElement('canvas');
        this._buffer.width = utils.CANVAS_WIDTH;
        this._buffer.height = utils.CANVAS_HEIGHT;
        // buffer canvas context
        this._bufferctx = this._buffer.getContext('2d', { alpha: false });
    }

    
    get objects() {return this._objects}
    set objects(obj) {this._objects = obj}
    
    addObject(obj) {
        this._objects.push(obj);
    }

    deleteObject(index) {
        this._objects.splice(index, 1);
    }

    _draw() {
        // Draw background
        // clear buffer
        this._bufferctx.fillStyle = utils.BACKGROUND_COLOR;
        this._bufferctx.fillRect (0,0,utils.CANVAS_WIDTH, utils.CANVAS_HEIGHT);
        

        this._bufferctx.lineWidth = 1;
        // draw grid
        for (let i = 0; i <= utils.CANVAS_WIDTH / utils.GRID_SIZE; i++) {
            for (let j = 0; j <= utils.CANVAS_HEIGHT / utils.GRID_SIZE; j++) {
                this._bufferctx.strokeStyle = utils.GRID_COLOR;
                this._bufferctx.strokeRect(i*utils.GRID_SIZE, j*utils.GRID_SIZE, i*utils.GRID_SIZE+utils.GRID_SIZE, j*utils.GRID_SIZE+utils.GRID_SIZE);
            }
        }

        // Draw objects
        for (let i = 0; i < this._objects.length; i++) {
            //console.log(this._objects[i]);
            this._objects[i].draw(this._bufferctx);
        }

        // Draw buffer in canvas
        this._canvasctx.drawImage(this._buffer, 0, 0);
    }

    update() {
        this._draw();
    }
}
