
///<summary>
//jQuery 331

"use strict"



///<summary>
//GlobalDefination

var actulWidth;

var currentScale;

var originalScale;

function GlobalDefination(){
    actulWidth = $(".Global").width();
    currentScale = actulWidth/$(".Global").width();
    originalScale = currentScale;
}



///<summary>
//autoContainerSize

function autoHeight(container, maxLengthOne){
    var maxLength = $(maxLengthOne).width() + 80;
    $(container).height(maxLength);
}



///<summary>
//Zoom

function Zoom(){
    $(".zoomIn").click(function(){
        if(currentScale <= 2.5 * originalScale){
            ZoomIn(".Global");
        }
    });
    $(".zoomOut").click(function(){
        if(currentScale > originalScale){
            ZoomOut(".Global");
        }
    });

}

function ZoomIn(img){
    var scaleRefer = currentScale;

    var zoom = setInterval(function(){
        scaleRefer += 0.05;
        $(img).css("transform", "scale("+scaleRefer+")");
        if(scaleRefer >= currentScale + 0.25){
            clearInterval(zoom);
            currentScale = scaleRefer;
        }
    }, 24);

}

function ZoomOut(img){
    var scaleRefer = currentScale;

    var zoom = setInterval(function(){
        scaleRefer -= 0.05;
        $(img).css("transform", "scale("+scaleRefer+")");
        if(scaleRefer <= currentScale - 0.25){
            clearInterval(zoom);
            currentScale = scaleRefer;
        }
    }, 24);
}


$(document).ready(function(){
    GlobalDefination();
    Zoom();
    alert(currentScale);
    alert($(".Global").width());
})
