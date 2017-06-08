var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var lastTime = 0;
var imgData;
var img = new Image();
img.src = "img.jpg";
img.onload = function(){
	context.drawImage(img, 0, 0, canvas.width, canvas.height);
	imgData = context.getImageData(0, 0, canvas.width, canvas.height);
	var data = imgData.data;
	var len = data.length;
	console.log(imgData);
	for(var i=0; i<len; i+=4)
	{
		data[i+3] = 150;
	}
};
var discs = [
	{
		x:150,
		y:250,
		velocityX:-3.2,
		velocityY:2,
		radius:25,
		innerColor:"rgba(255, 255, 255, 1)",
		middleColor:"rgba(255, 255, 255, .7)",
		outerColor:"rgba(255, 255, 255, .5)"
	},
	{
		x:150,
		y:150,
		velocityX:2.2,
		velocityY:2,
		radius:25,
		innerColor:"rgba(100, 145, 255, 1)",
		middleColor:"rgba(100, 145, 255, .7)",
		outerColor:"rgba(100, 145, 255, .5)"
	},
	{
		x:150,
		y:50,
		velocityX:1.2,
		velocityY:1.5,
		radius:25,
		innerColor:"rgba(255, 0, 0, 1)",
		middleColor:"rgba(255, 0, 0, .7)",
		outerColor:"rgba(255, 0, 0, .5)"
	},
	{
		x:150,
		y:50,
		velocityX:4.2,
		velocityY:2.5,
		radius:45,
		innerColor:"rgba(255, 0, 0, 1)",
		middleColor:"rgba(255, 0, 0, .7)",
		outerColor:"rgba(255, 0, 0, .5)"
	},
	{
		x:150,
		y:150,
		velocityX:6.2,
		velocityY:6.5,
		radius:25,
		innerColor:"rgba(255, 255, 0, 1)",
		middleColor:"rgba(255, 0, 0, .7)",
		outerColor:"rgba(255, 0, 0, .5)"
	},
	{
		x:150,
		y:250,
		velocityX:4.6,
		velocityY:8.5,
		radius:25,
		innerColor:"rgba(255, 144, 0, 1)",
		middleColor:"rgba(255, 144, 0, .7)",
		outerColor:"rgba(255, 0, 0, .5)"
	},
	{
		x:50,
		y:450,
		velocityX:5.2,
		velocityY:3.5,
		radius:35,
		innerColor:"rgba(144, 0, 0, 1)",
		middleColor:"rgba(255, 255, 0, .7)",
		outerColor:"rgba(255, 0, 0, .5)"
	}
];

var discNum = discs.length;
//更新数据
function update()
{
	var disc = null;
	for(var i=0; i<discNum; i++)
	{
		disc = discs[i];
		if(disc.x+disc.velocityX+disc.radius > canvas.width || disc.x + disc.velocityX - disc.radius < 0)
			disc.velocityX = - disc.velocityX;
		if(disc.y+disc.velocityY+disc.radius > canvas.height || disc.y + disc.velocityY - disc.radius < 0)
			disc.velocityY = - disc.velocityY;
		disc.x += disc.velocityX;
		disc.y += disc.velocityY;
	}
}

function drawBackground()
{
	context.save();
	if(imgData)
	{
		context.putImageData(imgData, 0, 0);
	}
	context.restore();
}

function draw()
{
	var disc = null;
	for(var i=0; i<discNum; i++)
	{
		disc = discs[i];
		var gradient = context.createRadialGradient(disc.x, disc.y, 0, disc.x, disc.y, disc.radius);
		gradient.addColorStop(.3, disc.innerColor);
		gradient.addColorStop(.5, disc.middleColor);
		gradient.addColorStop(1, disc.outerColor);

		context.save();
		context.beginPath();
		context.arc(disc.x, disc.y, disc.radius, 0, Math.PI*2, false);
		context.fillStyle = gradient;
		context.fill();
		context.restore();
	}
}

function animate()
{
	// context.clearRect(0, 0, canvas.width, canvas.height);
	drawBackground();
	update();
	draw();

	context.fillStyle = "rgba(255, 255, 0, .6)";
	context.font = "40px Courier New";
	context.fillText(calculate().toFixed()+"fps", 20, 60);
	window.requestNextAnimationFrame(animate);
}
function calculate()
{
	var now = +new Date();
	var fps = 1000/(now - lastTime);
	lastTime = now;
	return fps;
}
window.requestNextAnimationFrame(animate);
