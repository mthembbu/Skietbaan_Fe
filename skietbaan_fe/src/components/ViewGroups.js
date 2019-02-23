import React, { Component } from 'react'
import PropTypes from 'prop-types'


export class ViewGroups extends Component {
  static propTypes = {
    prop: PropTypes
  }

  componentWillMount(){
      fetch()
  }

  onBack(){
      window.location = "/Groups"
  }
  render() {
    const page =(
        <div className="Page-container">
            <div className="The-nav-bar">
                <div className="Top-bar">
                <a href="#" class="fa fa-angle-left" onClick={this.onBack} />
                <label className="Group-name">GROUPS</label>
                </div>
            </div>
        </div>
    ) 
    return (
      <div>
        {page}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {

}

export default (ViewGroups)
