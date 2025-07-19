'use client'

interface TravelPoint {
  title: string;
  countryCode: string;
  area: string;
}

export class TravelMap {
  private map: Readonly<HTMLObjectElement | null>;
  private mapDoc: Readonly<Document | null>;
  private mapSvg: Readonly<SVGElement | null>;
  private countryByCode: Record<string, Element> | null;
  private airplane: Element | null;
  private itineraryPath: SVGPathElement[];

  constructor(mapId: string) {
    this.map = document.getElementById(mapId) as HTMLObjectElement;
    this.mapDoc = this.map?.contentDocument || null;
    this.mapSvg = this.mapDoc?.querySelector("svg") || null;
    this.countryByCode = null;
    this.airplane = null;
    this.itineraryPath = [];
  }

  collectCountries(): void {
    if (!this.mapDoc || !this.mapSvg) return;

    const potentialCountries = this.mapDoc.querySelectorAll("g");
    const numberItems = potentialCountries.length;

    if (numberItems) {
      const mapLocations: Record<string, Element> = {};
      let tmpCountry: Element;

      for (let i = 0; i < numberItems; i++) {
        tmpCountry = potentialCountries[i];
        if (tmpCountry.id) {
          mapLocations[tmpCountry.id] = tmpCountry;
        }
      }
      this.countryByCode = mapLocations;
    }
  }

  drawCircle(point: { x: number; y: number }, r: number): void {
    if (!this.mapDoc || !this.mapSvg) return;

    // Circle fill with define coordinates and radius
    const shape = this.mapDoc.createElementNS("http://www.w3.org/2000/svg", "circle");
    shape.setAttribute("cx", point.x.toString());
    shape.setAttribute("cy", point.y.toString());
    shape.setAttribute("r", r.toString());
    shape.setAttribute("fill", "#585869");
    this.mapSvg.appendChild(shape);

    // Circle stroke with define coordinates and radius + 50%
    const stroke = this.mapDoc.createElementNS("http://www.w3.org/2000/svg", "circle");
    stroke.setAttribute("cx", point.x.toString());
    stroke.setAttribute("cy", point.y.toString());
    stroke.setAttribute("r", (r + 0.5 * r).toString());
    stroke.setAttribute("fill", "none");
    stroke.setAttribute("stroke", "#585869");
    stroke.setAttribute("stroke-width", "1");
    this.mapSvg.appendChild(stroke);
  }

  drawCurve(pointA: { x: number; y: number }, pointB: { x: number; y: number }): SVGPathElement | null {
    if (!this.mapDoc || !this.mapSvg) return null;

    const lineDistance = {
      x: pointB.x - pointA.x,
      y: pointB.y - pointA.y
    };

    const path = this.mapDoc.createElementNS("http://www.w3.org/2000/svg", "path");
    const drawAttribute = `M ${pointA.x} ${pointA.y} l ${lineDistance.x} ${lineDistance.y}`;
    
    path.setAttribute("id", "curve");
    path.setAttribute("d", drawAttribute);
    path.setAttribute("stroke", "#585869");
    path.setAttribute("stroke-width", "1.42");
    path.setAttribute("opacity", "1");
    path.setAttribute("fill", "none");
    this.mapSvg.appendChild(path);

    return path;
  }

  drawAirplane(): void {
    if (!this.mapDoc || !this.mapSvg) return;

    const group = this.mapDoc.createElementNS("http://www.w3.org/2000/svg", "g");
    const path = this.mapDoc.createElementNS("http://www.w3.org/2000/svg", "path");
    const drawAttribute = "m25.21488,3.93375c-0.44355,0 -0.84275,0.18332 -1.17933,0.51592c-0.33397,0.33267 -0.61055,0.80884 -0.84275,1.40377c-0.45922,1.18911 -0.74362,2.85964 -0.89755,4.86085c-0.15655,1.99729 -0.18263,4.32223 -0.11741,6.81118c-5.51835,2.26427 -16.7116,6.93857 -17.60916,7.98223c-1.19759,1.38937 -0.81143,2.98095 -0.32874,4.03902l18.39971,-3.74549c0.38616,4.88048 0.94192,9.7138 1.42461,13.50099c-1.80032,0.52703 -5.1609,1.56679 -5.85232,2.21255c-0.95496,0.88711 -0.95496,3.75718 -0.95496,3.75718l7.53,-0.61316c0.17743,1.23545 0.28701,1.95767 0.28701,1.95767l0.01304,0.06557l0.06002,0l0.13829,0l0.0574,0l0.01043,-0.06557c0,0 0.11218,-0.72222 0.28961,-1.95767l7.53164,0.61316c0,0 0,-2.87006 -0.95496,-3.75718c-0.69044,-0.64577 -4.05363,-1.68813 -5.85133,-2.21516c0.48009,-3.77545 1.03061,-8.58921 1.42198,-13.45404l18.18207,3.70115c0.48009,-1.05806 0.86881,-2.64965 -0.32617,-4.03902c-0.88969,-1.03062 -11.81147,-5.60054 -17.39409,-7.89352c0.06524,-2.52287 0.04175,-4.88024 -0.1148,-6.89989l0,-0.00476c-0.15655,-1.99844 -0.44094,-3.6683 -0.90277,-4.8561c-0.22699,-0.59493 -0.50356,-1.07111 -0.83754,-1.40377c-0.33658,-0.3326 -0.73578,-0.51592 -1.18194,-0.51592l0,0l-0.00001,0l0,0l0.00002,0.00001z";
    
    path.setAttribute("d", drawAttribute);
    path.setAttribute("stroke-width", "0");
    path.setAttribute("fill", "#73b6e6");
    
    group.id = "airplane";
    group.appendChild(path);
    this.mapSvg.appendChild(group);
    this.airplane = group;
  }

  drawItinerary(itinerary: TravelPoint[]): void {
    let previous: { x: number; y: number } | null = null;
    let center: { x: number; y: number };

    itinerary.forEach((el) => {
      center = this.calculateCenter(el.countryCode, el.area);
      if (previous) {
        const path = this.drawCurve(previous, center);
        if (path) {
          this.itineraryPath.push(path);
        }
      }
      previous = center;
    });
  }

  calculateCenter(id: string, subid?: string): { x: number; y: number } {
    if (!this.countryByCode || !this.countryByCode[id]) {
      return { x: 0, y: 0 };
    }

    const country = this.countryByCode[id];
    let path = country;
    
    if (subid && country) {
      const subElement = country.querySelector("#" + subid);
      if (subElement) {
        path = subElement;
      }
    }

    const transform = country.getAttribute("transform");
    let offsetX = 0, offsetY = 0;
    
    if (transform) {
      const offset = transform.match(/[-+]?([0-9]*\.[0-9]+|[0-9]+)/ig);
      offsetX = typeof offset?.[0] !== "undefined" ? parseFloat(offset[0]) : 0;
      offsetY = typeof offset?.[1] !== "undefined" ? parseFloat(offset[1]) : 0;
    }

    const bbox = (path as SVGGraphicsElement).getBBox();
    return {
      x: bbox.x + bbox.width / 2 + offsetX,
      y: bbox.y + bbox.height / 2 + offsetY
    };
  }
}

export const travelItinerary: TravelPoint[] = [
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
  }
];

export const initializeTravelMap = () => {
  const MyTravelMap = new TravelMap("world-wide-svg-map");
  MyTravelMap.collectCountries();
  MyTravelMap.drawAirplane();
  MyTravelMap.drawItinerary(travelItinerary);
}; 