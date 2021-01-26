import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

import { TweetContext } from './TweetContext';

import Rotate from './RotateLoadingIcon';
import GetError from './GetError';

import { LoadingIcon } from './Loading';

import TweetPanel from './TweetPanel';

const Heading = styled.h1`
    font-size: 25px;
    margin: 20px 30px;
`;

const TweetDetails = () => {
    const { error, setError, setIsSingleTweetView } = useContext(TweetContext);
    const [singleTweetInfo, setSingleTweetInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [tweetTime, setTweetTime] = useState('');
    const [tweetDate, setTweetDate] = useState('');
    const { tweetId } = useParams();

    useEffect(() => {
            fetch(`/api/tweet/${tweetId}`)
            .then((res) => res.json())
            .then((json) => setSingleTweetInfo(json))
            .then(() => {
                setIsSingleTweetView(true);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setError('singleTweet');
            });
    }, [singleTweetInfo])

    const retweetHandle = (singleTweetInfo && singleTweetInfo.tweet.retweetFrom) && singleTweetInfo.tweet.retweetFrom.handle;

    const getTime = () => {
        if (singleTweetInfo) {
            const timestampArr = singleTweetInfo.tweet.timestamp.split('-');
            const date = timestampArr[2].slice(0, 2);
            const hour = timestampArr[2].slice(3, 5);
            const min = timestampArr[2].slice(6, 8);
            const formattedTime = format(new Date(timestampArr[0], timestampArr[1] - 1, date, hour, min), "h':'m a");
            setTweetTime(formattedTime);
        }
    }

    const getDate = () => {
        if (singleTweetInfo) {
            const timestampArr = singleTweetInfo.tweet.timestamp.split('-');
            const date = timestampArr[2].slice(0, 2);
            const formattedDate = format(new Date(timestampArr[0], timestampArr[1] - 1, date), 'MMM d yyyy');
            setTweetDate(formattedDate);
        }
    }

    useEffect(() => {
        getTime();
        getDate();
    }, [singleTweetInfo])

    return (
        <>
            {error === 'singleTweet' &&
                <GetError />
            }
            {error !== 'singleTweet' &&
                <div>
                    <div  style={{width: '800px', borderBottom: '1px solid lightgray'}}>
                            <Heading>Meow</Heading>
                    </div>
                    {isLoading === true && 
                        <div style={{display: 'flex', justifyContent: 'center', position: 'relative', top: '50px'}}>
                            <Rotate>
                                <LoadingIcon />
                            </Rotate>
                        </div>
                    }
                    {(singleTweetInfo && isLoading === false) &&
                        <TweetPanel
                            tweet={singleTweetInfo.tweet}
                            isRetweet={retweetHandle}
                            tweetId={singleTweetInfo.tweet.id}
                            tweetTime={tweetTime}
                            tweetDate={tweetDate}
                        />
                    }
                </div>
            }           
        </>
    );
}

export default TweetDetails;