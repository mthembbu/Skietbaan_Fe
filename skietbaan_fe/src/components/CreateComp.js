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
import { pageState } from "../actions/postActions";
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
      bronzeAccuracy: "",
      bronzeTotal: "",
      silverAccuracy: "",
      silverTotal: "",
      goldAccuracy: "",
      goldTotal: "",
      compID: "",
      height: window.innerHeight,
      width: window.innerWidth,
      token: getCookie("token")
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
    this.updateDimensions = this.updateDimensions.bind(this);
    this.getBodyHeight = this.getBodyHeight.bind(this);
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
      return this.state.height - 240 + "px";
    } else {
      return "55vh";
    }
  }
  onClick() {
    history.push("/create");
  }
  /** **********************************************************************************************/

  /** A method that detects the change in the change in th textfield */
  onChangeCompName(event) {
    if (event.target.value.length > 15)
      event.target.value = event.target.value.substr(0, 15);
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ isExist: false });
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
    if (this.state.BestScoresNumber.length == 0)
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
    if (this.state.MaximumScore.length == 0)
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
    if (this.state.Hours.length == 0) this.setState({ isHoursValid: false });
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
  /** A method that handles the submit enent for the submit button*/
  async onSubmit(e) {
    /** Preventing the default button action event to occur automatically*/
    e.preventDefault();
    //calling the method to create a post => compData for the create competition
    const compData = {
      Name: this.state
        .Name /**TODO: Don't forget to change to lowercase to avoid case sensitivity conflicts*/,
      BestScoresNumber: this.state.BestScoresNumber,
      Hours: this.state.Hours,
      Status: true,
      MaximumScore: this.state.MaximumScore
    };
    const BronzeData = {
      standard: "Bronze",
      accuracy: this.state.bronzeAccuracy,
      total: this.state.bronzeTotal
    };
    const SilverData = {
      standard: "Silver",
      accuracy: this.state.silverAccuracy,
      total: this.state.silverAccuracy
    };
    const GoldData = {
      standard: "Gold",
      accuracy: this.state.goldAccuracy,
      total: this.state.goldTotal
    };
    const RData = [BronzeData, SilverData, GoldData];
    const requestedObj = { competition: compData, GetRequirements: RData };
    await this.props.createComp(requestedObj);
    /** Checking whether the competition has been created or not*/
    if (this.props.isExist === false) {
      this.props.fetchNumberOfNotification(this.state.token);
      this.props.compSelectedPages(2);
      this.props.pageState(0);
    }
  }
  changeToggle() {
    this.setState({ toggleRequirements: !this.state.toggleRequirements });
  }
  render() {
    return (
      <div
        class="create-comp-container"
        style={{ maxHeight: this.getBodyHeight(), height: "fit-content" }}
      >
        <Form onSubmit={this.onSubmit}>
          <div className="containers-input">
            <div className="comp-input-control">
              <input
                className="comp-input"
                type="text"
                name="Name"
                id="titleInput"
                min={0}
                max={15}
                required
                autoComplete="off"
                autoCorrect="off"
                placeholder="Competition Name"
                value={this.state.Name}
                onChange={this.onChangeCompName}
              />
            </div>
            <div
              className={this.props.isExist ? "error-comp-message" : "hidden"}
            >
              Competition Already Exists
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
                    <Row className="standards-label">
                      <Col xs={3} md={3} lg={3} />
                      <Col xs={5} md={5} lg={5}>
                        <div className="accuracy-header-label">ACCURACY %</div>
                      </Col>
                      <Col xs={4} md={4}>
                        <div className="total-header-label">TOTAL</div>
                      </Col>
                    </Row>
                    <Row className="bronze-row">
                      <Col xs={4} md={4}>
                        <div class="accuracy-header-label">Bronze Award: </div>
                      </Col>
                      <Col xs={4} md={4}>
                        <div className="">
                          <input
                            className="bronze-accuracy-input-control"
                            type="number"
                            min={1}
                            max={100}
                            name="bronzeAccuracy"
                            id="B_accuracy"
                            required
                            placeholder="%"
                            autoComplete="off"
                            autoCorrect="off"
                            value={this.state.bronzeAccuracy}
                            onChange={this.onChangeBronzeAccuracy}
                          />
                        </div>
                      </Col>
                      <Col xs={4} md={4}>
                        <div className="">
                          <input
                            className="bronze-total-input-control"
                            type="number"
                            name="bronzeTotal"
                            id="B_total"
                            required
                            min={1}
                            max={1000}
                            autoComplete="off"
                            autoCorrect="off"
                            value={this.state.bronzeTotal}
                            onChange={this.onChangeBronzeTotal}
                          />
                        </div>
                      </Col>
                    </Row>

                    <Row className="silver-row">
                      <Col xs={4} md={4}>
                        <div class="silver-label">Silver Award: </div>
                      </Col>
                      <Col xs={4} md={4}>
                        <div className="">
                          <input
                            className="silver-accuracy-input-control"
                            type="number"
                            name="silverAccuracy"
                            id="S_accuracy"
                            required
                            placeholder="%"
                            min="0"
                            max="100"
                            autoComplete="off"
                            autoCorrect="off"
                            value={this.state.silverAccuracy}
                            onChange={this.onChangeSilverAccuracy}
                          />
                        </div>
                      </Col>
                      <Col xs={4} md={4}>
                        <div className="">
                          <input
                            className="silver-total-input-control"
                            type="number"
                            name="silverTotal"
                            id="S_total"
                            required
                            min="0"
                            max="600"
                            autoComplete="off"
                            autoCorrect="off"
                            value={this.state.silverTotal}
                            onChange={this.onChangeSilverTotal}
                          />
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={4} md={4}>
                        <div class="accuracy-label">Gold Award: </div>
                      </Col>
                      <Col xs={4} md={4}>
                        <div className="">
                          <input
                            className="gold-accuracy-input-control"
                            type="number"
                            name="goldAccuracy"
                            id="G_accuracy"
                            required
                            placeholder="%"
                            min="0"
                            max="100"
                            autoComplete="off"
                            autoCorrect="off"
                            value={this.state.goldAccuracy}
                            onChange={this.onChangeGoldAccuracy}
                          />
                        </div>
                      </Col>
                      <Col xs={4} md={4}>
                        <div className="">
                          <input
                            className="gold-total-input-control"
                            type="number"
                            name="goldTotal"
                            id="G_total"
                            required
                            min="0"
                            max="600"
                            autoComplete="off"
                            autoCorrect="off"
                            value={this.state.goldTotal}
                            onChange={this.onChangeGoldTotal}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </Form>
              </div>
            </Collapsible>
          </div>

          <div className="comp-submit-btn-container">
            <button
              variant="secondary"
              type="submit"
              id="submit-btn"
              className="comp-success-submit-btn"
            >
              Create Competition
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
  isExist: state.compOBJ.isExist
});

export default connect(
  mapStatesToprops,
  { createComp, compSelectedPages, pageState, fetchNumberOfNotification }
)(CreateComp);
