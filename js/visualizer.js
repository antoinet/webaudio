/*
 * visualizer.js
 *
 * Visualizes signal data in frequency and time domain in a canvas.
 */

function Visualizer(canvas) {
	this.canvas = canvas;
	this.context = this.canvas.getContext('2d');
	
	this.font = '8pt Calibri';
	this.tickSize = 20;
	
	this.minX = 500; // Hz
	this.maxX = 2000; // Hz
	this.minY = 0;
	this.maxY = 255;
	this.unitsPerTick = 100; // Hz
	this.rangeX = this.maxX - this.minX;
	this.rangeY = this.maxY - this.minY;
	this.pixelsPerUnitX = this.canvas.width/this.rangeX;
	this.pixelsPerUnitY = this.canvas.height/this.rangeY;
}

Visualizer.prototype.draw = function (freqArray, sampleRate) {
	// some local variables for convenience
	var context = this.context;
	var width = this.canvas.width;
	var height = this.canvas.height;
	var binCount = freqArray.length;
	var binWidth = sampleRate/binCount;

	
	// clear canvas
	context.clearRect(0, 0, width, height);
	
	// draw frequency spectrum
	var i = Math.round(this.minX*binCount/sampleRate);
	var unitX = i*binWidth;
	var posX = (unitX - this.minX)*this.pixelsPerUnitX;
	while (unitX <= this.maxX) {
		var binHeight = height*freqArray[i];
		var hue = unitX/this.rangeX * 360;
	    context.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
		context.fillRect(posX, height - binHeight - 1, binWidth, height);
		i++;
		unitX += binWidth;
		posX += binWidth*this.pixelsPerUnitX;
	}
	
	this.drawXTicks();
	this.drawSampleRate(sampleRate);
}

Visualizer.prototype.drawXTicks = function () {
	var posIncrementX = this.unitsPerTick * this.pixelsPerUnitX;
	var posX, unitX;
	var context = this.context;
	
	context.save();
	context.font = this.font;
	context.textAlign = 'center';
	context.textBaseline = 'top';
	context.strokeStyle='grey';
	context.fillStyle='grey';
	
	posX = 0;
	unitX = this.minX;
	while (unitX <= this.maxX) {
		// draw tick
		context.moveTo(posX, this.canvas.height - this.tickSize);
		context.lineTo(posX, this.canvas.height);
		context.stroke();
		
		// draw text
		var text = Math.floor(unitX) + ' Hz';
		var textDims = context.measureText(text);
		context.save();
			context.translate(posX, this.canvas.height - 5 - textDims.width/2);
			context.rotate(-Math.PI/2);
			context.fillText(text, 0, 0);
		context.restore();
		unitX += this.unitsPerTick;
		posX = Math.round(posX + posIncrementX);
	}
	context.restore();
}

Visualizer.prototype.drawSampleRate = function (rate) {
	var context = this.context;
	var canvas = this.canvas;
	
	context.save();
	context.font = this.font;
	context.textAlign = 'center';
	context.textBaseline = 'top';
	context.strokeStyle='grey';
	context.fillStyle='grey';
	
	var text = rate + ' Hz';
	var textDims = context.measureText(text);
	context.fillText(text, canvas.width - textDims.width/2 - 5, 2);
	
	context.restore();
}
