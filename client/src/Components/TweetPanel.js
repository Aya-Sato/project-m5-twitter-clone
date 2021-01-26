import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';
import { format } from 'date-fns';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import { COLORS } from '../constants';

import { BsDot } from 'react-icons/bs';

import ActionBar from './ActionBar';
import TweetActionIcon from './TweetActionIcon';

import giantMilitaryCat from '../assets/giant-military-cat.jpeg';
import { TweetContext } from './TweetContext';

const TweetContainer = styled.div`
    border-bottom: 1px solid lightgray;
    padding-top: 20px;

    &:hover {
        background-color: #f7f7f7;
        cursor: pointer;
    }
`;

const RetweetedBy = styled.div`
    color: ${COLORS.darkGray};
    font-size: 18px;
    margin-left: 12px;
    position: relative;
    top: 3px;

    .username:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;

const RetweetedByForSingleTweetView = styled(Link)`
    color: ${COLORS.darkGray};
    font-size: 18px;
    margin-left: 12px;
    position: relative;
    top: 3px;
    text-decoration: none;

    .username:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;

const Avatar = styled.img`
    height: 80px;
    width: 80px;
    border-radius: 50%;
`;

const DisplayName = styled.h3`
    font-size: 20px;
    font-weight: bold;

    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;

const DisplayNameForSingleTweetView = styled(Link)`
    font-size: 20px;
    font-weight: bold;
    padding: 10px 0 5px 0;
    text-decoration: none;
    color: black;

    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;

const Handle = styled.div`
    font-size: 16px;
    color: ${COLORS.darkGray};
`;

const DatePosted = styled.div`
    font-size: 16px;
    color: ${COLORS.darkGray};
`;

const DatePostedForSingleTweetView = styled.div`
    font-size: 18px;
    color: ${COLORS.darkGray};
    margin-bottom: 20px;
`;

const TweetContent = styled.p`
    font-size: 18px;
    margin-bottom: 25px;
    width: 650px;
`;

const TweetContentForSingleTweetView = styled.p`
    font-size: 30px;
    margin-bottom: 25px;
    width: 750px;
    position: relative;
    left: 25px;
`;

const MediaImage = styled.img`
    border-radius: 30px;
    width: 650px;
`;

const MediaImageForSingleTweetView = styled.img`
    border-radius: 30px;
    width: 750px;
    position: relative;
    left: 25px;
`;

const CritterApp = styled.div`
    font-size: 18px;
    color: ${COLORS.darkGray};
    margin-bottom: 20px;
`;

const NumOfRetweet = styled.div`
    color: #17bf63;
    font-size: 20px;
    position: relative;
    top: -47px;
    left: 330px;
    margin: 0;
    display: inline-block;
`;


const NumOfRetweetForSingleTweetView = styled.div`
    font-size: 20px;
    position: relative;
    left: 25px;
    padding: 20px 0;

    .num {
        font-weight: bold;
    }
`;

const NumOfLike = styled.div`
    color: #E0245E;
    font-size: 20px;
    position: relative;
    top: -47px;
    margin: 0;
    display: inline-block;
`;

const NumOfLikeForSingleTweetView = styled.div`
    font-size: 20px;
    position: relative;
    left: 25px;
    padding: 20px 20px 20px 0;

    .num {
        font-weight: bold;
    }
`;

const TweetPanel = ({ tweet, isRetweet, tweetId, tweetTime, tweetDate }) => {
    const { isSingleTweetView } = useContext(TweetContext);
    const [isLiked, setIsLiked] = useState(tweet.isLiked);
    const [isRetweeted, setIsRetweeted] = useState(tweet.isRetweeted);
    const timestampArr = tweet && tweet.timestamp.split('-');
    const date = timestampArr[2].slice(0, 2);
    const formattedDate = format(new Date(timestampArr[0], timestampArr[1] - 1, date ), 'MMM do');
    
    const history = useHistory();

    const handleViewSingleTweet = () => {
        history.push(`/tweet/${tweetId}`);
    }

    const handleKeydownToViewSingleTweet = (event) => {
        if (event.code === 'Enter') {
            history.push(`/tweet/${tweetId}`);
        }
    }

    const handleKeydownToViewUserProfile = (event) => {
        event.stopPropagation();
        if (event.code === 'Enter') {
            history.push(`/${tweet.author.handle}`);
            window.scrollTo(0,0);
        }
    }

    const handleNavigateToAuthorProfile = (event) => {
        event.stopPropagation();
        history.push(`/${tweet.author.handle}`);
        window.scrollTo(0,0);
    }

    const handleNavigateToRetweeterProfile = (event) => {
        event.stopPropagation();
        history.push(`/${tweet.retweetFrom.handle}`);
        window.scrollTo(0,0);
    }

    const handleToggleLike = (event) => {
        event.stopPropagation();
            fetch(`/api/tweet/${tweetId}/like`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ like: !isLiked }),
            })
                .then((res) => res.json())
                .then((json) => console.log(json))
                .then(() => {
                    setIsLiked(!isLiked);
                })
    }

    const handleToggleRetweet = (event) => {
        event.stopPropagation();
            fetch(`/api/tweet/${tweetId}/retweet`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ retweet: !isRetweeted }),
            })
                .then((res) => res.json())
                .then((json) => console.log(json))
                .then(() => {
                    setIsRetweeted(!isRetweeted);
                })
    }

    const getLikePosition = (isRetweeted) => {
        if (isRetweeted === true) {
            return '519px';
        }
        else if (isRetweeted === false) {
            return '530px';
        }
    }

    return (
        <>
        {isSingleTweetView === false &&
            <TweetContainer
                tabIndex="0"
                aria-label="View tweet"
                onKeyDown={handleKeydownToViewSingleTweet}
            >
                <div onClick={handleViewSingleTweet}>
                    {isRetweet && (
                        <div style={{display: 'flex', margin: '20px 60px 0 60px'}}>
                            <TweetActionIcon kind='retweet' />
                            <RetweetedBy
                                onClick={handleNavigateToRetweeterProfile}
                            >
                                <span className='username'>{tweet.retweetFrom.displayName}</span> Remeowed
                            </RetweetedBy>
                        </div>
                    )}
                    <div style={{display: 'flex', marginTop: '20px'}}>
                        <Avatar 
                            src={tweet.author.handle === 'giantcat9' ? giantMilitaryCat : tweet.author.avatarSrc} alt='avatar' 
                            style={{margin: '0 20px 50px 30px'}}
                        />
                        <div style={{display: 'flex', flexDirection: 'column', position: 'relative', top: '10px'}}>
                            <div style={{display: 'flex', marginBottom: '20px'}}>
                                <Tippy theme={'light'} delay={400} content={<div>
                                    <Avatar src={tweet.author.handle === 'giantcat9' ? giantMilitaryCat : tweet.author.avatarSrc} alt='avatar' />
                                    <div style={{color: 'black', fontSize: '18px', fontWeight: 'bold'}}>{tweet.author.displayName}</div>
                                    <Handle>{`@${tweet.author.handle}`}</Handle>
                                    <p style={{color: 'black', fontSize: '16px', marginTop: '15px'}}>{tweet.author.bio}</p>
                                    <div style={{display: 'flex', marginTop: '15px'}}>
                                        <div style={{fontSize: '16px', marginRight: '15px'}}><strong>{tweet.author.numFollowing}</strong><span style={{color: `${COLORS.darkGray}`}}> Following</span></div>
                                        <div style={{fontSize: '16px'}}><strong>{tweet.author.numFollowers}</strong><span style={{color: `${COLORS.darkGray}`}}> Followers</span></div>
                                    </div>
                                </div>}>
                                    <DisplayName 
                                        tabIndex="0"
                                        aria-label="View user profile"
                                        onKeyDown={handleKeydownToViewUserProfile}
                                        onClick={handleNavigateToAuthorProfile}
                                    >
                                        {tweet.author.displayName}
                                    </DisplayName>
                                </Tippy>
                                <Handle style={{marginLeft: '10px'}}>{`@${tweet.author.handle}`}</Handle>
                                <BsDot style={{color: `${COLORS.darkGray}`}}/>
                                <DatePosted>{formattedDate}</DatePosted>
                            </div>
                            <TweetContent>{tweet.status}</TweetContent>
                            {tweet.media &&
                                <div style={{marginBottom: '30px'}}>{tweet.media.map(img => {
                                    return (
                                        <MediaImage src={img.url} alt='tweeted media' key={img.url}/>
                                    );
                                })}
                                </div>
                            }  
                        </div>
                    </div>
                </div>
                <div> 
                    <ActionBar 
                        isRetweetedByCurrentUser={isRetweeted}
                        isLikedByCurrentUser={isLiked}
                        handleToggleLike={handleToggleLike}
                        handleToggleRetweet={handleToggleRetweet}
                    />
                    <div>
                        <NumOfRetweet className='retweet'>{isRetweeted ? 1 : null}</NumOfRetweet>
                        <NumOfLike 
                            className='like'
                            style={{
                                left: getLikePosition(isRetweeted)
                            }}
                        >
                            {isLiked ? 1 : null}
                        </NumOfLike>
                    </div>
                </div>
            </TweetContainer>
        }
        {(isSingleTweetView === true && isRetweet) &&
            <div style={{display: 'flex', margin: '20px 60px 0 60px'}}>
                <TweetActionIcon kind='retweet' />
                    <RetweetedByForSingleTweetView
                        to={`/${tweet.retweetFrom.handle}`}
                    >
                        <span className='username'>{tweet.retweetFrom.displayName}</span> Remeowed
                    </RetweetedByForSingleTweetView>
            </div>
        }
        {isSingleTweetView &&
            <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', justifyContent: 'flex-start', position: 'relative', left: '25px', marginTop: '20px'}}>
                <Avatar 
                    src={tweet.author.handle === 'giantcat9' ? giantMilitaryCat : tweet.author.avatarSrc} 
                    style={{margin: '0 20px 30px 0'}}
                />
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <DisplayNameForSingleTweetView
                        to={`/${tweet.author.handle}`}
                    >
                        {tweet.author.displayName}
                    </DisplayNameForSingleTweetView>
                    <Handle>{`@${tweet.author.handle}`}</Handle>
                </div>
            </div>
            <TweetContentForSingleTweetView>{tweet.status}</TweetContentForSingleTweetView>
            {tweet.media && 
                <div style={{marginBottom: '20px'}}>{tweet.media.map(img => {
                    return (
                        <MediaImageForSingleTweetView src={img.url} alt='tweeted media' key={img.url}/>
                    );
                })}
                </div>
            }
            <div style={{display: 'flex', justifyContent: 'flex-start', position: 'relative', left: '25px'}}>
                <DatePostedForSingleTweetView>
                    <span style={{position: 'relative', top: '-3px'}}>{tweetTime}</span>
                    <BsDot />
                    <span style={{position: 'relative', top: '-3px'}}>{tweetDate}</span>
                    <BsDot />
                </DatePostedForSingleTweetView>
                <CritterApp>Critter web app</CritterApp>
            </div>
            {(tweet.isRetweeted || tweet.isLiked) &&
                <div style={{display: 'flex', justifyContent: 'flex-start', borderTop: '1px solid lightgray'}}>
                    {isLiked && 
                        <NumOfLikeForSingleTweetView><span className='num'>1</span> Like</NumOfLikeForSingleTweetView>
                    }
                    {isRetweeted &&
                        <NumOfRetweetForSingleTweetView><span className='num'>1</span> Retweet</NumOfRetweetForSingleTweetView>
                    }
                </div>
            }
            <div style={{borderTop: '1px solid lightgray', borderBottom: '1px solid lightgray', paddingTop: '15px'}}>
                <ActionBar 
                    isRetweetedByCurrentUser={isRetweeted}
                    isLikedByCurrentUser={isLiked}
                    handleToggleLike={handleToggleLike}
                    handleToggleRetweet={handleToggleRetweet}
                />
            </div>
        </div>
        }
        </>
    );
}

export default TweetPanel;