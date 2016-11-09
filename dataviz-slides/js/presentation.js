$(document).ready(function() {
    setTimeout(function() {
        $(".big-text").bigtext();
        
        var settings = {
                "size" : {
                    "grid" : 3
                },
                "options" : {
                    "color" : "random-dark",
                    "rotationRatio": 0.5,
                    "printMultiplier" : 1.25
                    
                },
                "font" : "sans-serif",
                "shape" : "circle"
        };

        $( ".words-cloud" ).each(function() {
            $(this).awesomeCloud( settings );
        });
        
    }, 1000);
});
