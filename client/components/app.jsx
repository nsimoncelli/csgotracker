import React from 'react';
import Header from './header';
import StatsTable from './statstable';
import AverageStats from './averagestats';
import AddStats from './addstats';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: [],
      modal: false
    };
    this.getAllStats = this.getAllStats.bind(this);
    this.submitStats = this.submitStats.bind(this);
    this.removeStats = this.removeStats.bind(this);
    this.createOrModify = this.createOrModify.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleModalToggle = this.handleModalToggle.bind(this);
  }

  handleModalToggle(){
    if(this.state.modal){
      this.setState({
        modal: false
      })
    }else{
      return;
    }
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  componentDidMount() {
    this.getAllStats();
  }

  getAllStats(){
    fetch('/api/all')
    .then(response => response.json())
    .then(statsDataArray => {
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
      this.modifyStats(statsData.id, statsData);
    }
  }
  modifyStats(id, stats){
    console.log("modify stats", id, stats);
    var updateData = {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stats),
    }
    fetch('/api/update/', updateData)
      .then(response=> {response.json()})
      .then(()=>{
          console.log("SUCCESSFULLY UPDATED STATS")
          this.getAllStats();
      })
      .catch(error=>console.log("error updating stats", error))
  }

  submitStats(stats){
    
    let fetchData = {
      method: 'POST', 
      headers: {
            'Content-type': 'application/json'
      },
      body: JSON.stringify(stats)
    }
    console.log("stats", stats);
    fetch('/api/create', fetchData)
      .then(response=> response.json())
      .then(() => {
        this.getAllStats();
      })
      .catch(error=> console.log("ERROR POSTING STATS", error));
      this.getAllStats();
  }

  removeStats(id){
    console.log("remove worked", id);
      var removeData = {
        method: "DELETE"
      }
      fetch("/api/delete/"+id, removeData)
      .then(response=> {console.log(response); response.json()})
      .then(myJson=>{
        console.log("myJson", myJson);
        this.setState({
          stats: this.state.stats.filter(statObject=> statObject.id!==id)
        })
        this.getAllStats();
        console.log("removal worked", this.state.stats)
      })
      .catch(error=>console.log("ERROR DELETING STAT: ", error))
  }
  render() {
    if (!this.state.stats) {
      return;
    }
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Header></Header>
          <div className="row">
            <div className="col">
              <AverageStats allStats={this.state.stats}></AverageStats>
            </div>
            <div className="col">
              <Button color="danger" onClick={this.toggle}>Add stats</Button>
            </div>
          </div>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className+" modalWidth rounded "}>
              <ModalHeader className="d-flex justify-content-center mb-0">
                <h4>Input Stats</h4>
              </ModalHeader>
              <ModalBody className="d-flex justify-content-center">
              <AddStats onSubmit={this.createOrModify} toggleOff={this.handleModalToggle}></AddStats>
              </ModalBody>
          </Modal>
        </div>
        <StatsTable onSubmit={this.createOrModify} removeStats={this.removeStats} allStats={this.state.stats}></StatsTable>
      </React.Fragment>
    );
  }
}

export default App;
