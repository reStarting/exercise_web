/**
 * [ 移动构造函数]
 * @param  {[string]} sMover [能够移动的元素id]
 * @return {[type]}        [description]
 */
var Mover = function (sMover) 
{
	this.oMover = document.getElementById(sMover);
	this.timers = new Array();
}
/**
 * [ 减速运动]
 * @param  {[obj]} attr [变幻的属性e.g. {height:100, width:200, left:300, top:400}]
 * @param speed 播放速度
 * @return {[type]}         [description]
 */
Mover.prototype.slowDown = function(attr, speed) 
{
	var that = this;
	if(!speed)speed=40;
	function core()
	{
		var nSpeed = 0;
		for(var at in attr)
		{
			var offsetAttr = "offset"+at.substring(0,1).toUpperCase()+ at.substring(1).toLowerCase();
			that[at+"Speed"] = (attr[at]-that.oMover[offsetAttr])/8;
			that[at+"Speed"] = that[at+"Speed"]>0?Math.ceil(that[at+"Speed"]):Math.floor(that[at+"Speed"]);
			that.oMover.style[at] = that.oMover[offsetAttr] + that[at+"Speed"] + "px";
			nSpeed += that[at+"Speed"];
		}
		if(nSpeed!=0)
		{
			return true;
		}
		else
		{

			return false;
		}
	}
	function run()
	{
		window.clearTimeout(that.timers["slowDown"]);
		if(core())
		{
			that.timers["slowDown"] = window.setTimeout(run, speed);
		}
	}
	run();
}
//弹性
/**
 * [ 弹性动画]
 * @param  {[obj]} attr  [变幻的属性e.g. {height:100, width:200, left:300, top:400}]
 * @param  {[type]} speed [播放速度]
 * @return {[type]}       [description]
 */
Mover.prototype.flex = function(attr, speed) 
{
	var that = this;
	if(!speed)speed=30;
	function core()
	{
		var nSpeeds = new Array();
		var flag = false;
		for(var at in attr)
		{
			var offsetAttr = "offset"+at.substring(0,1).toUpperCase()+ at.substring(1).toLowerCase();
			if(!that[at+"Speed"])
			{
				that[at+"Speed"] = 10;
			}
			else
			{
				that[at+"Speed"] += (attr[at]-that.oMover[offsetAttr])/8;
			}
			that[at+"Speed"] *= 0.94;
			that.oMover.style[at] = that.oMover[offsetAttr] + that[at+"Speed"] + "px";
			nSpeeds.push(that[at+"Speed"]);
		}
		for(var i=0; i<nSpeeds.length; i++)
		{
			var nSpeed = nSpeeds[i];
			if(Math.abs(nSpeed)<0.5)
			{
				flag |= false;
			}
			else
			{
				flag |= true;
			}
		}
		nSpeeds.length = 0;
		if(!flag)
		{
			for(var at in attr)
			{
				that.oMover.style[at] = attr[at]+"px";
			}
			return false;
		}
		else
		{
			return true;
		}

	}
	function run()
	{
		window.clearTimeout(that.timers["flex"]);
		if(core())
		{
			that.timers["flex"] = window.setTimeout(run, speed);
		}
	}
	run();
}
//自由落体
Mover.prototype.fall = function(attr, speed) 
{
	var that = this;
	if(!speed)speed=30;
	var a = 9;
	for(var at in attr)
	{
		var offsetAttr = "offset"+at.substring(0,1).toUpperCase()+ at.substring(1).toLowerCase();
		if(attr[at]>that.oMover[offsetAttr])
		{
			that[at+"A"] = a;
		}
		else
		{
			that[at+"A"] = -1*a;
		}
	}
	var flag = new Array();
	var bFlag = new Array();
	function core()
	{
		for(var at in attr)
		{
			var offsetAttr = "offset"+at.substring(0,1).toUpperCase()+ at.substring(1).toLowerCase();
			if(!that[at+"Speed"])
			{
				that[at+"Speed"] = 0;
			}
			that[at+"Speed"] += that[at+"A"];
			that[at+"Speed"]*=0.94;
			if((that[at+"A"]>0&&that.oMover[offsetAttr]+that[at+"Speed"]>attr[at]) || (that[at+"A"]<0&&that.oMover[offsetAttr]+that[at+"Speed"]<attr[at]) )
			{
				that[at+"Speed"] *= -1;
				that.oMover.style[at] = attr[at]+"px";
				if(!flag[at])flag[at]=0;
				flag[at]++;
			}
			else
			{
				that.oMover.style[at] = that.oMover[offsetAttr] + that[at+"Speed"] + "px";
				flag[at] = 0;
			}
			//console.log(that[at+"Speed"]);
			//console.log(a);
			if(flag[at]>3)
			{
				bFlag[at] = false;
				console.log("---->");
			}
			else
			{
				bFlag[at] = true;
			}
		}
		var xflag = false;
		for(var i in bFlag)
		{
			xflag |= bFlag[i]
		}
		return xflag;
	}
	function run()
	{
		window.clearTimeout(that.timers["fall"]);
		if(core())
		{
			that.timers["fall"] = window.setTimeout(run, speed);
		}
	}
	run();
}