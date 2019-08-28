import React from 'react';
import Header from './header';
import StatsTable from './statstable';
import AverageStats from './averagestats';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: [],
      view: 'home'
    };
  }

  componentDidMount() {
    fetch('/api/stats')
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
          <AverageStats allStats={this.state.stats}></AverageStats>
        </div>
        <StatsTable allStats={this.state.stats}></StatsTable>
      </React.Fragment>
    );
  }
}

export default App;
