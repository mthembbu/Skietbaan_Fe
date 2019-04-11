import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import '../scss/createcomp.css';
import { createComp,compSelectedPages } from '../actions/competition.action';
import history from './history';
import { Container, Row, Col } from 'react-bootstrap';
import Collapsible from 'react-collapsible';
import downArrow from '../resources/awardIcons/down-triangle.png';
import upArrow from '../resources/awardIcons/up-triangle.png';
import { pageState } from '../actions/postActions';

class CreateComp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Name: '',
			BestScoresNumber: '',
			Hours: '',
			Status: true,
			MaximumScore: '',
			isExist: false,
			toggleRequirements: false,
		isCreated:false
		};
		//binding the onChange method to this commponents
		this.onChange = this.onChange.bind(this);
		this.onChangeBestScoreNum = this.onChangeBestScoreNum.bind(this);
		this.onChangeMaxScore = this.onChangeMaxScore.bind(this);
		this.onChangeHours = this.onChangeHours.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onClick = this.onClick.bind(this);
		this.changeToggle = this.changeToggle.bind(this);
		
	}
	onClick() {
		history.push('/create');
	}
	/** A method that detects the change in the change in th textfield */
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
		this.setState({ isExist: false });
		if (this.state.Name === null && this.state.BestScoresNumber === null) {
			document.getElementById('submit-btn').disabled = true;
		} else {
			document.getElementById('submit-btn').disabled = false;
		}
	}
	/** the method that detects the change in BestSCore */
	onChangeBestScoreNum(event)
	{
		if(event.target.value > 12)
		event.target.value = event.target.value.substr(0,2);
		this.setState({BestScoresNumber:event.target.value});
	}
	/** The method that detects change on MaxScore */
	onChangeMaxScore(event){
		if(event.target.value > 80)
			event.target.value = event.target.value.substr(0,2);
			this.setState({MaximumScore: event.target.value});
	}
	/** The method that detects the changes on the  hours input */
	onChangeHours(event){
		if(event.target.value > 360)
			event.target.value = event.target.value.substr(0,3);
			this.setState({Hours: event.target.value});
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
			this.setState({isCreated: true})
		}
		this.setState({ isExist: this.props.isExist });
		this.props.compSelectedPages(2);
		this.props.pageState(0);	
	}
	changeToggle(){
		this.setState({toggleRequirements: !this.state.toggleRequirements});
	}
	render() {
		return (
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
									min={1}
									max={12}
									required
									autoComplete="off"
									autoCorrect="off"
									placeholder="Number of Best Scores"
									value={this.state.BestScoresNumber}
									onChange={this.onChangeBestScoreNum}
								/>
							</div>

							<div className="comp-input-control">
								<input
									className="comp-input"
									type="number"
									name="MaximumScore"
									id="MaxScore"
									min={1} 
									max={80}
									required
									autoComplete="off"
									autoCorrect="off"
									placeholder="Maximum Score"
									value={this.state.MaximumScore}
									onChange={this.onChangeMaxScore}
								/>
							</div>

							<div className="comp-input-control">
								<input
									className="comp-input"
									type="number"
									name="Hours"
									id="NumOfHours"
									min={1}
									max={360}
									required
									autoComplete="off"
									autoCorrect="off"
									placeholder="Hours Per Competition"
									value={this.state.Hours}
									onChange={this.onChangeHours}
								/>
							</div>
							{this.state.isCreated? <label>Competition created</label>:null}
							
							<div className="comp-input-control">
								<Collapsible className="create-comp-collapsible" trigger={<div className="requirements-collapse" onClick={this.changeToggle}> EDIT REQUIREMENTS 
														<span><img className="down-arrow" src={this.state.toggleRequirements ?upArrow : downArrow} alt=""/></span></div>
													}>
        							<div className="requirements-content">
										<p>This is the collapsible content. It can be any element or React component you like.</p>
        								<p>It can even be another Collapsible component. Check out the next section!</p>
									</div>
     							</Collapsible>
							</div>	
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

export default connect(mapStatesToprops, { createComp,compSelectedPages,pageState })(CreateComp);
