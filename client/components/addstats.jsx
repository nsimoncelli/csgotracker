import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DatePicker from 'react-datepicker';
// import {format, parseISO} from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";


class AddStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "date": new Date(),
      "outcome": '',
      "kills": 0,
      "deaths": 0,
      "assists": 0,
      "id": null

    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleWinChange = this.handleWinChange.bind(this);
    this.handleLossChange = this.handleLossChange.bind(this);
    this.handleTieChange = this.handleTieChange.bind(this);
    this.handleKillChange = this.handleKillChange.bind(this);
    this.handleAssistChange = this.handleAssistChange.bind(this);
    this.handleDeathChange = this.handleDeathChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    if(!this.props.id){
      return;
    }
    if(this.props.id){
      this.setState({
        id: this.props.id
      })
    }
  }

  handleDateChange(date) {
    this.setState({
      date: date
    });

  }
  handleWinChange() {
    this.setState({
      outcome: 'win'
    });
  }
  handleLossChange() {
    this.setState({
      outcome: 'loss'
    });
  }
  handleTieChange() {
    this.setState({
      outcome: 'tie'
    });
  }
  handleKillChange(event) {
    var killsParsed = parseInt(event.target.value);
    console.log(killsParsed);
    this.setState({
      "kills": killsParsed
    });
  }
  handleDeathChange(event) {
    var deathsParsed = parseInt(event.target.value);
    console.log(deathsParsed);
    this.setState({
      "deaths": deathsParsed
    });
  }
  handleAssistChange(event) {
    var assistsParsed = parseInt(event.target.value);
    this.setState({
      "assists": assistsParsed
    });
  }

  handleSubmit(event){
      if(!this.state.outcome|| !this.state.deaths || !this.state.kills || !this.state.assists){
        return;
      }
      event.preventDefault();
      this.props.onSubmit(this.state);
      this.handleReset();
      this.props.toggleOff();
      
  }
  handleReset(){
    this.props.toggleOff();
      this.setState({
        "date": new Date(),
        "outcome": '',
        "kills": 0,
        "deaths": 0,
        "assists": 0
      })
  }
  render() {
    var outcomeVar = 'W/L/T';
    if (this.state.outcome === "win") {
      outcomeVar = 'Win'
    } else if (this.state.outcome === "loss") {
      outcomeVar = 'Loss'
    } else if (this.state.outcome === "tie") {
      outcomeVar = 'Tie'
    }
    console.log("add stats props", this.props);
    return (

      <Form className="statsInput">
        <Row className="d-flex justify-content-center">
          <Col  className="d-flex justify-content-center">
            <DatePicker
              className="border border-primary"
              selected={this.state.date}
              onSelect={this.handleDateChange} 
              onChange={this.handleChange}
              name="startDate"
              size="lg"
              dateFormat="MM/dd/yyyy" 
            />
          </Col>
          <Col  className="d-flex justify-content-center">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {outcomeVar}
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropDownDivLength">
                <Dropdown.Item className="win"  onClick={this.handleWinChange}>Win</Dropdown.Item>
                <Dropdown.Item className="loss"  onClick={this.handleLossChange}>Loss</Dropdown.Item>
                <Dropdown.Item className="tie"  onClick={this.handleTieChange}>Tie</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control className="align-self-center" onChange={this.handleKillChange} size="sm" type="number" placeholder="Kills"/>
          </Col>
          <Col>
            <Form.Control className="align-self-center"  onChange={this.handleDeathChange} size="sm" type="number" placeholder="Deaths"/>
          </Col>
          <Col>
            <Form.Control className="align-self-center" onChange={this.handleAssistChange} size="sm" type="number" placeholder="Assists"/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button  className="btn-block" variant="primary" type="submit" onClick={this.handleSubmit}>
                        Submit
            </Button>
          </Col>
          <Col>
            <Button className="btn-block" variant="danger" type="submit" onClick={this.handleReset}>
                        Cancel
            </Button>
          </Col>
        </Row>
      </Form>
      
    );
  }
}

export default AddStats;
