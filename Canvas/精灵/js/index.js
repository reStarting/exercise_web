var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var Sprite = function(name, painter, behaviors)
{
	this.painter = painter;
	this.behaviors = behaviors || [];
	this.left = 200;
	this.top = 200;
	this.width = 50;
	this.height = 50;
	this.delta = 1;
	this.velocityX = 6;
	this.velocityY = 3;
}

Sprite.prototype.paint = function(context) 
{
	this.painter.paint(this, context);
};
Sprite.prototype.update = function(context) 
{
	var b = this.behaviors;
	for(var i=0; i<b.length; i++)
	{
		b[i].execute(this, context);
	}
};


var BallPainter = function (name) 
{

}

BallPainter.prototype.paint = function(sprite, context) 
{
	var x = sprite.left || 200;
	var y = sprite.top || 200;
	var radius = sprite.width/2;

	context.save();
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.beginPath();
	context.arc(x, y, radius, 0, Math.PI*2, false);
	var colorr = Math.floor(1+Math.random()*254);
	var colorg = Math.floor(1+Math.random()*254);
	var colorb = Math.floor(1+Math.random()*254);
	var colora = Math.random();
	context.fillStyle = "rgba("+colorr+", "+colorg+", "+colorb+", "+colora+")";
	context.fill();
	context.closePath();
	context.restore();
};

var MoveBall = function()
{

}

MoveBall.prototype.execute = function(sprite, context) 
{

	if(sprite.left+sprite.velocityX+sprite.width>context.canvas.width || sprite.left+sprite.velocityX-sprite.width<0)
	{
		sprite.velocityX = -sprite.velocityX;
	}
	if(sprite.top+sprite.velocityY+sprite.height>context.canvas.height || sprite.top+sprite.velocityY-sprite.height<0)
	{
		sprite.velocityY = -sprite.velocityY;
	}
	sprite.left += sprite.velocityX;
	sprite.top += sprite.velocityY;
};

var ChangeBall = function()
{

}

ChangeBall.prototype.execute = function(sprite, context) 
{
	if(sprite.width>200 || sprite.height>200 || sprite.width<10 || sprite.height<10)
	{
		sprite.delta = -sprite.delta;
	}
	sprite.width = sprite.width+sprite.delta;
	sprite.height = sprite.height+sprite.delta;
};

var sprite = new Sprite("ball", new BallPainter("ball"), [new MoveBall(), new ChangeBall()]);

function animate()
{
	sprite.update(context);
	sprite.paint(context);
	window.requestAnimationFrame(animate);
}
animate();