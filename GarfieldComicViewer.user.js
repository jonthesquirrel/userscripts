// ==UserScript==
// @name         Garfield Comic Viewer
// @namespace    https://github.com/jdh11235/userscripts
// @version      1.1
// @description  Improves the comic viewing experience on garfield.com!
// @author       Jonathan Herman
// @match        http://garfield.com/comic/*
// @grant        none
// ==/UserScript==

//viewer
var viewer = {
    container: document.createElement('div'),
    togglebutton: document.createElement('button'),
    hidden: false
};

viewer.show = function() {
    viewer.container.removeAttribute('hidden');
    viewer.hidden = false;
};

viewer.hide = function() {
    viewer.container.setAttribute('hidden', '');
    viewer.hidden = true;
};

viewer.toggle = function() {
    if (viewer.hidden) {
        viewer.show();
    } else {
        viewer.hide();
    }
};

viewer.togglebutton.innerHTML = "Toggle Viewer";
viewer.togglebutton.onclick = viewer.toggle;
viewer.togglebutton.style.position = 'fixed';
viewer.togglebutton.style.top = '0';
viewer.togglebutton.style.right = '0';
viewer.togglebutton.style.zIndex = '1001';
viewer.togglebutton.style.background = '#2d2d2d';
viewer.togglebutton.style.color = '#fc9605';

viewer.container.style.position = 'fixed';
viewer.container.style.top = '0';
viewer.container.style.left = '0';
viewer.container.style.width = '100%';
viewer.container.style.height = '100%';
viewer.container.style.zIndex = '1000';
viewer.container.style.background = 'rgba(0, 0, 0, 0.8)';

viewer.hide();

//comic

var comic = {
    image: document.createElement('img'),
    date: location.pathname.split('/').pop()
};

// http://stackoverflow.com/a/29199863/4021614
function incrementDate(date_str, incrementor) {
    var parts = date_str.split("-");
    var dt = new Date(
        parseInt(parts[0], 10),      // year
        parseInt(parts[1], 10) - 1,  // month (starts with 0)
        parseInt(parts[2], 10)       // date
    );
    dt.setTime(dt.getTime() + incrementor * 86400000);
    parts[0] = "" + dt.getFullYear();
    parts[1] = "" + (dt.getMonth() + 1);
    if (parts[1].length < 2) {
        parts[1] = "0" + parts[1];
    }
    parts[2] = "" + dt.getDate();
    if (parts[2].length < 2) {
        parts[2] = "0" + parts[2];
    }
    return parts.join("-");
};

var today = function() {
    var day = new Date();
    return day.toISOString().substring(0, 10);
};

comic.goto = function(date) {
    comic.date = date;
    controls.updateDate(date);
    comic.image.src = 'http://garfield.com/uploads/strips/' + date + '.jpg';
};

comic.previous = function() {
    comic.goto(incrementDate(comic.date, -1));
};

comic.next = function() {
    comic.goto(incrementDate(comic.date, 1));
};

comic.today = function() {
    comic.goto(today());
};

//control buttons

var controls = {
    container: document.createElement('div'),
    datebox: document.createElement('input'),
    leftbutton: document.createElement('button'),
    rightbutton: document.createElement('button'),
    todaybutton: document.createElement('button'),
    sharelink: document.createElement('input')
};

controls.datebox.type = 'text';

controls.datebox.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        //TODO: date syntax error checking
        comic.goto(controls.datebox.value);
    }
});

controls.sharelink.type = 'text';
controls.sharelink.readOnly = true;
controls.sharelink.size = 34;
controls.sharelink.onclick = function() {
    controls.sharelink.select();
};

controls.updateDate = function(date) {
    controls.datebox.placeholder = date;
    controls.datebox.value = '';
    controls.sharelink.value = 'http://garfield.com/comic/' + date;
}

controls.todaybutton.innerHTML = "Today's Comic";
controls.leftbutton.innerHTML = 'Previous Comic';
controls.rightbutton.innerHTML = 'Next Comic';
controls.todaybutton.onclick = comic.today;
controls.leftbutton.onclick = comic.previous;
controls.rightbutton.onclick = comic.next;

//keybord shortcuts

var keyhandler = {
    bindings: {
        //left arrow
        previous: 37,
        //right arrow
        next: 39,
        //esc
        close: 27
    }
};

window.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
        case keyhandler.bindings.previous:
            comic.previous();
            break;
        case keyhandler.bindings.next:
            comic.next();
            break;
        case keyhandler.bindings.close:
            viewer.hide();
            break;
    }
});

//init

document.body.appendChild(viewer.container);

viewer.container.appendChild(controls.container);

controls.container.appendChild(controls.todaybutton);
controls.container.appendChild(controls.leftbutton);
controls.container.appendChild(controls.datebox);
controls.container.appendChild(controls.rightbutton);
controls.container.appendChild(controls.sharelink);

viewer.container.appendChild(comic.image);

comic.goto(comic.date);

document.body.appendChild(viewer.togglebutton);
