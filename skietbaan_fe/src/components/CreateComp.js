import React, { Component } from "react";
import { Form } from "react-bootstrap";
import propTypes from "prop-types";
import { connect } from "react-redux";
import "../scss/createcomp.css";
import { createcomp } from "../actions/competition.action";
import { getCookie } from "../components/cookie.js";
import history from "./history";
class CreateComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      BestScoresNumber: "",
      Status: true,
      isEmpty: false
    };
    //binding the onChange method to this commponents
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.validate = this.validate.bind(this);
  }
  onClick() {
    history.push("/create");
  }
  /** A method that detects the change in the change in the textfield */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (this.state.Name === "" && this.state.BestScoresNumber === "") {
      document.getElementById("submit-btn").disabled = true;
    } else {
      document.getElementById("submit-btn").disabled = false;
    }
  }

  onChangeInt(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  /** A method that validates the numbers only type of input*/
  validate(evt) {
    evt.value = evt.value.replace(/[^0-9]/g, "");
  }
  /** A method that handles the submit enent for the submit button*/
  onSubmit(e) {
    /** Preventing the default button action event to occur automatically*/
    e.preventDefault();
    //calling the method to create a post => compData for the create competition
    const compData = {
      Name: this.state.Name,
      BestScoresNumber: this.state.BestScoresNumber,
      Status: true
    };
    this.props.createcomp(compData);
  }
  render() {
    if (!getCookie("token")) {
      window.location = "/registerPage";
    }
    return (
      <div>
        <div className="view-page">
          <div className="view-header">
            <div className="image-comtainer">
              <img
                src={require("../components/assets/back-button-white.png")}
                onClick={this.onClick}
                className="go-back-to-create-page"
                alt=""
              />
            </div>
            <div>
              <label className="label-create-competitions">
                Create Competition
              </label>
            </div>
          </div>
        </div>
        <div class="create-comp-container">
          <Form onSubmit={this.onSubmit}>
            <div className="containers-input">
              <label className="comp-label-container">Competition Name</label>
              <div className="comp-input-control">
                <input
                  className="comp-input"
                  type="text"
                  name="Name"
                  id="titleInput"
                  required
                  autoComplete="off"
                  autoCorrect="off"
                  value={this.state.Name}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="comp-input-control">
              <div>
                <label
                  className="comp-label-container"
                  onKeyPress={this.validate}
                >
                  Number of Scores
                </label>
              </div>
              <input
                className="comp-input"
                type="number"
                name="BestScoresNumber"
                id="NumOfScores"
                min="1"
                max="12"
                required
                autoComplete="off"
                autoCorrect="off"
                value={this.state.BestScoresNumber}
                onChange={this.onChange}
              />
            </div>
            <div className="comp-submit-btn-container">
              <button
                variant="secondary"
                type="submit"
                id="submit-btn"
                className={
                  this.state.Name === "" && this.state.BestScoresNumber === ""
                    ? "inactive-comp-submit-btn comp-submit-btn "
                    : "comp-submit-btn"
                }
              >
                Create Competition
              </button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}
CreateComp.propTypes = {
  createcomp: propTypes.func.isRequired
};
const mapStatesToprops = state => ({
  newComp: state.compOBJ.selectedComp
});
export default connect(
  null,
  { createcomp }
)(CreateComp);
