import React, { Component } from 'react';
import { connect } from 'react-redux';
import ViewComp from './ViewComp';
import CreateComp from './CreateComp';
import { compSelectedPages } from '../actions/competition.action';

export class CompComponent extends Component {
	
componentDidMount(){
	this.props.compSelectedPages(1);
}
	render() {
		return (
			<div>
				{this.props.compSelectedPage === 1 ? <CreateComp /> : this.props.compSelectedPage === 2 ? <ViewComp/> : null}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	compSelectedPage: state.compOBJ.compSelectedPage
});

export default connect(mapStateToProps,{compSelectedPages})(CompComponent);
