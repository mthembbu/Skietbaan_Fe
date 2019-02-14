import React, { Component } from 'react'

 class Groups extends Component {
     constructor(props){
         super(props);
         posts:[]
     }
     
     componentWillMount() {
        fetch('http://skietbaan.retrotest.co.za/api/User')
        .then(res => res.json())
        .then(data =>this.setState({posts : data}));
      }


  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default Groups;