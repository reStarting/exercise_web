$(function () {
	var canvas = document.getElementById("game");
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = "rgba(200, 200, 100, .6)";
	ctx.beginPath();
	ctx.arc(100, 100, 50, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
});