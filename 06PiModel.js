'use strict';

var PiModel = function() {

    this._simulationBatchSize = 5;

    this._points = [];
    this._simulationsValues = [];

    this.improveSimulation = function() {
        for (var i = 0; i < this._simulationBatchSize; i += 1) {
            this._points.push(this._getNewPoint());
        }
        this._simulationsValues.push(this._computeCurrentSimulationValue());
    };

    this.getPoints = function() {
        return this._points;
    };

    this._getNewPoint = function() {
        var point = {
            x: this._generatePointCoordinateValue(),
            y: this._generatePointCoordinateValue()
        };
        var distanceToTheCenter =
            Math.sqrt(point.x * point.x + point.y * point.y);
        point.inCircle = distanceToTheCenter <= 1;
        return point;
    };

    this._generatePointCoordinateValue = function() {
        var randomCoordinate = Math.random(); // in [0, 1];
        randomCoordinate = randomCoordinate * 2; // in [0, 2];
        randomCoordinate = randomCoordinate - 1; // in [-1, 1];
        return randomCoordinate;
    };

    this._computeCurrentSimulationValue = function() {
        var inCirclePoints = this._points.filter(function(point) {
            return point.inCircle;
        });
        var inCirclePointsCount = inCirclePoints.length;
        var totalCount = this._points.length;
        var piValue = 4 * inCirclePointsCount / totalCount;
        return piValue
    }

};

(function() {
    var piModel = new PiModel();
    assert('inCircle' in (piModel._getNewPoint()),
        'some inCircle attribut must be present');

    for (var i = 0; i < 100; i += 1) {
        piModel.improveSimulation();
    }


    var firstDifferenceWithPi = Math.abs(piModel._simulationsValues[0] - Math.PI);
    var lastSimulationValueIndex = piModel._simulationsValues.length - 1;
    var lastDifferenceWithPi =
        Math.abs(
            piModel._simulationsValues[lastSimulationValueIndex] - Math.PI
        );
    assert(firstDifferenceWithPi > lastDifferenceWithPi,
        'Improvement should happen');
})();