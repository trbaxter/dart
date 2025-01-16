import { vectorCurveData } from './vectorCurveData.ts';
import { CatmullRomCurve3, Vector3 } from 'three';

export function brainCurveVectorArray(): CatmullRomCurve3[] {
    const vectorPoints = vectorCurveData.brain[0].paths;

    const brainVeins: CatmullRomCurve3[] = [];
    vectorPoints.forEach(point => {
        const vectorArray: Vector3[] = [];
        for (let i = 0; i < point.length; i += 3) {
            vectorArray.push(new Vector3(point[i], point[i + 1], point[i + 2]));
        }
        const vectorCurve = new CatmullRomCurve3(vectorArray);
        brainVeins.push(vectorCurve);
    });

    return brainVeins;
}
