import {MaterialNode} from '@react-three/fiber';
import {BrainMaterial} from './aipage/components/BrainVeins.tsx';
import {BrainParticleMaterial} from './aipage/components/BrainParticles.tsx';
import {ShaderMaterial} from "three";

declare module '@react-three/fiber' {
    interface ThreeElements {
        brainMaterial: MaterialNode<ShaderMaterial, typeof BrainMaterial>;
        brainParticleMaterial: MaterialNode<
            ShaderMaterial,
            typeof BrainParticleMaterial
        >;
    }
}