const CONFIG = {
    'posRelHud': [0.5, 0.56]
}

let N_ROUND = 1;
let MAX_ROUNDS = 3;
let GAME_TYPE = false;
let GAME_MODE = 'gameTypeSelection';
let AUDIO_MODE = false;
let TASK = false;
let MOUSE_OVER = false;
let MOUSE_DRAG = false;
let PLAYBACK = false;

let cvs, font, hpiLogo;

let SOUNDOBJECT_ID = 0;
let soundObjectSet, sceneSequence;

function preload()
{
    font = loadFont('./assets/retro.ttf');
    hpiLogo = loadImage('./assets/hpilogo.png');
}

function setup()
{
    cvs = createCanvas(Math.max(windowWidth, 1280), Math.max(windowHeight, 720));
    createBackgroundAnimation();
    createErrorMessages();
    createButtons();
    sceneSequence = createSceneSequence();
    soundObjectSet = createSoundObjectSet(sceneSequence);
}

function draw()
{
    console.log(SOUNDOBJECT_ID);
    backgroundAnimation();
    displayFramerate();
    switch (GAME_MODE) {
        case 'gameTypeSelection':
            gameTypeSelectionMode();
            break;
        case 'audioSettings':
            audioSettingsMode();
            break;
        case 'menu':
            menuMode();
            displayGameInfos();
            break;
        case 'taskSelection':
            taskSelectionMode();
            displayGameInfos();
            break;
        case 'game':
            gameMode();
            displayGameInfos();
            break;
        case 'playback':
            playbackMode(3000);
            displayGameInfos();
            break;
        case 'gameOver':
            gameOverMode();
            break;
    }
}

