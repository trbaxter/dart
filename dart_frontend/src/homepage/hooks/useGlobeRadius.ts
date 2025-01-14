import { useEffect, useState } from 'react';

const useGlobeRadius = (globeObj: any): number | null => {
    const [globeRadius, setGlobeRadius] = useState<number | null>(null);

    useEffect(() => {
        if (!globeObj) return;

        const radius = globeObj.getGlobeRadius?.();
        if (typeof radius === 'number') {
            setGlobeRadius(radius);
        } else {
            console.error('Failed to get globe radius.');
        }
    }, [globeObj]);

    return globeRadius;
};

export default useGlobeRadius;