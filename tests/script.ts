/// <reference path="./../lib/jquery.d.ts" />
/// <reference path="./../lib/lib.ts" />

if (navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i)) {
	document.body.parentElement.className = "ipad ios7";

	window.addEventListener('orientationchange',function() {
		window.scrollTo(0,0);
	});
}

declare var IScroll;

// var myScroll = new IScroll("#wrapper", {
// 	mouseWheel: false,
// 	scrollX: true,
// 	scrollY: true,
// 	snap: '.panel'});


var mainPanel = $('#main'),
	// scroller = $('#scroller'),
	// wrapper = $('#wrapper'),
	leftPanel = $('#left'),
	rightPanel = $('#right'),
	topPanel = $('#top'),
	bottomPanel = $('#bottom'),
	jwindow = $(window);


var layout = new yetAnotherPanelsLibrary(mainPanel, true, false);

layout.setTopPanel(topPanel, true)
	.setLeftPanel(leftPanel,false)
	.setRightPanel(rightPanel,false)
	.setBottomPanel(bottomPanel,false)
	.updateView();



// var currentPageX = 0,
// 	currentPageY = 0;

// myScroll.on("scrollEnd", function() {

// 	currentPageX = this.x;
// 	currentPageY = this.y;
// 	console.log(currentPageX, currentPageY);
// });

// var updateSizes = function() {
// 	var leftWidth = leftPanel.width(),
// 		rightWidth = rightPanel.width(),
// 		topHeight = topPanel.height(),
// 		bottomHeight = bottomPanel.height(),
// 		wrapperWidth = wrapper.width(),
// 		wrapperHeight = wrapper.height(); 

// 	mainPanel.width(wrapperWidth)
// 		.height(wrapperHeight)
// 		.css({
// 			top: topHeight,
// 			left: leftWidth
// 			});

// 	leftPanel.height(wrapperHeight)
// 		.css('top',topHeight);

// 	rightPanel.height(wrapperHeight)
// 		.css({
// 			top: topHeight,
// 			left: leftWidth+wrapperWidth
// 			});

// 	topPanel.width(wrapperWidth)
// 		.css('left', leftWidth);

// 	bottomPanel.width(wrapperWidth)
// 		.css({
// 			top: topHeight+wrapperHeight,
// 			left: leftWidth
// 			});

// 	var oldScrollerWidth = scroller.width(),
// 		oldScrollerHeight = scroller.height(),
// 		newScrollerWidth = leftWidth + wrapperWidth + rightWidth,
// 		newScrollerHeight = topHeight + wrapperHeight + bottomHeight;

// 	scroller.width(newScrollerWidth)
// 		.height(newScrollerHeight);

// 	window.setTimeout(function() {
// 		myScroll.refresh();

// 		// alert(""+currentPageX + " - " + currentPageY);
// 		myScroll.goToPage(currentPageX, currentPageY, 200);

// 		var ratioWidth = oldScrollerWidth/newScrollerWidth,
// 			ratioHeight = oldScrollerHeight/newScrollerHeight;


// 		// myScroll.scrollTo(ratioWidth*currentPageX, ratioHeight*currentPageY);
// 		}, 0);
// }

// jwindow.on('resize ready', function() {
// 	updateSizes();
// });

