import React from 'react';

class StatsTableRow extends React.Component {
//   constructor(props) {
//     super(props);
//   }
  render() {
    // console.log('statstablerow = ', this.props);
    var winLossColor = '';
    if (this.props.stats.outcome === 'win') {
      winLossColor = 'bg-success';
    } else {
      winLossColor = 'bg-danger';
    }
    return (
      <tr className={winLossColor}>
        <td>{this.props.stats.date}</td>
        <td>{this.props.stats.kills}</td>
        <td>{this.props.stats.deaths}</td>
        <td>{(this.props.stats.kills / this.props.stats.deaths).toFixed(2)}</td>
        <td>{this.props.stats.assists}</td>
      </tr>
    );
  }
}

export default StatsTableRow;
