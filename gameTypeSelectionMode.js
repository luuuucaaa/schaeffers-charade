function gameTypeSelectionMode()
{
    // console.log('gameTypeSelectionMode');
    soundObjectSet.run();
    handleGameTypeSelectionModeButtons();
    gameTypeSelectionModeInfoBox.show();
}

function handleGameTypeSelectionModeButtons()
{
    fullscreenButton.over();
    fullscreenButton.show();
    infoButton.over();
    infoButton.show();
    audioGameButton.over();
    audioGameButton.show();
    visualGameButton.over();
    visualGameButton.show();
}