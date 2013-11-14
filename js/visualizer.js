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
	this.maxX = this.sampleRate/4;
	this.minY = -10;
	this.maxY = 5;
	this.unitsPerTick = 1000;
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
	
	//this.drawGrid();
	this.drawXTicks();
	
	// draw frequency spectrum
	for (var i = 0; i < binCount; i++) {
		var normalizedFreq = this.freqs[i]/256;
		var binHeight = height*normalizedFreq;
		context.fillStyle = 'black';
		context.fillRect(i*binWidth, height - binHeight - 1, binWidth, height);
	}
	
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
	
	xPos = this.centerX + xPosIncrement;
	unit = this.unitsPerTick;
	while (xPos < this.canvas.width) {
		context.moveTo(xPos, this.centerY - this.tickSize/2);
		context.lineTo(xPos, this.centerY + this.tickSize/2);
		context.stroke();
		context.fillText(unit/100, xPos, this.centerY + this.tickSize/2 + 3);
		unit += this.unitsPerTick;
		xPos = Math.round(xPos + xPosIncrement);
	}
	context.restore();
}

Visualizer.prototype.drawGrid = function() {
	var context = this.context;
	var width = this.canvas.width;
	var height = this.canvas.height;
	var binCount = this.freqs.length/2;
	var binWidth = width/binCount;
	
	context.save();
	for (var i = 0; i < binCount; i++) {
		context.beginPath();
		context.moveTo(i*binWidth, 0);
		context.lineTo(i*binWidth, height);
		context.strokeStyle = '#cccccc';
		context.stroke();
	}
	context.restore();
}