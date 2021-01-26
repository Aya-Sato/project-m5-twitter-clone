import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import { TweetProvider } from './Components/TweetContext';

ReactDOM.render(
  <React.StrictMode>
    <TweetProvider>
      <App />
    </TweetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
