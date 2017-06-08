window.requestNextAnimationFrame 
		= (function(){
			var self = this;
			callback = undefined;
			return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function(callback){
					var start,
						finish;

					window.setTimeout(function() {
						start = + new Date();
						callback(start);
						finish = +new Date();
						self.timeout = 1000/60 - (finish - start);
					}, self.timeout);
				};
		})();
window.test = (function(){
	return window.alert;
})();
