
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
        topChange:0,
        leftChange:0
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
//Zoom

function myZoom(zoomClass){

    var originalMapWidth = map.width;

    $(".zoomin").click(function(){

        if(map.width <= 2*originalMapWidth){

            offThenOnElement(true, this, 300);
            offThenOnElement(true, ".zoomout", 300);

            specificZoom(zoomClass, 2, 125, 225 );

        }

    });

    $(".zoomout").click(function(){

        if(map.width > originalMapWidth){

            offThenOnElement(true, this, 300);

            specificZoom(zoomClass, 1/2, -250, -450);

        }

    });
}

function specificZoom(zoomClass, scale, topChange, leftChange){

    map.height *= scale;

    map.width *= scale;

    map.top = scale*(map.top - topChange);

    map.left = scale*(map.left - leftChange);

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
        (map.left-=leftChange) <= -(map.width/12) ?(map.left *= 1) : (map.left= -(map.width/12));
        (map.top -=topChange) <= -(map.height/6.4) ? (map.top *= 1) : (map.top= -(map.height/6.4));


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
    $("img").click(function(){

    alert($(this).height());
    })
}


$(document).ready(function(){
    autoHeight(".Right", ".search", 1);
    autoHeight(".Zoom", ".zoomout", 2);
    GlobalDefination(".Global", ".map");
    mySlide(".map");
    myZoom(".map");
})
