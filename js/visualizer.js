/*
 * visualizer.js
 *
 * Visualizes signal data in frequency and time domain in a canvas.
 */

function Visualizer(analyser, sampleRate, canvas) {
	this.analyser = analyser;
	this.sampleRate = sampleRate;
	this.freqs = new Uint8Array(this.analyser.frequencyBinCount);
	this.times = new Uint8Array(this.analyser.frequencyBinCount);
	
	this.canvas = canvas;
	this.context = this.canvas.getContext('2d');
	
	this.font = '8pt Calibri';
	this.tickSize = 20;
	
	this.minX = 0;
	this.maxX = this.sampleRate/2;
	this.minY = 0;
	this.maxY = 255;
	this.unitsPerTick = 10*2*this.sampleRate/this.analyser.fftSize;
	this.rangeX = this.maxX - this.minX;
	this.rangeY = this.maxY - this.minY;
	this.unitX = this.canvas.width/this.rangeX;
	this.unitY = this.canvas.height/this.rangeY;
	this.centerX = Math.round(Math.abs(this.minX/this.rangeX)*this.canvas.width);
	this.centerY = Math.round(Math.abs(this.minY/this.rangeY)*this.canvas.height);
	this.scaleX = this.canvas.width/this.rangeX;
	this.scaleY = this.canvas.height/this.rangeY;
}

Visualizer.prototype.draw = function () {
	// get signal data
	this.analyser.getByteFrequencyData(this.freqs);
	this.analyser.getByteTimeDomainData(this.times);
	
	// some local variables for convenience
	var context = this.context;
	var width = this.canvas.width;
	var height = this.canvas.height;
	var binCount = this.freqs.length/2;
	var binWidth = width/binCount;
	
	// clear canvas
	context.clearRect(0, 0, width, height);
	
	// draw frequency spectrum
	for (var i = 0; i < binCount; i++) {
		var normalizedFreq = this.freqs[i]/256;
		var binHeight = height*normalizedFreq;
		var hue = i/binCount * 360;
	    context.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
		context.fillRect(i*binWidth, height - binHeight - 1, binWidth, height);
	}
	
	this.drawXTicks();
	
	// draw
	requestAnimFrame(this.draw.bind(this));
}

Visualizer.prototype.drawXTicks = function () {
	var xPosIncrement = this.unitsPerTick * this.unitX;
	var xPos, unit;
	var context = this.context;
	
	context.save();
	context.font = this.font;
	context.textAlign = 'center';
	context.textBaseline = 'top';
	context.strokeStyle='grey';
	context.fillStyle='grey';
	
	xPos = this.centerX;
	unit = this.unitsPerTick;
	while (xPos < this.canvas.width) {
		// draw tick
		context.moveTo(xPos, this.canvas.height - this.tickSize);
		context.lineTo(xPos, this.canvas.height);
		context.stroke();
		
		// draw text
		var text = Math.floor(unit) + ' Hz';
		var textDims = context.measureText(text);
		console.log(textDims);
		context.save();
			context.translate(xPos + xPosIncrement/2 - 4, this.canvas.height - 5 - textDims.width/2);
			context.rotate(-Math.PI/2);
			context.fillText(text, 0, 0);
		context.restore();
		unit += this.unitsPerTick;
		xPos = Math.round(xPos + xPosIncrement);
	}
	context.restore();
}
