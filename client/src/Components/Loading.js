import React from 'react';
import { withBaseIcon } from 'react-icons-kit';
import {spinner3} from 'react-icons-kit/icomoon/spinner3';

const SideIconContainer = 
    withBaseIcon({ size: 30, style: {color: '#505050'} })

export const LoadingIcon = () => <SideIconContainer icon={spinner3} />