let SUBMITTING = false;

function gameMode()
{
    // console.log('gameMode');
    sceneSequence.run();
    soundObjectSet.run();
    handleGameModeButtons();
    if (SUBMITTING) {
        submittingOverlay();
    }
    if (GAME_TYPE == 'Audio') {
        audioGameModeInfoBox.show();
    } else {
        visualGameModeInfoBox.show();
    }
}

function handleGameModeButtons()
{
    fullscreenButton.over();
    fullscreenButton.show();
    infoButton.over();
    infoButton.show();
    if (GAME_TYPE === 'Audio') {
        playbackButton.over();
        playbackButton.show();
    }
    resetButton.over();
    resetButton.show();
    if (!SUBMITTING) {
        submitButton.over();
        submitButton.show();
    } else {
        yesSubmitButton.over();
        yesSubmitButton.show();
        noSubmitButton.over();
        noSubmitButton.show();
    }
    backFromGameButton.over();
    backFromGameButton.show();
}

function submittingOverlay()
{
    textAlign(RIGHT);
    textSize(28);
    textFont(font);
    noStroke();
    fill(255);
    text('Sure?', width - 20, 100);
}