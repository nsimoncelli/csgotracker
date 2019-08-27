import React from 'react';
import Header from './header';
import StatsTable from './statstable';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Header></Header>
        </div>
        <StatsTable></StatsTable>
      </React.Fragment>
    );
  }
}

export default App;
