import { extend, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import { AdditiveBlending, CatmullRomCurve3, Color, DoubleSide, ShaderMaterial } from 'three';
import { useRef } from 'react';

export const BrainMaterial = shaderMaterial(
    {
        time: 0,
        color: new Color(0.1, 0.53, 0.16)
    },
    // vertex shader
    /*glsl*/
    `
    varying vec2 vUv;
    uniform float time;
    varying float vProgress;
    void main() {
      vUv = uv;
      vProgress = smoothstep(-1., 1., sin(vUv.x*8. + time * 2.));
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    // fragment shader
    /*glsl*/ `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    varying float vProgress;
    void main() {
      float hideCorners1 = smoothstep(1., 0.9, vUv.x);
      float hideCorners2 = smoothstep(0., 0.1, vUv.x);
      vec3 finalColor = mix(color, color*0.25, vProgress);
      gl_FragColor.rgba = vec4(vec3(finalColor), 1.);
      gl_FragColor.rgba = vec4(finalColor, hideCorners1 * hideCorners2);
    }
  `
);

extend({ BrainMaterial });

function Vein(props: { curve: CatmullRomCurve3 }) {
    const { curve } = props;
    const brainMat = useRef<ShaderMaterial>(null!);

    useFrame(({ clock }) => {
        brainMat.current.uniforms.time.value = clock.getElapsedTime();
    });

    return (
        <>
            <mesh>
                <tubeGeometry args={[curve, 64, 0.001, 2, false]} />
                <brainMaterial
                    ref={brainMat}
                    side={DoubleSide}
                    transparent={true}
                    depthTest={false}
                    depthWrite={false}
                    blending={AdditiveBlending}
                />
            </mesh>
        </>
    );
}

export function Veins(props: { curves: CatmullRomCurve3[] }) {
    const { curves } = props;
    return (
        <>
            {curves.map((curve, index) => {
                return <Vein key={index} curve={curve} />;
            })}
        </>
    );
}