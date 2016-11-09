function MyApp() {

    this.init = function() {
        this._config = {
            width: 400,
            height: 400
        };
        this._rootNode = undefined;
        this._initElements();
        this._pushTopic([8]);
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
        //this._configureUpdate(dataElements);
        this._configureEnter(dataElements);
        //this._configureExit(dataElements);
    };

    this._configureEnter = function(dataElements) {
        var randomBetween = function(min, max) {
            var delta = max - min;
            return delta/2+min;//Math.random() * delta + min;
        };

        var width = this._config.width;
        var height = this._config.height;
        dataElements.enter().append('circle').attr('cx', function(dataItem) {
                return randomBetween(0, width)
            }).attr('cy', function(dataItem) {
                return randomBetween(0, height);
            }).attr('r', 0)
            .attr('fill', 'black')
            .transition()
            .duration(100)
            .attr('r', function(dataItem) {
                return dataItem * 10;
            });

        dataElements.enter().append('').attr('cx', function(dataItem) {
                return randomBetween(0, width)
            }).attr('cy', function(dataItem) {
                return randomBetween(0, height);
            }).attr('r', 0)
            .attr('fill', 'blue')
            .transition()
            .duration(100)
            .attr('r', function(dataItem) {
                return dataItem * 10;
            });

    };

/*
    this._configureUpdate = function(dataElements) {
        var hsl = "hsl(343, 50%, 80%)";
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
*/
    this.init();
    var objectRef = this;
/*
    setTimeout(function() {
        objectRef._pushTopic([9]);
    }, 4000);
*/
}

function initApp() {
    if (typeof(window.myApp) === 'undefined') {
        window.myApp = new MyApp();
    }
}
document.addEventListener('DOMContentLoaded', initApp);
