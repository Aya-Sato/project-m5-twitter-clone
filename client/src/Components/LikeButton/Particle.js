import React from 'react';
import styled, { keyframes } from 'styled-components';

const moveParticles = keyframes`
    from {
        transform: translate(0px, 0px);
    }
    to {
        transform: translate(${x}px, ${y}px);
    }
`;

const fade = keyframes`
    0% {
        opacity: 0%;
    }
    50% {
        opacity: 70%;
    }
    100% {
        opacity: 0%;
    }
`;

const AnimateParticles = styled.div`
        animation: ${moveParticles} 300ms forwards ease-in, ${fade} 500ms ease-in-out forwards;
    `;

const Particle = ({ distance, angle, children }) => {
    const convertDegreesToRadians = (a) => (a * Math.PI) / 180;
    const angleInRads = convertDegreesToRadians(angle);

    const x = Math.cos(angleInRads) * distance;
    const y = Math.sin(angleInRads) * distance;

    return (
        <AnimateParticles>{children}</AnimateParticles>
    );
}

export default Particle;