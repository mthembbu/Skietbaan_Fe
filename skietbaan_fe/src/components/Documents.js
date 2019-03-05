import React, { Component } from 'react';
import '../components/Documents.css';
import { getCookie } from './cookie.js';
class Documents extends Component {
    constructor(props) {
        super(props);
        this.state = {
          value: "",
          value2: "",
        };
        this.SendLOGS = this.SendLOGS.bind(this)
        this.SendLOS = this.SendLOS.bind(this)
      }

    componentWillMount(){
        let token =getCookie("token");
        fetch("http://api.skietbaan.retrotest.co.za/api/Documents/UserLOGS/" + token)
        .then(res=>res.json())
        .then(data=>this.setState({value:data}))

        fetch("http://api.skietbaan.retrotest.co.za/api/Documents/UserLOS/" + token)
        .then(res=>res.json())
        .then(data=>this.setState({value2:data}))
    }

    SendLOGS(){
        let token =getCookie("token");
        fetch("http://api.skietbaan.retrotest.co.za/api/Documents/SendLOGS/" + token)
    }

    SendLOS(){
        let token =getCookie("token");
        fetch("http://api.skietbaan.retrotest.co.za/api/Documents/SendLOS/" + token)
    }

   
    render() {
        return (
            <div className="documents-container">
                    <div className="docuements-heading">
                        <div className="documents-text">Documents</div>
                    </div>
                <div className="documents-body ">
                        <div className="label-select-document">                        
                                Documents have requirements                            
                        </div>
                                
                        <div className="button-upload-document-3">
                            <button className={this.state.value=="Document"? "btn-active send-email btn-bottom-3":"btn-default send-email btn-bottom-3"} onClick={this.state.value=="Document"? this.SendLOGS: null}> Letter of Good Standing {this.state.value=="Document"? <img src={require("../resources/sendDoc.png")}/>:null}</button>
                                
                        </div>
                        <div className="button-upload-document-2">
                            <button className={this.state.value2=="Document"? "btn-active send-email btn-bottom-2":"btn-default send-email btn-bottom-2"} onClick={this.state.value2=="Document"? this.SendLOS: null}>Letter of Status {this.state.value2=="Document"? <img src={require("../resources/sendDoc.png")}/>:null}</button>                       
                        </div>

                        <div className="label-select-document"> 
                            {this.state.value=="Document" && this.state.value2=="Document" ? null: "What is needed"}
                        </div>

                        <div className="document-requirements3">
                            {this.state.value !== "Document"? <div><b>Letter of Good Standing:</b> <p>requires 5 more shoots.</p></div>: null}
                        </div>

                        <div className="document-requirements3"> 
                            {this.state.value2 !== "Document"? <div><b>Letter of Status:</b> <p>requires further shooting documentation.</p></div>: null}
                        </div>                    
                </div>
                
            </div>
        );
    }
}

export default Documents;
