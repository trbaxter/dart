import { FC } from 'react';
import Earth from './components/Earth/Earth.tsx';
import HomepageText from './components/Text/HomepageText';

const Homepage: FC = () => {

    return (
        <>
            <Earth />
            <HomepageText />
        </>
    );
};

export default Homepage;
