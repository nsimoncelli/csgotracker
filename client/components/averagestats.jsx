import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

class AverageStats extends React.Component {

  render() {
    // console.log("avg stats thing", this.props.allStats);
    var totalKills = 0;
    var totalDeaths = 0;
    var totalAssists = 0;
    var totalAvgKD = 0;
    var totalWins = 0;
    var totalLosses = 0;
    var winLossRatio = 0;
    var totalGamesPlayed = 0;
    this.props.allStats.map(stat => {
      totalKills += stat.kills;
      totalDeaths += stat.deaths;
      totalAssists += stat.assists;
      totalGamesPlayed += 1;
      if (stat.outcome === 'win') {
        totalWins += 1;
      } else {
        totalLosses += 1;
      }
    });
    return (
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
    View All Stats
        </Dropdown.Toggle>

        <Dropdown.Menu className="viewAllStats">
          <Dropdown.Item href="#/action-0">Total Games = {totalGamesPlayed}</Dropdown.Item>
          <Dropdown.Item href="#/action-1">Total Kills = {totalKills}</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Total Deaths = {totalDeaths}</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Total Assists = {totalAssists}</Dropdown.Item>
          <Dropdown.Item href="#/action-4">Average K/D = {(totalKills / totalDeaths).toFixed(2)}</Dropdown.Item>
          <Dropdown.Item href="#/action-5">Total Wins = {totalWins}</Dropdown.Item>
          <Dropdown.Item href="#/action-6">Total Losses = {totalLosses}</Dropdown.Item>
          <Dropdown.Item href="#/action-7">W/L Ratio = {(totalWins / totalLosses).toFixed(2)}</Dropdown.Item>

        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default AverageStats;
