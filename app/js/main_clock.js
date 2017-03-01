var width = 250;
var height = 150;
var Radius = 1.5;
var animateBall = [];
var curTime = new Date();
var hours = curTime.getHours();
var mins = curTime.getMinutes();
var seconds = curTime.getSeconds();
var colors = ['rgb(254,67,101)', 'rgb(252,157,154)', 'rgb(249,205,173)',
	'rgb(200,200,169)',
	'rgb(131,175,155)',
	'rgb(182,192,154)'
];

$('body').ready(function() {
	var canvas = $('#canvas')[0];
	var context = canvas.getContext('2d');
	canvas.width = width;
	canvas.height = height;

	// context.moveTo(0, 0);
	// context.lineTo(width, height);
	// context.stroke();
	setInterval(function() {
		render(context);
	}, 13);
});


function render(cxt) {
	var time = new Date();
	var oldTime = curTime;
	if (time.getSeconds() != curTime.getSeconds()) {
		curTime = time;
		seconds = curTime.getSeconds();
		addBall(Math.floor(seconds / 10), 50 + 78 * Radius, 50);
		addBall(seconds - 10 * Math.floor(seconds / 10), 50 + 93 * Radius, 50);
	}
	if (time.getMinutes() != oldTime.getMinutes()) {

		mins = curTime.getMinutes();
		addBall(Math.floor(mins / 10), 50 + 39 * Radius, 50);
		addBall(mins - 10 * Math.floor(mins / 10), 50 + 54 * Radius, 50);
	}
	if (time.getHours() != oldTime.getHours()) {
		hours = curTime.getHours();
		addBall(Math.floor(hours / 10), 50, 50);
		addBall((hours - 10 * Math.floor(hours / 10)), 50 + 15 * Radius, 50);
	}

	cxt.clearRect(0, 0, cxt.canvas.width, canvas.height);

	renderOneNum(cxt, Math.floor(hours / 10), 50, 50)
	renderOneNum(cxt, (hours - 10 * Math.floor(hours / 10)), 50 + 15 * Radius, 50)
	renderOneNum(cxt, 10, 50 + 30 * Radius, 50)
	renderOneNum(cxt, Math.floor(mins / 10), 50 + 39 * Radius, 50)
	renderOneNum(cxt, mins - 10 * Math.floor(mins / 10), 50 + 54 * Radius, 50)
	renderOneNum(cxt, 10, 50 + 69 * Radius, 50)
	renderOneNum(cxt, Math.floor(seconds / 10), 50 + 78 * Radius, 50)
	renderOneNum(cxt, seconds - 10 * Math.floor(seconds / 10), 50 + 93 * Radius, 50)
	renderBall(cxt);
	animate(cxt);
	removeBalls();
}

function renderOneNum(cxt, num, x, y) {

	cxt.fillStyle = '#059';
	for (var i = 0; i < number[num].length; i++) {
		for (var j = 0; j < number[num][i].length; j++) {
			if (number[num][i][j] == 1) {
				cxt.beginPath();
				cxt.arc(x + Radius + j * (2 * Radius), y + Radius + i * (2 * Radius), Radius, 0, 2 * Math.PI);
				cxt.closePath();
				cxt.fill();
			}
		}
	}


}

function animate(cxt) {
	for (var i = 0; i < animateBall.length; i++) {
		animateBall[i].x += 0.2*animateBall[i].vx;
		animateBall[i].y += 0.25*animateBall[i].vy;
		animateBall[i].vy += 0.2*animateBall[i].g;
		if (animateBall[i].y + Radius >= height) {
			animateBall[i].y = animateBall[i].y - Radius;
			animateBall[i].vy = -animateBall[i].vy * 0.7;
		}
	}
}


function addBall(num, x, y) {
	for (var i = 0; i < number[num].length; i++) {
		for (var j = 0; j < number[num][i].length; j++) {
			if (number[num][i][j] == 1) {
				var ball = {
					x: x + Radius + j * (2 * Radius),
					y: y + Radius + i * (2 * Radius),
					vx: Math.random() < 0.5 ? -6 * (Math.random() + 1) : 3 * (Math.random() + 1),
					vy: -1,
					g: 3 * Math.random() + 0.5,
					color: colors[Math.floor(Math.random() * 6)]
				};
				animateBall.push(ball);
			}
		}
	}

}

function removeBalls() {
	var j = 0;
	for (var i = 0; i < animateBall.length; i++) {

		if (animateBall[i].x - Radius > 0 && animateBall[i].x + Radius < width) {
			animateBall[j++] = animateBall[i];

		}
	}
	while (animateBall.length > j) {
		animateBall.pop();
	}
}

function renderBall(cxt) {
	for (var i = 0; i < animateBall.length; i++) {
		cxt.fillStyle = animateBall[i].color;
		cxt.beginPath();
		cxt.arc(animateBall[i].x, animateBall[i].y, Radius, 0, 2 * Math.PI);
		cxt.closePath();
		cxt.fill();
	}

}