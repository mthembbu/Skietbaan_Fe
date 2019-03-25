import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ViewGroups from './ViewGroups';
import EditGroup from './EditGroup';
import AddMembersGroup from './AddMembersGroup';

export class GroupComponent extends Component {
	static propTypes = {
		prop: PropTypes
	};

	render() {
		console.log(this.props.page);
		return (
			<div>
				{this.props.page === 0 ? <ViewGroups /> : this.props.page === 1 ? <EditGroup /> : <AddMembersGroup />}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	page: state.posts.page
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GroupComponent);
