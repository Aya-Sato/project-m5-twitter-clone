import React, { useState, useEffect, useContext } from 'react';

import TweetPanel from './TweetPanel';

import { TweetContext } from './TweetContext';

const TweetsBySpecificUser = ({ profileInfo }) => {
    const [tweetsByUser, setTweetsByUser] = useState(null);
    const { setIsSingleTweetView } = useContext(TweetContext)

    useEffect(() => {
        let isCancelled = false;

        fetch(`/api/${profileInfo.handle}/feed`)
            .then((res) => res.json())
            .then((json) => {
                if (!isCancelled) {
                    setTweetsByUser(json);
                    setIsSingleTweetView(false);
                } 
            });
        
        return () => {
            isCancelled = true;
        }
    }, [profileInfo])
    
    return (
        <>
        {(tweetsByUser &&
            <div>
                {tweetsByUser.tweetIds.map((id) => {
                    const tweet = tweetsByUser.tweetsById[id];
                    const retweetHandle = tweet.retweetFrom && tweet.retweetFrom.handle;
                    const isRetweet = (retweetHandle && profileInfo) && retweetHandle === profileInfo.handle;
                        return (
                            <TweetPanel 
                                tweet={tweet}
                                isRetweet={isRetweet}
                                tweetId={id}
                                key={id}
                            />
                        )
                })}
            </div>
        )}
        </>
    )
}

export default TweetsBySpecificUser;