import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { ReactNode, useRef } from 'react';

export function RotateGroupFrame({ children }: { children: ReactNode }) {
    const groupRef = useRef<Group>(null!);

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y -= 0.001;
        }
    });

    return <group ref={groupRef}>
        {children}
    </group>;
}