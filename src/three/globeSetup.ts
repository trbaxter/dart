import ThreeGlobe from "three-globe";
import {Scene, MeshPhongMaterial, Color, FrontSide} from "three";
import countries from "../assets/globe-data-min.json";

export function globeSetup(scene: Scene) {
    const globe = new ThreeGlobe({
        waitForGlobeReady: true,
        animateIn: true,
    })
        .hexPolygonsData((countries as any).features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.7)
        .showAtmosphere(true)
        .atmosphereColor("#3a228a")
        .atmosphereAltitude(0.4)
        .hexPolygonColor(() => "rgba(255,255,255, 0.45)");

    const globeMaterial = globe.globeMaterial() as MeshPhongMaterial;
    globeMaterial.color = new Color(0x3a228a);
    globeMaterial.emissive = new Color(0x220038);
    globeMaterial.emissiveIntensity = 0.4;
    globeMaterial.shininess = 0.7;
    globeMaterial.side = FrontSide;
    globeMaterial.depthTest = true;

    scene.add(globe);

    setTimeout(() => {
        // globe.arcsData(travelHistory.flights);
        globe.arcColor((e: any) => (e.status ? "#9cff00" : "#FF4000"));
        globe.arcAltitude((e: any) => e.arcAlt);
        globe.arcStroke((e: any) => (e.status ? 0.5 : 0.3));
        globe.arcDashLength(0.9);
        globe.arcDashGap(4);
        globe.arcDashAnimateTime(1000);
        globe.arcsTransitionDuration(1000);
        globe.arcDashInitialGap((e: any) => e.order * 1);
    }, 100);

    setTimeout(() => {
        // globe.labelsData(airportHistory.airports);
        globe.labelColor(() => "#ffcb21");
        globe.labelDotOrientation((e: any) => (e.text === "ALA" ? "top" : "right"));
        globe.labelDotRadius(0.3);
        globe.labelSize((e: any) => e.size);
        globe.labelText("city");
        globe.labelResolution(6);
        globe.labelAltitude(0.01);
    }, 200);

    setTimeout(() => {
        // globe.pointsData(airportHistory.airports);
        globe.pointColor(() => "#ffffff");
        globe.pointsMerge(true);
        globe.pointAltitude(0.07);
        globe.pointRadius(0.05);
    }, 300);


    return globe;
}
