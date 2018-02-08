$( document ).ready(function() {
    
    $("link").each(function(){
var d = new Date();
var n = d.getTime();
console.log($(this).attr("href"));
$(this).attr("href",$(this).attr("href")+"?"+n);
console.log($(this).attr("href"));
}); 
   
    let navbar = document.getElementsByClassName("navBar")[0];

    
    let action = document.getElementById("firstSec");
        let offset = 0;
        window.addEventListener("scroll", () => {
            let bottom = action.getBoundingClientRect().bottom;
            if ( bottom < action.offsetHeight - offset || window.innerWidth <= 768 )
               {         navbar.style.animationDuration = "0.5s";
        navbar.style.animationFillMode = "forwards";
                   
                   navbar.style.animationName = "backgroundFadeIn";
                
                }
            
            else navbar.style.animationName = "backgroundFadeOut";
        });
       
    
});