export class Snake {
    constructor(canvas, context, width, height, x, y) {
        this.canvas = canvas;                               //Import canvas
        this.ctx = context;                                 //Import canvas context
        this.snakeArray = [];                               //Store snake sections
        this.w = width;                                     //Width
        this.h = height;                                    //Height
        this.x = x;                                         //Default X Position
        this.y = y;                                         //Default Y Position
        this.color = "white";                               //Snake color
        this.border = {                                     //Import borders
            x: undefined,
            y: undefined,
            w: undefined,
            h: undefined
        }
        this.move = {                                       //Current direction; Right by default
            up: false,
            down: false,
            left: false,
            right: true
        }
        this.hitWall = false;                               //Did the snake hit a wall
        this.hitSelf = false;                               //Did the snake hit itself
    }

    //Create a snake when game starts
    createSnake(sections) {
        let s = sections;

        for (let i = 0; i < s; i++) {
            this.snakeArray.push({
                x: this.x - (i * this.w),
                y: this.y,
                w: this.w,
                h: this.h
            });
        }
    }

    resetSnake(sections, x, y) {
        //Reset x and y with inputs
        this.x = x;
        this.y = y;
        //Reset collision booleans
        this.hitSelf = false;
        this.hitWall = false;
        //Reset direction
        this.move = {
            up: false,
            down: false,
            left: false,
            right: true
        }
        //Empty the array
        this.snakeArray = [];
        //Recreate the snake
        this.createSnake(sections);
    }

    //Get the borders for collision detection
    getBorders(x, y, width, height) {
        this.border.x = x;
        this.border.y = y;
        this.border.w = width;
        this.border.h = height;
    }

    getSnakeHead() {
        let head = {
            x: this.snakeArray[0].x, 
            y: this.snakeArray[0].y
        };
        return head;
    }

    increaseSize() {
        //Get tail data
        let last = this.snakeArray[this.snakeArray.length - 1];

        //Add to array
        this.snakeArray.push({
            x: last.x,
            y: last.y,
            w: last.w,
            h: last.h
        });
    }

    //Get the first key in the queue and update direction
    updateDirection(keyQueue) {
        //Check if key is defined
        if (typeof(keyQueue) != "undefined") {
            //Update current direction
            //Do not go the opposite direction
            if (keyQueue.up && !this.move.down) {
                this.move.up = true;
                this.move.down = false;
                this.move.left = false;
                this.move.right = false;
            }
            if (keyQueue.down && !this.move.up) {
                this.move.up = false;
                this.move.down = true;
                this.move.left = false;
                this.move.right = false;
            }
            if (keyQueue.left && !this.move.right) {
                this.move.up = false;
                this.move.down = false;
                this.move.left = true;
                this.move.right = false;
            }
            if (keyQueue.right && !this.move.left) {
                this.move.up = false;
                this.move.down = false;
                this.move.left = false;
                this.move.right = true;
            }
        }
    }

    //Main update function
    update(gamePaused) {
        if (!gamePaused) {
            //Assign new X and Y positions with current
            //X and Y positions
            let nx = this.snakeArray[0].x;
            let ny = this.snakeArray[0].y;

            //Update the new X and Y Positions
            if (this.move.up) {
                ny -= 20;
                //Check if ny is outside wall
                if (ny < this.border.y) {
                    this.hitWall = true;
                }
            }
            if (this.move.down) {
                ny += 20;
                //Check if ny is outside wall
                if (ny > this.border.h) {
                    this.hitWall = true;
                }
            }
            if (this.move.left) {
                nx -= 20;
                //Check if ny is outside wall
                if (nx < this.border.x) {
                    this.hitWall = true;
                }
            }
            if (this.move.right) {
                nx += 20;
                //Check if ny is outside wall
                if (nx > this.border.w) {
                    this.hitWall = true;
                }
            }

            //Check if the new X and Y position hit the body
            for (let i = 1; i < this.snakeArray.length; i++) {
                if (nx === this.snakeArray[i].x &&
                    ny === this.snakeArray[i].y) {
                    this.hitSelf = true;
                }
            }

            //Do not update if player hit a wall or itself
            if (this.hitWall || this.hitSelf) {
                return;
            }
            
            //Remove tail and store data
            let tail = this.snakeArray.pop();
            //Assign new X and Y positions to data
            tail.x = nx;
            tail.y = ny;
            //Create a new head with updated tail data
            this.snakeArray.unshift(tail);
        } 
    }

    //Draw the snake
    draw() {
        for (let i = 0; i < this.snakeArray.length; i++) {
            this.ctx.fillStyle = this.color;
            this.ctx.fillRect(
                this.snakeArray[i].x, 
                this.snakeArray[i].y, 
                this.snakeArray[i].w, 
                this.snakeArray[i].h
            );
        }
    }

    //Export whether or not snake hit a wall
    checkHitWall() {
        if(this.hitWall) {
            return true;
        }
        else {
            return false;
        }
    }

    //Export whether or not snake hit itself
    checkHitSelf() {
        if (this.hitSelf) {
            return true;
        }
        else {
            return false;
        }
    }
}