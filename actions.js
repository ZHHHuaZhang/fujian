//preset function
function addWindowLoad(func)
{
    var oldLoads = window.onload;
    //before defining window.onload(s) its type is "null"
    if(typeof window.onload != "function")
    {
        window.onload = func; //set first loadfunc
        //window.onload's type is "function" now
    }
    else
    {
        window.onload = function()
        {
            oldLoads();
            func();
        }
    }
}


function renderCanvas(id, x1, y1, x2, y2){
    var c=document.getElementById(id);
    var ctx=c.getContext("2d");
    ctx.rect(x1, y1, x2, y2);
    ctx.fillStyle="#505050";
    ctx.fill();
}

window.onload = function(){
    renderCanvas("topfill",0,0,window.screen.availWidth,100);
    renderCanvas("leftfill",0,-100,300,window.screen.availHeight);
}

