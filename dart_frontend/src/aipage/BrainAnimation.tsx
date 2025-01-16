import { Canvas } from '@react-three/fiber';
import { BrainParticles } from './components/BrainParticles.tsx';
import { Veins } from './components/BrainVeins.tsx';
import { brainCurveVectorArray} from "./utils/brainCurveVectorArray";
import { RotateGroupFrame } from './components/RotateGroupFrame.tsx';

export function BrainAnimation() {
    const curves = brainCurveVectorArray();

    return (
        <Canvas camera={{ position: [0, 0, 0.3], near: 0.001, far: 5 }}>
            <color attach="background" args={['black']} />
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <RotateGroupFrame>
                <Veins curves={curves} />
                <BrainParticles curves={curves} />
            </RotateGroupFrame>
        </Canvas>
    );
}