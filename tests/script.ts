/// <reference path="./../lib/jquery.d.ts" />
/// <reference path="./../lib/yapl.ts" />

if (navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i)) {
	document.body.parentElement.className = "ipad ios7";

	window.addEventListener('orientationchange',function() {
		window.scrollTo(0,0);
	});
}

declare var IScroll;

var mainPanel = $('#main'),
	leftPanel = $('#left'),
	rightPanel = $('#right'),
	topPanel = $('#top'),
	bottomPanel = $('#bottom'),
	jwindow = $(window);


var layout = new yetAnotherPanelsLibrary(mainPanel, {
	autoHideOnClose: true,
	mainPanelMask: false,
});

layout.setTopPanel(topPanel, true)
	.setLeftPanel(leftPanel,false)
	.setRightPanel(rightPanel,false)
	.setBottomPanel(bottomPanel,false)
	.updateView();