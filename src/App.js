import React, { Component } from 'react';
import Loadable from 'react-loadable';
import styled from 'styled-components';

import logo from './logo.svg';
import './App.css';

const LoadableCalendar = Loadable({
                                    loading: () => (<p>Loading...</p>),
                                    loader : () => import('./Calendar/Calendar' /* webpackChunkName: "Calendar" */)
                                  });

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  header {
    margin-top: 1em;
  }
`;

class App extends Component {
  render() {
    return (
      <AppContainer>
        <header className="App-header">
          Airbase Calendar
        </header>
        <div>
          <LoadableCalendar/>
        </div>
      </AppContainer>
    );
  }
}

export default App;
