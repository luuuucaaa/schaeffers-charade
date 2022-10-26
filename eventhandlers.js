let RESCALING = false;

function windowResized()
{
    RESCALING = true;
    resizeCanvas(constrain(windowWidth, 1280, displayWidth), constrain(windowHeight, 720, displayHeight));
    updateButtons();
    updateInfoBoxes();
    multichannelError.update();
    sceneSequence.rescale();
    soundObjectSet.rescale();
    setTimeout(function() {RESCALING = false}, 10);
}

function mousePressed()
{
    fullscreenButton.pressed();
    infoButton.pressed();
    switch (GAME_MODE) {
        case 'start':
            startHearingTestButton.pressed();
            break;
        case 'hearingTest':
            leftButton.pressed();
            middleButton.pressed();
            rightButton.pressed();
            break;
        case 'gameTypeSelection':
            audioGameButton.pressed();
            visualGameButton.pressed();
            break;
        case 'audioSettings':
            binauralButton.pressed();
            multichannelButton.pressed();
            backFromAudioSettingsButton.pressed();
            break;
        case 'menu':
            startButton.pressed();
            backFromMenuButton.pressed();
            if (TASK) {
                changeTaskButton.pressed();
            }
            break;
        case 'taskSelection':
            task1Button.pressed();
            task2Button.pressed();
            task3Button.pressed();
            backFromTaskSelectionButton.pressed();
            break;
        case 'game':
            playbackButton.pressed();
            resetButton.pressed();
            if (!SUBMITTING) {
                submitButton.pressed();
            } else {
                yesSubmitButton.pressed();
                noSubmitButton.pressed();
            }
            soundObjectSet.pressed();
            backFromGameButton.pressed();
            break;
        case 'playback':
            stopButton.pressed();
            if (!SUBMITTING) {
                submitButton.pressed();
            } else {
                yesSubmitButton.pressed();
                noSubmitButton.pressed();
            }
            backFromGameButton.pressed();
            break;
        case 'gameOver':
            playAgainButton.pressed();
            break;
    }
}
  
function mouseReleased()
{
    switch (GAME_MODE) {
        case 'game':
            soundObjectSet.released();
            break;
    }
}