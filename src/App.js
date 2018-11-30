import React, { Component } from 'react';
import Loadable from 'react-loadable';
import styled from 'styled-components';

import appointments from './store/appointments';

import './App.css';

const LoadableCalendar = Loadable({
                                    loading: () => (<p>Loading...</p>),
                                    loader : () => import('./containers/Calendar/Calendar' /* webpackChunkName: "Calendar" */),
                                    render : (loaded, props) => {
                                      let Calendar = loaded.default;
                                      return <Calendar appointments={appointments}/>
                                    }
                                  });

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  header {
    margin-top: 1em;
    font-size: 3em;
    margin-bottom: 2em;
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
