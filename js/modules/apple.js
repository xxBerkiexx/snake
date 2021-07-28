export class Apple {
    constructor(canvas, context, width, height, x, y) {
        this.canvas = canvas;                               //Import canvas
        this.ctx = context;                                 //Import canvas context
        this.w = width;                                     //Width
        this.h = height;                                    //Height
        this.x = x;                                         //Starting X Position
        this.y = y;                                         //Starting Y Position
        this.color = "red";                                 //Color
    }

    resetApple(x, y) {
        //Reset the apple X and Y positions
        this.x = x;
        this.y = y;
    }

    //Export the apple
    getApple() {
        let apple = {
            x: this.x, 
            y: this.y
        };
        return apple;
    }

    //Spawn a new apple when snake eats one
    spawn(rows, columns) {
        this.x = (Math.floor(Math.random() * columns) * 20) + 20;
        this.y = (Math.floor(Math.random() * rows) * 20) + 20;
    }

    //Only update AFTER the snake eats it
    update(snake, rows, columns) {
        //Store the snake in a local variable
        let s = snake;

        //Spawn an apple
        this.spawn(rows, columns);

        //Compare the newly spawned apple to the snake
        for (let i = 0; i < s.length; i++) {
            //Keep spawning an apple until it isn't
            //where the snake is
            while (this.x === s[i].x &&
                   this.y === s[i].y) {
                this.spawn(rows, columns);
            }
        }
    }

    //Draw the apple
    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}