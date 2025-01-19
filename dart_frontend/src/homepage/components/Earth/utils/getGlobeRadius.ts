import { GlobeMethods } from 'react-globe.gl';

/**
 * Retrieves the static globe radius.
 *
 * @param earthObject - The Earth globe from Earth.tsx.
 * @returns The static radius of the globe.
 */
export const getGlobeRadius = (earthObject: GlobeMethods): number => {
    return earthObject.getGlobeRadius!();
};
