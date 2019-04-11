import React, { Component } from 'react';
import { connect } from 'react-redux';
import ViewGroups from './ViewGroups';
import EditGroup from './EditGroup';
import AddMembersGroup from './AddMembersGroup';
import { pageState } from '../actions/postActions';

export class GroupComponent extends Component {
	
componentDidMount(){
	this.props.pageState(0);
}
	render() {
		return (
			<div>
				{this.props.page === 0 ? <ViewGroups /> : this.props.page === 1 ? <EditGroup /> : this.props.page===2? <AddMembersGroup />:null}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	page: state.posts.page
});

export default connect(mapStateToProps,{pageState})(GroupComponent);
