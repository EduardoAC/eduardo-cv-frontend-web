/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var initialize = function(){
    var universityExpedient = document.getElementById("university-expedient");
    var childrenPages = universityExpedient.children;
    var childrenCount = childrenPages.length;
    var currChild;

    var openFullSizePicture = function(evt){
        var container = document.createElement("DIV");
        container.className = "modal";
        container.style.display = 'block';
        container.style.overflow = 'scroll';
        container.style.backgro = 'scroll';
        container.style.backgroundColor = '#666';

        var currentImg = this.querySelector("IMG");
        var img = document.createElement("IMG");
        img.src = currentImg.src;
        
        var containerInner = document.createElement("DIV");
        containerInner.style.margin = "0 auto";
        containerInner.style.width  = currentImg.naturalWidth  + "px";
        containerInner.style.height = currentImg.naturalHeight + "px";
        
        containerInner.appendChild(img);
        container.appendChild(containerInner);
        
        
        container.addEventListener('click',function(){
            var parent = container.parentNode;
            parent.removeChild(container);
        });
        document.body.appendChild(container);
    };
    
    for(var i = 0; i < childrenCount; i++){
        currChild = childrenPages[i];
        currChild.addEventListener('click', openFullSizePicture,false);
    }
};

window.addEventListener('load', initialize);