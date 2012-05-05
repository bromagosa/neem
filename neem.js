var lang = "es";

function switchLang(langString) {
	lang = langString;
	$("#lang span").removeClass("orange");
	$("#lang span." + lang).addClass("orange");
	startUp();
}

function load(sectionName){
	$('#contents').fadeOut( 
		200, 
		function() {
			$('#contents').load(lang + "_" + sectionName + ".html" , function(){detach(); $('#contents').fadeIn(200); attach('#contents')});
		}
	)
}

function loadText(textName){
	$("#" + textName + ".text").load(lang + "_" + textName + "_text.html");
}

function loadMenuTexts(){
	loadText('portada');
	loadText('quienes');
	loadText('galeria');
	loadText('colabora');
	loadText('objetivos');
	loadText('visitanos');
	loadText('noticias');
}

function startUp() {
	load('portada');
	loadText('welcome');
	loadMenuTexts();
	bindMenus();
}

function bindMenus() {
 	$(".menu").bind("click", function(){ load($(this).attr("id")) });
}

function nextPic(element) {
	$(element).next("div").fadeOut(0, function(){$(element).next("div").fadeIn(200)});
	$("#contents")[0].scrollTop = $(element).next("div")[0].offsetTop;
	refreshScrollBallPosition();
}

function firstPic() {
	$($("div.photo")[0]).fadeOut(0, function(){$($("div.photo")[0]).fadeIn(200)});
	$("#contents")[0].scrollTop = 0;
	refreshScrollBallPosition();
}
