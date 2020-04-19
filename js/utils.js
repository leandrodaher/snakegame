import { Snake }  from './snake.js';
import { Fruit }  from './fruit.js';

export const FPS = 5;
export const CANVAS_WIDTH = 640;
export const CANVAS_HEIGHT = 480;
export const GRID_SIZE = 32;
export const BACKGROUND_COLOR = '#ffffff';
export const GRID_COLOR = '#e6e6e6';

// criar snake padrão
export function newSnake() {
  let snake = new Snake("Player1", 5*GRID_SIZE, 5*GRID_SIZE, '#28bf80', GRID_SIZE, 'right');

  return snake;
}

function getTileIndex(xx, yy) {
  let tileX = Math.floor(xx / GRID_SIZE);
  let tileY = Math.floor(yy / GRID_SIZE);
  return {tileX, tileY};
}

function tileIndexToPixel(xx, yy) {
  let x = xx * GRID_SIZE;
  let y = yy * GRID_SIZE;
  return {x, y};
}

export function randomPosition() {
  let random_x = Math.floor(Math.random() * CANVAS_WIDTH)
  let random_y = Math.floor(Math.random() * CANVAS_HEIGHT)
  
  let index = getTileIndex(random_x, random_y)
  return tileIndexToPixel(index.tileX, index.tileY);
}

// criar fruta padrão
export function newFruit() {
  let pos = randomPosition();
  let fruit = new Fruit(pos.x, pos.y, 'red', GRID_SIZE);

  return fruit;
}

export function getArrowKeyDirection (keyCode) {
    return {
      37: 'left',
      39: 'right',
      38: 'up',
      40: 'down'
    }[keyCode];
}

export function collisionAABB(x1, y1, w1, h1, 
  x2, y2, w2, h2) {
  return (x1 < x2 + w2 &&
    x1 + w1 > x2 &&
    y1 < y2 + h2 &&
    y1 + h1 > y2);
}

export function checkCollision(obj1, obj2) {
  return collisionAABB(obj1.x, obj1.y, obj1.size, obj1.size,
    obj2.x, obj2.y, obj2.size, obj2.size);
}