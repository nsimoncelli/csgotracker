import React, {useState} from 'react';
import {format, parseISO} from 'date-fns';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AddStats from './addstats';


class StatsTableRow extends React.Component {
  constructor(props){
    super(props)
    this.state={
      modal: false
    }
    this.removeStatHandler = this.removeStatHandler.bind(this);
    this.toggle = this.toggle.bind(this);
    var id = this.props.stats.id;
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
    removeStatHandler(id){
    this.props.removeStats(this.props.stats.id);
    this.toggle();
  }
  render() {
    var winLossColor = '';
    if (this.props.stats.outcome === 'win') {
      winLossColor = 'win';
    } else if(this.props.stats.outcome==='loss') {
      winLossColor = 'loss';
    } else if(this.props.stats.outcome==='tie'){
      winLossColor = 'tie'
    }
    
    let validDate = new Date(this.props.stats.date);
    let formattedDate = format(validDate, "MM/DD/YYYY");
    // console.log("formatted date", formattedDate);

    return (
      <tr className={winLossColor+" tableRowHeight"}>
        <td className="border border-dark text-center p-0">{formattedDate}</td>
        <td className="border border-dark text-center p-0">{this.props.stats.kills}</td>
        <td className="border border-dark text-center p-0">{this.props.stats.deaths}</td>
        <td className="border border-dark text-center p-0">{(this.props.stats.kills / this.props.stats.deaths).toFixed(2)}</td>
        <td className="border border-dark text-center p-0 assistsSmaller">{this.props.stats.assists}</td>
        <td className="border border-dark text-center p-0 text-light modifyGlow" onClick={this.toggle}
            style={{'backgroundColor': 'black'}}
        >Modify</td>
        <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className +"  modalWidth"}>
          <ModalBody>
            <AddStats allStats={this.props.stats} id={this.props.stats.id} onSubmit={this.props.onSubmit} closeModal={this.toggle}></AddStats>
          </ModalBody>
          <ModalFooter>
            <Button className="buttonWidth" color="danger" onClick={this.removeStatHandler}>Delete Entry</Button>
            {/* <Button color="Cancel" onClick={this.toggle}>Cancel</Button> */}
          </ModalFooter>
        </Modal>
      </div>
      </tr>
    );
  }
}

export default StatsTableRow;
