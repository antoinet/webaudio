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