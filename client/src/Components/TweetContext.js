import React, { useState, useEffect } from 'react';

export const TweetContext = React.createContext();

export const TweetProvider = ({ children }) => {
    const [currentUserInfo, setCurrentUserInfo] = useState(null);
    const [status, setStatus] = useState('loading');
    const [error, setError] = useState();
    const [isSingleTweetView, setIsSingleTweetView] = useState();

    useEffect(() => {
        fetch('/api/me/profile')
            .then((res) => res.json())
            .then((json) => {
                setCurrentUserInfo(json.profile);
                setStatus('idle');
            })
            .catch((err) => {
                console.log(err);
                setError('profile');
            });
    }, []);

    return (
        <TweetContext.Provider 
            value={{ 
                currentUserInfo,
                setCurrentUserInfo,
                status,
                setStatus,
                error,
                setError,
                isSingleTweetView,
                setIsSingleTweetView
            }}
        >
        {children}
        </TweetContext.Provider>
    );
}

