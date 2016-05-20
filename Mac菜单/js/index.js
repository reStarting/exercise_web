window.onload=function(){

var imgs = document.getElementsByTagName("img");
console.log(imgs)
var len = imgs.length;
var i=0;
var scale = 1.0;
var oWidth = [];
for(var j=0; j<len; j++)
{
	var img = imgs[j];
	console.log(img.width);
	console.log(img.offsetLeft)
	oWidth.push(img.width);

}
document.onmousemove = function(e){
	var x = e.clientX;
	var y = e.clientY;
	for(i=0; i<len; i++)
	{
		var img = imgs[i];
		var cx = x - img.offsetLeft-img.offsetWidth/2;
		console.log("cx"+i);
		console.log(cx);
		// var s =Math.sqrt(cx * cx + cy * cy);
		// if(s<80)
		// {
		// 	console.log("s");
		// 	console.log(s);
		// }
		
		var absX = Math.abs(cx);
		if(absX>=0 && absX<180)
		{
			scale = 2.0 - absX/180;
		}
		if(absX>180 )
		{
			scale = 1.0
		}

		// if (scale < 1.0) scale = 1.0;
		// console.log(oWidth[i])
		img.width = oWidth[i]*scale;
	}
}

}