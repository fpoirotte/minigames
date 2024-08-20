var SNEK_SCORING=[10,22,37];
var SNEK_SCORES_MSG='Loading highscores...<br/>Please wait.';
var SNEK_PAUSE_MSG='Press any key to continue...<br/>...or press ESC to quit.';
var SNEK_GAME_OVER_MSG='Game over! Press ESC key to quit.<br/>Press any other key to start a new game.';
var SNEK_BG='#000';
var SNEK_COLS=40;
var SNEK_ROWS=30;
var SNEK_DELAY_INIT=500;
var SNEK_SPEED_UP=20;
var SNEK_CELL_IT=-4;
var SNEK_CELL_NL=-3;
var SNEK_CELL_TL=-2;
var SNEK_CELL_SD=-1;
var SNEK_CELL_UP=0;
var SNEK_CELL_RI=1;
var SNEK_CELL_DN=2;
var SNEK_CELL_LE=3;

var SNEK_PICS = {
    'head': [
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAGFJREFUOMtjYGBg+I8Nf5OQQKFxYSYGKoD/hFyBDzNCGbiNZmBgYGDEbTsTQc0MeK3AYcB/IsWwGvCfQGjhM0A0WxTBQfY3IxGxIJot+p+BWEjNdEDdhESUNxgGmxcG3gAAfW5e8vGiyzkAAAAASUVORK5CYII=',
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAF9JREFUOMvVkzEOwDAIA4+qU1/A/1+XF2R111ZJRRRPNSMI2cYEIAwcmLAXnOXEU2CM7fj0QI4EOR4UlAcJPVMAV2vbBxWgnik26s1gJqFgNR+RG6RYX1CT3A7Sb57pBqzuNBjeqopyAAAAAElFTkSuQmCC',
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAGBJREFUOMtjYGBg+A/Dotmi/xkIQQZUzMRAIRgGBjCQFIBYAnIQeQHDGwwMuNlImBHKQDUOH2Ak5AVG4jXjDgNGIsXwBiIjca7CGwvfJCXwewk9FpDxNwkJFBoXpjgdAAAWHl74ChsR6QAAAABJRU5ErkJggg==',
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAGBJREFUOMvVkzEOwDAIA+2oj+D/j8zqLmkVRVUK9VTYGA7bJAQgGNVglg04HqezKe4BhJIZ0LWgioV1sybIUNIj7mG5e4QGTvkMFlWXgncA91dppfDoXIE5gR8e0u8/0wnn1DBsVMGOqgAAAABJRU5ErkJggg=='
     ],
    'turn': [
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAFVJREFUOMtjYGBg+A/Dotmi/xkIQQZUzMRAISDdgP+UGoBmCAvZbv+PyiQtIFEDFTNkSTGE4ljA6gKSXIHLAGINYcSMWeLin/R0wIhb+D99k/KgMwAAquaGfbTWSjAAAAAASUVORK5CYII=',
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAFRJREFUOMtjYGBg+A/Dotmi/xkIQQZUzMRABUC87VhcwECSZiwGMEIFiQeMqFwmSjSTZgAjdmGKY4GJEtuJM4ARvzQLuRrxu4CRtIj5T/tAHNQGAABH8U+T9v+ULQAAAABJRU5ErkJggg==',
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAFZJREFUOMtjZGBg+M9AAWBioBAMIQNEs0UhoYWOGbALo2DRbNH/DLgg2RoJGUCUZlwGEK35P8N/imOBgRLbMbxAsub/DP9ZyHY3IyUpkZGSpMxI5bwAAGWRoY4xNTdRAAAAAElFTkSuQmCC',
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAFVJREFUOMvNkTkKwDAMBMcmX9hXxv9v12XANkQgQSKhQs2wRwNMYjrJ+R5wHRNoWQWusOAY6D0DV4ToX9ToCgUHSNcQGkrZMGDdMpFlu+cJQRZAuoUJC4U8O939r0UAAAAASUVORK5CYII='
    ],
    'body': [
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAACVJREFUOMtjYGBg+A/Dotmi/xkIQQZUzMRAIRg1YNSAUQMGiwEAnWoYnBg0LZAAAAAASUVORK5CYII=',
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAACZJREFUOMtjZGBg+M9AAWBioBAMvAEslIXAsAiDUQMYGBhH8wIDAFiGAx4JPOUXAAAAAElFTkSuQmCC'
    ],
    'tail': [
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAGFJREFUOMtjYGBg+A/Dotmi/xkIQQZUzMRAISDdgP/YhSjxBqa/SDEEpxdEc0QpC4PXU17j1sVIqzAYkHTAQrRKRvxJg7A3GLBjJkptJy4hMeDF2CXghuDX/J8Re/YgHgAAL0W6Cmggl+0AAAAASUVORK5CYII=',
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAGdJREFUOMvNk9EJgDAMRF/c4aas47hlh4gfikg11lpEL+Sr4eVyUAOcDg10agMoCSUtfho8mZIcIE85mKgA8Jv77O0MqgqyaXdQgJ6f4BcAjWoI1YtaTSrJiYp9hw8nEI5t//kLnwFmCmJByReoUNcAAAAASUVORK5CYII=',
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAFVJREFUOMvNkjEOACAIAwt/4JX+f66riYIiDpYwQeilQQAQBWk0tGZH57lqa0aM5ezpMSsTBJN7QKGpxLghcJ0DCsUDXbvnCCQg2Lqj+gf8IoNv/6AD7U2pFm5DVrIAAAAASUVORK5CYII=',
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAGdJREFUOMvNk1EOgDAIQx/egVPuOnpKDsE+1B8dG8sSY/sJNE0bBHAWsLGIHwpo0TMVb6fTmjvgWtSJ2NsZHl8MdzLHXWYdRJQ7Ci0KgO021YI8s54VetVox6KDtBMZCIRCknTw2S9U74CSpLvuivMAAAAASUVORK5CYII='
    ],
    'item': [
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAJVJREFUOMu1U+0JgCAQfUW/nCISXCRayMFaIFpEuHAT+5OReWoKPRCOw/eBdwKAqz2rFnc9oAKrFmy/6LjtypGFIxu6A3DdVbDYdoVJmqAnx/AOK8AROTIADC2uT/Qp8kHq08P2KbKvc+5RghZkBUru/yWYpMFBCmTLAsEe1I4wSrDMJhpfKUVyld9pUkmyf8EL+XQcTjH8VCvdfNrZAAAAAElFTkSuQmCC',
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAJdJREFUOMtjYGBg+I8Nl9iy/cclh4yZGJCAaLYog2i2KJxfYsuGUw4GmJAVYGMTkoMb8HrqawZsAJutyIAR6hcMDW6GqAbuOi+K1SIWdBPRNaKLL8UVBgwMDAzRcxgIAnQ1TAxEAhNufaziTKTYjs0QJkpsJ8kLBA1YmoJb0ZmvF1FovOmAUFigW8RESAEhOQwXkB0G5AIAs1cz+Dac90oAAAAASUVORK5CYII=',
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAIpJREFUOMulUtsNgDAIvDOuUJd0Hv86oR0Cf2xCEfqIJJcABcpdIADBD9t0kM7U+Da2NQBAvYF97Fm5CgBgt8k65H4LtB3OB7QazAjCSAO3OX9TYnJSIRVZ+QFUnzPAQ3abpdFg9iBCDTjBn87AZqURf/QojKhwdMorVEIKEZWojj3xpbN6eMqr9gAZoX52vWa9zwAAAABJRU5ErkJggg=='
    ],
    'side':
        "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c"+
        "6QAAAnBJREFUOMs908FuHFUQQNFbVa+7x/Ywk9g4yIYIgaJIiAV/w4YV/4xg"+
        "AwsEFmBsx9jjmX79XlWxGCmfcKVz5ccfvs9iQo8k3FlNA6pCKYaKEt4wGzjU"+
        "hkcyFCNQWlsId4pqcqid5+cdq9VE68FYhGEcUVWKKa05S3Mg6Z7c3d9zeXlB"+
        "96T8+tvvdA9aW9is14jCXBvenSRZn53RekdVEUBUeXp6ZqmVujTK+3df07oz"+
        "jgNL63gExQq9N05WJ/z08y989+039Oh0D+Z54fr6Cu+OCJTdYUZFqa1jpoCA"+
        "QCI8v+wwU5beiHCaByJCa41MiHDK7d//UMyobWEYBjJBVUAUVcUj+OPmL8jE"+
        "zBA5Jk7jQJKU6+srymDc3z9ycf4KEcMzaD0YivHl27eYJYJgqgTJ7b8PbD7Z"+
        "MNdK2R9mZBYOdWH3sseskICpMs+dpVY8HBNlnAYyBY/kMM8gSRGg9c7mbIVk"+
        "YgJzreg44h7c3t+x3WxAlLosDENhLEpGZ14aZZomhkwikmKKqLLdTvTuiAUX"+
        "56+ZxgkRxUyJTAYzRAXUKN0D1QSS3cuB1jrbzZpEcO/897Tj9MSJCEoxSAgC"+
        "73lMCG8UNT48PnL92QVoISLxSNanE+evtkQEvTciQE25u3vgzeU5rSfF7Ggb"+
        "UcRGltZRUU5ORsYyoCa4J1aMDGduwbQa2R8aokJ5+PDINI3UZeHx6RlIIsD2"+
        "iiofZWYmkY6Kst/vGceOIJT37746HpaKqhCR1LbgHmzWp/x5c8MXn1+xLJWI"+
        "gHTefLrFykhdOuXp5cBQCuRRsUfSlgURodZKpDDPlcM8oyq07kehvkdE+B9C"+
        "JICdPUcscwAAAABJRU5ErkJggg=="
}

var SNEK_FBACK = {
    'head': '#060',
    'body': '#0F0',
    'item': ['#900', '#C00', '#F00'],
    'side': 'inherit'
};

var SNEK_MAP = [
    {1: 3, 3: 2},
    {0: 0, 2: 2},
    {1: 1, 3: 0},
    {0: 1, 2: 3}
];

var snek_delay;
var snek_score;
var snek_timer;
var snek_state = '';
var snek_grid;
var snek_x;
var snek_y;
var snek_dx;
var snek_dy;
var snek_item_x = -1;
var snek_item_y = -1;

function snek_reset(e) {
    snek_dtor();
    snek_state = 'end';
    snek_ctor();
    return stopEv(e);
}

function snek_move(dx,dy) {
    if (dx == -snek_dx) return;
    if (dy == -snek_dy) return;
    snek_dx = dx;
    snek_dy = dy;
    if (snek_timer != null) {
        window.clearTimeout(snek_timer);
        snek_clock();
    }
}

function snek_keys(e) {
    var i,j,k,b,x,y;

    k = e.key;
    switch (snek_state) {
        case 'scores':
            return stopEv(e);

        case 'pause':
            if (k == 'Escape') break;
            snek_msg('', '');
            return stopEv(e);

        case 'end':
            if (k == 'Escape') break;
            snek_msg('', '');
            return snek_reset(e);
    }

    switch (k) {
        case 'Pause':
        case 'P':
        case 'p':
            snek_msg('pause', SNEK_PAUSE_MSG);
            break;

        case "Escape":
            snek_dtor(e);
            lnch_reset();
            break;

        case "ArrowLeft":
            return snek_move(-1,0);

        case "ArrowUp":
            return snek_move(0,1);

        case "ArrowRight":
            return snek_move(1,0);

        case "ArrowDown":
            return snek_move(0,-1);

//        case "H":
//        case "h":
//            snek_msg('scores', SNEK_SCORES_MSG);
//            lnch_high("snek", null, snek_hishown);
//            break;

        case "New":
        case "N":
        case "n":
            snek_msg('pause', SNEK_PAUSE_MSG);
            return snek_reset(e);

        default:
            return;
    }
}

function snek_ctor(){var d,t,c;
    var i,j,k,l,r;
    snek_timer = null;
    snek_delay = SNEK_DELAY_INIT;
    snek_score = 0;
    snek_x = Math.ceil((SNEK_COLS-3)/2);
    snek_y = Math.ceil(SNEK_ROWS/2);
    snek_move(1, 0);

    d = lnch_div;
    d.id = 'snek';
    t = newEl('div');
    d.appendChild(t);
    t.style.position = 'absolute';
    t.style.margin = 'auto';
    t.id = 'snek_grid';
    snek_grid=t;

    for (i=0; i<SNEK_ROWS; i++) {
        r = newEl('div');
        t.appendChild(r);
        r.style.margin = r.style.padding = 0;
        for (j=0; j<SNEK_COLS; j++) {
            c = newEl('span');
            r.appendChild(c);
            c.style.position = 'absolute';
            c.style.width = '16px';
            c.style.height = '16px';
            c.style.left = (j*16+32) + 'px';
            c.style.top = (i*16+32) + 'px';
            c.style.border = '0';
            c.style.margin = '0';
            c.style.padding = '0';
            c.snek = (!i || i == SNEK_ROWS-1 || !j || j == SNEK_COLS-1) ? SNEK_CELL_SD : SNEK_CELL_NL;
        }
    }

    t = newEl('table');
    d.appendChild(t);
    t.style.position = 'absolute';
    t.style.display = 'inline';
    t.style.top = '32px';
    t.style.left = (SNEK_COLS*16+64) + 'px';

    r = newEl('tbody');
    t.appendChild(r);
    t = r;

    r = newEl('tr');
    t.appendChild(r);

    c = newEl('th');
    r.appendChild(c);
    c.innerHTML = 'Score';
    c.style.paddingBottom = '20px';

    c = newEl('td');
    r.appendChild(c);
    c.id = 'snek_score';
    c.innerHTML = '0';
    c.style.paddingBottom = '20px';

    r = newEl('tr');
    t.appendChild(r);

    c = newEl('th');
    r.appendChild(c);
    c.innerHTML = 'Key(s)';

    c = newEl('th');
    r.appendChild(c);
    c.innerHTML = 'Action';

    k = [
        'Arrow keys',
        'P/Pause',
        'N',
        //'H',
        'Escape'
    ];
    l = [
        'Move toward that direction',
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

    c = snek_cell(snek_x, snek_y);
    c.snek = SNEK_CELL_LE;
    c = snek_cell(snek_x-1, snek_y);
    c.snek = SNEK_CELL_LE;
    c = snek_cell(snek_x-2, snek_y);
    c.snek = SNEK_CELL_TL;
    snek_add();

    if (snek_state == '')
        snek_msg('pause', SNEK_PAUSE_MSG);
    else snek_state = '';

    snek_draw();
    addHnd(document, 'keydown', snek_keys);
    snek_clock();
}

snek_ctor();

function snek_dtor() {
    delHnd(document, 'keydown', snek_keys);
    if (snek_timer != null) {
        window.clearTimeout(snek_timer);
        snek_timer = null;
    }
    snek_state='';
    while (lnch_div.firstElementChild) {
        lnch_div.firstElementChild.remove();
    }
}

function snek_clock() {
    if (snek_state == 'end' || snek_state == 'scores') return 0;
    if (snek_state != 'pause') {
        var c,it,dx,dy;
        dx = snek_dx;
        dy = snek_dy;
        it = -1;
        snek_x += dx;
        snek_y += dy;

        if (!snek_free(snek_x, snek_y)) {
            //lnch_high("snek", snek_score, snek_hidone);
            //snek_msg('scores', SNEK_SCORES_MSG);
            snek_hidone();
            return;
        }
        c = snek_cell(snek_x, snek_y);
        if (c.snek <= SNEK_CELL_IT)
            it = SNEK_CELL_IT-c.snek;

        switch (dx+dy*2) {
            case -1:
                c.snek = SNEK_CELL_RI;
                break;
            case 1:
                c.snek = SNEK_CELL_LE;
                break;
            case -2:
                c.snek = SNEK_CELL_DN;
                break;
            case 2:
                c.snek = SNEK_CELL_UP;
                break;
            default:
                throw"Ouch!";
        }

        c = snek_draw();
        if (it < 0) {
            c[0].snek = SNEK_CELL_TL;
            c[1].snek = SNEK_CELL_NL;
        } else {
            snek_score += SNEK_SCORING[it];
            c = document.getElementById('snek_score');
            c.innerHTML = snek_score;
            snek_add();
            snek_delay -= SNEK_SPEED_UP;
            if (snek_delay < 10) snek_delay = 10;
        }

        c = null;
        snek_draw();
        snek_timer = window.setTimeout('snek_clock(1);', snek_delay);
    }
}

function snek_msg(state,msg) {
    var p = document.getElementById('snek_msg');
    if (p != null)
        p.parentNode.removeChild(p);

    snek_state = state;
    if (state != '') {
        var d = document.getElementById('snek');
        if (d == null) return;
        var n = newEl('span');
        d.appendChild(n);
        n.innerHTML=msg;
        n.id='snek_msg';
        n.style.padding='8px 12px';
        n.style.color='#C0C0C0';
        n.style.backgroundColor='black';
        n.style.position='absolute';
        n.style.border='4px double red';
        n.style.top='160px';
        n.style.left='96px';
    } else {
        snek_clock();
    }
}

function snek_cell(x,y) {
    try {
        return snek_grid.getElementsByTagName('span')[(SNEK_ROWS-1-y)*SNEK_COLS+x];
    } catch(e) {
        return null;
    }
}

function snek_free(x,y) {
    var p,h,w;
    p = snek_cell(x, y);
    if (p == null) return 0;
    if (p.snek == SNEK_CELL_NL) return 1;
    if (p.snek <= SNEK_CELL_IT) return 1;
    return 0;
}

function snek_hidone() {
    snek_msg('end', SNEK_GAME_OVER_MSG);
}

function snek_hishown() {
    snek_msg('pause', SNEK_PAUSE_MSG);
}

function snek_durl(d) {
    return `url('data:image/png;base64,${d}')`;
}

function snek_draw() {
    var c,p,i,j;
    var cx,cy;

    for(i=0; i<SNEK_ROWS; i++) {
        for(j=0; j<SNEK_COLS; j++) {
            c = snek_cell(j, i);
            if (c.snek == SNEK_CELL_NL) {
                c.style.backgroundColor = SNEK_BG;
                c.style.backgroundImage = 'none';
            } else if (c.snek == SNEK_CELL_SD) {
                c.style.backgroundColor = SNEK_FBACK['side'];
                c.style.backgroundImage = snek_durl(SNEK_PICS['side']);
            } else if (c.snek <= SNEK_CELL_IT) {
                c.style.backgroundColor = SNEK_FBACK['item'][SNEK_CELL_IT-c.snek];
                c.style.backgroundImage = snek_durl(SNEK_PICS['item'][SNEK_CELL_IT-c.snek]);
            }
        }
    }

    cx = snek_x;
    cy = snek_y;
    c = snek_cell(cx, cy);
    c.style.backgroundColor = SNEK_FBACK['head'];
    c.style.backgroundImage = snek_durl(SNEK_PICS['head'][c.snek]);

    while (1) {
        p = c;
        switch (p.snek) {
            case SNEK_CELL_UP:
                cy--;
                break;
            case SNEK_CELL_RI:
                cx++;
                break;
            case SNEK_CELL_DN:
                cy++;
                break;
            case SNEK_CELL_LE:
                cx--;
                break;
        }

        c = snek_cell(cx, cy);
        if (c.snek == SNEK_CELL_TL) break;
        c.style.backgroundColor = SNEK_FBACK['body'];
        if (p.snek-c.snek == 0)
            c.style.backgroundImage=snek_durl(SNEK_PICS['body'][p.snek%2]);
        else
            c.style.backgroundImage=snek_durl(SNEK_PICS['turn'][SNEK_MAP[c.snek][p.snek]]);
    }

    c.style.backgroundColor = SNEK_FBACK['body'];
    c.style.backgroundImage = snek_durl(SNEK_PICS['tail'][p.snek]);
    return[p,c];
}

function snek_add() {
    var x,y,c;
    do {
        x = Math.floor(Math.random()*SNEK_COLS);
        y = Math.floor(Math.random()*SNEK_ROWS);
    } while (!snek_free(x, y));

    c = snek_cell(x,y);
    c.snek = SNEK_CELL_IT - Math.floor(Math.random()*SNEK_PICS['item'].length);
}
