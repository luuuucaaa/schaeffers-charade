function gameOverMode()
{
    // console.log('gameOverMode');
    soundObjectSet.run();
    gameOverOverlay();
    handleGameOverModeButtons();
}

function handleGameOverModeButtons()
{
    fullscreenButton.over();
    fullscreenButton.show();
    infoButton.over();
    infoButton.show();
    playAgainButton.over();
    playAgainButton.show();
}

let counter = 0;
function gameOverOverlay()
{
    textAlign(CENTER);
    textSize(128);
    textFont(font);
    strokeWeight(3);
    stroke(255);
    fill((Math.sin(counter) + 1) * 255, 90, 110);
    text('GAME OVER', width/2, height/2);
    counter += 0.05;
}