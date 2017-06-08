var front = document.querySelector('.front');
var back = document.querySelector('.back');
var up = document.querySelector('.up');
var down = document.querySelector('.down');

function makeProgressDiv(dom)
{
	if(!dom.num) dom.num = 0;
	if(dom.num >= 100) return;
	dom.num ++;
	var div = document.createElement("div");
	div.className = "slice";
	dom.appendChild(div);
	setTimeout(function(){
		makeProgressDiv(dom);
	},100)
}

makeProgressDiv(front)
makeProgressDiv(back)
makeProgressDiv(up)
makeProgressDiv(down)
