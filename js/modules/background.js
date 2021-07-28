export class Background {
    constructor(canvas, context, width, height, rows, columns) {
        this.canvas = canvas;                           //Import canvas
        this.ctx = context;                             //Import canvas context
        this.backgroundArray = [];                      //Store background data
        this.w = width;                                 //Width
        this.h = height;                                //Height
        this.x = 0;
        this.y = 0;
        this.rows = rows;                               //Rows
        this.columns = columns;                         //Column
        this.color;
    }

    createBackground() {
        //Loop through rows
        for (let i = 0; i < this.rows; i++) {
            //Get y position
            this.y = i * this.h + this.h;

            //Loop through columns
            for (let j = 0; j < this.columns; j++) {
                //Get x position
                this.x = j * this.w + this.w;

                //Determine color
                if (i % 2 == 0 && j % 2 == 0 ||
                    i % 2 != 0 && j % 2 != 0) {
                    this.color = "rgb(10, 10, 10)";
                }
                else {
                    this.color = "rgb(20, 20, 20)";
                }

                //Store variables in an object
                let object = {
                    x: this.x,
                    y: this.y,
                    w: this.w,
                    h: this.h,
                    color: this.color
                }

                //Add object to array
                this.backgroundArray.push(object);
            }
        }
    }

    update() {

    }

    draw() {
        //Loop through array and draw
        for (let i = 0; i < this.backgroundArray.length; i++) {
            this.ctx.fillStyle = this.backgroundArray[i].color;
            this.ctx.fillRect(
                this.backgroundArray[i].x, 
                this.backgroundArray[i].y, 
                this.backgroundArray[i].w, 
                this.backgroundArray[i].h
            );
        }

        //Add outer line
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(18, 18, 864, 504);
    }
}