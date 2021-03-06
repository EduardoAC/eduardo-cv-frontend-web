/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function TravelMap(mapId){
    this.map           = document.getElementById(mapId);
    this.mapDoc        = this.map.contentDocument;
    this.mapSvg        = this.mapDoc.querySelector("svg");
    this.countryByCode = null;
    this.airplane      = null;
    this.itineraryPath = null;
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

TravelMap.prototype.drawCircle = function(point,r){
    var _self = this;
    //Circle fill with define coordinates and radius
    var shape  = _self.mapDoc.createElementNS("http://www.w3.org/2000/svg", "circle");
    shape.cx.baseVal.value = point.x;
    shape.cy.baseVal.value = point.y;
    shape.r.baseVal.value = r;
    shape.setAttribute("fill", "#585869");
    _self.mapSvg.appendChild(shape);
    var stroke = _self.mapDoc.createElementNS("http://www.w3.org/2000/svg", "circle");
    //Circle stroke with define coordinates and radius + 50%
    stroke.cx.baseVal.value = point.x;
    stroke.cy.baseVal.value = point.y;
    stroke.r.baseVal.value = r + 0.5 * r;
    stroke.setAttribute("fill", "none");
    stroke.setAttribute("stroke", "#585869");
    stroke.setAttribute("stroke-width", "1");
    _self.mapSvg.appendChild(stroke);
};

TravelMap.prototype.drawCurve = function(pointA, pointB){
    var _self = this;
    
    var pointCurve = { 
        x : (pointB.x - pointA.x) * 0.5 + pointA.x,
        y : (pointB.y - pointA.y) * 0.5 + pointA.y
    };
    var lineDistance = { 
        x : (pointB.x - pointA.x),
        y : (pointB.y - pointA.y)
    };
    var path = _self.mapDoc.createElementNS("http://www.w3.org/2000/svg", "path");
    var drawAttribute = "M " + pointA.x + " " + pointA.y; //Add initial point
     //Add curve point that will define the curve
//    drawAttribute += " q " + pointCurve.x + " " + pointCurve.y;
    drawAttribute += " l " + lineDistance.x + " " + lineDistance.y;
    path.setAttribute("id", "curve");  
    path.setAttribute("d", drawAttribute);  
    path.setAttribute("stroke", "#585869");  
    path.setAttribute("stroke-width", 1.42);  
    path.setAttribute("opacity", 1);  
    path.setAttribute("fill", "none");
    _self.mapSvg.appendChild(path);

    return path;
};
TravelMap.prototype.drawAirplane = function(){
    var _self = this;
    var group = _self.mapDoc.createElementNS("http://www.w3.org/2000/svg", "g");
    var path  = _self.mapDoc.createElementNS("http://www.w3.org/2000/svg", "path");
    var drawAttribute = "";//"M " + pointA.x + " " + pointA.y; //Add initial point
     //Add curve point that will define the curve
//    drawAttribute += " q " + pointCurve.x + " " + pointCurve.y;
    drawAttribute += "m25.21488,3.93375c-0.44355,0 -0.84275,0.18332 -1.17933,0.51592c-0.33397,0.33267 -0.61055,0.80884 -0.84275,1.40377c-0.45922,1.18911 -0.74362,2.85964 -0.89755,4.86085c-0.15655,1.99729 -0.18263,4.32223 -0.11741,6.81118c-5.51835,2.26427 -16.7116,6.93857 -17.60916,7.98223c-1.19759,1.38937 -0.81143,2.98095 -0.32874,4.03902l18.39971,-3.74549c0.38616,4.88048 0.94192,9.7138 1.42461,13.50099c-1.80032,0.52703 -5.1609,1.56679 -5.85232,2.21255c-0.95496,0.88711 -0.95496,3.75718 -0.95496,3.75718l7.53,-0.61316c0.17743,1.23545 0.28701,1.95767 0.28701,1.95767l0.01304,0.06557l0.06002,0l0.13829,0l0.0574,0l0.01043,-0.06557c0,0 0.11218,-0.72222 0.28961,-1.95767l7.53164,0.61316c0,0 0,-2.87006 -0.95496,-3.75718c-0.69044,-0.64577 -4.05363,-1.68813 -5.85133,-2.21516c0.48009,-3.77545 1.03061,-8.58921 1.42198,-13.45404l18.18207,3.70115c0.48009,-1.05806 0.86881,-2.64965 -0.32617,-4.03902c-0.88969,-1.03062 -11.81147,-5.60054 -17.39409,-7.89352c0.06524,-2.52287 0.04175,-4.88024 -0.1148,-6.89989l0,-0.00476c-0.15655,-1.99844 -0.44094,-3.6683 -0.90277,-4.8561c-0.22699,-0.59493 -0.50356,-1.07111 -0.83754,-1.40377c-0.33658,-0.3326 -0.73578,-0.51592 -1.18194,-0.51592l0,0l-0.00001,0l0,0l0.00002,0.00001z";
    path.setAttribute("d", drawAttribute);    
    path.setAttribute("stroke-width", 0);  
    path.setAttribute("fill", "#73b6e6");
    
    group.id = "airplane";
//    group.setAttribute("transform", "translate(194.0674596071602,251.2690780420056) scale(1.2857142857142857) rotate(-226.9006026786357)");  
    group.appendChild(path);
//    var translate = _self.mapSvg.createSVGTransform();
//    translate.setTranslate(194.0674596071602,251.2690780420056);
//    group.transform.baseVal.appendItem(translate);
    _self.mapSvg.appendChild(group);
    _self.airplane = group;
};
TravelMap.prototype.drawItinerary = function(itinerary){
    var _self = this;
    var previous = null;
    var center = [];
    var itineraryPath = [];
    $.each(itinerary, function(ky, el){
        center   = _self.calculateCenter(el.countryCode,el.area);
//        _self.drawCircle(center, 15);
        if(previous){
            itineraryPath.push(_self.drawCurve(previous,center));
        }
        previous = center;
    });
    _self.itineraryPath = itineraryPath;
};

TravelMap.prototype.flightItinerary = function(itinerary){
    var _self   = this;
    var index   = 0;
    var tacum   = 0;
    var end     = itinerary.length;
    
    var moveIncrement = function transform(path,t){
        var l = path.getTotalLength();
        var p = path.getPointAtLength(t * l);
        var t2 = Math.min(t + 0.05, 1);
        var p2 = path.getPointAtLength(t2 * l);

        var x = p2.x - p.x;
        var y = p2.y - p.y;
        var r = 90 - Math.atan2(-y, x) * 180 / Math.PI;
        var s = Math.min(Math.sin(Math.PI * t) * 0.7, 1);
        
        return "translate(" + p.x + "," + p.y + ") scale(" + s + ") rotate(" + r + ")";
    }
    function frame() {
      var transform = moveIncrement(itinerary[index],tacum);
      tacum += 0.05;  // update parameters 
      _self.airplane.setAttribute("transform", transform);
      if (tacum >= 1){
          index++;
          // check finish condition
          if(index < end){
              tacum = 0;
          }else{
            clearInterval(id);
          }
      }
    }
    var id = setInterval(frame, 100) // draw every 10ms
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
    return {x: bbox.x + bbox.width/2 + offsetX, y: bbox.y + bbox.height/2+ offsetY};
}
var MyTravelMap = null;

window.addEventListener("load", function load(event){
    window.removeEventListener("load", load, false); //remove listener, no longer needed
    MyTravelMap = new TravelMap("world-wide-svg-map");  
    MyTravelMap.collectCountries();
    MyTravelMap.drawAirplane();
},false);

var travelItinerary = [
    {
        title: "Freelance work",
        countryCode: "es",
        area: "gran-canaria",
    },   
    {
        title: "GlobalIncubator Job",
        countryCode: "es",
        area: "iberian-peninsula",
    },   
    {
        title: "GlobalIncubator Intership",
        countryCode: "us",
        area: "EEUU",
    },   
    {
        title: "GlobalIncubator Job",
        countryCode: "es",
        area: "iberian-peninsula",
    },   
    {
        title: "Time Inc UK job",
        countryCode: "gb",
        area: "england-scotland",
    },
    {
        title: "Freelance work",
        countryCode: "es",
        area: "gran-canaria",
    }   
];