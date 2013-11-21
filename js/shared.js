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

window.requestAnimFrame = window.requestAnimationFrame
					|| window.webkitRequestAnimationFrame
					|| window.mozRequestAnimationFrame
					|| window.oRequestAnimationFrame
					|| window.msRequestAnimationFrame;

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