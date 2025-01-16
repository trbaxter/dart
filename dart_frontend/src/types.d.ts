import { MaterialNode } from '@react-three/fiber';
import { BrainMaterial } from './aipage/BrainVeins.tsx';
import { BrainParticleMaterial } from './aipage/BrainParticles.tsx';
import { ShaderMaterial } from "three";

declare module '@react-three/fiber' {
    interface ThreeElements {
        brainMaterial: MaterialNode<ShaderMaterial, typeof BrainMaterial>;
        brainParticleMaterial: MaterialNode<
            ShaderMaterial,
            typeof BrainParticleMaterial
        >;
    }
}