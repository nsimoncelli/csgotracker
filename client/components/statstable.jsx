import React from 'react';

class StatsTable extends React.Component {
//   constructor(props) {
//     super(props);
//   }
  render() {
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
            <tr className="bg-success">
              <td>8/27/2019</td>
              <td>24</td>
              <td>15</td>
              <td>{24 / 15}</td>
              <td>5</td>
            </tr>
            <tr className="bg-danger">
              <td>8/26/2019</td>
              <td>16</td>
              <td>24</td>
              <td>{(16 / 24).toFixed(2)}</td>
              <td>11</td>
            </tr>
          </tbody>

        </table>
      </div>
    );
  }
}

export default StatsTable;
