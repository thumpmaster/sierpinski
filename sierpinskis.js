$(document). ready(function() {
    var sierpinski = function (id, width, height, context) {
    	this.id = id;
		this.width = width;
		this.height = height;
		this.context = context;
		this.minWidth = 10;
        this.drawFirstTriangle();
    };

    sierpinski.prototype = {
    	getCoordinates: function(x, y) {
    		return {'x':x, 'y':y};
		},
		getCenterPoint: function(rndA, rndB) {
			return this.getCoordinates((rndA.x + rndB.x) / 2, (rndA.y + rndB.y) / 2);
		},
        generateInnerTriangles: function (width, pointA, pointB, pointC) {
            var pointD = this.getCenterPoint(pointA, pointB);
            var pointE = this.getCenterPoint(pointB, pointC);
            var pointF = this.getCenterPoint(pointA, pointC);
            var color = "#fff";
            if(width > this.minWidth) {
                this.drawTriangle(pointD, pointE, pointF, color);
                this.generateInnerTriangles(width/2, pointA, pointD, pointF, color);
                this.generateInnerTriangles(width/2, pointD, pointB, pointE, color);
                this.generateInnerTriangles(width/2, pointF, pointE, pointC, color);
            }
        },
        drawFirstTriangle: function() {
            var pointA = this.getCoordinates(this.width/2, 0);
            var pointB = this.getCoordinates(0, this.height);
            var pointC = this.getCoordinates(this.width, this.height);
            this.drawTriangle(pointA, pointB, pointC, '#000');
            this.generateInnerTriangles(this.width, pointA, pointB, pointC);
		},
		drawTriangle: function(pointA, pointB, pointC, color) {
			this.context.beginPath();
            this.context.moveTo(pointA.x, pointA.y);
            this.context.lineTo(pointB.x, pointB.y);
            this.context.lineTo(pointC.x, pointC.y);
            this.context.closePath();
            this.context.fillStyle=color;
            this.context.fill();
		}
	};

    var canvas = document.getElementById("sierpinskis");
	new sierpinski(canvas.id, canvas.width, canvas.height, canvas.getContext("2d"));
});