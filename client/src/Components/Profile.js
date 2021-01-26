import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { format } from 'date-fns';

import { TweetContext } from './TweetContext';

import { COLORS } from '../constants';
import { GoLocation } from 'react-icons/go';
import { FiCalendar } from 'react-icons/fi';

import { LoadingIcon } from './Loading';
import Rotate from './RotateLoadingIcon';
import TweetsBySpecificUser from './TweetsBySpecificUser';
import Media from './Media';
import Likes from './Likes';

import giantMilitaryCat from '../assets/giant-military-cat.jpeg';
import giantMilitaryCatBanner from '../assets/giant-military-cat-banner.jpg';

const Banner = styled.img`
    width: 100%;
`;

const Avatar = styled.img`
    height: 180px;
    width: 180px;
    border-radius: 50%;
    border: 4px solid white;
    position: relative;
    top: -100px;
    left: 30px;
`;

const FollowBtn = styled.button`
    position: relative;
    top: -120px;
    left: 480px;
    font-size: 22px;
    padding: 10px 25px;
    border-radius: 35px;
    border: 2px solid ${COLORS.primary};
    background-color: white;
    color: ${COLORS.primary};
    font-weight: bold;

    &:hover {
        cursor: pointer;
        background-color: ${COLORS.primary};
        color: white;
    }
`;

const FollowingBtn = styled.button`
    position: relative;
    top: -120px;
    left: 446px;
    font-size: 22px;
    padding: 10px 25px;
    border-radius: 35px;
    border: 2px solid ${COLORS.primary};
    background-color: ${COLORS.primary};
    color: white;
    font-weight: bold;

    &:hover {
        cursor: pointer;
        background-color: white;
        color: ${COLORS.primary};
    }
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    top: -80px;
    left: 30px;
`;

const DisplayName = styled.h2`
    font-size: 25px;
    margin-bottom: 10px;
`;

const Handle = styled.div`
    color: ${COLORS.darkGray};
    font-size: 18px;
    margin-right: 10px;
`;

const IsFollowingYou = styled.div`
    font-size: 15px;
    color: ${COLORS.darkGray};
    background-color: #e6e6e6;
    border-radius: 8px;
    padding: 4px 8px;
`;

const Bio = styled.p`
    width: 740px;
    font-size: 20px;
    margin-bottom: 25px;
`;

const Location = styled.div`
    color: ${COLORS.darkGray};
    font-size: 20px;
    margin-right: 20px;
    margin-bottom: 25px;
`;

const Joined = styled.div`
    color: ${COLORS.darkGray};
    font-size: 20px;
    margin-bottom: 25px;
`;

const FollowingFollowers = styled.div`
    color: ${COLORS.darkGray};
    font-size: 20px;
    margin-right: 20px;

    span {
        color: black;
        font-weight: bold;
    }
`;

const TabWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid lightgray;
`;

const Tab = styled.div`
    width: 266px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    text-decoration: none;
    color: ${COLORS.darkGray};
    padding-bottom: 20px;

    &:hover {
        cursor: pointer;
    }
`;


const Profile = () => {
    const [profileInfo, setProfileInfo] = useState(null);
    const [dateJoined, setDateJoined] = useState('');
    const [tab, setTab] = useState('tweets');
    const { profileId } = useParams();
    const { currentUserInfo, status } = useContext(TweetContext);
    
    const tabActiveStyle = {color: `${COLORS.primary}`, borderBottom: `3px solid ${COLORS.primary}`};
    
    useEffect(() => {
        let isCancelled = false;

        fetch(`/api/${profileId}/profile`)
            .then((res) => res.json())
            .then((json) => {
                if (!isCancelled) {
                    setProfileInfo(json.profile);
                }
            });
        
        return () => {
            isCancelled = true;
        }
    },[profileId, profileInfo]) 
    
    useEffect(() => {
        if (profileInfo) {
            const dateArr = profileInfo.joined.split('-');
            const formattedDate = format(new Date(dateArr[0], dateArr[1] - 1), "MMMM yyyy");
            setDateJoined(formattedDate);
        }
    }, [profileInfo]) 

    return (
        <>
            {status === 'loading' && 
                <div style={{display: 'flex', justifyContent: 'center', position: 'relative', top: '50px'}}>
                    <Rotate>
                        <LoadingIcon />
                    </Rotate>
                </div>
            }
            {(profileInfo && status === 'idle') && 
                <>
                <Banner src={profileInfo.handle === 'giantcat9' ? giantMilitaryCatBanner : profileInfo.bannerSrc} alt='banner' />
                <Avatar src={profileInfo.handle === 'giantcat9' ? giantMilitaryCat : profileInfo.avatarSrc} alt='avatar' />
                {(currentUserInfo.handle !== profileInfo.handle && profileInfo.isFollowingYou) &&
                    <FollowingBtn>Following</FollowingBtn>
                }
                {(currentUserInfo.handle !== profileInfo.handle && profileInfo.isFollowingYou === false) &&
                    <FollowBtn>Follow</FollowBtn>
                }   
                <UserInfo> 
                    <DisplayName>{profileInfo.displayName}</DisplayName>
                    <div style={{display: 'flex', marginBottom: '25px'}}>
                        <Handle>{`@${profileInfo.handle}`}</Handle>
                        {(currentUserInfo.handle !== profileInfo.handle && profileInfo.isFollowingYou) &&
                            <IsFollowingYou>Follows you</IsFollowingYou>
                        }
                    </div>
                    <Bio>{profileInfo.bio}</Bio>
                    <div style={{display: 'flex'}}>
                        <Location><GoLocation style={{marginRight: '8px'}}/>{profileInfo.location}</Location>
                        <Joined><FiCalendar style={{marginRight: '8px'}}/>{`Joined ${dateJoined}`}</Joined>
                    </div>
                    <div style={{display: 'flex'}}>
                        <FollowingFollowers><span>{profileInfo.numFollowing}</span> Following</FollowingFollowers>
                        <FollowingFollowers><span>{profileInfo.numFollowers}</span> Followers</FollowingFollowers>
                    </div>
                </UserInfo>
                <TabWrapper>
                    <Tab style={tab === 'tweets' ? tabActiveStyle : null} onClick={() => setTab('tweets')}>Tweets</Tab>
                    <Tab style={tab === 'media' ? tabActiveStyle : null} onClick={() => setTab('media')}>Media</Tab>
                    <Tab style={tab === 'likes' ? tabActiveStyle : null} onClick={() => setTab('likes')}>Likes</Tab>
                </TabWrapper>
                {tab === 'tweets' && 
                    <TweetsBySpecificUser 
                        profileInfo={profileInfo}
                    />
                }
                {tab === 'media' && 
                    <Media />
                }
                {tab === 'likes' && 
                    <Likes />
                }
                </>
            }
        </>
    );
}

export default Profile;