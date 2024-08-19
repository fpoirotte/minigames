const NS_XHTML = "http://www.w3.org/1999/xhtml";
var launcher = [];
var lnch_in = 0;
var lnch_div = null;

function newEl(e){
    return document.createElement(e);
}

function addHnd(e,t,c){
    if (e.addEventListener)
        return e.addEventListener(t,c,0);
}

function delHnd(e,t,c){
    if (e.removeEventListener)
        return e.removeEventListener(t,c,0);
}

function stopEv(e){
    e.cancelBubble=true;
    if (e.stopPropagation)
        e.stopPropagation();
    if (e.preventDefault)
        e.preventDefault();
    return false;
}

function lnch_xlate(x) {
    switch (x) {
        case "←":
        case "⇐":
        case 37:
            return "ArrowLeft";
        case "↑":
        case "⇑":
        case 38:
            return "ArrowUp";
        case "→":
        case "⇒":
        case 39:
            return "ArrowRight";
        case "↓":
        case "⇓":
        case 40:
            return "ArrowDown";
        default:
            return (typeof(x) == 'number') ? String.fromCharCode(x) : x;
            return x;
    }
}

function lnch_add(file, code){
    var i = launcher.length;
    code = Array.from(code, lnch_xlate);
    launcher[i] = [code, code.length, file];
}

function lnch_reset(){
    var i, k;

    k = document.body.firstElementChild;
    while (k!=null) {
        if (k.nodeType == 1 && typeof(k.display) != 'undefined') {
            k.style.display = k.display;
            k.display = null;
        }
        k = k.nextSibling;
    }

    k = document.head.getElementsByTagName('script');
    for (i in k)
        if(k[i] != null && typeof(k[i].id) != 'undefined' && k[i].id == 'lnch')
            k[i].parentNode.removeChild(k[i]);

    if(lnch_div != null) {
        lnch_div.parentNode.removeChild(lnch_div);
        lnch_div = null;
    }

    addHnd(document,'keydown',lnch_keys);
    lnch_in=0;
    console.log("Launcher is ready");
}

function lnch_is_mod_key(k) {
    return [
        "Alt", "AltGraph", "CapsLock", "Control", "Fn", "FnLock", "Hyper", "Meta",
        "NumLock", "ScrollLock", "Shift", "Super", "Symbol", "SymbolLock"
    ].includes(k);
}

function lnch_keys(e) {
    var k,i,d;
    k = e.key;

    if (lnch_is_mod_key(k))
        return;

    for (i=0; i<launcher.length; i++) {
        if (k == launcher[i][0][--launcher[i][1]]) {
            if (launcher[i][1] <= 0) {
                for (k=0; k<launcher.length; k++)
                    launcher[k][1] = launcher[k][0].length;

                delHnd(document,'keydown',lnch_keys);
                k = document.body.firstElementChild;

                while (k != null) {
                    if (k.nodeType == Node.ELEMENT_NODE) {
                        k.display = k.style.display;
                        k.style.display = 'none';
                    }
                    k = k.nextSibling;
                }

                d = newEl('div');
                document.body.appendChild(d);
                d.style.position = 'absolute';
                d.style.left = '0px';
                d.style.top = '0px';
                d.style.right = '0px';
                d.style.bottom = '0px';
                d.style.backgroundColor = '#99F';
                lnch_div = d;

                k = newEl('script');
                k.setAttribute('type', 'text/javascript');
                k.setAttribute('src', launcher[i][2]);
                k.setAttribute('id', 'lnch');
                document.head.appendChild(k);
                lnch_in = 1;
                return;
            }
        } else launcher[i][1] = launcher[i][0].length;
    }
}

function lnch_high(g,s,m) {
    var r,xhr;

    if (g == null) {
        return m && m();
    }

    if (XMLHttpRequest)
        xhr = new XMLHttpRequest();
    else {
        return m && m();
    }

    r = new URLSearchParams();
    r.set('g', g);
    if (s) r.set('s', s);
    r = r.toString();

    xhr.open("POST", (new URL("./highscores.php", document.location.toString())).toString(), true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Content-Length", r.length);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            m && m();
            if (xhr.status == 200) alert(`Highscores for '${g}'\n` + xhr.responseText);
            else alert(`Unable to retrieve highscores for '${g}'.\nSorry! :(`);
        }
    };
    xhr.send(r);
}


var gameBase = new URL('./g/', document.location.toString());
var sequence = ['s'];
sequence.push(sequence[0].charCodeAt(0) - 0x52);
sequence.push(sequence[0].charCodeAt(0) - 1);
sequence.push(sequence[0].charCodeAt(0) + 1);
sequence.push(parseInt(sequence[1].toString(), 16));
sequence.push(sequence[0].charCodeAt(0) + 1);

lnch_add(`${gameBase}t3s.js`, sequence);
lnch_add(`${gameBase}snek.js`, [97, 'b', 39, '%'.charCodeAt(0), '⇒', 0x25, 40, parseInt('50', 8), '⇑', '&'.charCodeAt(0)]);
addHnd(document, "DOMContentLoaded", lnch_reset);

