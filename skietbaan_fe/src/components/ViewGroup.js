import React, { Component } from "react";
import IconLeft from "@material-ui/icons/KeyboardArrowLeft";

export class ViewGroups extends Component {
  constructor(props) {
    super(props);

    this.onBack = this.onBack.bind(this);
  }

  onBack() {
    window.location = "/Groups";
  }
  render() {
    return (
      <div className="Page-container">
        <div className="The-nav-bar">
          <div className="Top-bar">
            <a href="#" class="fa fa-angle-left" onClick={this.onBack} />
            <div className="The-name">
              <label className="Group-name">GROUPS</label>
            </div>
          </div>
        </div>
        <nav class="navbar navbar-default">
          <div class="container-fluid">
            <div class="navbar-header">
              <div className="test" />
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default ViewGroups;
