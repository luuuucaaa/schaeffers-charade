function hearingTestMode()
{
    // console.log('hearingTestMode');
    soundObjectSet.run();
    handleHearingTestModeButtons();
    hearingTestOverlay();
}

function handleHearingTestModeButtons()
{
    fullscreenButton.over();
    fullscreenButton.show();
    leftButton.over();
    leftButton.show();
    middleButton.over();
    middleButton.show();
    rightButton.over();
    rightButton.show();
    hearingTestCorrect.show();
    hearingTestFalse.show();
}

function hearingTestOverlay()
{
    textAlign(CENTER);
    textSize(36);
    fill(255);
    noStroke();
    text('Let\'s test your headphones.\n Choose the direction from where you hear the sound.', width/2, height/2 - 140);
    text((N_HTEST_ROUND - 1) + '/' + (N_HTEST_MAX_ROUNDS + 1), width/2, height/2);
}

function getNewHearingTestTask()
{
    tasks = ['left', 'right', 'middle'];
    return tasks[Math.floor(Math.random() * tasks.length)];
}