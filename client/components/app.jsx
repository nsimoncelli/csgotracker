import React from 'react';
import Header from './header';
import StatsTable from './statstable';
import AverageStats from './averagestats';
import AddStats from './addstats';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: []
    };
    this.getAllStats = this.getAllStats.bind(this);
    this.submitStats = this.submitStats.bind(this);
    this.removeStats = this.removeStats.bind(this);
    this.createOrModify = this.createOrModify.bind(this);
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

  createOrModify(statsData){
    if(!statsData.id){
      this.submitStats(statsData);
    }else{
      this.modifyStats(statsData);
    }
  }
  modifyStats(stats){
    console.log("modification stats worked!");
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
      })
      .catch(error=> console.log("ERROR POSTING STATS", error));
      this.getAllStats;
  }

  removeStats(id){
    console.log("remove worked", id);
      var removeData = {
        method: "DELETE"
      }
      fetch("/api/stats/"+id, removeData)
      .then(response=> response.json())
      .then(()=>{
        this.setState({
          stats: this.state.stats.filter(statObject=> statObject.id!==id)
        })
        console.log("removal worked", this.state.stats)
      })
      .catch(error=>console.log("ERROR DELETING STAT: ", error))
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
          <AddStats onSubmit={this.createOrModify}></AddStats>
        </div>
        <StatsTable onSubmit={this.createOrModify} removeStats={this.removeStats} allStats={this.state.stats}></StatsTable>
      </React.Fragment>
    );
  }
}

export default App;
