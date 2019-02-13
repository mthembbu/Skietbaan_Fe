import React, { Component } from 'react';
import { Jumbotron, Form, Button } from 'react-bootstrap';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import '../components/createcomp.css';
import { createcomp } from '../actions/competition.action';
class CreateComp extends Component {
	constructor() {
		super();
		this.state = { compTitle: '', compStatus: '' };
		//binding the onChange method to this commponents
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	//------------------------------------------------------------------------
	/** A method that detects the change in the change in thw textfield */
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	//------------------------------------------------------------------------
	/** A method that handles the submit enent for the submit button*/
	onSubmit(e) {
		/** Preventing the default button action event to occur automatically*/
		e.preventDefault();
		const compData = {
			compTitle: this.state.compTitle,
			compStatus: true
		};
		//calling the method to create a post => compData for the create competition
		this.props.createcomp(compData);
	}
	//--------------------------------------------------------------------------
	/** A method that renders the HTML content for this component*/
	render() {
		return (
			<div className="centre-comp">
				<p>
					<h4>Create Competition display</h4>
				</p>
				<Jumbotron>
					<Form onSubmit={this.onSubmit}>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Competition Title:</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Competition Title"
								name="compTitle"
								id="compTitle"
								value={this.state.compTitle}
								onChange={this.onChange}
							/>
						</Form.Group>

						<Button variant="primary" type="submit" onClick={this.onSubmit}>
							Create
						</Button>
					</Form>
				</Jumbotron>
			</div>
		);
	}
}
CreateComp.propTypes = {
	createcomp: propTypes.func.isRequired
};
export default connect(null, { createcomp })(CreateComp);
