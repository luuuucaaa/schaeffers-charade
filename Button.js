class Button
{
    constructor(x, y, w, h, alignment, col, strokeW, text, textSize, onPress)
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
        this.alpha = 0;
        this.text = text;
        this.textSize = textSize;
        this.rollover = false;
        this.onPress = onPress;
        this.isLocked = false;
        this.update();
    }
    over()
    {
        if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h && !this.isLocked) {
            this.rollover = true;
        } else {
            this.rollover = false;
        }
    }
    pressed()
    {
        if (this.rollover) {
            this.alpha = 0;
            this.onPress(this.text);
        }
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
    lock()
    {
        if (this.isLocked) {
            this.isLocked = false;
        } else {
            this.isLocked = true;
        }
    }
    show()
    {
        noStroke();
        fill(0, 20);
        rect(this.x, this.y, this.w, this.h, 100);

        this.col.setAlpha(255);
        strokeWeight(this.strokeW);
        stroke(this.col);
        if (this.rollover) {
            this.alpha = 200;
        } else if (this.alpha > 0) {
            this.alpha -= 10;
        };
        this.col.setAlpha(this.alpha);
        fill(this.col); 
        rect(this.x, this.y, this.w, this.h, 100);

        textAlign(CENTER);
        textSize(this.textSize);
        textFont(font);
        fill(0);
        text(this.text, this.x + this.w/2, this.y + this.h/2 + 6);
    }
}

let fullscreenButton, infoButton;
let leftButton, middleButton, rightButton;
let audioGameButton, visualGameButton;
let binauralButton, multichannelButton, backFromAudioSettingsButton;
let startButton, changeTaskButton, backFromMenuButton;
let task1Button, task2Button, task3Button, backFromTaskSelectionButton;
let playbackButton, stopButton, resetButton, submitButton, backFromGameButton;
let yesSubmitButton, noSubmitButton;
let playAgainButton;

function createButtons()
{
    // visible in any mode
    fullscreenButton = new Button(20, 20, 160, 40, 'upper_left', color(255), 2, 'Fullscreen', 18, fullscreenButtonPressed);
    infoButton = new Button(20, -20, 40, 40, 'lower_left', color(255), 2, 'i', 18, infoButtonPressed);

    // visible in hearingTest mode
    leftButton = new Button(-200, 80, 160, 40, 'center', color(255), 2, 'Left', 18, leftButtonPressed);
    middleButton = new Button(0, 80, 160, 40, 'center', color(255), 2, 'Middle', 18, middleButtonPressed);
    rightButton = new Button(200, 80, 160, 40, 'center', color(255), 2, 'Right', 18, rightButtonPressed);

    // visible in gameTypeSelection mode
    audioGameButton = new Button(0, -60, 600, 80, 'center', color(180, 90, 110), 3, 'Audio Game', 22, audioGameButtonPressed);
    visualGameButton = new Button(0, 60, 600, 80, 'center', color(180, 90, 110), 3, 'Visual Game', 22, visualGameButtonPressed);

    // visible in audioSettings mode
    binauralButton = new Button(0, -60, 600, 80, 'center', color(180, 90, 110), 3, 'Binaural Audio', 22, binauralButtonPressed);
    multichannelButton = new Button(0, 60, 600, 80, 'center', color(180, 90, 110), 3, 'Multichannel Audio', 22, multichannelButtonPressed);
    backFromAudioSettingsButton = new Button(80, -20, 100, 40, 'lower_left', color(255), 2, 'Back', 18, backFromAudioSettingsButtonPressed);
    
    // visible in menu mode
    startButton = new Button(0, -160, 800, 100, 'center', color(200, 90, 110), 3, 'Start', 24, startButtonPressed);
    changeTaskButton = new Button(0, -60, 600, 60, 'center', color(255), 2, 'Change Task', 18, changeTaskButtonPressed);
    backFromMenuButton = new Button(80, -20, 100, 40, 'lower_left', color(255), 2, 'Back', 18, backFromMenuButtonPressed);
    
    // visible in taskSelection mode
    let randomTasks = getRandomTasks();
    task1Button = new Button(0, -120, 600, 80, 'center', color(180, 90, 110), 3, randomTasks[0], 22, taskButtonPressed);
    task2Button = new Button(0, 0, 600, 80, 'center', color(180, 90, 110), 3, randomTasks[1], 22, taskButtonPressed);
    task3Button = new Button(0, 120, 600, 80, 'center', color(180, 90, 110), 3, randomTasks[2], 22, taskButtonPressed);
    backFromTaskSelectionButton = new Button(80, -20, 100, 40, 'lower_left', color(255), 2, 'Back', 18, backFromTaskSelectionButtonPressed);
    
    // visible in game mode
    playbackButton = new Button(0, 20, 220, 60, 'upper_center', color(180, 90, 110), 2, 'Play Scenes', 22, playbackButtonPressed);
    resetButton = new Button(200, -20, 100, 40, 'lower_left', color(255), 2, 'Reset', 18, resetButtonPressed);
    submitButton = new Button(-20, 20, 100, 40, 'upper_right', color(90, 190, 110), 2, 'Submit', 18, submitButtonPressed);
    backFromGameButton = new Button(80, -20, 100, 40, 'lower_left', color(255), 2, 'Menu', 18, backFromGameButtonPressed);

    // visible in playback mode
    stopButton = new Button(0, 20, 220, 60, 'upper_center', color(180, 90, 110), 2, 'Stop Scenes', 22, stopButtonPressed);

    // visible in submit mode
    yesSubmitButton = new Button(-140, 20, 100, 40, 'upper_right', color(90, 190, 110), 2, 'Yes', 18, yesSubmitButtonPressed);
    noSubmitButton = new Button(-20, 20, 100, 40, 'upper_right', color(190, 70, 90), 2, 'No', 18, noSubmitButtonPressed);

    // visible in gameOver mode
    playAgainButton = new Button(20, 80, 600, 60, 'center', color(255), 2, 'Play Again', 22, playAgainButtonPressed)
}

function updateButtons()
{
    fullscreenButton.update();
    infoButton.update();

    leftButton.update();
    middleButton.update();
    rightButton.update();

    audioGameButton.update();
    visualGameButton.update();
    
    binauralButton.update();
    multichannelButton.update();
    backFromAudioSettingsButton.update();

    startButton.update();
    changeTaskButton.update();
    backFromMenuButton.update();

    task1Button.update();
    task2Button.update();
    task3Button.update();
    backFromTaskSelectionButton.update();

    playbackButton.update();
    stopButton.update();
    resetButton.update();
    submitButton.update();
    backFromGameButton.update();

    yesSubmitButton.update();
    noSubmitButton.update();

    playAgainButton.update();
}

function lockButtons()
{
    audioGameButton.lock();
    visualGameButton.lock();
    
    binauralButton.lock();
    multichannelButton.lock();
    backFromAudioSettingsButton.lock();

    startButton.lock();
    changeTaskButton.lock();
    backFromMenuButton.lock();

    task1Button.lock();
    task2Button.lock();
    task3Button.lock();
    backFromTaskSelectionButton.lock();

    playbackButton.lock();
    stopButton.lock();
    resetButton.lock();
    submitButton.lock();
    backFromGameButton.lock();

    yesSubmitButton.lock();
    noSubmitButton.lock();

    playAgainButton.lock();
}

function fullscreenButtonPressed()
{
    let fs = fullscreen();
    fullscreen(!fs);
}

function infoButtonPressed()
{
    switch (GAME_MODE) {
        case 'gameTypeSelection':
            gameTypeSelectionModeInfoBox.toggle();
            break;
        case 'audioSettings':
            audioSettingsModeInfoBox.toggle();
            break;
        case 'menu':
            menuModeInfoBox.toggle();
            break;
        case 'taskSelection':
            taskSelectionModeInfoBox.toggle();
            break;
        case 'game':
            audioGameModeInfoBox.toggle();
            visualGameModeInfoBox.toggle();
            break;
        case 'playback':
            gameModeInfoBox.toggle();
            break;
        case 'gameOver':
            gameOverModeInfoBox.toggle();
            break;
    }
    lockButtons();
}

function leftButtonPressed()
{
    hearingTestButtonPressed('left');
}

function middleButtonPressed()
{
    hearingTestButtonPressed('middle');
}

function rightButtonPressed()
{
    hearingTestButtonPressed('right');
}

function hearingTestButtonPressed(type)
{
    hearingTestCorrect.resetAlpha();
    hearingTestFalse.resetAlpha();
    if (HTEST_TASK == type) {
        if (N_HTEST_ROUND > N_HTEST_MAX_ROUNDS) {
            stopTestSound();
            startThemeSong();
            GAME_MODE = 'menu';
            return;
        }
        hearingTestCorrect.flash();
        N_HTEST_ROUND += 1;
        stopTestSound();
        HTEST_TASK = getNewHearingTestTask();
        startTestSound(HTEST_TASK);
    } else {
        hearingTestFalse.flash();
        N_HTEST_ROUND = 1;
        stopTestSound();
        HTEST_TASK = getNewHearingTestTask();
        startTestSound(HTEST_TASK);
    }
}

function audioGameButtonPressed()
{
    GAME_TYPE = 'Audio';
    GAME_MODE = 'audioSettings';

    // only for the survey
    binauralButtonPressed();
}

function visualGameButtonPressed()
{
    initAudio();
    GAME_TYPE = 'Visual';
    AUDIO_MODE = false;
    GAME_MODE = 'menu';
    soundObjectSet.flash();
    startThemeSong();
}

function binauralButtonPressed()
{
    multichannelError.resetAlpha();
    initBinauralAudio();
    GAME_MODE = 'menu';
    AUDIO_MODE = 'binaural';
    soundObjectSet.flash();

    GAME_MODE = 'hearingTest';
    HTEST_TASK = getNewHearingTestTask();
    startTestSound(HTEST_TASK);
}

function multichannelButtonPressed()
{
    multichannelError.resetAlpha();
    try {
        initMultichannelAudio();
    } catch (e) {
        multichannelError.flash();
        console.log('error');
        return
    }
    GAME_MODE = 'menu';
    AUDIO_MODE = 'multichannel';
    soundObjectSet.flash();
}

function backFromAudioSettingsButtonPressed()
{
    GAME_MODE = 'gameTypeSelection';
    multichannelError.resetAlpha();
}

function startButtonPressed()
{
    if (TASK) {
        /* for (let i = 0; i < soundObjects.length; i++) {
            soundObjects[i].resetDrift(300);
        }
        setTimeout(function() {
            GAME_MODE = 'game';
        }, 300); */
        GAME_MODE = 'game';
        soundObjectSet.resetProperties();
        soundObjectSet.resetPosition('game');
        soundObjectSet.rescale();
        sceneSequence.resetSoundObjectStacks();
        stopThemeSong();
    } else {
        GAME_MODE = 'taskSelection';
    }
}

function changeTaskButtonPressed()
{
    let randomTasks = getRandomTasks();
    task1Button.text = randomTasks[0];
    task2Button.text = randomTasks[1];
    task3Button.text = randomTasks[2];
    GAME_MODE = 'taskSelection';
}

function backFromMenuButtonPressed()
{
    switch (GAME_TYPE) {
        case 'Audio':
            GAME_MODE = 'audioSettings';
            soundObjectSet.resetProperties();
            break;
        case 'Visual':
            GAME_MODE = 'gameTypeSelection';
            GAME_TYPE = '';
            break;
    }
    stopThemeSong();
}

function taskButtonPressed(t)
{
    TASK = t;
    /* for (let i = 0; i < soundObjects.length; i++) {
        soundObjects[i].resetDrift(300);
    }
    setTimeout(function() {
        GAME_MODE = 'game';
    }, 300); */
    GAME_MODE = 'game';
    soundObjectSet.resetProperties();
    soundObjectSet.resetPosition('init');
    soundObjectSet.rescale();
    sceneSequence.resetSoundObjectStacks();
    stopThemeSong();
}

function backFromTaskSelectionButtonPressed()
{
    GAME_MODE = 'menu';
}

function resetButtonPressed()
{
    soundObjectSet.deleteDuplicates();
    soundObjectSet.resetProperties();
    soundObjectSet.resetPosition('init');
    soundObjectSet.rescale();
    sceneSequence.resetSoundObjectStacks();
}

function submitButtonPressed()
{
    SUBMITTING = true;
}

function playbackButtonPressed()
{
    GAME_MODE = 'playback';
    PLAYBACK = true;
}

function stopButtonPressed()
{
    for (let i = 0; i < timeout.length; i++) {
        clearTimeout(timeout[i]);
    }
    GAME_MODE = 'game';
}

function backFromGameButtonPressed()
{
    SUBMITTING = false;
    GAME_MODE = 'menu';
    startThemeSong();
}

function yesSubmitButtonPressed()
{
    for (let i = 0; i < timeout.length; i++) {
        clearTimeout(timeout[i]);
    }
    for (let i = 0; i < soundObjectSet.soundObjects.length; i++) {
        soundObjectSet.soundObjects[i].stopAudio();
    }
    SUBMITTING = false;
    TASK = false;
    let randomTasks = getRandomTasks();
    task1Button.text = randomTasks[0];
    task2Button.text = randomTasks[1];
    task3Button.text = randomTasks[2];
    N_ROUND++;
    if (N_ROUND > MAX_ROUNDS) {
        GAME_MODE = 'gameOver';
        N_ROUND = 1;
    } else {
        GAME_MODE = 'taskSelection';
    }
    startThemeSong();
    soundObjectSet.deleteDuplicates();
}

function noSubmitButtonPressed()
{
    SUBMITTING = false;
}

function playAgainButtonPressed()
{
    N_ROUND = 1;
    GAME_TYPE = false;
    GAME_MODE = 'gameTypeSelection';
    AUDIO_MODE = false;
    TASK = false;
    stopThemeSong();
}