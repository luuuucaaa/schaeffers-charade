class SoundObject
{
    constructor(x, y, w, id, filePath)
    {
        this.id = id;
        this.filePath = filePath;

        this.origin = createVector(CONFIG['posRelHud'][0] * width, CONFIG['posRelHud'][1] * height);

        this.posInit = createVector(x, y);
        this.posRelInit = createVector(x / width, y / height);
        
        this.pos = createVector(floor(random(0, width)), floor(random(0, height)));
        this.posRel = createVector(this.pos.x / width, this.pos.y / height);

        this.posGame = createVector(this.posInit.x, this.posInit.y);
        this.posRelGame = createVector(this.posRelInit.x, this.posRelInit.y);

        this.vel = createVector(random(-0.5, 0.5), random(-0.5, 0.5));

        this.w = random(30, 100);
        this.wInit = w;
        this.strokeWeight = 2;
        this.angle = 0;
        
        this.automations = createVector(random(-0.1, 0.1), random(-0.005, 0.005));

        this.color = getRandomHpiColor(10, 255);
        this.colorBuffer = this.color;
        this.alpha = 20;

        this.dragging = false;
        this.hovering = false;
        this.offset = createVector(0, 0);
        this.playing = false;

        this.inScene = new Array(sceneSequence.scenes.length).fill(false);
    }
    createAudioNodes(multichannel=false)
    {
        if (!multichannel) {
            this.gainNode = audioCtx.createGain();
            this.gainNode.gain.value = 1;

            this.pannerNode = audioCtx.createPanner();
            this.pannerNode.setPosition(this.pos.x, this.pos.y, 0);
            this.pannerNode.panningModel = 'HRTF';
            this.pannerNode.distanceModel = 'exponential';
            this.pannerNode.refDistance = 1;
            this.pannerNode.maxDistance = Math.sqrt(width * width + height * height);
            this.pannerNode.rolloffFactor = 0.2;
            this.pannerNode.coneInnerAngle = 360;
            this.pannerNode.coneOuterAngle = 0;
            this.pannerNode.coneOuterGain = 0;
        } else {
            let numChannels = 4;
            this.gainNodes = [];
            for (let i = 0; i < numChannels; i++) {
                this.gainNodes[i] = audioCtx.createGain();
            }
            this.multichannelMerger = audioCtx.createChannelMerger(numChannels)
        }
    }
    updateBinauralPanner()
    {
        this.pannerNode.setPosition(this.pos.x, this.pos.y, 0);
    }
    startAudio() {
        if (!this.playing) {
            if (AUDIO_MODE === 'binaural') {
                this.source = getAudioDataBinaural(this.filePath, this.pannerNode, this.gainNode);
            } else if (AUDIO_MODE === 'multichannel') {
                this.source = getAudioDataMultichannel(this.filePath, this.gainNodes, this.multichannelMerger);
            }
            this.source.start();
            this.playing = true;
        }
    }
    stopAudio() {
        if (this.playing) {
            this.source.stop();
            this.playing = false;
        }
    }
    handleAudio()
    {
        if (this.hovering || this.dragging) {
            this.startAudio();
        } else if (!this.inScene.includes(true)) {
            this.stopAudio();
        }
    }
    rescale()
    {
        this.pos.set(this.posRel.x * width, this.posRel.y * height);
        try {this.pannerNode.maxDistance = Math.sqrt(width * width + height * height);} catch (e) {}
    }
    drift()
    {
        if (!RESCALING) {
            this.pos.add(this.vel);
            this.posRel.set(this.pos.x / width, this.pos.y / height);
            this.w += this.automations.x;
            this.angle += this.automations.y;
            this.angle %= 4 * PI;
            this.strokeWeight = map(this.w, 30, 100, 1.5, 3);
            if (GAME_TYPE === 'Audio' && !(GAME_MODE === 'audioSettings')) {
                this.updateBinauralPanner();
            }
        }
    }
    edges()
    {
        if (this.pos.x < 0 || this.pos.x > width) {
            this.vel.x *= -1;
        } else if (this.pos.y < 0 || this.pos.y > height) {
            this.vel.y *= -1;
        } else if (this.w < 30 || this.w > 100) {
            this.automations.x *= -1;
        }
        if (GAME_MODE === 'game') {
            if (this.pos.x < 0) {
                this.pos.x = 0;
            } else if (this.pos.x > width) {
                this.pos.x = width;
            } else if (this.pos.y < 0) {
                this.pos.y = 0;
            } else if (this.pos.y > height) {
                this.pos.x = height;
            }
        }
    }
    resetPosition(bufferType)
    {
        if (bufferType === 'init') {
            this.pos.set(this.posRelInit.x * height, this.posRelInit.y * height);
            this.posRel.set(this.pos.x / width, this.pos.y / height);
            this.posGame.set(this.pos.x, this.pos.y);
            this.posRelGame.set(this.posGame.x / height, this.posGame.y / height);
        } else if (bufferType === 'game') {
            this.pos.set(this.posRelGame.x * height, this.posRelGame.y * height);
            this.posRel.set(this.pos.x / width, this.pos.y / height);
        }
        this.w = this.wInit;
        this.angle = 0;
        this.strokeWeight = 2;
        this.vel.set(random(-0.2, 0.2), random(-0.2, 0.2));
        this.automations.set(random(-0.1, 0.1), random(-0.01, 0.01));
    }
    resetProperties()
    {
        this.stopAudio();
        this.dragging = false;
        this.hovering = false;
        this.playing = false;
        this.inScene = new Array(sceneSequence.scenes.length).fill(false);
    }
    over()
    {
        if (!MOUSE_OVER && !MOUSE_DRAG && this.isInside(mouseX, mouseY)) {
            this.hovering = true;
            console.log("id: " + this.id);
        } else if (this.hovering && !(this.isInside(mouseX, mouseY))) {
            this.hovering = false;
        }
    }
    pressed()
    {
        if (this.hovering && this.isInside(mouseX, mouseY)) {
            this.dragging = true;
            this.offset.set(this.pos.x - mouseX, this.pos.y - mouseY);
            soundObjectSet.soundObjects.push(soundObjectSet.soundObjects.splice(soundObjectSet.soundObjects.indexOf(this), 1)[0]); // bring 'this' to end of array
        }
    }
    released()
    {
        this.dragging = false;
    }
    drag()
    {
        if (this.dragging) {
            this.pos.set(mouseX + this.offset.x, mouseY + this.offset.y);
            this.posRel.set(this.pos.x / width, this.pos.y / height);
            this.posGame.set(this.pos.x - this.origin.x, this.pos.y - this.origin.y);
            this.posRelGame.set(this.posGame.x / height, this.posGame.y / height);
            if (GAME_TYPE === 'Audio' && !(GAME_MODE === 'audioSettings')) {
                this.updateBinauralPanner();
            }
        }
    }
    snap(scenes)
    {
        if (this.dragging) {
            for (let i = 0; i < scenes.length; i++) {
                if (scenes[i].isInside(mouseX, mouseY)) {
                    for (let j = 0; j < scenes[i].cellCoordinates.length; j++) {
                        if (mouseX > scenes[i].cellCoordinates[j][0] - scenes[i].gridWidth/2 && mouseX < scenes[i].cellCoordinates[j][0] + scenes[i].gridWidth/2 && mouseY > scenes[i].cellCoordinates[j][1] - scenes[i].gridWidth/2 && mouseY < scenes[i].cellCoordinates[j][1] + scenes[i].gridWidth/2) {
                            this.pos.x = scenes[i].cellCoordinates[j][0];
                            this.pos.y = scenes[i].cellCoordinates[j][1];
                            this.posRel.set(this.pos.x / width, this.pos.y / height);
                            this.posGame.set(this.pos.x - this.origin.x, this.pos.y - this.origin.y);
                            this.posRelGame.set(this.posGame.x / height, this.posGame.y / height);
                            if (!this.inScene[i]) {
                                this.inScene[i] = true;
                                scenes[i].updateSoundObjectStack(this);
                                // console.log('snapped to scene', i);
                            }
                        }
                    }
                } else if (this.inScene[i]) {
                    this.inScene[i] = false;
                    scenes[i].updateSoundObjectStack(this);
                    // console.log('un-snapped from scene', i);
                }
            }
        }
    }
    isInside(x, y)
    {
        if (x > this.pos.x - this.w/2 && x < this.pos.x + this.w/2 && y > this.pos.y - this.w/2 && y < this.pos.y + this.w/2) {
            return true;
        } else {
            return false;
        }
    }
    duplicate()
    {
        let that = this;
        cvs.doubleClicked(function() {
            if (that.hovering) {
                let soundObjectDuplicate = new SoundObject(
                    that.pos.x,
                    that.pos.y,
                    that.w,
                    SOUNDOBJECT_ID,
                    that.filePath
                );
                SOUNDOBJECT_ID++;
                soundObjectDuplicate.resetPosition();
                soundObjectDuplicate.color = that.color;
                soundObjectDuplicate.colorBuffer = that.color;
                soundObjectDuplicate.pos.set(that.pos.x + 20, that.pos.y - 20);
                soundObjectDuplicate.resetProperties();
                if (GAME_TYPE === 'Audio' && AUDIO_MODE == 'multichannel') {
                    soundObjectDuplicate.createAudioNodes(true);
                } else if (GAME_TYPE === 'Audio' && AUDIO_MODE == 'binaural') {
                    soundObjectDuplicate.createAudioNodes(false);
                }
                soundObjectSet.soundObjects.push(soundObjectDuplicate);
            }
        });
    }
    show()
    {
        if ((GAME_MODE === 'gameTypeSelection') || (GAME_MODE === 'audioSettings')) {
            this.color = color(255);
        } else {
            this.color = this.colorBuffer;
        }
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);

        this.color.setAlpha(255);
        stroke(this.color);
        strokeWeight(this.strokeWeight);

        if (this.hovering || this.dragging) {
            this.alpha = 200;
        } else if (this.alpha > 20) {
            this.alpha -= 10;
        };

        this.color.setAlpha(this.alpha);
        fill(this.color);

        rect(-this.w/2, -this.w/2, this.w, this.w, 5);
        pop();
    }
}