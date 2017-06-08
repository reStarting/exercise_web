/**
 * 将鼠标位置纠正
 * @param  {contex} context 上下文
 * @param  {[type]} x       x坐标
 * @param  {[type]} y       y坐标
 * @return {[type]}         [description]
 */
function windowToCanvas(context, x, y)
{
	var l = context.canvas.offsetLeft;
	var t = context.canvas.offsetTop;
	return {
		x:x-l,
		y:y-t
	}
}
/**
 * 画边框线
 * @param  {[type]} context [description]
 * @return {[type]}         [description]
 */
function drawTempLine(context)
{
	context.canvas.style.border = "1px solid red";
}
/**
 * 画表格
 * @param  {[type]} style    表格线的样式
 * @param  {[type]} hSpacing 横向间隔
 * @param  {[type]} vSpacing 纵向间隔
 * @return {[type]}          [description]
 */
function drawGrid(context, hSpacing, vSpacing, style)
{
	var h = context.canvas.height;
	var w = context.canvas.width;
	var hLines = Math.floor(h/hSpacing);
	var vLines = Math.floor(w/vSpacing);
	context.save();
	context.strokeStyle = style || "rgba(0,0,0,1)";
	for(var i=1; i<hLines; i++)
	{
		context.beginPath();
		context.moveTo(0, i*hSpacing+0.5);
		context.lineTo(w, i*hSpacing+0.5);
		context.stroke();
	}
	for(var i=1; i<vLines; i++)
	{
		context.beginPath();
		context.moveTo(i*vSpacing+0.5, 0);
		context.lineTo(i*vSpacing+0.5, h);
		context.stroke();
	}
	context.restore();
}