class SceneSequence
{
    constructor(xRel, yRel, nRows, nCols, nX, nY, gridWidthRel)
    {
        this.posRel = createVector(xRel, yRel);
        this.pos = createVector(xRel * width, yRel * height);
        this.nRows = nRows;
        this.nCols = nCols;
        this.nX = nX;
        this.nY = nY;
        this.gridWidthRel = gridWidthRel;
        this.gridWidth = this.gridWidthRel * height * 1.2;
    }
    create()
    {
        this.scenes = [];
        for (let r = 0; r < this.nRows; r++) {
            for (let c = 0; c < this.nCols; c++) {
                let x = this.pos.x - this.nCols/2 * (this.nX - 1) * this.gridWidth + c * (this.nX + 1) * this.gridWidth;
                let y = this.pos.y - this.nRows/2 * (this.nY - 1) * this.gridWidth + r * (this.nY + 0.5) * this.gridWidth;
                let scene = new Scene(x, y, this.nX, this.nY, this.gridWidth);
                this.scenes.push(scene);
            }
        }
    }
    rescale()
    {
        this.pos.set(this.posRel.x * width, this.posRel.y * height);
        this.gridWidth = this.gridWidthRel * height * 1.2;
        let idx = 0;
        for (let r = 0; r < this.nRows; r++) {
            for (let c = 0; c < this.nCols; c++) {
                this.scenes[idx].pos.x = this.pos.x - this.nCols/2 * (this.nX - 1) * this.gridWidth + c * (this.nX + 1) * this.gridWidth;
                this.scenes[idx].pos.y = this.pos.y - this.nRows/2 * (this.nY - 1) * this.gridWidth + r * (this.nY + 0.5) * this.gridWidth;
                this.scenes[idx].gridWidth = this.gridWidth;
                this.scenes[idx].cellCoordinates = [];
                for (let y = 0; y < this.nY; y++) {
                    for (let x = 0; x < this.nX; x++) {
                        let xCoordinate = this.scenes[idx].pos.x - (this.scenes[idx].nX * this.scenes[idx].gridWidth)/2 + this.scenes[idx].gridWidth/2 + x * this.scenes[idx].gridWidth;
                        let yCoordinate = this.scenes[idx].pos.y - (this.scenes[idx].nY * this.scenes[idx].gridWidth)/2 + this.scenes[idx].gridWidth/2 + y * this.scenes[idx].gridWidth;
                        this.scenes[idx].cellCoordinates.push([xCoordinate, yCoordinate]);
                    }
                }
                if (this.scenes[idx].isInside(listenerPosition[0], listenerPosition[1])) {
                    this.scenes[idx].updateListenerPosition();
                }
                idx++;
            }
        }
    }
    resetSoundObjectStacks()
    {
        for (let i = 0; i < this.scenes.length; i++) {
            this.scenes[i].resetSoundObjectStack();
        }
    }
    run()
    {
        for (let i = 0; i < this.scenes.length; i++) {
            if (GAME_TYPE === 'Audio' && !(GAME_MODE === 'playback')) {
                this.scenes[i].handleAudio();
            }
            this.scenes[i].show();
        }
    }

}

function createSceneSequence()
{
    let sceneSequence = new SceneSequence(CONFIG['posRelHud'][0], CONFIG['posRelHud'][1], 2, 3, 5, 5, 0.05);
    sceneSequence.create();
    return sceneSequence;
}