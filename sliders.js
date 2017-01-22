$(function() { 
    $("#slider-1").slider({
        range:true, 
        min:2017, 
        max:2060, 
        slide:function(event, ui) { 
            $("#slidevalue")
                .val(ui.values[1]); 
        }
    });
}); 

