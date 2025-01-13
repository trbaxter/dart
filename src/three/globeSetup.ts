import ThreeGlobe from "three-globe";
import { Scene, MeshPhongMaterial, Color } from "three";
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
        .atmosphereAltitude(0.25)
        .hexPolygonColor(() => "rgba(255,255,255, 0.45)");

    const globeMaterial = globe.globeMaterial() as MeshPhongMaterial;
    globeMaterial.color = new Color(0x3a228a);
    globeMaterial.emissive = new Color(0x220038);
    globeMaterial.emissiveIntensity = 0.5;
    globeMaterial.shininess = 0.7;

    scene.add(globe);

    setTimeout(() => {
        globe
            // .arcsData(travelHistory.flights)
            .arcColor((e: any) => (e.status ? "#9cff00" : "#FF4000"))
            .arcAltitude((e: any) => e.arcAlt)
            .arcStroke((e: any) => (e.status ? 0.5 : 0.3))
            .arcDashLength(0.9)
            .arcDashGap(4)
            .arcDashAnimateTime(1000)
            .arcsTransitionDuration(1000)
            .arcDashInitialGap((e: any) => e.order * 1)
            // .labelsData(airportHistory.airports)
            .labelColor(() => "#ffcb21")
            .labelDotOrientation((e: any) => (e.text === "ALA" ? "top" : "right"))
            .labelDotRadius(0.3)
            .labelSize((e: any) => e.size)
            .labelText("city")
            .labelResolution(6)
            .labelAltitude(0.01)
            // .pointsData(airportHistory.airports)
            .pointColor(() => "#ffffff")
            .pointsMerge(true)
            .pointAltitude(0.07)
            .pointRadius(0.05);
    }, 1000);

    return globe;
}
