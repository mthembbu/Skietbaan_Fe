import React, { Component } from 'react';
import '../components/Documents.css';
import { getCookie } from './cookie.js';
import { Collapse } from 'react-collapse';
import { BASE_URL } from "../actions/types.js";
import { availableIcon } from "../resources/sendDoc.png";
import { notAvailableIcon } from "../resources/gidx.png";

class Documents extends Component {
    constructor(props) {
        super(props);
        this.state = {
          value: "",
          value2: "",
          collapseFilterLOGS: false,
          collapseFilterLOS: false

        };
        this.SendLOGS = this.SendLOGS.bind(this)
        this.SendLOS = this.SendLOS.bind(this)
    }

    componentWillMount(){
        if(!getCookie("token")){
            window.location = "/registerPage";
        }
        let token = getCookie("token");
        fetch(BASE_URL+"/api/Documents/UserLOGS/" + token)
        .then(res=>res.json())
        .then(data=>this.setState({value:data}))

        fetch(BASE_URL+"/api/Documents/UserLOS/" + token)
        .then(res=>res.json())
        .then(data=>this.setState({value2:data}))
    }

    SendLOGS(){
        let token =getCookie("token");
        fetch(BASE_URL+"/api/Documents/SendLOGS/" + token)

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

    SendLOS(){
        let token =getCookie("token");
        fetch(BASE_URL+"/api/Documents/SendLOS/" + token)

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

        if(!getCookie("token")){
            window.location = "/registerPage";
        }
        return (
            <div className="documents_background ">
                    <div className="docuements-heading">
                        <div className="documents-text">Documents</div>
                    </div>
                <div className="documents-center" >
                        <div className="label-select-document">                        
                                Documents have requirements                            
                        </div>
                                
                        <div className="button-upload-document-3">
                            <button className={this.state.value=="Document"? "btn-active send-email btn-bottom-3":"btn-default send-email btn-bottom-3"} 
                                onClick={this.state.value=="Document"? this.SendLOGS: null}> 
                                Letter of Good Standing {this.state.value=="Document"? 
                                <img className="document-image-icon" src={require("../resources/sendDoc.png")}/>:
                                <img className="document-image-icon" src={require("../resources/gidx.png")}/>}
                            </button>
                            <Collapse isOpened={this.state.collapseFilterLOGS}>
                                <div className="documents-collapse">
                                    Document Sent 
                                </div>                           
                            </Collapse>                                
                        </div>
                            <div className="button-upload-document-2">
                                <button className={this.state.value2=="Document"? "btn-active send-email btn-bottom-2":
                                    "btn-default send-email btn-bottom-2"} 
                                    onClick={this.state.value2=="Document"? this.SendLOS: null}>
                                    Letter of Status {this.state.value2=="Document"? 
                                    <img className="document-image-icon" src={require("../resources/sendDoc.png")}/>:
                                    <img className="document-image-icon" src={require("../resources/gidx.png")}/>}
                                </button>                       

                                <Collapse isOpened={this.state.collapseFilterLOS}>
                                    <div className="documents-collapse">
                                        Document Sent
                                    </div>                             
                                </Collapse>                               
                            </div>
                        <div className="documents-rectangle">
                            <div className="label-select-document2"> 
                                {this.state.value=="Document" && this.state.value2=="Document" ? null: "What is needed"}
                            </div>

                            <div className="document-requirements3">
                                {this.state.value !== "Document"? <div><b>Letter of Good Standing:</b> 
                                <p>requires 5 more shoots.</p></div>: null}
                            </div>
                            <div className="document-requirements3"> 
                                {this.state.value2 !== "Document"? <div><b>Letter of Status:</b> 
                                <p>requires further shooting documentation.</p></div>: null}
                            </div>  
                        </div>                  
                </div>
                
            </div>
        );
    }
}

export default Documents;
