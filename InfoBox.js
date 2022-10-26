class InfoBox {
    constructor(x, y, w, h, alignment, col, strokeW, text, textSize)
    {
        this.x = x;
        this.y = y;
        this.xInit = this.x;
        this.yInit = this.y;
        this.alignment = alignment;
        this.w = w;
        this.h = h;
        this.col = col;
        this.strokeW = strokeW;
        this.text = text;
        this.textSize = textSize;
        this.isShown = false;
        this.update();
    }
    update()
    {
        this.x = this.xInit;
        this.y = this.yInit;
        switch (this.alignment) {
            case 'upper_left':
                break;
            case 'upper_right':
                this.x += width - this.w;
                break;
            case 'upper_center':
                this.x += width/2 - this.w/2;
                break;
            case 'lower_left':
                this.y += height - this.h;
                break;
            case 'lower_right':
                this.x += width - this.w;
                this.y += height - this.h;
                break;
            case 'lower_center':
                this.x += width/2 - this.w/2;
                this.y += height - this.h;
                break;
            case 'center':
                this.x += width/2 - this.w/2;
                this.y += height/2 - this.h/2;
                break;
        }
    }
    toggle()
    {
        if (this.isShown) {
            this.isShown = false;
        } else {
            this.isShown = true;
        }
    }
    show()
    {
        if (this.isShown) {
            strokeWeight(this.strokeW);
            stroke(255);
            fill(20, 0, 10, 180);
            rect(this.x, this.y, this.w, this.h, 100);
            textAlign(LEFT);
            textSize(this.textSize);
            textFont(font);
            fill(255);
            noStroke();
            text(this.text, width/2 - this.w/2 + 100, height/2 - this.h/2 + 100, this.w - 200, this.h - 200);
        }
    }
}

let gameTypeSelectionModeInfoBox;
let audioSettingsModeInfoBox;
let menuModeInfoBox;
let taskSelectionModeInfoBox;
let audioGameModeInfoBox;
let visualGameModeInfoBox;
let gameOverModeInfoBox;

function createInfoBoxes()
{
    gameTypeSelectionModeInfoBox = new InfoBox(0, 0, 1250, 700, 'center', color(255), 2, infoTexts['gameTypeSelection'], 18);
    audioSettingsModeInfoBox = new InfoBox(0, 0, 1000, 800, 'center', color(255), 2, infoTexts['audioSettings'], 18);
    menuModeInfoBox = new InfoBox(0, 0, 1000, 800, 'center', color(255), 2, infoTexts['menu'], 18);
    taskSelectionModeInfoBox = new InfoBox(0, 0, 1000, 800, 'center', color(255), 2, infoTexts['taskSelection'], 18);
    audioGameModeInfoBox = new InfoBox(0, 0, 1000, 800, 'center', color(255), 2, infoTexts['audioGame'], 18);
    visualGameModeInfoBox = new InfoBox(0, 0, 1000, 800, 'center', color(255), 2, infoTexts['visualGame'], 18);
    gameOverModeInfoBox = new InfoBox(0, 0, 1000, 800, 'center', color(255), 2, infoTexts['gameOver'], 18);
}

function updateInfoBoxes()
{
    gameTypeSelectionModeInfoBox.update();
    audioSettingsModeInfoBox.update();
    menuModeInfoBox.update();
    taskSelectionModeInfoBox.update();
    audioGameModeInfoBox.update();
    visualGameModeInfoBox.update();
    gameOverModeInfoBox.update();
}