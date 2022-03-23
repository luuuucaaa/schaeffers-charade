function audioSettingsMode()
{
    // console.log('audioSettingsMode');
    soundObjectSet.run();
    handleAudioSettingsButtons();
}

function handleAudioSettingsButtons()
{
    fullscreenButton.over();
    fullscreenButton.show();
    infoButton.over();
    infoButton.show();
    binauralButton.over();
    binauralButton.show();
    multichannelButton.over();
    multichannelButton.show();
    multichannelError.show();
    backFromAudioSettingsButton.over();
    backFromAudioSettingsButton.show();
}