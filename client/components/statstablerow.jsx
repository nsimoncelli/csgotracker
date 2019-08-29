import React from 'react';
import {format, parseISO} from 'date-fns';
import Modal from 'react-bootstrap/Modal'

class StatsTableRow extends React.Component {
  constructor(props){
    super(props)
    this.removeStatHandler = this.removeStatHandler.bind(this);
    var id = this.props.stats.id
  }
  removeStatHandler(id){
    this.props.removeStats(this.props.stats.id);
  }
  render() {
    var winLossColor = '';
    if (this.props.stats.outcome === 'win') {
      winLossColor = 'bg-primary text-white';
    } else if(this.props.stats.outcome==='loss') {
      winLossColor = 'bg-danger text-white';
    } else if(this.props.stats.outcome==='tie'){
      winLossColor = 'bg-secondary text-white'
    }
    let validDate = new Date(this.props.stats.date);
    let formattedDate = format(validDate, "MM/dd/yyyy");
    return (
      <tr className={winLossColor}>
        <td className="border border-dark text-center">{formattedDate}</td>
        <td className="border border-dark text-center">{this.props.stats.kills}</td>
        <td className="border border-dark text-center">{this.props.stats.deaths}</td>
        <td className="border border-dark text-center">{(this.props.stats.kills / this.props.stats.deaths).toFixed(2)}</td>
        <td className="border border-dark text-center">{this.props.stats.assists}</td>
        <td type="button" className="btn btn-dark" onClick={this.removeStatHandler}>Modify</td>
      </tr>
    );
  }
}

export default StatsTableRow;
