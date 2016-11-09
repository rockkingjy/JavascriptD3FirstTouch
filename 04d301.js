//https://jsfiddle.net/thudfactor/HdwTH/
var randomInt = function(max) {
    if (typeof(max) === 'undefined') {
        max = 255;
    }
    return Math.round(Math.random() * max);
};

var getRandomHsl = function() {
    var hslValues = [randomInt(360), '50%', '80%'];
    return 'hsl(' + hslValues.join(', ') + ')';
};

function MyApp() {

    this.init = function() {
        this._config = {
            width: 400,
            height: 400
        };

        this._rootNode = undefined;

        this._initElements();
        this._pushTopic([1,2,3]);
    };

    this._initElements = function() {
        this._rootNode = d3.select('#chart')
            .append('svg')
            .attr('width', this._config.width)
            .attr('height', this._config.height);

    };

    this._getDataElements = function() {
        return this._rootNode.selectAll('circle');
    };

    this._pushTopic = function(newData) {
        var dataElements = this._getDataElements().data(newData);
        this._configureUpdate(dataElements);
        this._configureEnter(dataElements);
        this._configureExit(dataElements);
    };

    this._configureEnter = function(dataElements) {
        var randomBetween = function(min, max) {
            var delta = max - min;
            return Math.random() * delta + min;
        };

        var width = this._config.width;
        var height = this._config.height;
        dataElements.enter().append('circle').attr('cx', function(dataItem) {
                return randomBetween(0, width)
            }).attr('cy', function(dataItem) {
                return randomBetween(0, height);
            }).attr('r', 0)
            .attr('fill', 'green')
            .transition()
            .duration(1000)
            .attr('r', function(dataItem) {
                return dataItem * 10;
            });
    };


    this._configureUpdate = function(dataElements) {
        var hsl = getRandomHsl();
        dataElements.transition()
            .duration(2000)
            .attr('r', function(dataItem) {
                return dataItem * 10;
            })
            .attr('fill', hsl);
    };

    this._configureExit = function(dataElements) {
        var exit = dataElements.exit();
        exit.attr('fill', 'red')
            .transition()
            .delay(500)
            .duration(500)
            .attr('r', 0)
            .remove();
    };

    this.init();

    var objectRef = this;
    setTimeout(function() {
        objectRef._pushTopic([2,3,5,6]);
    }, 2000);

    setTimeout(function() {
        objectRef._pushTopic([9]);
    }, 4000);

}

function initApp() {
    if (typeof(window.myApp) === 'undefined') {
        window.myApp = new MyApp();
		console.log('hello d3');
    }
}
document.addEventListener('DOMContentLoaded', initApp);
