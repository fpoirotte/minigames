var SPC_SAUCER_SCORING=[100,50,50,100,150,100,100,50,300,100,100,100,50,150,100,50];
var SPC_SCORES_MSG='Loading highscores...<br/>Please wait.';
var SPC_PAUSE_MSG='Press ESC to quit...<br/>...or any other key to continue.';
var SPC_LEVEL_CLEARED_MSG='Level cleared!<br/>Press ESC to quit or another key to continue.';
var SPC_GAME_OVER_MSG='Game over! Press ESC key to quit.<br/>Press any other key to start a new game.';
var SPC_BG='#000';
var SPC_WIDTH = 768;
var SPC_HEIGHT = 600;
var SPC_DELAY_INIT = 500;
var SPC_SPEED_UP = 40;
var SPC_SAUCER_PERIOD = 30;
var SPC_SAUCER_TIMER_PERIOD = 60;
var SPC_SHOT_TIMER_PERIOD = 30;
var SPC_COLS_WIDTH = 48;
var SPC_ALIEN_SHOT_PROBABILITY = 30;
var SPC_BUNKER_TOP = SPC_HEIGHT - 128;
var SPC_INIT_LIVES = 3;

var SPC_BITMAPS = {
    'octopus': [
        [
            [0,0,0,0,1,1,1,1,0,0,0,0],
            [0,1,1,1,1,1,1,1,1,1,1,0],
            [1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,0,0,1,1,0,0,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1],
            [0,0,0,1,1,0,0,1,1,0,0,0],
            [0,0,1,1,0,1,1,0,1,1,0,0],
            [1,1,0,0,0,0,0,0,0,0,1,1]
        ],
        [
            [0,0,0,0,1,1,1,1,0,0,0,0],
            [0,1,1,1,1,1,1,1,1,1,1,0],
            [1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,0,0,1,1,0,0,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1],
            [0,0,1,1,1,0,0,1,1,1,0,0],
            [0,1,1,0,0,1,1,0,0,1,1,0],
            [0,0,1,1,0,0,0,0,1,1,0,0]
        ]
    ],
    'crab': [
        [
            [0,0,1,0,0,0,0,0,1,0,0],
            [0,0,0,1,0,0,0,1,0,0,0],
            [0,0,1,1,1,1,1,1,1,0,0],
            [0,1,1,0,1,1,1,0,1,1,0],
            [1,1,1,1,1,1,1,1,1,1,1],
            [1,0,1,1,1,1,1,1,1,0,1],
            [1,0,1,0,0,0,0,0,1,0,1],
            [0,0,0,1,1,0,1,1,0,0,0],
        ],
        [
            [0,0,1,0,0,0,0,0,1,0,0],
            [1,0,0,1,0,0,0,1,0,0,1],
            [1,0,1,1,1,1,1,1,1,0,1],
            [1,1,1,0,1,1,1,0,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1],
            [0,1,1,1,1,1,1,1,1,1,0],
            [0,0,1,0,0,0,0,0,1,0,0],
            [0,1,0,0,0,0,0,0,0,1,0],
        ]
    ],
    'squid': [
        [
            [0,0,0,1,1,0,0,0],
            [0,0,1,1,1,1,0,0],
            [0,1,1,1,1,1,1,0],
            [1,1,0,1,1,0,1,1],
            [1,1,1,1,1,1,1,1],
            [0,0,1,0,0,1,0,0],
            [0,1,0,1,1,0,1,0],
            [1,0,1,0,0,1,0,1],
        ],
        [
            [0,0,0,1,1,0,0,0],
            [0,0,1,1,1,1,0,0],
            [0,1,1,1,1,1,1,0],
            [1,1,0,1,1,0,1,1],
            [1,1,1,1,1,1,1,1],
            [0,1,0,1,1,0,1,0],
            [1,0,0,0,0,0,0,1],
            [0,1,0,0,0,0,1,0],
        ],
    ],
    'saucer': [
        [0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0],
        [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
        [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
        [0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [0,0,1,1,1,0,0,1,1,0,0,1,1,1,0,0],
        [0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0],
    ],
    'laser': [
        [0,0,0,0,0,0,1,0,0,0,0,0,0],
        [0,0,0,0,0,1,1,1,0,0,0,0,0],
        [0,0,0,0,0,1,1,1,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    'bunker': {
        'tl': [
            [[0,0,0,1,1,1], [0,0,1,1,1,1], [0,1,1,1,1,1], [1,1,1,1,1,1], [1,1,1,1,1,1]],
            [[0,0,0,1,1,1], [0,0,1,0,1,1], [0,1,1,1,1,0], [1,1,0,1,1,1], [1,0,1,1,1,1]],
            [[0,0,0,1,1,0], [0,0,1,0,1,1], [0,0,1,1,1,0], [1,1,0,0,1,0], [1,0,1,0,0,1]],
            [[0,0,0,1,0,0], [0,0,1,0,1,0], [0,0,0,1,1,0], [0,1,0,0,1,0], [0,0,1,0,0,1]],
        ],
        'tr': [
            [[1,1,1,0,0,0], [1,1,1,1,0,0], [1,1,1,1,1,0], [1,1,1,1,1,1], [1,1,1,1,1,1]],
            [[1,0,1,0,0,0], [1,1,0,1,0,0], [1,1,1,0,1,0], [1,0,1,0,1,1], [0,1,1,0,1,1]],
            [[1,0,1,0,0,0], [1,0,0,1,0,0], [0,1,1,0,1,0], [1,0,1,0,0,1], [0,0,1,0,1,0]],
            [[1,0,0,0,0,0], [0,0,0,1,0,0], [0,1,1,0,0,0], [0,0,1,0,0,1], [0,0,1,0,0,0]],
        ],
        'bl': [
            [[1,1,1,1,1,1], [1,1,1,1,0,0], [1,1,1,0,0,0], [1,1,0,0,0,0], [1,0,0,0,0,0]],
            [[1,0,1,1,1,1], [1,1,0,1,0,0], [0,1,1,0,0,0], [1,1,0,0,0,0], [1,0,0,0,0,0]],
            [[1,0,1,1,1,0], [0,1,0,1,0,0], [0,0,1,0,0,0], [1,0,0,0,0,0], [1,0,0,0,0,0]],
            [[0,0,1,0,1,0], [0,1,0,0,0,0], [0,0,1,0,0,0], [1,0,0,0,0,0], [1,0,0,0,0,0]],
        ],
        'br': [
            [[1,1,1,1,1,1], [0,0,1,1,1,1], [0,0,0,1,1,1], [0,0,0,0,1,1], [0,0,0,0,0,1]],
            [[1,1,0,1,1,1], [0,0,1,1,1,0], [0,0,0,1,0,1], [0,0,0,0,1,1], [0,0,0,0,0,1]],
            [[1,0,0,1,1,1], [0,0,1,0,1,0], [0,0,0,1,0,1], [0,0,0,0,1,0], [0,0,0,0,0,1]],
            [[1,0,0,1,0,0], [0,0,0,0,1,0], [0,0,0,0,0,1], [0,0,0,0,1,0], [0,0,0,0,0,1]],
        ],
        'oth': [
            [[1,1,1,1,1,1], [1,1,1,1,1,1], [1,1,1,1,1,1], [1,1,1,1,1,1], [1,1,1,1,1,1]],
            [[1,0,1,1,0,1], [1,1,0,1,1,1], [1,0,1,1,1,0], [1,1,0,1,0,1], [0,1,1,0,1,1]],
            [[1,0,1,0,0,1], [1,1,0,1,1,0], [1,0,1,1,0,0], [1,1,0,1,0,1], [0,1,1,0,1,0]],
            [[0,0,1,0,0,1], [0,1,0,0,1,0], [1,0,0,1,0,0], [0,1,0,0,0,1], [0,0,1,0,1,0]],
        ]
    },
    'explosion': [
        [0,0,0,0,0,1,0,0,0,0,0,0],
        [0,1,0,0,0,1,0,0,1,0,0,0],
        [0,0,1,0,0,0,0,0,1,0,0,1],
        [0,0,0,1,0,0,0,1,0,0,1,0],
        [1,1,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,1,1],
        [0,1,0,0,1,0,0,0,1,0,0,0],
        [1,0,0,1,0,0,0,0,0,1,0,0],
        [0,0,0,1,0,0,1,0,0,0,1,0],
        [0,0,0,0,0,0,1,0,0,0,0,0],
    ],
    'bomb': [
        [[0,1,0], [0,0,1], [0,1,0], [1,0,0], [0,1,0]],
        [[0,1,0], [1,0,0], [0,1,0], [0,0,1], [0,1,0]]
    ],
    'shot': [[1],[1],[1],[1]]
}

var SPC_COLORS = {
    'octopus': "#FF0",
    'crab': "#F0F",
    'squid': "#0FF",
    'saucer': "#F00",
    'laser': "#0F0",
    'bunker': "#0F0",
    'explosion': "#FFF",
    'bomb': "#FFF",
    'shot': "#FFF"
};

var SPC_BUNKER = [
    ["tl", "oth", "oth", "tr"],
    ["oth", "bl", "br", "oth"],
    ["oth", null, null, "oth"],
];

var SPC_ALIENS = ["octopus", "crab", "squid"];
var SPC_SCORING = [10, 20, 30];
var SPC_ALIENS_GRID = [
    ["squid", "squid", "squid", "squid", "squid", "squid", "squid", "squid", "squid", "squid", "squid"],
    ["crab", "crab", "crab", "crab", "crab", "crab", "crab", "crab", "crab", "crab", "crab"],
    ["crab", "crab", "crab", "crab", "crab", "crab", "crab", "crab", "crab", "crab", "crab"],
    ["octopus", "octopus", "octopus", "octopus", "octopus", "octopus", "octopus", "octopus", "octopus", "octopus", "octopus"],
    ["octopus", "octopus", "octopus", "octopus", "octopus", "octopus", "octopus", "octopus", "octopus", "octopus", "octopus"]
];


var spc_pics = {
    'octopus': [null, null],
    'crab': [null, null],
    'squid': [null, null],
    'saucer': null,
    'laser': null,
    'bunker': {
        "tl": [null,null,null,null],
        "tr": [null,null,null,null],
        "bl": [null,null,null,null],
        "br": [null,null,null,null],
        "oth": [null,null,null,null]
    },
    'explosion': null,
    'bomb': [null, null],
    'shot': null
};

var spc_delay;
var spc_score;
var spc_timer = null;
var spc_shot_timer = null;
var spc_saucer_timer = null;
var spc_nb_shots;
var spc_state = '';
var spc_laser;
var spc_grid;
var spc_frame;
var spc_lives = [];
var spc_saucer;
var spc_last_shot;
var spc_last_saucer;

function spc_picture(bitmap, color) {
    var x, y, img;
    var canvas = newEl("canvas");
    var ctx = canvas.getContext('2d');
    var w = bitmap[0].length;
    var h = bitmap.length;

    canvas.setAttribute("width", w * 3);
    canvas.setAttribute("height", h * 3);
    ctx.clearRect(0, 0, w * 3, h * 3);
    ctx.fillStyle = color;
    for (y=0; y < h; y++) {
        for (x=0; x < w; x++) {
            if (bitmap[y][x]) {
                ctx.fillRect(x*3, y*3, 3, 3);
            }
        }
    }

    img = newEl('img');
    img.src = canvas.toDataURL();
    img.style.position = 'absolute';
    img.width = w * 3;
    img.height = h * 3;
    img.style.width = (w*3) + 'px';
    img.style.height = (h*3) + 'px';
    return img;
}

function spc_reset(e) {
    spc_dtor();
    spc_state = 'end';
    spc_ctor();
    return stopEv(e);
}

function spc_keys(e) {
    var i,j,k,b,x,y;

    k = e.key;
    switch (spc_state) {
        case 'scores':
            return stopEv(e);

        case 'pause':
            if (k == 'Escape') break;
            spc_msg('', '');
            return stopEv(e);

        case 'end':
            if (k == 'Escape') break;
            spc_msg('', '');
            return spc_reset(e);
    }

    switch (k) {
        case 'Pause':
        case 'P':
        case 'p':
            spc_msg('pause', SPC_PAUSE_MSG);
            break;

        case "Escape":
            spc_dtor(e);
            lnch_reset();
            break;

        case "ArrowLeft":
            var x = spc_laser.offsetLeft - 12;
            if (x < 0) x = 0;
            spc_laser.style.left = x + 'px';
            return

        case "ArrowRight":
            var x = spc_laser.offsetLeft + 12;
            var max_x = SPC_WIDTH - spc_laser.width;
            if (x > max_x) x = max_x;
            spc_laser.style.left = x + 'px';
            return

        case "ArrowUp":
        case " ":
            return spc_shoot();

//        case "H":
//        case "h":
//            spc_msg('scores', SPC_SCORES_MSG);
//            lnch_high("spc", null, spc_hishown);
//            break;

        case "New":
        case "N":
        case "n":
            spc_reset(e);
            return spc_msg('pause', SPC_PAUSE_MSG);

        default:
            return;
    }
}

function spc_ctor() {
    var d,t,c;
    var i,j,k,l,r;
    spc_timer = null;
    spc_delay = SPC_DELAY_INIT;
    spc_score = 0;
    spc_nb_shots = 0;
    spc_frame = 0;
    spc_last_shot = 0;
    spc_last_saucer = 0;
    spc_lives = [];

    if (!spc_pics["laser"]) {
        SPC_ALIENS.forEach(alien => {
            spc_pics[alien][0] = spc_picture(SPC_BITMAPS[alien][0], SPC_COLORS[alien]);
            spc_pics[alien][1] = spc_picture(SPC_BITMAPS[alien][1], SPC_COLORS[alien]);
        });

        var objects = ["saucer", "laser", "explosion", "shot"];
        objects.forEach(obj => {
            spc_pics[obj] = spc_picture(SPC_BITMAPS[obj], SPC_COLORS[obj]);
        });

        spc_pics["bomb"][0] = spc_picture(SPC_BITMAPS["bomb"][0], SPC_COLORS["bomb"]);
        spc_pics["bomb"][1] = spc_picture(SPC_BITMAPS["bomb"][1], SPC_COLORS["bomb"]);

        var pieces = ["tl", "tr", "bl", "br", "oth"];
        pieces.forEach(piece => {
            for (i = 0; i < SPC_BITMAPS["bunker"][piece].length; i++) {
                spc_pics["bunker"][piece][i] = spc_picture(SPC_BITMAPS["bunker"][piece][i], SPC_COLORS["bunker"]);
            }
        });
    }

    d = lnch_div;
    d.id = 'spc';
    t = newEl('div');
    d.appendChild(t);
    t.style.position = 'absolute';
    t.style.margin = 'auto';
    t.style.width = SPC_WIDTH + 'px';
    t.style.height = SPC_HEIGHT + 'px';
    t.style.backgroundColor = SPC_BG;
    t.style.clipPath = 'view-box';
    t.id = 'spc_grid';
    spc_grid=t;

    t = newEl('table');
    d.appendChild(t);
    t.style.position = 'absolute';
    t.style.display = 'inline';
    t.style.top = '32px';
    t.style.left = (SPC_WIDTH + 64) + 'px';

    r = newEl('tbody');
    t.appendChild(r);
    t = r;

    r = newEl('tr');
    t.appendChild(r);

    c = newEl('th');
    r.appendChild(c);
    c.innerHTML = 'Key(s)';

    c = newEl('th');
    r.appendChild(c);
    c.innerHTML = 'Action';

    k = [
        'Left/Right arrow keys',
        'Space/Up arrow key',
        'P/Pause',
        'N',
        //'H',
        'Escape'
    ];
    l = [
        'Move toward that direction',
        'Shoot',
        'Pause',
        'New game',
        //'Highscores',
        'Back to work!'
    ];

    for(i=0; i<k.length; i++) {
        r = newEl('tr');
        t.appendChild(r);
        c = newEl('td');
        r.appendChild(c);
        c.innerHTML = k[i];
        c = newEl('td');
        r.appendChild(c);
        c.innerHTML = l[i];
    }

    if (spc_state == '')
        spc_msg('pause', SPC_PAUSE_MSG);
    else spc_state = '';

    spc_draw(SPC_INIT_LIVES);
    addHnd(document, 'keydown', spc_keys);
    spc_clock();
    spc_shot_timer = window.setInterval('spc_shot_clock();', SPC_SHOT_TIMER_PERIOD);
    spc_saucer_timer = window.setInterval('spc_saucer_clock();', SPC_SAUCER_TIMER_PERIOD);
}

spc_ctor();

function spc_dtor() {
    delHnd(document, 'keydown', spc_keys);
    if (spc_timer != null) {
        window.clearTimeout(spc_timer);
        spc_timer = null;
    }
    if (spc_shot_timer != null) {
        window.clearInterval(spc_shot_timer);
        spc_shot_timer = null;
    }
    if (spc_saucer_timer != null) {
        window.clearInterval(spc_saucer_timer);
        spc_saucer_timer = null;
    }
    spc_state='';
    while (lnch_div.firstElementChild) {
        lnch_div.firstElementChild.remove();
    }
}

function spc_clock() {
    if (spc_state !== '') return;

    var aliens_grid = document.getElementById('spc_aliens');
    var aliens = aliens_grid.getElementsByTagName('img');

    if (!aliens_grid) return;

    for (alien of aliens_grid.getElementsByClassName("spc_explosion")) {
        alien.remove();
    }

    if (!aliens.length) {
        while (spc_grid.firstElementChild)
            spc_grid.firstElementChild.remove();
        spc_msg('pause', SPC_LEVEL_CLEARED_MSG);
        spc_draw(0);
        spc_delay -= SPC_SPEED_UP;
        if (spc_delay < 10) spc_delay = 10;
        return;
    }

    while (!aliens_grid.firstElementChild.lastElementChild.childElementCount)
        aliens_grid.firstElementChild.lastElementChild.remove();

    spc_frame = (spc_frame + 1) % 2;
    for (const alien of aliens) {
        alien.src = spc_pics[alien.spc_alien][spc_frame].src;
    }

    var left = aliens_grid.offsetLeft + aliens_grid.spc_dir * 8;
    if (left < 0 && aliens_grid.firstElementChild.firstElementChild !== null &&
        !aliens_grid.firstElementChild.firstElementChild.childElementCount) {
        aliens_grid.firstElementChild.firstElementChild.remove();
        left += SPC_COLS_WIDTH;
    }

    if (left < 0 || (left + aliens_grid.scrollWidth) > SPC_WIDTH) {
        aliens_grid.spc_dir *= -1;
        left += (aliens_grid.spc_dir * 8);
        aliens_grid.style.top = (aliens_grid.offsetTop + 16) + 'px';
    }
    aliens_grid.style.left = left + 'px';

    if (aliens_grid.offsetTop + aliens_grid.scrollHeight >= SPC_BUNKER_TOP)
        return spc_hidone();

    if (Math.random()*100 < SPC_ALIEN_SHOT_PROBABILITY && document.getElementsByClassName("spc_alien_shot").length < 3) {
        spc_alien_shoot();
    }

    spc_timer = window.setTimeout('spc_clock(1);', spc_delay + aliens.length * 2);
}

function spc_msg(state,msg) {
    var p = document.getElementById('spc_msg');
    if (p != null)
        p.parentNode.removeChild(p);

    spc_state = state;
    if (state != '') {
        var d = document.getElementById('spc');
        if (d == null) return;
        var n = newEl('span');
        d.appendChild(n);
        n.innerHTML = msg;
        n.id = 'spc_msg';
        n.style.padding = '8px 12px';
        n.style.color = '#C0C0C0';
        n.style.backgroundColor = 'black';
        n.style.position = 'absolute';
        n.style.border = '4px double red';
        n.style.top = '160px';
        n.style.left = '96px';
    } else {
        spc_clock();
    }
}

function spc_hidone() {
    spc_msg('end', SPC_GAME_OVER_MSG);
}

function spc_hishown() {
    spc_msg('pause', SPC_PAUSE_MSG);
}

function spc_draw(lives) {
    var i,x,y,t,e,c,r;

    t = newEl('span');
    t.style.color = 'white';
    t.style.fontWeight = 'bold';
    t.style.fontFamily = 'monospace,noto,consolas';
    t.style.fontSize = '16px';
    t.innerHTML = 'SCORE';
    t.style.position = 'absolute';
    t.style.left = '32px';
    t.style.top = '12px';
    spc_grid.appendChild(t);

    t = t.cloneNode();
    t.innerHTML = 'LIVES';
    t.style.left = '512px';
    spc_grid.appendChild(t);

    t = t.cloneNode();
    t.id = "spc_score";
    t.style.color = '#0f0';
    t.innerHTML = spc_score;
    t.style.left = '96px';
    spc_grid.appendChild(t);

    spc_laser = spc_pics["laser"].cloneNode();
    spc_laser.spc_immune = 0;
    spc_laser.style.top = (SPC_HEIGHT - spc_laser.height - 16) + 'px';
    spc_laser.style.left = Math.floor((SPC_WIDTH - spc_laser.width) / 2) + 'px';
    spc_grid.appendChild(spc_laser);

    while (lives--) {
        spc_lives.push(spc_laser.cloneNode());
    }

    for (i=0; i < spc_lives.length; i++) {
        var life = spc_lives[i];
        life.style.top = '10px';
        life.style.left = (580 + i * 56) + 'px';
        spc_grid.appendChild(life);
    }

    var bs = spc_pics["bunker"]["tl"][0].width * 4;
    var bm = (SPC_WIDTH - bs * 4) / 8;
    for (i=0; i<4; i++) {
        t = newEl('div');
        t.classList.add("spc_bunker");
        t.style.position = 'absolute';
        t.style.top = SPC_BUNKER_TOP + 'px';
        t.style.left = (i * (bs + 2 * bm) + bm) + 'px';

        for (y=0; y<SPC_BUNKER.length; y++) {
            for (x=0; x<SPC_BUNKER[y].length; x++) {
                var part = SPC_BUNKER[y][x];
                if (part !== null) {
                    e = spc_pics["bunker"][part][0].cloneNode();
                    e.classList.add("spc_bunker_part");
                    e.spc_damage = 0;
                    e.spc_part = part;
                    e.style.left = (x * e.width) + "px";
                    e.style.top = (y * e.height) + "px";
                    t.appendChild(e);
                }
            }
        }
        spc_grid.appendChild(t);
    }

    t = newEl('div');
    t.id = 'spc_aliens';
    t.style.position = 'absolute';
    t.spc_dir = +1;
    t.style.left = '0px';
    t.style.top = '96px';

    r = newEl('div');
    r.style.position = 'relative';
    t.appendChild(r)

    for (x=0; x<SPC_ALIENS_GRID[0].length; x++) {
        c = newEl('div');
        c.style.float = 'left';
        c.style.width = SPC_COLS_WIDTH + 'px';
        c.style.textAlign = "center";
        c.style.padding = "1px";
        r.appendChild(c);

        for (y=0; y<SPC_ALIENS_GRID.length; y++) {
            var alien = SPC_ALIENS_GRID[y][x];
            e = spc_pics[alien][spc_frame].cloneNode();
            e.classList.add("spc_alien");
            e.spc_alien = alien;
            e.spc_score = SPC_SCORING[SPC_ALIENS.indexOf(alien)];
            e.style.top = (y * SPC_COLS_WIDTH) + "px";
            c.appendChild(e);
        }
    }
    spc_grid.appendChild(t);

    e = newEl('div');
    e.style.display = 'table';
    e.style.clear = 'both';
    spc_grid.appendChild(e);

    spc_saucer = spc_pics["saucer"].cloneNode();
    spc_saucer.style.top = '48px';
}

function spc_saucer_clock() {
    if (spc_state != '') return;
    if (spc_saucer.parentNode !== null) {
        if (spc_saucer.classList.contains("spc_explosion")) {
            spc_saucer.src = spc_pics["saucer"].src;
            spc_saucer.remove();
            spc_last_saucer = 0;
            spc_saucer.classList.remove("spc_explosion");
            return;
        }

        var left = spc_saucer.offsetLeft + spc_saucer.spc_dir * 6;
        spc_saucer.style.left = left + 'px';
        if (left < -spc_saucer.width || left > SPC_WIDTH) {
            spc_saucer.remove();
            spc_last_saucer = 0;
        }
        return;
    }

    if (document.getElementsByClassName('spc_alien').length < 8) return;
    if (document.getElementsByClassName("spc_alien_shot").length == 3) return;

    spc_last_saucer += 1;
    if (spc_last_saucer < (SPC_SAUCER_PERIOD * (1000 / SPC_SAUCER_TIMER_PERIOD))) return;
    spc_last_saucer = 0;

    spc_saucer.spc_dir = ((spc_nb_shots % 2) << 1) - 1;
    spc_saucer.spc_score = SPC_SAUCER_SCORING[spc_nb_shots % SPC_SAUCER_SCORING.length];
    spc_saucer.style.left = ((spc_saucer.spc_dir > 0) ? -spc_saucer.width : SPC_WIDTH) + 'px';
    spc_saucer.src = spc_pics["saucer"].src;
    spc_grid.insertBefore(spc_saucer, spc_grid.firstChild);
}

function spc_check_collision(a, b) {
    var a = a.getBoundingClientRect();
    var b = b.getBoundingClientRect();
    if (a.left > b.left + b.width || b.left > a.left + a.width) return false;
    if (a.top > b.top + b.height || b.top > a.top + a.height) return false;
    return true;
}

function spc_shot_clock() {
    if (spc_state != '') return;

    var i;
    var remove = [];
    var aliens = document.getElementsByClassName('spc_alien');
    var alien_shots = document.getElementsByClassName("spc_alien_shot");
    var bunker_parts = document.getElementsByClassName("spc_bunker_part");

    for (const shot of alien_shots) {
        if (shot.classList.contains("spc_explosion"))
            remove.push(shot);
    }

    for (i = 0; i < remove.length; i++) {
        remove[i].remove();
    }
    remove.length = 0;

    for (const shot of document.getElementsByClassName("spc_shot")) {
        var top = shot.offsetTop - 4;
        if ((top + shot.height) < 48) {
            remove.push(shot);
            continue;
        }
        shot.style.top = top + 'px';

        if (spc_saucer.parentNode !== null && !spc_saucer.classList.contains("spc_explosion") && spc_check_collision(shot, spc_saucer)) {
            spc_score += spc_saucer.spc_score;
            spc_saucer.src = spc_pics["explosion"].src;
            spc_saucer.classList.add("spc_explosion");
            remove.push(shot);
            continue;
        }

        for (const ashot of alien_shots) {
            if (spc_check_collision(shot, ashot)) {
                ashot.src = spc_pics["explosion"].src;
                ashot.classList.add('spc_explosion');
                remove.push(shot);
                continue;
            }
        }

        for (const alien of aliens) {
            if (!alien.classList.contains("spc_explosion") && spc_check_collision(shot, alien)) {

                spc_score += alien.spc_score;
                alien.src = spc_pics["explosion"].src;
                alien.classList.add("spc_explosion");
                remove.push(shot);
                continue;
            }
        }

        for (const part of bunker_parts) {
            if (spc_check_collision(shot, part)) {
                if (++part.spc_damage >= spc_pics["bunker"][part.spc_part].length) {
                    remove.push(part);
                } else {
                    part.src = spc_pics["bunker"][part.spc_part][part.spc_damage].src;
                }
                remove.push(shot);
                continue;
            }
        }
    }

    for (const shot of alien_shots) {
        shot.spc_frame = (shot.spc_frame + 1) % 2;
        shot.src = spc_pics["bomb"][shot.spc_frame].src;
        var top = shot.offsetTop + 4;
        if (top > SPC_HEIGHT) {
            remove.push(shot);
            continue;
        }
        shot.style.top = top + 'px';

        for (const part of bunker_parts) {
            if (spc_check_collision(shot, part)) {
                if (++part.spc_damage >= spc_pics["bunker"][part.spc_part].length) {
                    remove.push(part);
                } else {
                    part.src = spc_pics["bunker"][part.spc_part][part.spc_damage].src;
                }
                remove.push(shot);
                continue;
            }
        }

        if (!spc_laser.spc_immune && spc_check_collision(shot, spc_laser))
            spc_lose_life();
    }

    for (i = 0; i < remove.length; i++) {
        remove[i].remove();
    }

    document.getElementById("spc_score").innerHTML = spc_score;
}

function spc_shoot() {
    var now = Date.now();
    if (now < spc_last_shot + 500) return;
    spc_last_shot = now;

    if (document.getElementsByClassName("spc_shot").length >= 3) return;

    var shot = spc_pics["shot"].cloneNode();
    spc_nb_shots += 1;
    shot.classList.add("spc_shot");
    shot.style.left = Math.floor(spc_laser.offsetLeft + spc_laser.width / 2 - 1) + "px";
    shot.style.top = (spc_laser.offsetTop - shot.height) + "px";
    spc_grid.appendChild(shot);
}

function spc_alien_shoot() {
    var aliens = document.getElementsByClassName("spc_alien");
    var alien = aliens[Math.floor(Math.random() * aliens.length)].getBoundingClientRect();
    var shot = spc_pics["bomb"][0].cloneNode();
    shot.spc_frame = 0;
    shot.classList.add("spc_alien_shot");
    shot.style.left = Math.floor(alien.left + alien.width / 2) + "px";
    shot.style.top = (alien.top - alien.height) + "px";
    spc_grid.appendChild(shot);
}

function spc_blink(n, cb) {
    spc_laser.style.opacity = Math.abs(Math.cos(--n));
    if (n) window.setTimeout(`spc_blink(${n}, "${cb}");`, 100);
    else {
        spc_laser.spc_immune = 0;
        if (cb) eval(cb);
    }
}

function spc_lose_life() {
    var cb = null;
    if (!spc_lives.length) return false;
    spc_lives.pop().remove();
    if (!spc_lives.length) {
        spc_laser.src = spc_pics["explosion"].src;
        spc_state = 'end';
        cb = "spc_hidone()";
    }

    spc_laser.spc_immune = 1;
    spc_blink(32, cb);
    return true;
}

function spc_next_level() {
    
}
