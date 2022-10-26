class ErrorMessage
{
    constructor(x, y, text, col)
    {
        this.xInit = x;
        this.yInit = y;
        this.x = width/2 + x;
        this.y = height/2 + y;
        this.text = text;
        this.col = col;
        this.alpha = 0;
    }
    flash()
    {
        this.alpha = 255;
    }
    update()
    {
        this.x = width/2 + this.xInit;
        this.y = height/2 + this.yInit;
    }
    resetAlpha()
    {
        this.alpha = 0;
    }
    show()
    {
        textAlign(CENTER);
        textSize(22);
        textFont(font);
        noStroke();

        if (this.alpha > 0) {this.alpha -= 1};
        this.col.setAlpha(this.alpha)

        fill(this.col);
        text(this.text, this.x, this.y + 10);
    }
}

let multichannelError, hearingTestCorrect, hearingTestFalse;
function createErrorMessages()
{
    multichannelError = new ErrorMessage(0, 140, 'Not enough channels!', color(255, 0, 0));
    hearingTestCorrect = new ErrorMessage(0, 140, 'Correct!', color(0, 255, 0));
    hearingTestFalse = new ErrorMessage(0, 140, 'Wrong!', color(255, 0, 0));
}