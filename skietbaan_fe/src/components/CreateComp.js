import React, { Component } from 'react';
import { Jumbotron, Form, Button, Row, Col, Container } from 'react-bootstrap';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import '../scss/createcomp.css';
import { createcomp } from '../actions/competition.action';
class CreateComp extends Component {
	constructor(props) {
		super(props);
		this.state = { Name: '', BestScoresNumber: 0, Status: true, 
						validNumScore: true, validCompName: true 
					};
		//binding the onChange method to this commponents
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onClick = this.onClick.bind(this);
	}
	onClick() {
		Window.location = '/create';
	}
	/** A method that detects the change in the change in thw textfield */
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	onChangeInt(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	/** A method that handles the submit enent for the submit button*/
	onSubmit(e) {
		/** Preventing the default button action event to occur automatically*/
		e.preventDefault();
		//calling the method to create a post => compData for the create competition
		const compData = {
			Name: this.state.Name,
			BestScoresNumber: this.state.BestScoresNumber,
			Status: true
		};
		this.props.createcomp(compData);
	}
	render() {
		return (
			<div>
				<div class="container create-comp-container">
					<Row>
						<Col>
							<a href="/create">
								<i class="fa fa-angle-left" onClick={this.onClick} />
							</a>
						</Col>
						<Col>
							<strong>
								<h4>Create Competition</h4>
							</strong>
						</Col>
					</Row>
					<Row>
						<Col>
							<Jumbotron>
								<Form onSubmit={this.onSubmit}>
									<Form.Group controlId="titleInput">
										<Form.Label><strong>Competition Name:</strong></Form.Label>
										<Form.Control
											type="text"
											placeholder="Enter Competition Name	"
											name="Name"
											id="titleInput"
											value={this.state.Name}
											onChange={this.onChange}
										/>
									</Form.Group>
									<Form.Group controlId="NumOfScores">
										<Form.Label>Number of Scores:</Form.Label>
										<Form.Control
											type="number"
											placeholder="Number of Scores for a Competition"
											name="BestScoresNumber"
											id="NumOfScores"
											value={this.state.BestScoresNumber}
											onChange={this.onChange}
										/>
									</Form.Group>
									<Button variant="primary" type="submit">
										Create
									</Button>
								</Form>
								<br />
							</Jumbotron>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}
CreateComp.propTypes = {
	createcomp: propTypes.func.isRequired
};
const mapStatesToprops = (state) => ({
	newComp: state.compOBJ.selectedComp	
});
export default connect(null, { createcomp })(CreateComp);
