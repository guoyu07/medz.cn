/*!
Intelligent auto-scrolling to hide the mobile device address bar
Optic Swerve, opticswerve.com
Documented at http://menacingcloud.com/?c=iPhoneAddressBar
*/

var bodyTag;
var executionTime = new Date().getTime(); // JavaScript execution time
var aMenuClicked = false;
var aSidebarClicked = false;

// Document ready
//----------------
documentReady(function() {
	// Don't hide address bar after a distracting amount of time
	var readyTime = new Date().getTime()
	if((readyTime - executionTime) < 3000) hideAddressBar(true);
	
	
	// -------- Search box hover active state end ------ //
	
	// Toggle script
	
	$(".container").hide();

	$(".toggle").click(function(){
		$(this).toggleClass("active").next().slideToggle(350);
			return false;
	});	
	
	// -------- Toggle script end ------ //
	
	$("#submenu-1").hide();
	
	if("ontouchstart" in document.documentElement)
	{	
		
			$('#a-menu').bind('touchstart touchon', function(event){
					if(aMenuClicked)
					{
						$('#content-wrapper').removeClass('moved-right');
						// $('.menu').removeClass('activeState');
						aMenuClicked = false;
					}
					else
					{
						$('#sidebar-wrapper').css("z-index", "-2");
						$('#content-wrapper').addClass('moved-right');
						// $('.menu').addClass('activeState');

						aMenuClicked = true;
					}
			});
			
			$('#a-sidebar').bind('touchstart touchon', function(event){
										
					if(aSidebarClicked)
					{
						$('#content-wrapper').removeClass('moved-left');
				        $('#page-wrapper ').css("height","auto");
			            if($('#page-wrapper ').height() < $(window).height()){
						   $('#page-wrapper ').css("height", $(window).height()+"px");
						}
						$('.a-sidebar').show();
						$('.a-sidebar-show').hide();
						$('.sidebar-wrapper-scroll').hide();
						aSidebarClicked = false;
					}
					else
					{
						$('#sidebar-wrapper').css("z-index", "0");
						$('#content-wrapper').addClass('moved-left');
						$('#page-wrapper ').css("height", "100%");
						$('.a-sidebar').hide();
						$('.a-sidebar-show').show();
						$('.sidebar-wrapper-scroll').show();
						aSidebarClicked = true;
					}
			});
			
			$('#a-submenu-1').bind('touchstart touchon', function(event){
				$('#submenu-1').toggle(250);
			});
		}
		else
		{

			$('#a-menu').bind('click', function(event){
					if(aMenuClicked)
					{
						// $('.menu').removeClass('activeState');
						$('#content-wrapper').removeClass('moved-right');
						aMenuClicked = false;
					}
					else
					{
						// $('.menu').addClass('activeState');
						$('#sidebar-wrapper').css("z-index", "-2");
						$('#content-wrapper').addClass('moved-right');
						aMenuClicked = true;
					}
			});
			
			$('#a-sidebar').bind('click', function(event){

												   
					if(aSidebarClicked)
					{
						$('#content-wrapper').removeClass('moved-left');
				        $('#page-wrapper ').css("height","auto");
			            if($('#page-wrapper ').height() < $(window).height()){
						   $('#page-wrapper ').css("height", $(window).height()+"px");
						}
						$('.a-sidebar').show();
						$('.a-sidebar-show').hide();
						$('.sidebar-wrapper-scroll').hide();
											
						aSidebarClicked = false;
					}
					else
					{

						$('#sidebar-wrapper').css("z-index", "0");
						$('#content-wrapper').addClass('moved-left');
						$('#page-wrapper ').css("height", "100%");
						$('.a-sidebar').hide();
						$('.a-sidebar-show').show();
						$('.sidebar-wrapper-scroll').show();
						aSidebarClicked = true;
					}
			});
			
			$('#a-submenu-1').bind('click', function(event){
				$('#submenu-1').toggle(250);
			});
			
	}
	

});

// Run specified function when document is ready (HTML5)
//------------------------------------------------------
function documentReady(readyFunction) {
	document.addEventListener('DOMContentLoaded', function() {
		document.removeEventListener('DOMContentLoaded', arguments.callee, false);
		readyFunction();

	}, false);

}

// Hide address bar on devices like the iPhone
//---------------------------------------------
function hideAddressBar(bPad) {
	// Big screen. Fixed chrome likely.
	if(screen.width > 980 || screen.height > 980) return;

	// Standalone (full screen webapp) mode
	if(window.navigator.standalone === true) return;

	// Page zoom or vertical scrollbars
	if(window.innerWidth !== document.documentElement.clientWidth) {
		// Sometimes one pixel too much. Compensate.
		if((window.innerWidth - 1) !== document.documentElement.clientWidth) return;

	}

	// Pad content if necessary.
	if(bPad === true && (document.documentElement.scrollHeight <= document.documentElement.clientHeight)) {
		// Extend body height to overflow and cause scrolling
		bodyTag = document.getElementsByTagName('body')[0];

		// Viewport height at fullscreen
		bodyTag.style.height = document.documentElement.clientWidth / screen.width * screen.height + 'px';

	}

	setTimeout(function() {
		// Already scrolled?
		if(window.pageYOffset !== 0) return;

		// Perform autoscroll
		window.scrollTo(0, 1);

		// Reset body height and scroll
		if(bodyTag !== undefined) bodyTag.style.height = window.innerHeight + 'px';
		window.scrollTo(0, 0);

	}, 1000);

}

// Quick address bar hide on devices like the iPhone
//---------------------------------------------------
function quickHideAddressBar() {
	setTimeout(function() {
		if(window.pageYOffset !== 0) return;
		window.scrollTo(0, window.pageYOffset + 1);

	}, 1000);

}
$(document).ready(function() {

	/* Drop Down Menu */
	$(".nv-list").click(function () {
      	$(this).toggleClass("expanded");
    });

	
});