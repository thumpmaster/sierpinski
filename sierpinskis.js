$(document). ready(function() {
    var sierpinski = function (id, width, height, context, wrapper, zoomin, zoomout) {
    	this.id = id;
		this.width = width;
		this.height = height;
		this.context = context;
		this.minWidth = 20;
		this.currentZoom = 1.0;
		this.$wrapper = $(wrapper);
        this.$zoomInDiv = $(zoomin);
        this.$zoomOutDiv = $(zoomout);
        this.drawFirstTriangle();
        this.zoomStart();
    };

    sierpinski.prototype = {
    	getCoordinates: function(x, y) {
    		return {'x':x, 'y':y};
		},
		getCenterPoint: function(rndA, rndB) {
			return this.getCoordinates((rndA.x + rndB.x) / 2, (rndA.y + rndB.y) / 2);
		},
        generateInnerTriangles: function (width, pointA, pointB, pointC, color) {
            var pointD = this.getCenterPoint(pointA, pointB);
            var pointE = this.getCenterPoint(pointB, pointC);
            var pointF = this.getCenterPoint(pointA, pointC);

            if(width > this.minWidth) {
                this.drawTriangle(pointD, pointE, pointF, color);
                this.generateInnerTriangles(width/2, pointA, pointD, pointF, "#00ff1a");
                this.generateInnerTriangles(width/2, pointD, pointB, pointE, "#ff0000");
                this.generateInnerTriangles(width/2, pointF, pointE, pointC, "#ffc300");
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
		},
		zoomStart: function () {
            this.$zoomInDiv.on("click", this.zoomIn.bind(this));
            this.$zoomOutDiv.on("click", this.zoomOut.bind(this));
        },
		zoomIn: function () {
            this.currentZoom = this.currentZoom+0.10;
            if(this.currentZoom > 2) return;
            var scaleString = "scale("+this.currentZoom+")";
            this.$wrapper.css({
                transform: scaleString, // set zoom
                transformOrigin: 'bottom right' // set transform scale base
            });
            this.minWidth = this.minWidth - 2;
            if(this.minWidth > 0) {
                this.drawFirstTriangle();
            }
        },
        zoomOut: function () {
            this.$wrapper.css({
                transform: 'none'
            });
            this.minWidth = 20;
            this.drawFirstTriangle();
        }
	};

    var canvas = document.getElementById("sierpinskis");
	new sierpinski(canvas.id, canvas.width, canvas.height, canvas.getContext("2d"), '.wrapper', '#zoom_in', '#zoom_out');
});