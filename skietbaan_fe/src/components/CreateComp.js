import React, { Component } from "react";
import { Form } from "react-bootstrap";
import propTypes from "prop-types";
import { connect } from "react-redux";
import "../scss/createcomp.css";
import "../scss/view-comp.css";
import { createComp, compSelectedPages } from "../actions/competition.action";
import history from "./history";
import { Container, Row, Col } from "react-bootstrap";
import Collapsible from "react-collapsible";
import downArrow from "../resources/awardIcons/down-triangle.png";
import upArrow from "../resources/awardIcons/up-triangle.png";
import letterhead from "./compassets/letterofgoodstanding.png";
import { pageState } from "../actions/postActions";
import Switch from "@material-ui/core/Switch";
import "../scss/view-comp.css";
import { fetchNumberOfNotification } from "../actions/notificationAction";
import { getCookie } from "./cookie";
class CreateComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      BestScoresNumber: "",
      Hours: "",
      Status: true,
      MaximumScore: "",
      isExist: false,
      toggleRequirements: false,
      isCreated: false,
      errorMessageBestScoreNum: "",
      errorMessageMaxScore: "",
      errorMessageHours: "",
      errorMessageName: "",
      isBestScoreValid: true,
      isMaxScoreValid: true,
      isHoursValid: true,
      isNameValid: false,
      bronzeAccuracy: "",
      bronzeTotal: "",
      silverAccuracy: "",
      silverTotal: "",
      goldAccuracy: "",
      goldTotal: "",
      compID: "",
      validInputs: false,
      height: window.innerHeight,
      width: window.innerWidth,
      token: getCookie("token"),
      selectedStandard: 1,
      numberOfShoots: '',
      isSelectedForLetterOfGoodStanding: false
    };
    //binding the onChange method to this commponents
    this.onChangeCompName = this.onChangeCompName.bind(this);
    this.onChangeBestScoreNum = this.onChangeBestScoreNum.bind(this);
    this.onChangeMaxScore = this.onChangeMaxScore.bind(this);
    this.onChangeHours = this.onChangeHours.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.changeToggle = this.changeToggle.bind(this);
    this.onChangeBronzeAccuracy = this.onChangeBronzeAccuracy.bind(this);
    this.onChangeBronzeTotal = this.onChangeBronzeTotal.bind(this);
    this.onChangeSilverAccuracy = this.onChangeSilverAccuracy.bind(this);
    this.onChangeSilverTotal = this.onChangeSilverTotal.bind(this);
    this.onChangeGoldAccuracy = this.onChangeGoldAccuracy.bind(this);
    this.onChangeGoldTotal = this.onChangeGoldTotal.bind(this);
    this.validateAll = this.validateAll.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.getBodyHeight = this.getBodyHeight.bind(this);
    this.displayTotalRequirements = this.displayTotalRequirements.bind(this);
    this.displayAccuracyRequirements = this.displayAccuracyRequirements.bind(this);
    this.changeToAccuracy = this.changeToAccuracy.bind(this);
    this.changeToTotal = this.changeToTotal.bind(this);
    this.displayLetterOfGoodStanding = this.displayLetterOfGoodStanding.bind(this);
    this.onChangeNumberOfShoots = this.onChangeNumberOfShoots.bind(this);
  }
  componentWillMount() {
    window.addEventListener("resize", this.updateDimensions);
  }
  // The method that mounts everytime there is an action detected
  componentDidMount() {
    this.updateDimensions();
  }
  updateDimensions() {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth
    });
  }
  getBodyHeight() {
    if (this.state.width < 575) {
      return this.state.height - (240 - 184) - 145 + "px";
    } else {
      return "55vh";
    }
  }

  getContainerHeight(){
    if(document.body.clientHeight < this.props.screenSize) return this.props.screenSize - document.body.clientHeight;
    return document.body.clientHeight - 232;
  }

  onClick() {
    history.push("/create");
  }
  /** **********************************************************************************************/

  /** A method that detects the change in the change in th textfield */
  onChangeCompName(event) {
    let isValid = this.validateCompName();
    if (!isValid) {
      this.setState({ errorMessageName: "COMPETITION ALREADY EXISTS!" });
      this.setState({ isNameValid: isValid });
    } else {
      this.setState({ isExist: false, errorMessageName: "" });
    }
    if (event.target.value[0] === " ") {
      event.target.value = event.target.value.slice(0, 0);
    }
    this.setState({ [event.target.name]: event.target.value });
  }
  validateCompName() {
    var strcheck = this.state.Name;
    if (this.state.Name.length <= 1) {
      this.setState({ isNameValid: false });
    }

    if (strcheck === "   ") {
    }
  }
  resetCompProperties() {
    this.setState({ isExist: false, isNameValid: true });
  }
  /** the method that detects the change in BestSCore */
  onChangeBestScoreNum(event) {
    if (event.target.value > 12)
      event.target.value = event.target.value.substr(0, 2);
    let isValid = this.validateBestScoreNumber();
    if (!isValid) {
      this.setState({ errorMessageBestScoreNum: "INVALID NUMBER OF SCORES!" });
      this.setState({ isBestScoreValid: isValid });
    } else this.setState({ errorMessageBestScoreNum: "" });
    this.setState({ BestScoresNumber: event.target.value });
  }
  validateBestScoreNumber() {
    var check = this.state.BestScoresNumber;
    if (this.state.BestScoresNumber.length === 0)
      this.setState({ isBestScoreValid: false });
    if (check.slice(0, 1) >= 2 && check.length > 1) return false;
    else return true;
  }
  /** The method that detects change on MaxScore */
  onChangeMaxScore(event) {
    if (event.target.value > 3)
      event.target.value = event.target.value.substr(0, 3);
    let isValid = this.validateMaxScore();
    if (!isValid) {
      this.setState({ errorMessageMaxScore: "INVALID MAX SCORE!" });
      this.setState({ isMaxScoreValid: isValid });
    } else this.setState({ errorMessageMaxScore: "" });
    this.setState({ MaximumScore: event.target.value });
  }
  validateMaxScore() {
    var check = this.state.MaximumScore;
    if (this.state.MaximumScore.length === 0)
      this.setState({ isMaxScoreValid: false });
    if (
      check.slice(0, 3) > 100 ||
      ((check.slice(0, 1) > 1 || check.slice(0, 2) > 99) && check.length > 3)
    )
      return false;
    else return true;
  }
  /** The method that detects the changes on the  hours input */
  onChangeHours(event) {
    if (event.target.value > 3)
      event.target.value = event.target.value.substr(0, 3);
    let isValid = this.validateHours();
    if (!isValid) {
      this.setState({ errorMessageHours: "INVALID MAXIMUM HOURS!" });
      this.setState({ isHoursValid: isValid });
    } else this.setState({ errorMessageHours: "" });
    this.setState({ Hours: event.target.value });
  }
  validateHours() {
    var check = this.state.Hours;
    if (this.state.Hours.length === 0) this.setState({ isHoursValid: false });
    if (
      check.slice(0, 3) > 360 ||
      ((check.slice(0, 1) > 3 || check.slice(0, 2) > 36) && check.length > 3)
    )
      return false;
    else return true;
  }
  /** **********************************************************************************************/

  /** The standards onChange Listeners: */
  onChangeBronzeAccuracy(event) {
    if (event.target.value > 3)
      event.target.value = event.target.value.substr(0, 3);
    this.setState({ bronzeAccuracy: event.target.value });
  }
  onChangeBronzeTotal(event) {
    if (event.target.value > 3)
      event.target.value = event.target.value.substr(0, 3);
    this.setState({ bronzeTotal: event.target.value });
  }
  onChangeSilverAccuracy(event) {
    if (event.target.value > 3)
      event.target.value = event.target.value.substr(0, 3);
    this.setState({ silverAccuracy: event.target.value });
  }
  onChangeSilverTotal(event) {
    if (event.target.value > 3)
      event.target.value = event.target.value.substr(0, 3);
    this.setState({ silverTotal: event.target.value });
  }
  onChangeGoldAccuracy(event) {
    if (event.target.value > 3)
      event.target.value = event.target.value.substr(0, 3);
    this.setState({ goldAccuracy: event.target.value });
  }
  onChangeGoldTotal(event) {
    if (event.target.value > 3)
      event.target.value = event.target.value.substr(0, 3);
    this.setState({ goldTotal: event.target.value });
  }

  onChangeNumberOfShoots(e){
      if(e.target.value === 0 || e.target.value === 'e'){
        e.target.value = e.target.value.substr(0,0);
      }
      this.setState({ [e.target.name]: e.target.value });
    
  }
  validateNumberOfShoots(){

  }
  /** The method that checks all the inputs if whether they are valid or not*/
  validateAll() {
    if (
      this.state.Name.length !== 0 &&
      this.state.BestScoresNumber.length !== 0 &&
      this.state.Hours.length !== 0 &&
      this.state.MaximumScore !== 0
    ) {
      this.setState({ validInputs: true });
      return true;
    } else {
      return false;
    }
  }
  /** A method that handles the submit enent for the submit button*/
  async onSubmit(e) {
    if (this.validateAll()) {
      /** Preventing the default button action event to occur automatically*/
      e.preventDefault();
      //calling the method to create a post => compData for the create competition
      const compData = {
        Name: this.state.Name /**TODO: Don't forget to change to lowercase to avoid case sensitivity conflicts*/,
        BestScoresNumber: this.state.BestScoresNumber,
        Hours: this.state.Hours,
        Status: true,
        MaximumScore: this.state.MaximumScore
      };

      const BronzeData = {
        standard: "Bronze",
        accuracy: this.state.bronzeAccuracy === "" ? 0 : parseFloat(this.state.bronzeAccuracy),
        total: this.state.bronzeTotal === "" ? 0 : parseFloat(this.state.bronzeTotal),
        statusLetter: this.state.isSelectedForLetterOfGoodStanding,
        numberOfShoots: this.state.numberOfShoots
      };
      const SilverData = {
        standard: "Silver",
        accuracy: this.state.silverAccuracy === "" ? 0 : parseFloat(this.state.silverAccuracy),
        total: this.state.silverTotal === "" ? 0 : parseFloat(this.state.silverTotal),
        statusLetter: this.state.isSelectedForLetterOfGoodStanding,
        numberOfShoots: this.state.numberOfShoots
      };
      const GoldData = {
        standard: "Gold",
        accuracy: this.state.goldAccuracy === "" ? 0 : parseFloat(this.state.goldAccuracy),
        total: this.state.goldTotal === "" ? 0 : parseFloat(this.state.goldTotal),
        statusLetter: this.state.isSelectedForLetterOfGoodStanding,
        numberOfShoots: this.state.numberOfShoots
      };
      this.props.fetchNumberOfNotification(this.state.token);
      const RData = [BronzeData, SilverData, GoldData];
      const requestedObj = { competition: compData, GetRequirements: RData };
      await this.props.createComp(requestedObj);
      /** Checking whether the competition has been created or not*/
      if (this.props.isCreated === true || this.props.isCreated === false) {
        setTimeout(() => {
          if (this.props.isCreated === true) {
            this.props.compSelectedPages(2);
            this.props.pageState(0);
          } else {
            this.setState({ isExist: true });
          }
        }, 1000);
      }
    }
  }
  displayTotalRequirements(){
    return (<div>
      <Container className="container justify-content-container total-requirements-container">
        <Row className="bronze-standard-row">
        <Col xs={5} md={5} lg={5} className="bronze-header-label-col">
            <div className="accuracy-header-label">Bronze Award:</div>
        </Col>
        <Col xs={7} md={7} className="bronze-input-input-col">
            <input className="bronze-total-input"
                  type="number" name="bronzeTotal" id="B_total"
                  required  min={1}  max={1000}  autoComplete="off"
                  autoCorrect="off" value={this.state.bronzeTotal}
                  onChange={this.onChangeBronzeTotal}/>      
        </Col>
        </Row>
        <Row className="silver-standard-row">
        <Col xs={5} md={5} lg={5} className="silver-header-label-col">
            <div className="accuracy-header-label">Silver Award:</div>
        </Col>
        <Col xs={7} md={7} className="silver-input-input-col">
            <input className="silver-total-input"
                  type="number" name="silverTotal" id="S_total"
                  required min="0" max="600" autoComplete="off"
                  autoCorrect="off" value={this.state.silverTotal} 
                  onChange={this.onChangeSilverTotal}
            />
        </Col>
        </Row>
        <Row className="gold-standard-row">
        <Col xs={5} md={5} lg={5} className="bronze-header-label-col">
            <div className="accuracy-header-label">Gold Award:</div>
        </Col>
        <Col xs={7} md={7} className="gold-input-input-col">
          <input className="gold-total-input"
                type="number" name="goldTotal"id="G_total" 
                required min="0" max="600" autoComplete="off"
                autoCorrect="off" value={this.state.goldTotal}
                onChange={this.onChangeGoldTotal}
          />
        </Col>
        </Row>
      </Container>
    </div>);
  }

  changeToTotal(){
      this.setState({selectedStandard:1});
}
  displayAccuracyRequirements(){
    return (<div>
        <Container className="container justify-content-container accuracy-requirements-container">
        <Row className="bronze-standard-row">
        <Col xs={5} md={5} lg={5} className="bronze-header-label-col">
            <div className="accuracy-header-label">Bronze Award:</div>
        </Col>
        <Col xs={7} md={7} className="bronze-input-input-col">
          <input className="bronze-accuracy-input" type="number"
              min={1} max={100} name="bronzeAccuracy" id="B_accuracy"
              required placeholder="%" autoComplete="off"
              autoCorrect="off" value={this.state.bronzeAccuracy}
              onChange={this.onChangeBronzeAccuracy}
          />    
        </Col>
        </Row>
        <Row className="silver-standard-row">
        <Col xs={5} md={5} lg={5} className="silver-header-label-col">
            <div className="accuracy-header-label">Silver Award:</div>
        </Col>
        <Col xs={7} md={7} className="bronze-input-input-col">
          <input className="silver-accuracy-input" type="number"
              name="silverAccuracy" id="S_accuracy" required
              placeholder="%" min="0" max="100"
              autoComplete="off" autoCorrect="off"
              value={this.state.silverAccuracy}
              onChange={this.onChangeSilverAccuracy}
          />
        </Col>
        </Row>
        <Row className="gold-standard-row">
        <Col xs={5} md={5} lg={5} className="bronze-header-label-col">
            <div className="accuracy-header-label">Gold Award:</div>
        </Col>
        <Col xs={7} md={7} className="bronze-input-input-col">
          <input className="gold-accuracy-input" type="number"
           name="goldAccuracy" id="G_accuracy" required
           placeholder="%" min="0" max="100"
           autoComplete="off" autoCorrect="off"
           value={this.state.goldAccuracy}
           onChange={this.onChangeGoldAccuracy}
                          />
        </Col>
        </Row>
      </Container>

    </div>);
  }
  changeToAccuracy(){
  this.setState({selectedStandard:2});
}

  displayLetterOfGoodStanding(){
  return (<div>
           <Container className="container justify-content-container good-standing-container">
             <Row className="letter-of-status-row">
               <Col sx={7} sm={7} md={7} className="letter-label-col">
               <div className="letter-header-label">
                                        Selected for Letter of Status
                                    </div>
               </Col>
               <Col sx={2} sm={2} md={2} className="letter-image-col">
                  {this.state.isSelectedForLetterOfGoodStanding ? <img src={letterhead} className="letter-image" alt=""/> : null}
               </Col>
               <Col sx={3} sm={3} md={3} className="letter-button-col">
                <div className="switch-button">
                  <Switch
                    color={"primary"}
                    className={this.state.isSelectedForLetterOfGoodStanding ? "activeButton" : "inactiveButton"}
                    focus={true} checked={this.state.isSelectedForLetterOfGoodStanding}
                    onClick={() =>{this.setState({isSelectedForLetterOfGoodStanding: !this.state.isSelectedForLetterOfGoodStanding})} }
                                  />
                </div>                  
               </Col>
             </Row>
             <Row className="shoots-row">
             <Col xs={5} md={5} lg={5} className="shoots-header-label-col">
             <div className="shoots-needed-header-label">Shoots Needed:</div>
             </Col>
             <Col xs={7} md={7} className="shoots-input-col">
             <input className="number-of-shoots-input" type="number"
                    name="numberOfShoots" id="numShoots" required
                    min="0" max="100"
                    autoComplete="off" autoCorrect="off" 
                    value={this.state.isSelectedForLetterOfGoodStanding ? this.state.numberOfShoots : 0}
                    onChange={this.onChangeNumberOfShoots}
                          />
             </Col>
             </Row>
           </Container>
         </div>);
  }
  changeToggle() {
    this.setState({ toggleRequirements: !this.state.toggleRequirements });
  }
  render() {
    return (
      <div
        className="create-comp-container"
        style={{ height:  this.getContainerHeight() +"px"}}
      >
        <Form onSubmit={this.onSubmit}>
          <div className="containers-input">
            <div className="comp-input-control">
              <input
                className="comp-input"
                type="text"
                name="Name"
                id="titleInput"
                required
                autoComplete="off"
                autoCorrect="off"
                placeholder="Competition Name"
                value={this.state.Name}
                onChange={this.onChangeCompName}
              />
              <div
                style={{ fontSize: 12, color: "red" }}
                className={this.state.isExist ? "error-comp-message" : "hidden"}
              >
                COMPETITION ALREADY EXISTS!
              </div>
            </div>
          </div>
          <div className="comp-input-control">
            <input
              className="comp-input"
              type="number"
              name="BestScoresNumber"
              id="NumOfScores"
              min={1}
              max={12}
              required
              autoComplete="off"
              autoCorrect="off"
              placeholder="Number of Best Scores"
              value={this.state.BestScoresNumber}
              onChange={this.onChangeBestScoreNum}
            />
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.isBestScoreValid
                ? null
                : this.state.errorMessageBestScoreNum}
            </div>
          </div>

          <div className="comp-input-control">
            <input
              className="comp-input"
              type="number"
              name="MaximumScore"
              id="MaxScore"
              min={1}
              max={300}
              required
              autoComplete="off"
              autoCorrect="off"
              placeholder="Maximum Score"
              value={this.state.MaximumScore}
              onChange={this.onChangeMaxScore}
            />
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.isMaxScoreValid
                ? null
                : this.state.errorMessageMaxScore}
            </div>
          </div>
          <div className="comp-input-control">
            <input
              className="comp-input"
              type="number"
              name="Hours"
              id="NumOfHours"
              min={1}
              max={360}
              required
              autoComplete="off"
              autoCorrect="off"
              placeholder="Hours Per Competition"
              value={this.state.Hours}
              onChange={this.onChangeHours}
            />
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.isHoursValid ? null : this.state.errorMessageHours}
            </div>
          </div>
          {this.state.isCreated ? <label>Competition created</label> : null}
          <div className="comp-input-control">
            <Collapsible
              className="create-comp-collapsible"
              trigger={
                <div
                  className="requirements-collapse"
                  onClick={this.changeToggle}
                >
                  <div className="requirements-label">EDIT REQUIREMENTS </div>
                  <span>
                    <img
                      className="down-arrow"
                      src={this.state.toggleRequirements ? upArrow : downArrow}
                      alt=""
                    />
                  </span>
                </div>
              }
            >
              <div className="requirements-content">
                <Form>  
                  <Container className="standards-container">
                  <Row className="row justify-row-content requirements-row">
                    <Col className="requirements-row-container">
                    
                  
                    <Row className="row justify-row-content standards-row">
                      <Col className="total-standard-button">
                        <div className={this.state.selectedStandard === 1 ?"total-standard-button-active":"total-standard-button-inactive"}
                          onClick={this.changeToTotal}
                        >TOTAL SCORE</div>
                      </Col>
                      <Col className="accuracy-standard-button">
                        <div className={this.state.selectedStandard === 2 ? 'accuracy-standard-button-active':'accuracy-standard-button-inactive'}
                          onClick={this.changeToAccuracy}
                        >ACCURACY</div>
                      </Col>  
                    </Row>
                    {/** the two pages to display the standard inputs for the Toatal Score and Accuracy */}
                      <div className="">
                        {this.state.selectedStandard === 1 ? (this.displayTotalRequirements()):
                          (this.state.selectedStandard === 2) ? (this.displayAccuracyRequirements()): null}
                      </div>
                    </Col>
                  </Row>
                  <Row >
                      <Col className="col-for-letter-of-good-standing">
                          <div className="border-bottom"/>
                      </Col>      
                  </Row>
                  <Row className="letter-of-good-standing-row">
                      <Col className="letter-of-good-standing-col">
                          {this.displayLetterOfGoodStanding()}
                      </Col>      
                  </Row>
                  </Container>
                </Form>
              </div>
            </Collapsible>
          </div>

          <div className="comp-submit-btn-container">
            <button
              disabled={this.validateAll}
              variant="secondary"
              type="submit"
              id="submit-btn"
              className={
                this.state.Name.length !== 0 &&
                this.state.BestScoresNumber.length !== 0 &&
                this.state.Hours.length !== 0 &&
                this.state.MaximumScore !== 0 &&
                (this.state.bronzeAccuracy.length !== 0 &&
                  this.state.bronzeTotal.length !== 0) &&
                (this.state.silverAccuracy.length !== 0 &&
                  this.state.silverTotal.length !== 0) &&
                (this.state.goldAccuracy.length !== 0 &&
                  this.state.goldTotal.length !== 0)
                  ? "comp-success-submit-btn"
                  : "comp-not-success-submit-btn"
              }
            >
              CREATE COMPETITION
            </button>
          </div>
        </Form>
      </div>
    );
  }
}
CreateComp.propTypes = {
  createComp: propTypes.func.isRequired
};
const mapStatesToprops = state => ({
  newComp: state.compOBJ.selectedComp,
  isCreated: state.compOBJ.isCreated,
  screenSize: state.posts.screenSize
});

export default connect(
  mapStatesToprops,
  { createComp, compSelectedPages, pageState, fetchNumberOfNotification }
)(CreateComp);
