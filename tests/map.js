if (navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i)) {
    document.body.parentElement.className = "ipad ios7";

    window.addEventListener('orientationchange', function () {
        window.scrollTo(0, 0);
    });
}

var mainPanel = $('#main'), topPanel = $('#top'), jwindow = $(window);

var layout = new yetAnotherPanelsLibrary(mainPanel, {
    autoHideOnClose: true,
    mainPanelMask: false
});

var nbTouchs = 0, lastTouchMove = 0, touchEnabled = true;
$('#map').on('touchstart pointerdown', function (e) {
    ++nbTouchs;
    console.log(nbTouchs);
    if (nbTouchs == 3) {
        e.preventDefault();
        if (touchEnabled) {
            touchEnabled = false;
            map.dragging.disable();
            map.touchZoom.disable();
            map.doubleClickZoom.disable();
            map.scrollWheelZoom.disable();
            map.boxZoom.disable();
            map.keyboard.disable();
            map.tap && map.tap.disable();
        }
        // layout.mainPanelMask.show();
        // $('#wrapper').trigger('touchstart');
        // $('#wrapper').trigger('touchstart');
        // $('#wrapper').trigger('touchstart');
    }
}).on('touchend pointerup', function (e) {
    if (nbTouchs) {
        --nbTouchs;
    }
    console.log(nbTouchs);
    if (nbTouchs == 2) {
        e.preventDefault();
        if (!touchEnabled) {
            touchEnabled = true;
            map.dragging.enable();
            map.touchZoom.enable();
            map.doubleClickZoom.enable();
            map.scrollWheelZoom.enable();
            map.boxZoom.enable();
            map.keyboard.enable();
            map.tap && map.tap.enable();
        }
        // layout.mainPanelMask.hide();
    }
}).on('touchmove pointermove', function () {
    lastTouchMove = +new Date();
});

window.setInterval(function () {
    if ((+new Date()) - lastTouchMove > 500) {
        nbTouchs = 0;
        if (!touchEnabled) {
            map.dragging.enable();
            map.touchZoom.enable();
            map.doubleClickZoom.enable();
            map.scrollWheelZoom.enable();
            map.boxZoom.enable();
            map.keyboard.enable();
            map.tap && map.tap.enable();
        }
    }
}, 500);

var panelOpen = false;

var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    detectRetina: true
}).addTo(map);

L.control.scale({
    imperial: false
}).addTo(map);

var MyControl = L.Control.extend({
    options: {
        position: 'topright'
    },
    onAdd: function (map) {
        // create the control container with a particular class name
        var container = L.DomUtil.create('button', 'my-custom-control');
        container.appendChild(document.createTextNode("Top panel"));
        container.onclick = function () {
            if (!panelOpen) {
                layout.showTopPanel();
                container.firstChild.data = "Map";
            } else {
                layout.showMainPanel();
                container.firstChild.data = "Top panel";
            }
        };

        // ... initialize other DOM elements, add listeners, etc.
        return container;
    }
});

map.addControl(new MyControl());

layout.setTopPanel(topPanel, true, function () {
    console.log("cool open");

    // map.dragging.disable();
    // map.touchZoom.disable();
    // map.doubleClickZoom.disable();
    // map.scrollWheelZoom.disable();
    // map.boxZoom.disable();
    // map.keyboard.disable();
    // map.tap&&map.tap.disable();
    panelOpen = true;
}, function () {
    console.log("cool close");
    panelOpen = false;
    // map.dragging.enable();
    // map.touchZoom.enable();
    // map.doubleClickZoom.enable();
    // map.scrollWheelZoom.enable();
    // map.boxZoom.enable();
    // map.keyboard.enable();
    // map.tap&&map.tap.enable();
}).updateView();
//# sourceMappingURL=map.js.map
