import ThreeGlobe from "three-globe";
import { Scene, MeshPhongMaterial, Color, FrontSide } from "three";
import countries from "../assets/custom-geo-optimized.json";

/**
 * Sets up a ThreeGlobe instance and adds it to the scene.
 *
 * @param scene - The Three.js scene.
 * @returns The configured globe object.
 */
export function globeSetup(scene: Scene) {
    const globe = new ThreeGlobe({
        waitForGlobeReady: true,
        animateIn: true,
    })
        .hexPolygonsData(countries.features)
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

    scene.add(globe);
    return globe;
}
