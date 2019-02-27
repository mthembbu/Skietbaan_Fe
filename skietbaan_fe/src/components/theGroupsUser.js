import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './theGroupusers.css'
export class theGroupsUser extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <div className="Top">
          <div className="top_bar">
          <a href="#" class="fa fa-angle-left" />
          <div className="center_label">
            <b>Users 1</b>
          </div>
        </div>
        <div className="the_middle">
        <input className="texts" type="text" placeholder="Search.." />
        <button className="select"> Select all</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(theGroupsUser)
