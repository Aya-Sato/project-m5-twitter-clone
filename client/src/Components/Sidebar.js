import React, { useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import logo from '../assets/logo.svg';
import { FiHome, FiBookmark } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import { GrNotification } from 'react-icons/gr';

import { COLORS } from '../constants';

import { TweetContext } from './TweetContext';

const SideBarContainer = styled.div`
    width: 300px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-right: 1px solid lightgray;
`;

const Logo = styled.img`
    height: 70px;
    width: 70px;
    margin: 30px 0 15px 0;
`;

const StyledNavLink = styled(NavLink)`
    width: 250px;
    display: flex;
    text-decoration: none;
    color: black;
    font-weight: bold;
    padding: 15px 25px;

    &:hover {
        background-color: RGB(76, 0, 255, 0.1);
        border-radius: 35px;
    }

    .icon {
        margin-right: 20px;
        font-size: 30px;
    }

    h2 {
        font-size: 25px;
        position: relative;
        top: 3px;
    }
`;

const Meow = styled.button`
    width: 250px;
    background-color: ${COLORS.primary};
    border-radius: 35px;
    border: none;
    color: white;
    font-size: 25px;
    font-weight: bold;
    padding: 15px 25px;
    margin-top: 15px;

    &:hover {
        cursor: pointer;
    }
`;


const Sidebar = () => {
    const { 
        currentUserInfo, 
        status, 
    } = useContext(TweetContext);
    
    return (
        <SideBarContainer>
            <Logo src={logo}/>
            <StyledNavLink 
                exact to='/' 
                activeStyle={{color: `${COLORS.primary}`}}
            >
                <span className='icon'><FiHome /></span><h2>Home</h2>
            </StyledNavLink>
            {status === 'idle' &&
                <StyledNavLink 
                    to={`/${currentUserInfo.handle}`} 
                    activeStyle={{color: `${COLORS.primary}`}} 
            >
                <span className='icon'><CgProfile /></span><h2>Profile</h2>
            </StyledNavLink>
            }
            <StyledNavLink 
                to='/notifications' 
                activeStyle={{color: `${COLORS.primary}`}}
            >
                <span className='icon'><GrNotification /></span><h2>Notifications</h2>
            </StyledNavLink>
            <StyledNavLink 
                to='/bookmarks' 
                activeStyle={{color: `${COLORS.primary}`}}
            >
                <span className='icon'><FiBookmark /></span><h2>Bookmarks</h2>
            </StyledNavLink>
            <Meow>Meow</Meow>
        </SideBarContainer>
    )
}

export default Sidebar;