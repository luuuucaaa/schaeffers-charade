function getRandomHpiColor(randomRange, alpha)
{
    const hpi_colors = [
        [0, 122, 158],
        [177, 6, 58],
        [221, 97, 8],
        [246, 168, 0]
    ];
    let coin = int(random(4));
    let col = hpi_colors[coin];
    for (let i = 0; i < col.length; i++) {
        let r = random(-1, 1) * randomRange;
        col[i] += r;
        if (col[i] < 0) {
            col[i] = 0;
        } else if (col[i] > 255) {
            col[i] = 255;
        }
    }
    col.push(alpha);
    return color(col)
}

function getHpiColor(idx) {
    let c;
    switch (idx) {
        case 0:
            c = color([0, 122, 158]);
            break;
        case 1:
            c = color([177, 6, 58]);
            break;
        case 2:
            c = color([221, 97, 8]);
            break;
        case 3:
            c = color([246, 168, 0]);
            break;
    }
    return c;
}

function displayFramerate()
{
    textAlign(LEFT);
    textSize(18);
    textFont(font);
    noStroke();
    fill(255);
    text(floor(frameRate()), 200, 47);
}

function displayMinCanvasSize()
{
    strokeWeight(1);
    stroke(255);
    noFill();
    rect(width/2 - 1280/2, height/2 - 720/2, 1280, 720);
}

function displayGameInfos()
{
    textFont(font);
    fill(255);
    if (N_ROUND > 0) {
        textAlign(LEFT);
        textSize(24);
        noStroke();
        text('Round ' + N_ROUND + ' of ' + MAX_ROUNDS, 20, height - 105);
    }
    if (GAME_TYPE === 'Visual') {
        textAlign(LEFT);
        textSize(14);
        noStroke();
        text(GAME_TYPE + ' Game', 20, height - 80);
    }
    if (AUDIO_MODE) {
        textAlign(LEFT);
        textSize(14);
        noStroke();
        text(GAME_TYPE + ' Game (' + AUDIO_MODE + ' audio)', 20, height - 80);
    }
    if (!(GAME_MODE === 'taskSelection')) {
        if (TASK) {
            textAlign(CENTER);
            textSize(18);
            stroke(180, 90, 110);
            strokeWeight(3);
            if (!(GAME_MODE === 'menu')) {
                if (GAME_TYPE === 'Audio') {
                    text(TASK, width/2, 110);
                } else {
                    text(TASK, width/2, 47);
                }
            } else {
                textSize(36);
                text(TASK, width/2, height/2 + 40);
            }
        }
    }
}

function displayHudCenter()
{
    noStroke();
    fill(255, 0, 0);
    circle(CONFIG['posRelHud'][0] * width, CONFIG['posRelHud'][1] * height, 10);
}