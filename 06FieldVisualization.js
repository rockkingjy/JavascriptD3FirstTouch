'use strict';

var FieldVisualization = function() {

    this._init = function() {
        this._dimension = 100;

        this._circleRadius = 5;

        this._rootNode = undefined;

        this._initElements();
    };

    this.refresh = function(pieModel) {
        var points = pieModel.getPoints();
        var circles = this._getCircles().data(points);
        this._configureEnteringCircles(circles.enter());
    };

    this._initElements = function() {
        this._rootNode = d3.select('#field-visualization')
            .append('svg')
            .attr('width', this._dimension)
            .attr('height', this._dimension);
    };

    this._getCircles = function() {
        return this._rootNode.selectAll('circle');
    };

    this._configureEnteringCircles = function(enteringCircles) {
        var scale =
            d3.scale.linear().domain([-1,1]).range([0, this._dimension]);

        enteringCircles.append('circle')
            .attr({
                cx: function (point) {
                    return scale(point.x);
                },
                cy: function (point) {
                    return scale(point.y);
                },
                r: 0,
                fill: function(point) {
                    if (point.inCircle) {
                        return '#32E510';
                    }
                    return '#E53210';
                }
            })
            .transition()
            .duration(500)
            .attr('r', this._circleRadius);
    };

    this._init();
};
