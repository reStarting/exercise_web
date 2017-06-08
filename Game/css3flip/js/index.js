$(function(){
	$("#cards").children().each(function(index){
		$(this).click(function(){
			$(this).toggleClass("card-flipped");
		});
	});
});