import React from 'react';
import StatsTableRow from './statstablerow';

class StatsTable extends React.Component {
//   constructor(props) {
//     super(props);
//   }
  render() {
    // console.log('table stats', this.props);
    
    return (
      <div className="table-responsive">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Kills</th>
              <th scope="col">Deaths</th>
              <th scope="col">K/D</th>
              <th scope="col">Assists</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.allStats.map(stat => {
                return (<StatsTableRow key={stat.id} stats={stat}>

                </StatsTableRow>);
              })
            }
          </tbody>

        </table>
      </div>
    );
  }
}

export default StatsTable;
