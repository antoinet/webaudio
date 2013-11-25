/*
 * shared.js
 *
 * Define cross-browser constants
 */

window.AudioContext = window.AudioContext || window.webkitAudioContext;

navigator.getUserMedia = navigator.getUserMedia
					|| navigator.webkitGetUserMedia
					|| navigator.mozGetUserMedia
					|| navigator.msGetUserMedia;

window.requestAnimFrame = (function() {
	return  window.requestAnimationFrame 
		|| window.webkitRequestAnimationFrame
		|| window.mozRequestAnimationFrame
		|| function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
})();

function getQueryStringParameters () {
	params = {};
	var queryString = document.URL.split('?')[1];
	if (queryString) {
		keyValues = queryString.split('&');
		for (var i = 0; i < keyValues.length; i++) {
			var parts = keyValues[i].split('=');
			params[parts[0]] = parts[1];
		}
	}
	return params;
}