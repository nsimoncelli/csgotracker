import React from 'react';
import Header from './header';
import StatsTable from './statstable';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: []
    };
  }

  componentDidMount() {
    fetch('/api/grades')
      .then(response => response.json())
      .then(statsDataArray => {
        console.log(statsDataArray);
        this.setState({
          stats: statsDataArray
        });
      })
      .catch(error => console.log('ERROR!', error));
  }

  render() {
    if (!this.state.stats) {
      return;
    }
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Header></Header>
        </div>
        <StatsTable allStats={this.state.stats}></StatsTable>
      </React.Fragment>
    );
  }
}

export default App;
