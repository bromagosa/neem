var lang = "es";

function load(sectionName){
	$('#contents').fadeOut( 
		200, 
		function() {
			$('#contents').load(lang + "_" + sectionName + ".html" , function(){detach(); $('#contents').fadeIn(200); attach('#contents')});
		}
	)
}

function startUp() {
	load('portada');
 	$(".menu").bind("click", function(){ load($(this).attr("id")) });
}

function nextPic(element) {
	$(element).next("div").fadeOut(0, function(){$(element).next("div").fadeIn(200)});
	$("#contents")[0].scrollTop = $(element).next("div")[0].offsetTop;
	refreshScrollBallPosition();
}
