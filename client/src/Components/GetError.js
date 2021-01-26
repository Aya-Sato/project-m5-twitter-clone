import React from 'react';
import styled from 'styled-components';
import { BombIcon } from './Bomb';
import { COLORS } from '../constants';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    top: 100px;
`;

const Err = styled.h3`
    font-size: 30px;
    margin: 80px 0 40px 0;
`;

const Para = styled.p`
    font-size: 22px;
    width: 520px;
`;

const Link = styled.button`
    color: ${COLORS.primary};
    font-size: 22px;
    border: none;
    outline: none;
    text-decoration: underline;
    background-color: transparent;

    &:hover {
        cursor: pointer;
    }
`;

const GetError = () => {
    return (
        <Wrapper>
            <BombIcon />
            <Err>An unknown error has occurred.</Err>
            <Para>Please try refreshing the page, or<Link>contact support</Link>if the problem persists.</Para>
        </Wrapper>
    );
}

export default GetError;


