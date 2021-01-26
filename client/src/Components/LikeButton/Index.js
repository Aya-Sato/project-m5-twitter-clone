import React from "react";
import styled from "styled-components";

import Heart from "./Heart";
import PoppingCircle  from './PoppingCircle';

const LikeButton = ({ size = 40, isLikedByCurrentUser }) => {
    const heartSize = size * 0.6;

    return (
        <Wrapper style={{ width: size, height: size }}>
            <Heart width={heartSize} isToggled={isLikedByCurrentUser} />
        {isLikedByCurrentUser && 
            <PoppingCircle size={size} color="#E790F7" />
        }
        </Wrapper>
    );
};

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default LikeButton;