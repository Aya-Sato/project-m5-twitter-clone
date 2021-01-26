import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import GlobalStyles from './GlobalStyles';

import HomeFeed from './HomeFeed';
import Profile from './Profile';
import Notifications from './Notifications';
import Bookmarks from './Bookmarks';
import TweetDetails from './TweetDetails';
import Sidebar from './Sidebar';

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <BigContainer>
        <Sidebar />
        <Main>
          <Switch>
          <Route exact path='/'>
            <HomeFeed />
          </Route>
          <Route path='/notifications'>
            <Notifications />
          </Route>
          <Route path='/bookmarks'>
            <Bookmarks />
          </Route> 
          <Route path='/tweet/:tweetId'>
            <TweetDetails />
          </Route> 
          <Route path='/:profileId'>
            <Profile />
          </Route>
          </Switch>
      </Main>
      </BigContainer>
    </BrowserRouter>
  );
}

const BigContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Main = styled.div`
  width: 800px;
  border-right: 1px solid lightgray;
`;

export default App;
