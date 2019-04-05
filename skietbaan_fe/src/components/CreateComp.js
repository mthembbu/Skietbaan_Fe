import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import '../scss/createcomp.css';
import { createComp } from '../actions/competition.action';
import history from './history';
class CreateComp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Name: '',
			BestScoresNumber: '',
			Hours: '',
			Status: true,
			MaximumScore: '',
			isExist: false
		};
		//binding the onChange method to this commponents
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onClick = this.onClick.bind(this);
		this.validate = this.validate.bind(this);
	}
	onClick() {
		history.push('/create');
	}
	/** A method that detects the change in the change in thw textfield */
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
		this.setState({ isExist: false });
		if (this.state.Name === null && this.state.BestScoresNumber === null) {
			document.getElementById('submit-btn').disabled = true;
		} else {
			document.getElementById('submit-btn').disabled = false;
		}
	}
	/** A method that validates the numbers only type of input*/
	validate(evt) {
		evt.value = evt.value.replace(/[^0-9]/g, '');
	}
	/** A method that handles the submit enent for the submit button*/
	onSubmit(e) {
		/** Preventing the default button action event to occur automatically*/
		e.preventDefault();
		//calling the method to create a post => compData for the create competition
		const compData = {
			Name: this.state.Name /**TODO: Don't forget to change to lowercase to avoid case sensitivity conflicts*/,
			BestScoresNumber: this.state.BestScoresNumber,
			Hours: this.state.Hours,
			Status: true,
			MaximumScore: this.state.MaximumScore
		};
		this.props.createComp(compData);
		if (this.props.isExist == false) {
			history.push('/ViewComp');
		}
		this.setState({ isExist: this.props.isExist });
	}
	render() {
		return (
			<div>
				<div class="create-comp-container">
					<Form onSubmit={this.onSubmit}>
						<div className="containers-input">
							<div className="comp-input-control">
								<input
									className="comp-input"
									type="text"
									name="Name"
									id="titleInput"
									required
									autoComplete="off"
									autoCorrect="off"
									placeholder="Competition Name"
									value={this.state.Name}
									onChange={this.onChange}
								/>
							</div>
							<div className={this.props.isExist ? 'error-comp-message' : 'hidden'}>
								Competition Already Exists
							</div>
						</div>
						<div className="comp-input-control">
							<input
								className="comp-input"
								type="number"
								name="BestScoresNumber"
								id="NumOfScores"
								min="1"
								max="12"
								required
								autoComplete="off"
								autoCorrect="off"
								placeholder="Number of Best Scores"
								value={this.state.BestScoresNumber}
								onChange={this.onChange}
							/>
						</div>

						<div className="comp-input-control">
							<input
								className="comp-input"
								type="number"
								name="MaximumScore"
								id="MaxScore"
								min="1"
								max="300"
								required
								autoComplete="off"
								autoCorrect="off"
								placeholder="Maximum Score"
								value={this.state.MaximumScore}
								onChange={this.onChange}
							/>
						</div>

						<div className="comp-input-control">
							<input
								className="comp-input"
								type="number"
								name="Hours"
								id="NumOfHours"
								min="1"
								max="360"
								required
								autoComplete="off"
								autoCorrect="off"
								placeholder="Hours Per Competition"
								value={this.state.Hours}
								onChange={this.onChange}
							/>
						</div>
						<div className="requirements-toggle" />
						<div className="comp-submit-btn-container">
							<button
								variant="secondary"
								type="submit"
								id="submit-btn"
								className="comp-success-submit-btn"
							>
								Create Competition
							</button>
						</div>
					</Form>
				</div>
			</div>
		);
	}
}
CreateComp.propTypes = {
	createComp: propTypes.func.isRequired
};
const mapStatesToprops = (state) => ({
	newComp: state.compOBJ.selectedComp,
	isExist: state.compOBJ.isExist
});
export default connect(mapStatesToprops, { createComp })(CreateComp);
