import React, { Component } from 'react';
import { Label, Table, Input, Button } from 'reactstrap';
import '../components/Documents.css';
import { getCookie } from './cookie.js';
import {BASE_URL} from '../actions/types.js';

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
        fetch("http://localhost:50962/api/Documents/UserLOGS/" + token)
        .then(res=>res.json())
        .then(data=>this.setState({value:data}))

        fetch("http://localhost:50962/api/Documents/UserLOS/" + token)
        .then(res=>res.json())
        .then(data=>this.setState({value2:data}))
    }

    SendLOGS(){
        let token =getCookie("token");
        fetch("http://localhost:50962/api/Documents/SendLOGS/" + token)
    }

    SendLOS(){
        let token =getCookie("token");
        fetch("http://localhost:50962/api/Documents/SendLOS/" + token)
    }

   
    render() {
        console.log(this.state.value)
        var urDivStyle ={
            margin:'0',
            padding: '2%'
        }
        var rowJustifyStyle={
            backgroundColor: 'black',
            height: '49px'
        }
        
        return (
            <div className="documents-container">
                <div className="row justify-content-center" style={rowJustifyStyle} >
                    <h1 className="page-name2"  style={urDivStyle}>Documents</h1>
                </div>
                <div className="documents-body ">
                        <div className="label-select-document">
                            <label >
                                Select Document Type
                            </label>
                        </div>
                                
                        <div className="button-upload-document-3">
                            <button className={this.state.value=="Document"? "btn-active send-email btn-bottom-3": "btn-default send-email btn-bottom-3"} onClick={this.state.value=="Document"? this.SendLOGS: null}>Letter Of Good Standing </button>
                        </div>
                        <div className="button-upload-document-2">
                            <button className={this.state.value2=="Document"? "btn-active send-email btn-bottom-2": "btn-default send-email btn-bottom-2"} onClick={this.state.value2=="Document"? this.SendLOS: null}>Letter Of Status</button>
                        </div>
                        <div className="document-requirements"> 

                        </div>
                        
                </div>
                
            </div>
        );
    }
}

export default Documents;
