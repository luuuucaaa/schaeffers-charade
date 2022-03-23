let audioCtx, listener;
let listenerPosition = [0, 0];
let themesong;

function startThemeSong()
{
    let gainNode = audioCtx.createGain();
    gainNode.gain.value = .4;
    themesong = getAudioData('./assets/themesong.wav', gainNode);
    themesong.start();
}

function stopThemeSong()
{
    themesong.stop();
}

function initAudio()
{
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    startThemeSong();
}

function initBinauralAudio()
{
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    listener = audioCtx.listener;
    listenerPosition = [width/2, height/2, 100];
    listener.setPosition(listenerPosition[0], listenerPosition[1], listenerPosition[2]);
    listener.setOrientation(0, 1, 0, 0, 0, 1);
    for (let i = 0; i < soundObjectSet.soundObjects.length; i++) {
        soundObjectSet.soundObjects[i].createAudioNodes();
    }
    startThemeSong();
}

function initMultichannelAudio()
{
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    audioCtx.destination.channelCount = 16;
    listener = audioCtx.listener;
    listenerPosition = [width/2, height/2, 100];
    listener.setPosition(listenerPosition[0], listenerPosition[1], listenerPosition[2]);
    listener.setOrientation(0, 1, 0, 0, 0, 1);
    for (let i = 0; i < soundObjectSet.soundObjects.length; i++) {
        soundObjectSet.soundObjects[i].createAudioNodes(multichannel=true);
    }
    startThemeSong();
}
  
function getAudioData(filePath, gainNode)
{
    var source = audioCtx.createBufferSource();
    var request = new XMLHttpRequest();
    request.open('GET', filePath, true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
      var audioData = request.response;
      audioCtx.decodeAudioData(audioData, function(buffer) {
          source.buffer = buffer;
          source.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          source.loop = true;
        },
        function(e){ console.log("Error with decoding audio data" + e.err); });
    }
    request.send();
    return source;
}

function getAudioDataBinaural(filePath, pannerNode, gainNode)
{
    var source = audioCtx.createBufferSource();
    var request = new XMLHttpRequest();
    request.open('GET', filePath, true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
      var audioData = request.response;
      audioCtx.decodeAudioData(audioData, function(buffer) {
          source.buffer = buffer;
          source.connect(pannerNode);
          pannerNode.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          source.loop = true;
        },
        function(e){ console.log("Error with decoding audio data" + e.err); });
    }
    request.send();
    return source;
}

function getAudioDataMultichannel(filePath, gainNodes, multichannelMerger)
{
    var source = audioCtx.createBufferSource();
    var request = new XMLHttpRequest();
    request.open('GET', filePath, true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
      var audioData = request.response;
      audioCtx.decodeAudioData(audioData, function(buffer) {
          source.buffer = buffer;
          for (let i = 0; i < gainNodes.length; i++) {
            gainNodes[i].gain.value = 0.2;
            source.connect(gainNodes[i]);
            gainNodes[i].connect(multichannelMerger, 0, i);
          }
          multichannelMerger.connect(audioCtx.destination);
          source.loop = true;
        },
        function(e){ console.log("Error with decoding audio data" + e.err); });
    }
    request.send();
    return source;
}