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
 	$(".menu").bind("click", function(){load($(this).attr("id"))})
}
