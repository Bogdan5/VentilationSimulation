let canvas = document.querySelector('canvas');
let ctx = canvas.getContext("2d");
// Transmitter
ctx.strokeStyle = "rgb(179, 225, 236)";
ctx.lineWidth = 3;
ctx.strokeRect(20, 25, 150, 10);
ctx.strokeStyle = "rgb(179, 225, 236)";
ctx.lineWidth = 3;
ctx.strokeRect(170, 5, 20, 50);
ctx.strokeStyle = "rgb(179, 225, 236)";
ctx.lineWidth = 3;
ctx.strokeRect(190, 15, 25, 30);
//Line betwee transmitter and controller
ctx.moveTo(215, 30);
ctx.lineTo(500, 30);
ctx.stroke();
ctx.font = '25px Arial';
ctx.fillText("I", 225, 65);