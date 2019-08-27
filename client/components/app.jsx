import React from 'react';
import Header from './header';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Header></Header>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
