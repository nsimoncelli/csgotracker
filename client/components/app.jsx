import React from 'react';
import Header from './header';
import StatsTable from './statstable';
import AverageStats from './averagestats';
import AddStats from './addstats';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: [],
      view: 'home'
    };
    this.getAllStats = this.getAllStats.bind(this);
    this.submitStats = this.submitStats.bind(this);
  }

  componentDidMount() {
    this.getAllStats();
  }

  getAllStats(){
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

  submitStats(stats){
    let fetchData = {
      method: 'POST', 
      headers: {
            'Content-type': 'application/json'
      },
      body: JSON.stringify(stats)
    }
    fetch('/api/stats', fetchData)
      .then(response=> response.json())
      .then(newStatsData => {
        console.log("this", this)
        this.setState({
          stats: [...this.state.stats, newStatsData]
        })
        // this.getAllStats;
      })
      .catch(error=> console.log("ERROR POSTING STATS", error));
      this.getAllStats;
  }

  render() {
    if (!this.state.stats) {
      return;
    }
    console.log("Current state:", this.state);
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Header></Header>
          <AverageStats allStats={this.state.stats}></AverageStats>
          <AddStats onSubmit={this.submitStats}></AddStats>
        </div>
        <StatsTable allStats={this.state.stats}></StatsTable>
      </React.Fragment>
    );
  }
}

export default App;
