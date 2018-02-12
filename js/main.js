$( document ).ready(function() {
    
$("link").each(function(){
var d = new Date();
var n = d.getTime();
console.log($(this).attr("href"));
$(this).attr("href",$(this).attr("href")+"?"+n);
console.log($(this).attr("href"));
}); 
   
    let navbar = document.getElementsByClassName("navBar")[0];
    let action = document.getElementsByClassName("firstSec")[0];
    let offset = 0;
        window.addEventListener("scroll", () => {
            let bottom = action.getBoundingClientRect().bottom;
            if ( bottom < action.offsetHeight - offset || window.innerWidth <= 768 )
               {
                navbar.style.animationDuration = "0.5s";
                navbar.style.animationFillMode = "forwards";
                navbar.style.animationName = "backgroundFadeIn";
                }
            else navbar.style.animationName = "backgroundFadeOut";
        });
      
    
    $.getJSON('https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20%3D%2028777581%20and%20u%3D%22c%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function(json) {
  var w_code = weather_con[json.query.results.channel.item.condition.code.toString()];
  var w_temp = json.query.results.channel.item.condition.temp + "℃";
  console.log(w_code);
  console.log(w_temp);
});
 
    
    
weather_con = {
"0":"龍捲風",
"1":"熱帶風暴",
"2":"颶風",
"3":"強雷陣雨",
"4":"雷陣雨",
"5":"混合雨雪",
"6":"混合雨雪",
"7":"混合雨雪",
"8":"冰凍小雨",
"9":"細雨",
"10":"凍雨",
"11":"陣雨",
"12":"陣雨",
"13":"飄雪",
"14":"陣雪",
"15":"吹雪",
"16":"下雪",
"17":"冰雹",
"18":"雨雪",
"19":"多塵",
"20":"多霧",
"21":"陰霾",
"22":"多煙",
"23":"狂風大作",
"24":"有風",
"25":"冷",
"26":"多雲",
"27":"晴間多雲（夜）",
"28":"晴間多雲（日）",
"29":"晴間多雲（夜）",
"30":"晴間多雲（日）",
"31":"清晰的（夜）",
"32":"晴朗",
"33":"晴朗（夜）",
"34":"晴朗（日）",
"35":"雨和冰雹",
"36":"炎熱",
"37":"雷陣雨",
"38":"零星雷陣雨",
"39":"零星雷陣雨",
"40":"零星雷陣雨",
"41":"大雪",
"42":"零星陣雪",
"43":"大雪",
"44":"多雲",
"45":"雷陣雨",
"46":"陣雪",
"47":"雷陣雨",
"3200":"資料錯誤"
};
var clickItem = {
    "1":"HK",
"2":"HL",
"3":"PAC",
"4":"AL",
"5":"MS",
"6":"ZN",
"7":"LC",
"8":"SK",
"9":"ZP",
"10":"PZ",
"11":"ML",
"12":"TP"
}
var clickMark = 0; 
$.each(clickItem, function (mzmKey, mzmName){
    var mzmID ="#mzm"+ mzmName +" .infoBox"
    $(".mzm" + mzmName).hover(function() {
        if(clickMark == 0){
           $("#select1").addClass("selectHover");
        } else if (clickMark == 1){ 
            $("#select2").addClass("selectHover");
        } else if (clickMark == 2){ 
            $("#select3").addClass("selectHover");
        }
    },function() {if(clickMark == 0){
           $("#select1").removeClass("selectHover");
        } else if (clickMark == 1){ 
            $("#select2").removeClass("selectHover");
        } else if (clickMark == 2){ 
            $("#select3").removeClass("selectHover");
        }});
    $(".mzm" + mzmName).click(function() {
        var infoBoxContent = $(mzmID).children().clone(true);
     clickMark++;   
    if(clickMark == 1){
        $("#select1").children().remove();
        $(".select1Btn").removeClass("activeDisplay");
        $(".select1Btn").removeClass("select1Btn");
        $(this).addClass("select1Btn");
        $(this).addClass("activeDisplay");
        
        $("#select1").append(infoBoxContent); 
        $("#select1").removeClass("selectHover");
        
    }else if(clickMark == 2){
        $("#select2").children().remove();
        
        $(".select2Btn").removeClass("activeDisplay");
        $(".select2Btn").removeClass("select2Btn");
        $(this).addClass("select2Btn");
        $(this).addClass("activeDisplay");
      $("#select2").append(infoBoxContent); 
        $("#select2").removeClass("selectHover");
    }else if(clickMark == 3){
   $("#select3").children().remove();
        
        $(".select3Btn").removeClass("activeDisplay");
        $(".select3Btn").removeClass("select3Btn");
        $(this).addClass("select3Btn");
        $(this).addClass("activeDisplay");
        
      $("#select3").append(infoBoxContent);
        $("#select3").removeClass("selectHover");
      clickMark = 0;     
    }
    
});
}); //for
    
    
    
});

