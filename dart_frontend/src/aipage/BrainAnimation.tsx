import {Canvas} from '@react-three/fiber';
import {BrainParticles} from './components/BrainParticles';
import {Veins} from './components/BrainVeins';
import {brainCurveVectorArray} from "./utils/brainCurveVectorArray";
import {RotateGroupFrame} from './components/RotateGroupFrame';

export function BrainAnimation() {
  const curves = brainCurveVectorArray();

  return (
    <>
      <Canvas
        id={'brain'}
        style={{
          position: "relative",
          width: '150%',
          right: '0'
        }}
        camera={{
          position: [0, 0, 0.3],
          near: 0.001,
          far: 5
        }}>
        <color
          attach="background"
          args={['black']}
        />
        <ambientLight/>
        <pointLight
          position={[10, 10, 10]}
        />
        <RotateGroupFrame>
          <Veins
            curves={curves}
          />
          <BrainParticles
            curves={curves}
          />
        </RotateGroupFrame>
      </Canvas>
      <div
        style={{
          position: 'absolute',
          top: '44.5%',
          left: '25%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          textAlign: 'center',
          zIndex: 10,
        }}
      >
        <h1 style={{
          fontFamily: 'Playfair Display',
          fontSize: '5rem',
          fontWeight: 'bold',
          userSelect: "none"
        }}
        >

                <span
                  style={{
                    display: "relative",
                    marginLeft: '12.5rem'
                  }}>
                    Harness the brainpower
                </span>
          <span
            style={{
              display: "block",
              marginLeft: '12.5rem'
            }}>
                    of <span style={{color: '#00E12E'}}>DART AI</span>
                </span>
        </h1>

      </div>
    </>
  );
}