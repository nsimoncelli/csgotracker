import React from 'react';

class StatsTableRow extends React.Component {
//   constructor(props) {
//     super(props);
//   }
  render() {
    // console.log('statstablerow = ', this.props);
    var winLossColor = '';
    if (this.props.stats.outcome === 'win') {
      winLossColor = 'bg-success text-white';
    } else {
      winLossColor = 'bg-danger text-white';
    }
    return (
      <tr className={winLossColor}>
        <td className="border border-dark text-center">{this.props.stats.date}</td>
        <td className="border border-dark text-center">{this.props.stats.kills}</td>
        <td className="border border-dark text-center">{this.props.stats.deaths}</td>
        <td className="border border-dark text-center">{(this.props.stats.kills / this.props.stats.deaths).toFixed(2)}</td>
        <td className="border border-dark text-center">{this.props.stats.assists}</td>
      </tr>
    );
  }
}

export default StatsTableRow;
