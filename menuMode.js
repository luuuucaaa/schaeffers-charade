function menuMode()
{
    // console.log('menuMode');
    soundObjectSet.run();
    handleMenuModeButtons();
    menuModeInfoBox.show();
}

function handleMenuModeButtons()
{
    fullscreenButton.over();
    fullscreenButton.show();
    infoButton.over();
    infoButton.show();
    startButton.over();
    startButton.show();
    if (TASK) {
        changeTaskButton.over();
        changeTaskButton.show();
        startButton.text = 'Resume';
    } else {
        startButton.text = 'Start';
    }
    backFromMenuButton.over();
    backFromMenuButton.show();
}