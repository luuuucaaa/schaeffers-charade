class SoundObjectSet
{
    constructor(xRel, yRel, nRows, nCols, wRel, sceneSequence)
    {
        this.origin = createVector(CONFIG['posRelHud'][0] * width, CONFIG['posRelHud'][1] * height);

        this.posRel = createVector(xRel, yRel);
        this.pos = createVector(xRel * width, yRel * height);
        this.nRows = nRows;
        this.nCols = nCols;
        this.wRel = wRel;
        this.w = this.wRel * height * 1.2;

        this.sceneSequence = sceneSequence;
    }
    create()
    {
        let id = 0;
        this.soundObjects = [];
        for (let r = 0; r < this.nRows; r++) {
            for (let c = 0; c < this.nCols; c++) {
                let xRel = 0.05 * width;
                let yRel = 0.05 * height;
                let x = -(xRel + xRel/4)/2 - this.nCols/2 * xRel + c * (xRel + xRel/4) - xRel/4;
                let y = -(yRel + yRel/4)/2 - this.nRows/2 * yRel + r * (yRel + yRel/4) + 3.18 * height/8;
                let soundObject = new SoundObject(x, y, this.w, id, filePathsSoundset[id]);
                this.soundObjects.push(soundObject);
                id++;
            }
        }
    }
    rescale()
    {
        this.origin.set(CONFIG['posRelHud'][0] * width, CONFIG['posRelHud'][1] * height);
        if (!(GAME_MODE === 'game' || GAME_MODE === 'playback')) {
            for (let i = 0; i < this.soundObjects.length; i++) {
                this.soundObjects[i].rescale();
            }
        } else {
            this.pos.set(this.posRel.x * width, this.posRel.y * height);
            this.w = this.wRel * height * 1.2;
            let idx = 0;
            for (let r = 0; r < this.nRows; r++) {
                for (let c = 0; c < this.nCols; c++) {
                    this.soundObjects[idx].origin.set(this.origin);
                    this.soundObjects[idx].posGame.set(this.soundObjects[idx].posRelGame.x * height, this.soundObjects[idx].posRelGame.y * height);
                    this.soundObjects[idx].pos.set(this.soundObjects[idx].origin.x + this.soundObjects[idx].posGame.x, this.soundObjects[idx].origin.y + this.soundObjects[idx].posGame.y);
                    this.soundObjects[idx].w = this.w;
                    idx++;
                }
            }
        }
    }
    resetPosition(bufferType)
    {
        for (let i = 0; i < this.soundObjects.length; i++) {
            this.soundObjects[i].resetPosition(bufferType);
        }
    }
    resetProperties()
    {
        for (let i = 0; i < this.soundObjects.length; i++) {
            this.soundObjects[i].resetProperties();
        }
    }
    pressed()
    {
        for (let i = 0; i < this.soundObjects.length; i++) {
            this.soundObjects[i].pressed();
        }
    }
    released()
    {
        for (let i = 0; i < this.soundObjects.length; i++) {
            this.soundObjects[i].released();
        }
    }
    flash()
    {
        for (let i = 0; i < this.soundObjects.length; i++) {
            this.soundObjects[i].alpha = 200;
        }
    }
    handleDragStack()
    {
        MOUSE_OVER = false;
        MOUSE_DRAG = false;
        entry:
        for (let i = this.soundObjects.length - 1; i > -1; i--) {
            if (this.soundObjects[i].hovering === true) {
                MOUSE_OVER = true;
                for (let j = i - 1; j > -1; j--) {
                    this.soundObjects[j].hovering = false;
                }
                break entry;
            } else if (this.soundObjects[i].dragging === true) {
                MOUSE_DRAG = true;
                for (let j = i - 1; j > -1; j--) {
                    this.soundObjects[j].dragging = false;
                }
                break entry;
            }
        }

    }
    run()
    {
        this.handleDragStack();
        switch (GAME_MODE) {
            case 'gameTypeSelection':
            case 'audioSettings':
            case 'menu':
            case 'taskSelection':
            case 'gameOver':
                for (let i = 0; i < this.soundObjects.length; i++) {
                    if (GAME_TYPE === 'Audio' && !(GAME_MODE === 'audioSettings')) {
                        this.soundObjects[i].handleAudio();
                    }
                    this.soundObjects[i].over();
                    this.soundObjects[i].drift();
                    this.soundObjects[i].edges();
                    this.soundObjects[i].show();
                }
                break;
            case 'game':
                for (let i = 0; i < this.soundObjects.length; i++) {
                    if (GAME_TYPE === 'Audio' && !(GAME_MODE === 'audioSettings')) {
                        this.soundObjects[i].handleAudio();
                    }
                    this.soundObjects[i].over();
                    this.soundObjects[i].drag();
                    this.soundObjects[i].snap(this.sceneSequence.scenes);
                    this.soundObjects[i].edges();
                    this.soundObjects[i].show();
                }
                break;
            case 'playback':
                for (let i = 0; i < this.soundObjects.length; i++) {
                    if (this.soundObjects[i].playing) {
                        this.soundObjects[i].alpha = 200;
                    }
                    this.soundObjects[i].show();
                }
                break;
        }
    }
}

function createSoundObjectSet(sceneSequence)
{
    let soundObjectSet = new SoundObjectSet(0.5, 0.95, 2, 12, 0.04, sceneSequence);
    soundObjectSet.create();
    return soundObjectSet;
}