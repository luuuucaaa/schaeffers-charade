function taskSelectionMode()
{
    // console.log('taskSelectionMode');
    soundObjectSet.run();
    handleTaskSelectionModeButtons();
    taskSelectionOverlay();
}

function handleTaskSelectionModeButtons()
{
    fullscreenButton.over();
    fullscreenButton.show();
    infoButton.over();
    infoButton.show();
    task1Button.over();
    task1Button.show();
    task2Button.over();
    task2Button.show();
    task3Button.over();
    task3Button.show();
    backFromTaskSelectionButton.over();
    backFromTaskSelectionButton.show();
}

function taskSelectionOverlay()
{
    textAlign(CENTER);
    textSize(36);
    fill(255);
    noStroke();
    text('Choose a task.', width/2, height/2 + 240);

    textSize(64)
    stroke(180, 90, 110);
    strokeWeight(5);
    text('Round ' + N_ROUND, width/2, height/2 - 240);
}