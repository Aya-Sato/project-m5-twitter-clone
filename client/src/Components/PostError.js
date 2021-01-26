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
    text-align: center;
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

const PostError = () => {
    return (
        <Wrapper>
            <BombIcon />
            <Err>An unknown error has occurred.</Err>
            <Para>Please try<Link onClick={() => {window.location.reload();}}>reposting</Link>the tweet.</Para>
        </Wrapper>
    );
}

export default PostError;