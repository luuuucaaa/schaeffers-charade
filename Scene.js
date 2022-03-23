class Scene
{
    constructor(x, y, nX, nY, gridWidth)
    {
        this.pos = createVector(x, y);
        this.nX = nX;
        this.nY = nY;
        this.gridWidth = gridWidth;
        this.alpha = 0;
        this.cellCoordinates = [];
        for (let y = 0; y < this.nY; y++) {
            for (let x = 0; x < this.nX; x++) {
                let xCoordinate = this.pos.x - (this.nX * this.gridWidth)/2 + this.gridWidth/2 + x * this.gridWidth;
                let yCoordinate = this.pos.y - (this.nY * this.gridWidth)/2 + this.gridWidth/2 + y * this.gridWidth;
                this.cellCoordinates.push([xCoordinate, yCoordinate]);
            }
        }
        this.soundObjectStack = [];
    }
    isInside(x, y)
    {
        if (x > this.pos.x - (this.nX * this.gridWidth)/2 && x < this.pos.x + (this.nX * this.gridWidth)/2 && y > this.pos.y - (this.nY * this.gridWidth)/2 && y < this.pos.y + (this.nY * this.gridWidth)/2) {
            return true;
        } else {
            return false;
        }
    }
    updateSoundObjectStack(obj)
    {
        if (this.soundObjectStack.includes(obj)) {
            let index = this.soundObjectStack.indexOf(obj);
            this.soundObjectStack.splice(index, 1);
        } else {
            this.soundObjectStack.push(obj);
        }
    }
    resetSoundObjectStack()
    {
        this.soundObjectStack = [];
    }
    updateListenerPosition()
    {
        let multichannelPannerPositionsRelativeToListener = [
            {
                x: -(sceneSequence.scenes[0].nX * sceneSequence.scenes[0].gridWidth)/2,
                y: -(sceneSequence.scenes[0].nY * sceneSequence.scenes[0].gridWidth)/2
            },
            {
                x: (sceneSequence.scenes[0].nX * sceneSequence.scenes[0].gridWidth)/2,
                y: -(sceneSequence.scenes[0].nY * sceneSequence.scenes[0].gridWidth)/2
            },
            {
                x: (sceneSequence.scenes[0].nX * sceneSequence.scenes[0].gridWidth)/2,
                y: (sceneSequence.scenes[0].nY * sceneSequence.scenes[0].gridWidth)/2
            },
            {
                x: -(sceneSequence.scenes[0].nX * sceneSequence.scenes[0].gridWidth)/2,
                y: (sceneSequence.scenes[0].nY * sceneSequence.scenes[0].gridWidth)/2
            }
        ];
        if (listenerPosition[0] != this.pos.x || listenerPosition[1] != this.pos.y) {
            listener.setPosition(this.pos.x, this.pos.y, 0);
            listenerPosition[0] = this.pos.x;
            listenerPosition[1] = this.pos.y;
            if (AUDIO_MODE == 'multichannel') {
                for (let i = 0; i < multichannelPannerPositions.length; i++) {
                    multichannelPannerPositions[i].x = listenerPosition[0] + multichannelPannerPositionsRelativeToListener[i].x;
                    multichannelPannerPositions[i].y = listenerPosition[1] + multichannelPannerPositionsRelativeToListener[i].y;
                }
            }
            // console.log('updated listener position');
        }
    }
    handleAudio()
    {
        if (this.isInside(mouseX, mouseY)) {
            this.updateListenerPosition();
            for (let i = 0; i < this.soundObjectStack.length; i++) {
                this.soundObjectStack[i].startAudio();
                this.soundObjectStack[i].alpha = 200;
            }
        } else {
            for (let i = 0; i < this.soundObjectStack.length; i++) {
                this.soundObjectStack[i].stopAudio();
            }
        }
    }
    show()
    {
        stroke(255);
        strokeWeight(1);
        for (let i = 0; i < this.nX + 1; i++) {
            line(this.pos.x + this.gridWidth * i - this.nX/2 * this.gridWidth, this.pos.y - this.nY/2 * this.gridWidth, this.pos.x + this.gridWidth * i - this.nX/2 * this.gridWidth, this.pos.y + this.nY/2 * this.gridWidth);
        }
        for (let i = 0; i < this.nY + 1; i++) {
            line(this.pos.x - this.nX/2 * this.gridWidth, this.pos.y + this.gridWidth * i - this.nY/2 * this.gridWidth, this.pos.x + this.nX/2 * this.gridWidth, this.pos.y + this.gridWidth * i - this.nY/2 * this.gridWidth);
        }
        if (this.isInside(listenerPosition[0], listenerPosition[1])) {
            this.alpha = 255;
        } else {
            this.alpha -= 40;
        }
        fill(0, 122, 158, this.alpha);
        push();
        translate(this.pos.x, this.pos.y);
        beginShape();
        vertex(0, - this.gridWidth/4);
        vertex(this.gridWidth/4, this.gridWidth/4);
        vertex(-this.gridWidth/4, this.gridWidth/4);
        endShape(CLOSE);
        pop();
    }
}