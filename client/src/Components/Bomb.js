import React from 'react';
import { withBaseIcon } from 'react-icons-kit';
import { u1F4A3 as bomb } from 'react-icons-kit/noto_emoji_regular/u1F4A3';

const SideIconContainer = 
    withBaseIcon({ size: 100, style: {color: 'black'} })

export const BombIcon = () => <SideIconContainer icon={bomb} />

