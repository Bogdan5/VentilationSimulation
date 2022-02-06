let canvas = document.querySelector('canvas');
let ctx = canvas.getContext("2d");
// Transmitter
ctx.strokeStyle = "rgb(179, 225, 236)";
ctx.lineWidth = 3;
ctx.strokeRect(20, 25, 100, 10);
ctx.strokeStyle = "rgb(179, 225, 236)";
ctx.lineWidth = 3;
ctx.strokeRect(120, 5, 20, 50);
ctx.strokeStyle = "rgb(179, 225, 236)";
ctx.lineWidth = 3;
ctx.strokeRect(140, 15, 25, 30);
//Line betwee transmitter and controller
ctx.moveTo(165, 30);
ctx.lineTo(450, 30);
ctx.stroke();
//Letter indicator for transmitter
ctx.font = '25px Arial';
ctx.fillText("I", 175, 65);
//Controller main outline
ctx.strokeStyle = "rgb(179, 225, 236)";
ctx.lineWidth = 3;
ctx.strokeRect(450, 25, 150, 43);
//Indicator for controller
ctx.font = '15px Arial';
ctx.fillText("CONTROLLER", 335, 65);
//Circles controller
let list = [480, 525, 570];
ctx.beginPath();
list.forEach(i => {
    ctx.moveTo(i + 17, 46);
    ctx.arc(i, 46, 17, 0, 2 * Math.PI);
});
ctx.stroke();
//Line for the main line
ctx.moveTo(525, 0);
ctx.lineTo(525, 25);
ctx.stroke();
//Letter indicator for the main line
ctx.font = '25px Arial';
ctx.fillText("M", 540, 18);
//Line between controller and final control
ctx.moveTo(600, 30);
ctx.lineTo(850, 30);
ctx.stroke();
//Final control main outline
ctx.strokeStyle = "rgb(179, 225, 236)";
ctx.lineWidth = 3;
ctx.strokeRect(850, 15, 100, 43);
ctx.strokeRect(950, 34, 50, 4);
//Letter indicator for the final control
ctx.font = '25px Arial';
ctx.fillText("B", 820, 65);

