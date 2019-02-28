import React, { Component } from 'react';
import { Form,
		Button,
		Row,
		Col} from 'react-bootstrap';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import '../scss/createcomp.css';
import { createcomp } from '../actions/competition.action';
class CreateComp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Name: '',
			BestScoresNumber: 0,
			Status: true,
			validNumScore: true,
			validCompName: true
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
				<div className="view-page">
					<div className="view-header">
						<div className="image-comtainer">
							<img
								src={require('../components/assets/back-button-white.png')}
								onClick={this.onClick}
								className="go-back-to-create-page"
								alt=""
							/>
						</div>
						<div>
							<label className="label-create-competitions">Create Competition</label>
						</div>
					</div>
				</div>
				<div class="container create-comp-container">
					<Row>
						<Col>
							<Form onSubmit={this.onSubmit}>
								<div className="containers-input">
									<label className="comp-label-container">Competition Name</label>
									<div className="comp-input-control">
										<input
											className="comp-input"
											type="text"
											name="Name"
											id="titleInput"
											value={this.state.Name}
											onChange={this.onChange}
										/>
									</div>
								</div>
								<div>
									<label className="comp-label-container">Number of Scores</label>
								</div>
								<div className="comp-input-control">
									<input
										className="comp-input"
										type="number"
										name="BestScoresNumber"
										id="NumOfScores"
										value={this.state.BestScoresNumber}
										onChange={this.onChange}
									/>
								</div>
								<div class="comp-submit-btn">
									<Button variant="secondary" type="submit">
										Create
									</Button>
								</div>
							</Form>
							<br />
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
