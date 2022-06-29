let timeout = [];
function playbackMode(time)
{
    // console.log('playbackMode');
    sceneSequence.run();
    soundObjectSet.run();
    handlePlaybackModeButtons();
    if (SUBMITTING) {
        submittingOverlay();
    }
    if (PLAYBACK) {
        for (let i = 0; i < sceneSequence.scenes.length; i++) {
            timeout.push(setTimeout(function() {
                playbackScene(i, time);
            }, time * i));
        }
        timeout.push(setTimeout(function() {
            GAME_MODE = 'game';
        }, sceneSequence.scenes.length * time));
        PLAYBACK = false;
    }
    gameModeInfoBox.show();
}

function handlePlaybackModeButtons()
{
    fullscreenButton.over();
    fullscreenButton.show();
    infoButton.over();
    infoButton.show();
    stopButton.over();
    stopButton.show();
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

function playbackScene(i, time)
{
    sceneSequence.scenes[i].updateListenerPosition();
    for (let j = 0; j < sceneSequence.scenes[i].soundObjectStack.length; j++) {
        sceneSequence.scenes[i].soundObjectStack[j].startAudio();
        timeout.push(setTimeout(function() {
            sceneSequence.scenes[i].soundObjectStack[j].stopAudio();
        }, time - 1));
    }
}