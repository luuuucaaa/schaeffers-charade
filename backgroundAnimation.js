function backgroundAnimation()
{
    bgAnimation.update();
    bgAnimation.display();
    image(hpiLogo, width - 180, height - 110, 0.15 * hpiLogo.width, 0.15 * hpiLogo.height);
}

class Perlingrid
{
    constructor()
    {
        this.res = displayWidth/10;
        this.cols = floor(displayWidth / this.res) + 1;
        this.rows = floor(displayHeight / this.res) + 1;
        this.values = [];
        this.zoff = 0;
        this.dx = 0.1;
        this.dt = 0.0001;
        this.update();
    }
    update()
    {
        this.yoff = 0;
        for (let r = 0; r < this.rows; r++) { 
            this.xoff = 0;
            for (let c = 0; c < this.cols; c++) {
                let idx = c + r * this.cols;
                this.values[idx] = noise(this.xoff, this.yoff, this.zoff);
                this.xoff += this.dx;
            }
            this.yoff += this.dx;
        }
        this.zoff += this.dt;
    }
    display()
    {
        for (let r = 0; r < this.rows; r++) { 
            for (let c = 0; c < this.cols; c++) {
                let idx = c + r * this.cols;
                noStroke();
                fill(20 + this.values[idx] * 160, 90, 110);
                push();
                translate(c * this.res, r * this.res);
                rect(0, 0, this.res, this.res);
                pop();
            }
        }
    }
}
  
let bgAnimation;
function createBackgroundAnimation()
{
    bgAnimation = new Perlingrid();
}