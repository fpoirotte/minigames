var T3S_COLS = 10;
var T3S_ROWS = 20;
var t3s_delay;
var T3S_DELAY_INIT = 1000;
var T3S_SPEED_UP = 25;
var t3s_lines;
var t3s_score;
var t3s_timer;
var t3s_state='';
var T3S_STEP=2;
var t3s_blk_x;
var t3s_blk_y;
var t3s_blk_rot;
var t3s_blk;
var t3s_blk_next;
var t3s_grid;
var T3S_SCORING = [10, 22, 37, 55];
var T3S_SCORES_MSG = 'Loading highscores...<br/>Please wait.';
var T3S_PAUSE_MSG = 'Press any key to continue...<br/>...or press ESC to quit.';
var T3S_BG = '#000';
var T3S_BLKS_COLS = ['#00F','#0F0','#F00','#FF0','#0FF','#F0F','#FFF'];
var T3S_BLKS = [
    [
        [[1,1,1,1]],
        [[1],[1],[1],[1]]
    ], [
        [[0,1,1],[1,1,0]],
        [[1,0],[1,1],[0,1]]
    ], [
        [[1,1,0],[0,1,1]],
        [[0,1],[1,1],[1,0]]
    ],[
        [[0,1,0],[1,1,1]],
        [[1,0],[1,1],[1,0]],
        [[1,1,1],[0,1,0]],
        [[0,1],[1,1],[0,1]]
    ],[
        [[1,1,1],[1,0,0]],
        [[1,1],[0,1],[0,1]],
        [[0,0,1],[1,1,1]],
        [[1,0],[1,0],[1,1]]
    ],[
        [[1,1,1],[0,0,1]],
        [[0,1],[0,1],[1,1]],
        [[1,0,0],[1,1,1]],
        [[1,1],[1,0],[1,0]]
    ],[
        [[1,1],[1,1]]
    ]
];

function t3s_reset(e) {
    t3s_dtor();
    t3s_state = 'end';
    t3s_ctor();
    return stopEv(e);
}

function t3s_keys(e) {
    var i,j,k,b,x,y;

    k = e.key;
    switch (t3s_state) {
        case 'scores':
            return stopEv(e);

        case 'pause':
            if (k == 'Escape') break;
            t3s_msg('', '');
            return stopEv(e);

        case 'end':
            if (k == 'Escape') break;
            t3s_msg('', '');
            return t3s_reset(e);
    }

    y = (t3s_blk_y < 0 ? 0 : t3s_blk_y);
    switch (k) {
        case 'Pause':
        case 'P':
        case 'p':
            t3s_msg('pause', T3S_PAUSE_MSG);
            break;

        case " ":
            window.clearTimeout(t3s_timer);
            while (!t3s_clock(0));
            t3s_timer = window.setTimeout('t3s_clock(1);', t3s_delay);
            break;

        case "Escape":
            t3s_dtor(e);
            lnch_reset();
            break;

        case "ArrowLeft":
            if (t3s_blk_x <= 0)
                break;
            if (!t3s_fpos(t3s_blk_x-1, y, t3s_blk_rot, 1))
                break;
            t3s_drawBlk(0);
            t3s_blk_x--;
            t3s_drawBlk(1);
            break;

        case "ArrowUp":
        case "R":
        case "r":
            b = (t3s_blk_rot + (e.shiftKey ? 3 : 1)) % T3S_BLKS[t3s_blk].length;
            x = t3s_blk_x;
            if (x+T3S_BLKS[t3s_blk][b][0].length >= T3S_COLS)
                x = T3S_COLS-T3S_BLKS[t3s_blk][b][0].length;
            if (!t3s_fpos(x, t3s_blk_y, b, 1))
                break;

            t3s_drawBlk(0);
            t3s_blk_rot = b;
            t3s_blk_x = x;
            t3s_drawBlk(1);
            break;

        case "ArrowRight":
            if ((t3s_blk_x+T3S_BLKS[t3s_blk][t3s_blk_rot][0].length) >= T3S_COLS)
                break;
            if (!t3s_fpos(t3s_blk_x+1, y, t3s_blk_rot, 1))
                break;
            t3s_drawBlk(0);
            t3s_blk_x++;
            t3s_drawBlk(1);
            break;

        case "ArrowDown":
            t3s_state = 'end';
            window.clearTimeout(t3s_timer);
            t3s_state = '';
            t3s_clock(1);
            break;

//        case 'H':
//        case 'h':
//            t3s_msg('scores', T3S_SCORES_MSG);
//            lnch_high("t3s", null, t3s_hishown);
//            break

        case "New":
        case "N":
        case "n":
            t3s_msg('pause', T3S_PAUSE_MSG);
            return t3s_reset(e);

        default:
            return;
    }
}

function t3s_ctor() {
    var d,t,c;
    var i,j,k,l,r;

    t3s_timer = null;
    t3s_delay = T3S_DELAY_INIT;
    t3s_lines = 0;
    t3s_score = 0;
    t3s_blk_next = -1;
    t3s_blk = -1;

    d = lnch_div;
    d.id = 't3s';
    t = newEl('div');
    d.appendChild(t);
    t.style.position = 'absolute';
    t.style.margin = 'auto';
    t.id = 't3s_grid';
    t3s_grid = t;

    for (i=0; i<T3S_ROWS; i++) {
        r = newEl('div');
        t.appendChild(r);
        r.style.margin = r.style.padding = 0;

        for (j=0; j<T3S_COLS; j++) {
            c=newEl('span');
            r.appendChild(c);
            c.style.position = 'absolute';
            c.style.width = '16px';
            c.style.height = '16px';
            c.style.left = (j*16+32) + 'px';
            c.style.top = (i*16+32) + 'px';
            c.style.border = 'solid 1px black';
            c.style.margin = '0px';
            c.style.padding = '0px';
            c.style.backgroundColor = T3S_BG;
            c.t3s = T3S_BG;
        }
    }

    t = newEl('table');
    d.appendChild(t);
    t.style.position = 'absolute';
    t.style.display = 'inline';
    t.style.top = '32px';
    t.style.left = (T3S_COLS*16+64) + 'px';

    r = newEl('tbody');
    t.appendChild(r);
    t = r;

    r = newEl('tr');
    t.appendChild(r);

    c = newEl('th');
    r.appendChild(c);
    c.innerHTML = 'Next';
    c.style.paddingBottom = '20px';

    c = newEl('td');
    r.appendChild(c);
    d = newEl('table');
    c.appendChild(d);
    d.id = 't3s_next';

    try {
        d.style.display = 'inline-table';
    } catch(e) {
        d.style.display = 'inline';
    }
    d.style.borderCollapse = 'collapse';

    r = newEl('tbody');
    d.appendChild(r);
    d = r;

    for (i=0; i<4; i++) {
        r = newEl('tr');
        d.appendChild(r);

        for (j=0; j<4; j++) {
            c = newEl('td');
            r.appendChild(c);
            c.style.width = c.style.height = '16px';
            c.style.border = 'solid 1px black';
            c.style.margin = '0px';
            c.style.padding = '0px';
        }
    }

    r = newEl('tr');
    t.appendChild(r);

    c = newEl('th');
    r.appendChild(c);
    c.innerHTML = 'Lines';

    c = newEl('td');
    r.appendChild(c);
    c.id = 't3s_lines';
    c.innerHTML = '0';

    r = newEl('tr');
    t.appendChild(r);

    c = newEl('th');
    r.appendChild(c);
    c.innerHTML = 'Score';
    c.style.paddingBottom = '20px';

    c = newEl('td');
    r.appendChild(c);
    c.id = 't3s_score';
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
        'Left/right',
        'Up',
        'Down',
        'Space',
        'P/Pause',
        'N',
        //'H',
        'Escape'
    ];
    l = [
        'Move',
        'Rotate',
        'Speed up fall',
        'Drop',
        'Pause',
        'New game',
        //'Highscores',
        'Back to work!'
    ];

    for (i=0; i<k.length; i++) {
        r = newEl('tr');
        t.appendChild(r);
        c = newEl('td');
        r.appendChild(c);
        c.innerHTML = k[i];
        c = newEl('td');
        r.appendChild(c);
        c.innerHTML = l[i];
    }

    if (t3s_state == '')
        t3s_msg('pause', T3S_PAUSE_MSG);
    else t3s_state = '';

    t3s_next();
    addHnd(document, 'keydown', t3s_keys);
    t3s_clock(1);
}

t3s_ctor();

function t3s_dtor() {
    delHnd(document, 'keydown', t3s_keys);
    if (t3s_timer != null) {
        window.clearTimeout(t3s_timer);
        t3s_timer = null;
    }
    t3s_state = '';
    while (lnch_div.firstElementChild) {
        lnch_div.firstElementChild.remove();
    }
}

function t3s_clock(a) {
    var r = 0;
    if (t3s_state == 'end' || t3s_state == 'scores')
        return 0;
    if (t3s_state != 'pause') {
        var i,j,h,w,y;
        h = T3S_BLKS[t3s_blk][t3s_blk_rot].length;
        w = T3S_BLKS[t3s_blk][t3s_blk_rot][0].length;

        if (!t3s_blk_y)
            t3s_blk_y--;
        else {
            if (t3s_blk_y<0) r++;
            else if (!t3s_fpos(t3s_blk_x, t3s_blk_y-1, t3s_blk_rot, 1)) r++;
            if (r) {
                t3s_chk();
                t3s_next();
            } else {
                t3s_drawBlk(0);
                t3s_blk_y--;
                t3s_drawBlk(1);
            }
        }
    }
    if (a)
        t3s_timer = window.setTimeout('t3s_clock(1);', t3s_delay);
    return r;
}

function t3s_msg(state,msg) {
    var p = document.getElementById('t3s_msg');
    if (p != null)
        p.parentNode.removeChild(p);

    t3s_state = state;
    if (state != '') {
        var d = document.getElementById('t3s');
        if (d == null) return;

        var n = newEl('span');
        d.appendChild(n);
        n.innerHTML = msg;
        n.id = 't3s_msg';
        n.style.padding = '8px 12px';
        n.style.color = '#C0C0C0';
        n.style.backgroundColor = 'black';
        n.style.position = 'absolute';
        n.style.border = '4px double red';
        n.style.top = '160px';
        n.style.left = '96px';
    }
}

function t3s_cell(x,y) {
    try {
        return t3s_grid.getElementsByTagName('span')[(T3S_ROWS-1-y) * T3S_COLS + x];
    } catch(e) {
        return null;
    }
}

function t3s_curr(x,y) {
    var w,h;
    h = T3S_BLKS[t3s_blk][t3s_blk_rot].length;
    w = T3S_BLKS[t3s_blk][t3s_blk_rot][0].length;

    return (
        x >= t3s_blk_x &&
        x < t3s_blk_x+w &&
        y >= t3s_blk_y &&
        y < t3s_blk_y+h &&
        T3S_BLKS[t3s_blk][t3s_blk_rot][h-(y-t3s_blk_y)-1][x-t3s_blk_x]
    );
}

function t3s_free(x,y,c) {
    var p,h,w;
    p = t3s_cell(x,y);
    if (p == null) return 1;
    if (p.t3s == T3S_BG) return 1;
    return (c && t3s_curr(x,y));
}

function t3s_drawBlk(vis) {
    var c,i,j,w,h,p,g,y,b;
    if (t3s_blk == -1) return;
    h = T3S_BLKS[t3s_blk][t3s_blk_rot].length;
    w = T3S_BLKS[t3s_blk][t3s_blk_rot][0].length;
    c = (vis ? T3S_BLKS_COLS[t3s_blk] : T3S_BG);
    b = (vis ? 'outset' : 'solid');
    y = (t3s_blk_y < 0 ? 0 : t3s_blk_y);

    for (i=h; i>0; i--) { 
        if (y+h-i >= T3S_ROWS)
            continue;
        for (j=0; j<w; j++) {
            p = t3s_cell(t3s_blk_x+j,y-i+h);
            if (p && T3S_BLKS[t3s_blk][t3s_blk_rot][i-1][j]) {
                p.style.borderStyle = b;
                p.style.backgroundColor = c;
                p.t3s = c;
            }
        }
    }
}

function t3s_drawNext(vis) {
    var i,j,h,w,p,g,c;
    h = T3S_BLKS[t3s_blk_next][0].length;
    w = T3S_BLKS[t3s_blk_next][0][0].length;
    g = document.getElementById('t3s_next');
    c = (vis ? T3S_BLKS_COLS[t3s_blk_next] : 'transparent');

    for (i=h; i>0; i--) {
        for (j=0; j<w; j++) {
            p = g.getElementsByTagName('td')[(i-1)*4+j];
            if (T3S_BLKS[t3s_blk_next][0][i-1][j])
                p.style.backgroundColor = c;
        }
    }
}

function t3s_fpos(x,y,r,c) {
    var i,j,h,w;
    h = T3S_BLKS[t3s_blk][r].length;
    w = T3S_BLKS[t3s_blk][r][0].length;

    for (i=h; i>0; i--) {
        if(y+h-i >= T3S_ROWS) continue;
        for (j=0; j<w; j++) {
            if (T3S_BLKS[t3s_blk][r][h-i][j] && !t3s_free(x+j, y+i-1, c))
                return 0;
        }
    }
    return 1;
}

function t3s_next() {
    if (t3s_blk_next != -1)
        t3s_drawNext(0);
    else t3s_blk_next = Math.floor(Math.random() * T3S_BLKS.length);

    t3s_blk = t3s_blk_next;
    t3s_blk_next = Math.floor(Math.random() * T3S_BLKS.length);
    t3s_blk_x = 5-Math.floor(T3S_BLKS[t3s_blk][0][0].length / 2);
    t3s_blk_y = T3S_ROWS-T3S_BLKS[t3s_blk][0].length;
    t3s_blk_rot = 0;

    if (!t3s_fpos(t3s_blk_x, t3s_blk_y, t3s_blk_rot, 0)) {
        do {
            t3s_blk_y++;
        } while (!t3s_fpos(t3s_blk_x, t3s_blk_y, t3s_blk_rot, 0));

        t3s_drawNext(1);
        t3s_drawBlk(1);
        //lnch_high("t3s", t3s_score, t3s_hidone);
        //t3s_msg('scores', T3S_SCORES_MSG);
        t3s_hidone();
        return;
    }
    t3s_drawNext(1);
    t3s_drawBlk(1);
}

function t3s_hidone() {
    t3s_msg('end','Game over! Press ESC key to quit.<br/>Press any other key to start a new game.');
}

function t3s_hishown() {
    t3s_msg('pause', T3S_PAUSE_MSG);
}

function t3s_chk() {
    var i,j,k,l,v,f,m,n;
    for (l=0, i=0; i<T3S_ROWS; i++) {
        for (v=0, f=1, j=0;  j<T3S_COLS && f; j++)
            if (t3s_free(j, i, 0))
                f=0;
        if (f) {
            l++;
            for (j=i+1; j<T3S_ROWS; j++) {
                for (f=0; f<T3S_COLS; f++) {
                    n = t3s_cell(f, j-1);
                    m = t3s_cell(f, j);
                    if (!v && t3s_curr(f,j)) v = 1;
                    n.style.borderStyle = m.style.borderStyle;
                    n.style.backgroundColor = m.style.backgroundColor;
                    n.t3s = m.t3s;
                }
            }

            for (f=0; f<T3S_COLS; f++) {
                n = t3s_cell(f, T3S_ROWS-1);
                n.style.borderStyle = 'solid';
                n.style.backgroundColor = T3S_BG;
                n.t3s = T3S_BG;
            }

            if (v) t3s_blk_y--;
            i--;
        }
    }

    t3s_delay -= Math.floor(((t3s_lines % T3S_STEP) + l) / T3S_STEP) * T3S_SPEED_UP;
    if (t3s_delay < 10) t3s_delay=10;
    if (l) {
        t3s_lines += l;
        v = document.getElementById('t3s_lines');
        v.innerHTML = t3s_lines;

        t3s_score += T3S_SCORING[l-1];
        v = document.getElementById('t3s_score');
        v.innerHTML = t3s_score;
    }
}
