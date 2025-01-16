import { MaterialNode } from '@react-three/fiber';
import { BrainMaterial } from './components/brain-animation/BrainVeins.tsx';
import { BrainParticleMaterial } from './components/brain-animation/BrainParticles.tsx';

declare module '@react-three/fiber' {
    interface ThreeElements {
        brainMaterial: MaterialNode<ShaderMaterial, typeof BrainMaterial>;
        brainParticleMaterial: MaterialNode<
            ShaderMaterial,
            typeof BrainParticleMaterial
        >;
    }
}