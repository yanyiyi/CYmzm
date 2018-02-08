$( document ).ready(function() {
    
    $("link").each(function(){
var d = new Date();
var n = d.getTime();
console.log($(this).attr("href"));
$(this).attr("href",$(this).attr("href")+"?"+n);
console.log($(this).attr("href"));
}); 
    
});