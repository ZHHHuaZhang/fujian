
///<summary>
//jQuery 331

"use strict"



///<summary>
//GlobalDefination
//


var map;


function GlobalDefination(div, mapClass){

    map = {
        height: $(mapClass).height(),
        width: $(mapClass).width(),
        top: parseInt($(mapClass).css("top")),
        left: parseInt($(mapClass).css("left")),
    }
    $("html").scrollTop(0);
    $("html").scrollLeft(0);

}




///<summary>
//autoContainerSize

function autoHeight(container, maxLengthOne, count){

    var maxLength = $(maxLengthOne).width() * count + 35;
    $(container).height(maxLength);

}



///<summary>
//set invisible

function offThenOnElement(mode, element, time){

    if(mode === true){

        $(element).prop("disabled", "true");

        setTimeout(function(){
            $(element).removeAttr("disabled");
        }, time);

    }

    else{

        $(element).css("pointer-events", "none");

        setTimeout(function(){
            $(element).css("pointer-events", "visible");
        }, time)
    }

}



///<summary>
//map out of range prevention

function mapOutAvoid(value, max, min, wh){
    if( (value) <= -wh*min &&  (value) >= -wh*max){
    }
    else if( (value) > -wh*min){
        value = -(wh*min);
    }
    else if( (value) < -wh*max){
        value = -(wh*max);
    }
    return value;
}

///<summary>
//Zoom

function myZoom(zoomClass){

    var originalMapWidth = map.width;

    $(".zoomin").click(function(){

        if(map.width <= 2*originalMapWidth){

            offThenOnElement(true, this, 300);
            offThenOnElement(true, ".zoomout", 300);

            specificZoom(zoomClass, 2, 125, 225, false );

        }

    });

    $(".zoomout").click(function(){

        if(map.width > originalMapWidth){

            offThenOnElement(true, this, 300);

            specificZoom(zoomClass, 1/2, -250, -450, true);

        }

    });
}

function specificZoom(zoomClass, scale, topChange, leftChange, zoomout){

    map.height *= scale;

    map.width *= scale;

    map.top = scale*(map.top - topChange);

    map.left = scale*(map.left - leftChange);

    if(zoomout === true){
        map.top = mapOutAvoid(map.top, 0.5, 1/6.4, map.height);

        map.left = mapOutAvoid(map.left, 0.33, 1/12, map.width);
    }

    $(zoomClass).animate({
        height: map.height,
        width: map.width,
        top: map.top,
        left: map.left

    },
        1000, "swing"
    );
}



///<summary>
//SlideWindow

function mySlide(slideClass){

    var clientXRefer;
    var clientYRefer;

    var originalMapTop = map.top;
    var originalMapWidth = map.width;


    $("body").mousedown(function(){

        clientXRefer = event.clientX;

        clientYRefer = event.clientY;

    })

    $(slideClass).mouseup(function(){

        var topChange = clientYRefer - event.clientY;
        var leftChange = clientXRefer - event.clientX;

        map.top = mapOutAvoid(map.top-topChange, 0.58, 1/6.4, map.height);
        map.left = mapOutAvoid(map.left-leftChange, 0.33, 1/12, map.width);

        if(map.width > originalMapWidth){
            $(slideClass).animate({

                top:map.top,
                left:map.left
            },
                600, "swing"
            );
        }
    })

}

function t(){
    }


$(document).ready(function(){
    autoHeight(".Right", ".search", 1);
    autoHeight(".Zoom", ".zoomout", 2);
    GlobalDefination(".Global", ".map");
    mySlide(".map");
    myZoom(".map");
    t();
})
