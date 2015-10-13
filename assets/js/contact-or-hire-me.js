/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function TravelMap(mapId){
    this.map = document.getElementById(mapId);
    this.mapDoc = this.map.contentDocument;
    this.mapSvg = this.mapDoc.querySelector("svg");
    this.countryByCode = null;
}

TravelMap.prototype.collectCountries = function(){
    var _self = this;
    
    var potentialCountries = _self.mapDoc.querySelectorAll("g");
    var numberItems = potentialCountries.length;
    
    if ( numberItems ){
        var mapLocations = {},
            tmpCountry;
        
        for(var i = 0; i < numberItems; i++){
            tmpCountry = potentialCountries[i];
            if(tmpCountry.id){
                mapLocations[tmpCountry.id] = tmpCountry;
            }
        }
        _self.countryByCode = mapLocations;
    }
};

TravelMap.prototype.drawCircle = function(px,py,r){
    var _self = this;
    //Circle fill with define coordinates and radius
    var shape  = _self.mapDoc.createElementNS("http://www.w3.org/2000/svg", "circle");
    shape.cx.baseVal.value = px;
    shape.cy.baseVal.value = py;
    shape.r.baseVal.value = r;
    shape.setAttribute("fill", "green");
    _self.mapSvg.appendChild(shape);
    var stroke = _self.mapDoc.createElementNS("http://www.w3.org/2000/svg", "circle");
    //Circle stroke with define coordinates and radius + 50%
    stroke.cx.baseVal.value = px;
    stroke.cy.baseVal.value = py;
    stroke.r.baseVal.value = r + 0.5 * r;
    stroke.setAttribute("fill", "none");
    stroke.setAttribute("stroke", "green");
    stroke.setAttribute("stroke-width", "1");
    _self.mapSvg.appendChild(stroke);
};

TravelMap.prototype.calculateCenter = function(id,subid){
    var _self = this;
    var country = _self.countryByCode[id];
    var path    = country;
    if(subid && country){
        path = country.querySelector("#"+subid);
    }
    var transform = country.getAttribute("transform");
    var offsetX = 0, offsetY = 0;
    if(transform){
        var offset = transform.match(/[-+]?([0-9]*\.[0-9]+|[0-9]+)/ig);
        offsetX = typeof(offset[0])!== "undefined" ? parseFloat(offset[0]): 0;
        offsetY = typeof(offset[1])!== "undefined" ? parseFloat(offset[1]): 0;
    }
    var bbox = path.getBBox();
    // return the center of the bounding box
    return [bbox.x + bbox.width/2 + offsetX, bbox.y + bbox.height/2+ offsetY];
}
var MyTravelMap = null;

window.addEventListener("load", function load(event){
    window.removeEventListener("load", load, false); //remove listener, no longer needed
    MyTravelMap = new TravelMap("world-wide-svg-map");  
    MyTravelMap.collectCountries();
},false);
