import React from 'react';
import StatsTableRow from './statstablerow';

class StatsTable extends React.Component {
  render() {
    
    return (
      <div className="table-responsive statsTable">
        <table className="table collapseTable">
          <thead className="thead-dark">
            <tr>
              <th className="text-center p-0" scope="col">Date</th>
              <th className="text-center p-0" scope="col">Frags</th>
              <th className="text-center p-0" scope="col">Deaths</th>
              <th className="text-center p-0" scope="col">K/D</th>
              <th className="text-center p-0" scope="col">Assists</th>
              <th className="text-center p-0" scope="col">Modify</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.allStats.map(stat => {
                return (<StatsTableRow
                onSubmit={this.props.onSubmit}
                removeStats={this.props.removeStats}
                key={stat.id} stats={stat}>

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
