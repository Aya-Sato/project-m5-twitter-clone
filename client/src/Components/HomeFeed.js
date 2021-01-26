import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { TweetContext } from './TweetContext';
import { LoadingIcon } from './Loading';
import TweetPanel from './TweetPanel';
import Rotate from './RotateLoadingIcon';
import GetError from './GetError';
import PostError from './PostError';

import { COLORS } from '../constants';

const Heading = styled.h1`
    font-size: 25px;
    margin: 20px 30px;
`;

const PostTweet = styled.form`
    border-bottom: 12px solid lightgray;
`;

const Avatar = styled.img`
    height: 80px;
    width: 80px;
    border-radius: 50%;
    margin: 20px 30px;
`;

const Input = styled.textarea`
    width: 630px;
    border: none;
    outline: none;
    resize: none;
    position: relative;
    top: 40px;
    font-size: 22px;
    font-family: sans-serif;
`;

const LetterCount = styled.div`
    position: relative;
    top: 15px;
    right: 40px;
`;

const MeowBtn = styled.button`
    position: relative;
    right: 20px;
    background-color: ${COLORS.primary};
    border-radius: 35px;
    border: none;
    color: white;
    font-size: 18px;
    font-weight: bold;
    padding: 10px 20px;

    &:hover {
        cursor: pointer;
    }

    &:disabled {
        opacity: 40%;
        cursor: default;
    }
`;

const HomeFeed = () => {
    const { currentUserInfo, status, error, setError, setIsSingleTweetView } = useContext(TweetContext);
    const [feedInfo, setFeedInfo] = useState(null);
    const [characterCount, setCharacterCount] = useState(280);
    const [tweetInput, setTweetInput] = useState('');

    const fetchHomeFeed = () => {
        fetch('/api/me/home-feed')
            .then((res) => res.json())
            .then((json) => setFeedInfo(json))
            .then(() => setIsSingleTweetView(false))
            .catch((err) => {
                console.log(err);
                setError('homeFeed');
            });
    }

    useEffect(() => {
        if (currentUserInfo) {
            fetchHomeFeed();
        }
    }, [currentUserInfo])

    const getCharacterCountColor = (characterCount) => {
        if (characterCount > 55) {
            return 'lightgray';
        }
        else if (characterCount <= 55 && characterCount >= 0) {
            return '#edcd1c';
        }
        else if (characterCount < 0) {
            return 'red';
        }
    }

    const updateTweetInput = (event) => {
        setTweetInput(event.target.value);
        setCharacterCount(280 - event.target.value.length);
    } 

    const handlePostTweet = (event) => {
        event.preventDefault();
        fetch('/api/tweet', {
            method: "POST",
            body: JSON.stringify(
                {
                    status: tweetInput
                }
            ),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((res) => res.json())
        .then((json)=> {
            if (json.tweet) {
                setTweetInput('');
                setCharacterCount(280);
                fetchHomeFeed();
            } else {
                alert("Failed to tweet");
            }
        })
        .catch((err) => {
            console.log(err);
            setError('postTweet');
        });
    }

    return (
        <>
        {(error === 'profile' || error === 'homeFeed') &&
            <GetError />
        }
        {error === 'postTweet' &&
            <PostError />
        }
        {(error !== 'profile' && error !== 'homeFeed' && error !== 'postTweet' && status === 'idle' && currentUserInfo) &&
            <div>
                <div  style={{width: '800px', borderBottom: '1px solid lightgray'}}>
                    <Heading>Home</Heading>
                </div>
                <PostTweet>
                    <div style={{display: 'flex'}}>
                        <Avatar src={currentUserInfo.avatarSrc} alt='avatar' />
                        <div style={{height: '220px'}}>   
                            <Input 
                                name='tweetInput' 
                                placeholder="What's happening?" 
                                rows='7' 
                                value={tweetInput}
                                onChange={updateTweetInput}
                            />
                        </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '20px'}}>
                        <LetterCount
                            style={{
                                color: getCharacterCountColor(characterCount)
                            }}
                        >
                            {characterCount}
                        </LetterCount>
                        <MeowBtn 
                            type='submit' 
                            onClick={handlePostTweet}
                            disabled={characterCount === 280 || characterCount < 0}
                        >
                            Meow
                        </MeowBtn>
                    </div>
                </PostTweet>
                <div>
                {(feedInfo && error !== 'profile' && error !== 'homeFeed') && 
                    feedInfo.tweetIds.map((id) => {
                    const tweet = feedInfo.tweetsById[id];
                    const retweetHandle = tweet.retweetFrom && tweet.retweetFrom.handle;
                        return (
                            <TweetPanel 
                                tweet={tweet}
                                isRetweet={retweetHandle}
                                tweetId={id}
                                key={id}
                            />
                        )
                    })
                }   
                {(feedInfo === null && error !== 'profile' && error !== 'homeFeed') &&
                    <div style={{display: 'flex', justifyContent: 'center', position: 'relative', top: '50px'}}>
                        <Rotate>
                            <LoadingIcon />
                        </Rotate>
                    </div>
                }
                </div>
            </div>
        }
        {(error !== 'profile' && error !== 'homeFeed' && status === 'loading') &&
            <div style={{display: 'flex', justifyContent: 'center', position: 'relative', top: '50px'}}>
                <Rotate>
                    <LoadingIcon />
                </Rotate>
            </div>
        }
        </>
    );
}

export default HomeFeed;