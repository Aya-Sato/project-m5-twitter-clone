import React from "react";
import styled from "styled-components";

import LikeButton from "../Components/LikeButton/Index";
import Action from "./Action";
import TweetActionIcon from "./TweetActionIcon";
import PoppingCircle from '../Components/LikeButton/PoppingCircle';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 48px;
    margin-bottom: 15px;
`;

const ActionBar = ({ size = 40, handleToggleLike, handleToggleRetweet, isLikedByCurrentUser, isRetweetedByCurrentUser }) => {
    return (
        <>
            <Wrapper>
            <Action color="rgb(27, 149, 224)" size={40}>
                <TweetActionIcon kind="reply" />
            </Action>
            <Action color="rgb(23, 191, 99)" size={40} onClick={handleToggleRetweet}>
                <TweetActionIcon
                    kind="retweet"
                    color={isRetweetedByCurrentUser ? "rgb(23, 191, 99)" : undefined}
                    />
                {isRetweetedByCurrentUser && 
                    <PoppingCircle size={size} color="#23d973" />
                }
            </Action>    
            <Action color="rgb(224, 36, 94)" size={40} onClick={handleToggleLike} >
                <LikeButton 
                    isLikedByCurrentUser={isLikedByCurrentUser}
                />
            </Action>
            <Action color="rgb(27, 149, 224)" size={40}>
                <TweetActionIcon kind="share" />
            </Action>
            </Wrapper>
        </>
    );
};

export default ActionBar;
