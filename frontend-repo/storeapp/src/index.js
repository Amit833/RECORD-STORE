import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { UserContextProvider } from './context/myContext';

ReactDOM.render(
  <UserContextProvider>
  <App />
  </UserContextProvider>,
  document.getElementById('root')
);

