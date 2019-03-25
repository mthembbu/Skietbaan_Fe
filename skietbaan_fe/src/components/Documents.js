import React, { Component } from "react";
import "../components/Documents.css";
import { getCookie } from "./cookie.js";
import { Collapse } from "react-collapse";
import { BASE_URL } from "../actions/types.js";

class Documents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      value2: "",
      collapseFilterLOGS: false,
      collapseFilterLOS: false
    };
    this.sendLOGS = this.sendLOGS.bind(this);
    this.sendLOS = this.sendLOS.bind(this);
  }

  componentDidMount() {
    if (!getCookie("token")) {
      window.location = "/registerPage";
    }
    let token = getCookie("token");
    fetch(BASE_URL + "/api/Documents/UserLOGS/" + token)
      .then(res => res.json())
      .then(data => this.setState({ value: data }));

    fetch(BASE_URL + "/api/Documents/UserLOS/" + token)
      .then(res => res.json())
      .then(data => this.setState({ value2: data }));
  }

  sendLOGS() {
    let token = getCookie("token");
    fetch(BASE_URL + "/api/Documents/SendLOGS/" + token, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(token)
    });

    if (this.state.collapseFilterLOGS) {
      this.setState({
        collapseFilterLOGS: false
      });
    } else {
      this.setState({
        collapseFilterLOGS: true
      });
    }
  }

  sendLOS() {
    let token = getCookie("token");
    fetch(BASE_URL + "/api/Documents/SendLOS/" + token, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(token)
    });

    if (this.state.collapseFilterLOS) {
      this.setState({
        collapseFilterLOS: false
      });
    } else {
      this.setState({
        collapseFilterLOS: true
      });
    }
  }

  render() {
    if (!getCookie("token")) {
      window.location = "/registerPage";
    }
    return (
      <div className="documents_background ">
        <div className="docuements-heading">
          <div className="documents-text">Documents</div>
        </div>
        <div className="documents-center">
          <div className="label-select-document">Select Document</div>

          <div className="button-upload-document-3">
            <button
              className={
                this.state.value == "Document"
                  ? "Documents-btn-active document-btn-bottom-3"
                  : "documents-btn-default document-btn-bottom-3"
              }
              onClick={this.state.value == "Document" ? this.sendLOGS : null}
            >
              Letter of Good Standing
              {this.state.value !== "Document" ? (
                <img
                  className="document-image-icon"
                  src={require("../resources/noDoc.png")}
                />
              ) : null}
            </button>

            <div className="document-requirements3">
              {this.state.value !== "Document" ? (
                <div>
                  <b>Letter of Good Standing:</b>
                  <p>requires 5 more shoots.</p>
                </div>
              ) : null}
            </div>
            <Collapse isOpened={this.state.collapseFilterLOGS}>
              <div className="documents-collapse">
                Document Sent via email
                <img
                  className="document-image-icon"
                  src={require("../resources/sendDoc.png")}
                />
              </div>
            </Collapse>
          </div>
          <div className="button-upload-document-2">
            <button
              className={
                this.state.value2 == "Document"
                  ? "Documents-btn-active document-btn-bottom-2"
                  : "documents-btn-default document-btn-bottom-2"
              }
              onClick={this.state.value2 == "Document" ? this.sendLOS : null}
            >
              Letter of Status{" "}
              {this.state.value2 !== "Document" ? (
                <img
                  className="document-image-icon"
                  src={require("../resources/noDoc.png")}
                />
              ) : null}
            </button>

            <div className="document-requirements3">
              {this.state.value2 !== "Document" ? (
                <div>
                  <b>Letter of Status:</b>
                  <p>requires further shooting documentation.</p>
                </div>
              ) : null}
            </div>

            <Collapse isOpened={this.state.collapseFilterLOS}>
              <div className="documents-collapse">
                Document Sent via email
                <img
                  className="document-image-icon"
                  src={require("../resources/sendDoc.png")}
                />
              </div>
            </Collapse>
          </div>
        </div>
      </div>
    );
  }
}

export default Documents;
