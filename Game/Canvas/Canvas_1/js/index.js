var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var circles = new Array();
var lines = new Array();
var thinLineWidth = 3;
var thickLineWidth = 6;
var targetCircle;
/**
 * [drawCircle 画圆]
 * @param  {context} ctx    设备上下文
 * @param  {[type]} x      x坐标
 * @param  {[type]} y      y坐标
 * @param  {[type]} radius 圆半径
 * @return {[type]}        [description]
 */
function drawCircle (ctx, x, y, radius) {
	ctx.beginPath();
	ctx.fillStyle = "rgba(200, 200, 100, 0.6)";
	ctx.arc(x, y, radius, 0, 2*Math.PI, false);
	ctx.closePath();
	ctx.fill();
}
/**
 * [drawCircleByRandom 随机画圆]
 * @param  {[type]} n 随机画n个圆
 * @return {[type]}   [description]
 */	
function drawCircleByRandom (n) {
	for(var i=0; i<n; i++)
	{
		var x = Math.random()*ctx.canvas.width;
		var y = Math.random()*ctx.canvas.height;
		var r = 10;
		console.log(x+","+y+","+r)
		drawCircle(ctx, x, y, r);
		circles.push(new Circle(x, y, r));	
	}
}

function drawLine(start, end, thin)
{
	if(thin == undefined || thin == "" || thin == null) 
		thin=thinLineWidth;
	ctx.lineWidth = thin;
	ctx.strokeStyle = "#aaa";
	ctx.beginPath();
	ctx.moveTo(start.x, start.y);
	ctx.lineTo(end.x, end.y);
	ctx.stroke();
}

function drawAllLines () {
	for(var i=0; i<circles.length; i++)
	{
		var start = circles[i];
		for(var j=0; j<i; j++)
		{
			var end = circles[j];
			drawLine(start, end);
			lines.push(new Point(start, end));
		}
	}
}
function clear()
{
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

var Circle = function(x, y, r)
{
	this.x = x;
	this.y = y;
	this.r = r;
}
Circle.prototype.toString = function()
{
	console.log("x坐标:"+this.x+"y坐标:"+this.y+"r半径:"+this.r);
}
var Point = function(x, y)
{
	this.x = x;
	this.y = y;
}
var Line = function(start, end)
{
	this.start = start;
	this.end = end;
}

$("#game").mousedown(function(e){
	var pos = $(this).offset();
	var left = (e.pageX-pos.left)||0;
	var top = (e.pageY-pos.top)||0;
	for(var i=0; i<circles.length; i++)
	{
		var current = circles[i];
		if(Math.pow(left-current.x, 2)+Math.pow(top-current.y, 2)<Math.pow(current.r, 2))
		{
			targetCircle = i;
			console.log(i);
			break;
		}
	}
});
$("#game").mousemove(function(e){
	if(targetCircle != undefined)
	{
		var pos = $(this).offset();
		var left = (e.pageX-pos.left)||0;
		var top = (e.pageY-pos.top)||0;
		circles[targetCircle] = new Circle(left, top, 10);
	}
	
});
$("#game").mouseup(function(e){
	targetCircle = undefined;
});

function run()
{
	clear();
	for(var i=0; i<circles.length; i++)
	{
		var start = circles[i];
		drawCircle(ctx, start.x, start.y, start.r);
		for(var j=0; j<i; j++)
		{
			var end = circles[j];
			drawLine(start, end);
		}
	}
}
$(function(){
	//初始化
	drawCircleByRandom(5);
	drawAllLines();
	//游戏开始
	setInterval(run, 30);
})