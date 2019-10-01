import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DatePicker from 'react-datepicker';
import {format} from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";


class AddStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "date": new Date(),
      "outcome": 'W/L/T',
      "kills": "Kills",
      "deaths": "Deaths",
      "assists": "Assists",
      "id": null, 
      "outcomeDivClass": "win"

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
    // this.disableSubmit = this.disableSubmit.bind(this);
  }
  // disableSubmit(){
  //   if(this.state.kills==='W/L/T' || this.state.deaths<0 || this.state.deaths==="Deaths" || this.state.kills==="Kills" || this.state.kills<0 || this.state.assists<0 || this.state.assists==="Assists"){
  //     return false;
  //   }
  // }
  componentDidMount(){
    if(!this.props.id){
      return;
    }
    if(this.props.id){
      this.setState({
        id: this.props.id
      })
    }
    
    if(this.props.allStats.kills){
      this.setState({
        "kills": this.props.allStats.kills
            })
    }
   
    if(this.props.allStats.deaths){
      this.setState({
        "deaths": this.props.allStats.deaths
      })
    }
    
    if(this.props.allStats.assists){
      this.setState({
        "assists": this.props.allStats.assists
      })
    }
    if(this.props.allStats.outcome)({
      outcome: this.props.allStats.outcome,
      outcomeDivClass: this.props.allStats.outcome
    })

  }

  handleDateChange(date) {
    this.setState({
      date: date
    });

  }
  handleWinChange() {
    this.setState({
      outcome: 'win',
      outcomeDivClass: 'win'
    });
  }
  handleLossChange() {
    this.setState({
      outcome: 'loss', 
      outcomeDivClass: 'loss'
    });
  }
  handleTieChange() {
    this.setState({
      outcome: 'tie',
      outcomeDivClass: 'tie'
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
      if(this.state.kills<0 || this.state.deaths <0 || this.state.assists <0){
        return;
      }
      
      if(this.props.closeModal){
        this.props.closeModal();
      }
      event.preventDefault();
      this.props.onSubmit(this.state);
      this.handleReset();
      this.props.toggleOff();
      

      
  }
  handleReset(){
    if(!this.props.closeModal){
      // this.props.closeModal();
      console.log("it worked")
    }
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
              <Dropdown.Toggle className={this.state.outcomeDivClass} id="dropdown-basic">
                {this.state.outcome}
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
            <Form.Control className="align-self-center regular-sized-inputs" onChange={this.handleKillChange} size="sm" type="number" placeholder={this.state.kills}/>
          </Col>
          <Col>
            <Form.Control className="align-self-center regular-sized-inputs"  onChange={this.handleDeathChange} size="sm" type="number" placeholder={this.state.deaths}/>
          </Col>
          <Col>
            <Form.Control className="align-self-center regular-sized-inputs" onChange={this.handleAssistChange} size="sm" type="number" placeholder={this.state.assists}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control className="align-self-center small-screen-inputs" onChange={this.handleKillChange} size="sm" type="number" placeholder="K"/>
          </Col>
          <Col>
            <Form.Control className="align-self-center small-screen-inputs"  onChange={this.handleDeathChange} size="sm" type="number" placeholder="D"/>
          </Col>
          <Col>
            <Form.Control className="align-self-center small-screen-inputs" onChange={this.handleAssistChange} size="sm" type="number" placeholder="A"/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button  className="btn-block" variant="primary" type="submit" disabled={!this.state.kills==='W/L/T' || this.state.deaths<0 || this.state.deaths==="Deaths" || this.state.kills==="Kills" || this.state.kills<0 || this.state.assists<0 || this.state.assists==="Assists"} onClick={this.handleSubmit}>
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
