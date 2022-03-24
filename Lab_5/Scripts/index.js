$(document).ready(function () {
    $("#d1").click(function () {
        $("#d4").css("left", '-300vw');
        $("#d1").animate({left: '+=100vw'}, "fast");
        $("#d2").animate({left: '+=100vw'}, "fast");
        $("#d3").animate({left: '+=100vw'}, "fast");
        $("#d4").animate({left: '+=100vw'}, "fast");
    });
    
    $("#d2").click(function () {
        $("#d1").css("left", '-300vw');
        $("#d2").animate({left: '+=100vw'}, "fast");
        $("#d1").animate({left: '+=100vw'}, "fast");
        $("#d3").animate({left: '+=100vw'}, "fast");
        $("#d4").animate({left: '+=100vw'}, "fast");
    });
    
    $("#d3").click(function () {
        $("#d2").css("left", '-300vw');
        $("#d3").animate({left: '+=100vw'}, "fast");
        $("#d2").animate({left: '+=100vw'}, "fast");
        $("#d1").animate({left: '+=100vw'}, "fast");
        $("#d4").animate({left: '+=100vw'}, "fast");
    });
    
    $("#d4").click(function () {
        $("#d3").css("left", '-300vw');
        $("#d4").animate({left: '+=100vw'}, "fast");
        $("#d2").animate({left: '+=100vw'}, "fast");
        $("#d3").animate({left: '+=100vw'}, "fast");
        $("#d1").animate({left: '+=100vw'}, "fast");
    });
});