/*****************************************************************
 *                                                               *
 *    yasp.js | Yet Another Scrollbar Plugin in JavaScript       *
 *                                                               *
 *  Víctor Casado - José García - Joan Güell - Bernat Romagosa   *
 *                 Citilab 2012 - citilab.eu                     *
 *                                                               *
 *          - Released under the WTFPL for teh lulz -            *
 *                                                               *
 *****************************************************************/

/* =========================== USAGE =========================== *
 *  Just include jQuery and jQuery.events.drag to your site, as  *
 *  well as the yasp.css stylesheet.                             *
 *  Then call attach("#yourElement") and you're all set.         *
 *  The plugin is so short and simple that you should read the   *
 *  code and modify it at your will if you want to costumize it. *
 *  Check out the index.html file for a working example.         *
 * ============================================================= */


/*
 * OH TEH BAD PRACTICES 
 */

var scrollableElement;
var scrollBall;
var scrollBallHeight;
var scrollLine;
var windowHeight = 510;
var documentHeight;

/*
 * ATTACH / DETTACH
 */

function attach(id) {
	var scrollStructure = '<div id="scrollLine"><div id="scrollBall"></div></div>';
	jQuery(id).after(scrollStructure);
	scrollableElement = jQuery(id)[0];
	scrollBall = jQuery("#scrollBall");
	scrollLine = jQuery("#scrollLine");
	documentHeight = jQuery(id).height();
	scrollBallHeight = scrollBall.height();
	init();
}

function detach() {
	if(jQuery("#scrollLine")[0]) {
		scrollBall.remove();
		scrollLine.remove();
		scrollableElement.style.overflow = "auto";
		scrollableElement.style.height = "";
	}
}

/*
 * INITIALIZATION
 */

function init() {
	scrollableElement.style.overflow = "hidden";
	scrollableElement.style.height = windowHeight + "px";
	scrollLine[0].style.height = windowHeight + "px";
	bindEvents();
}

/*
 * EVENTS
 */

function bindEvents() {
	scrollableElement.onmousewheel = function(evt){ scrolled(evt) }; // CHROME
	if (window.addEventListener) { window.addEventListener('DOMMouseScroll', scrolled, false) }; //FIREFOX
	scrollLine.bind('mousedown',     function(evt){ clicked(evt) });
	scrollBall.bind('drag',          function(evt){ dragged(evt) });
	scrollBall.bind('dragstart',     function(evt){ scrollLine[0].style.backgroundColor = "#ff8103"; scrollBall[0].style.backgroundColor = "#c16000" });
	scrollBall.bind('dragend',       function(evt){ scrollLine[0].style.backgroundColor = "#ff8103"; scrollBall[0].style.backgroundColor = "#c16000"});
	scrollLine.bind('mouseenter',    function(evt){ scrollLine[0].style.backgroundColor = "#ff8103"; scrollBall[0].style.backgroundColor = "#c16000"});
	scrollLine.bind('mouseleave',    function(evt){ scrollLine[0].style.backgroundColor = "#ffa953"; scrollBall[0].style.backgroundColor = "#ff8103"});
}

function dragged(evt) {
	if (documentHeight > windowHeight) {
		var scrollBallPosition = Math.min(Math.max(0 , evt.offsetY - 75), windowHeight - scrollBallHeight);
		scrollBall[0].style.top = scrollBallPosition + "px";
		scrollLine[0].style.opacity = 1;
		scrollableElement.scrollTop = (scrollBallPosition / (windowHeight - scrollBallHeight)) * (documentHeight - windowHeight);
	}
}

function scrolled(evt) {
	if (documentHeight > windowHeight) {
		if (evt.wheelDelta) { scrollableElement.scrollTop = scrollableElement.scrollTop - evt.wheelDelta }; // CHROME
		if (evt.detail) { scrollableElement.scrollTop = scrollableElement.scrollTop + evt.detail * 6 }; // FIREFOX
		refreshScrollBallPosition();
	}
}

function clicked(evt) {
	if (documentHeight > windowHeight) {
		var scrollBallPosition = Math.min(Math.max(0 , evt.pageY - scrollLine.position().top), windowHeight - scrollBallHeight);
		scrollBall[0].style.top = scrollBallPosition + "px";
		scrollableElement.scrollTop = (scrollBallPosition / (windowHeight - scrollBallHeight)) * (documentHeight - windowHeight);
	}
}

function refreshScrollBallPosition() {
	scrollBall[0].style.top = ((scrollableElement.scrollTop / (documentHeight - windowHeight )) * (windowHeight - scrollBallHeight)) + "px"; 
}
