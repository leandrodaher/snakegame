export const FPS = 5;
export const CANVAS_WIDTH = 640;
export const CANVAS_HEIGHT = 480;
export const GRID_SIZE = 32;
export const BACKGROUND_COLOR = '#ffffff';
export const GRID_COLOR = '#e6e6e6';

export function getArrowKeyDirection (keyCode) {
    return {
      37: 'left',
      39: 'right',
      38: 'up',
      40: 'down'
    }[keyCode];
}