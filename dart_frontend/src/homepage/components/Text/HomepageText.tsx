import { FC } from 'react';

const HomepageText: FC = () => {
    return (
        <div
            style={{
                position: 'absolute',
                top: '44.5%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                textAlign: 'center',
                zIndex: 10,
            }}
        >
            <h1
                style={{
                    fontFamily: 'Playfair Display',
                    fontSize: '12rem',
                    fontWeight: 'bold',
                    userSelect: 'none',
                }}
            >
                Solventum
            </h1>
            <h3
                style={{
                    fontFamily: 'Barlow',
                    display: 'inline-block',
                    fontSize: '1.25rem',
                    letterSpacing: '0.5em',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    backgroundColor: '#083931',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',
                    lineHeight: 1,
                    whiteSpace: 'normal',
                    userSelect: 'none',
                    padding: '0.45em',
                    textIndent: '0.5em',
                    position: 'relative',
                    top: '-6.32em',
                }}
            >
                Data & Analytics Resource Center
            </h3>
        </div>
    );
};

export default HomepageText;
