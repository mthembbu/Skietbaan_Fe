import React, { Component } from 'react';
import { fetchcomp, updateByIdComp, fetchRequirements, fetchParticipants } from '../actions/competition.action';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../scss/view-comp.css';
import Collapsible from 'react-collapsible';
import { Form, Container, Row, Col } from 'react-bootstrap';
import Switch from '@material-ui/core/Switch';
class ViewComp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allcomps: [],
			status: [],
			updatedComp: {},
			participants: [],
			requirements: [],
			tempR: { id: '', competition: null, standard: '', accuracy: '', total: '' },
			B: { id: '', competition: null, standard: 'Bronze', accuracy: '', total: '' },
			S: { id: '', competition: null, standard: 'Silver', accuracy: '', total: '' },
			G: { id: '', competition: null, standard: 'Gold', accuracy: '', total: '' },
			dict: {}
		};
		this.changeStatus = this.changeStatus.bind(this);
		this.getRequirements = this.getRequirements.bind(this);
		this.clearDefault = this.clearDefault.bind(this);
	}
	// The method that mounts everytime there is an action detected
	componentDidMount() {
		this.props.fetchcomp();
		this.props.fetchParticipants();
	}
	componentWillReceiveProps(val) {
		for (let i = 0; i < val.length; i++) {
			this.state.status.push(val.compOBJ[i].status);
			this.state.requirements.push(val.compOBJ[i].requirements);
			if (i == this.state.dict.Id) {
				this.state.dict.push(val.compOBJ[i].dict);
			}
		}
	}
	//The method that detects the current status and perform the changes
	changeStatus(status, i) {
		const newCompOBJArr = [ ...this.props.compOBJ ]; //cloning an array of competition
		newCompOBJArr[i].status = !status; //changing the status of a newly cloned array
		this.props.updateByIdComp(newCompOBJArr[i], i + 1); //updating the competition status by ID in the back-end
		const newDict = { ...this.props.dict };
		this.setState({ compOBJ: newCompOBJArr });
		this.setState({ dict: newDict });
	}
	//the method that adds the update for the inputs
	onSubmit(e) {}
	//The method that fetches the requirements everytime the competition is clicked on
	//End-point: URL/R/{ID}
	getRequirements(index) {
		this.props.fetchRequirements(index);
		console.log('Index: ', index);
		this.setState({ tempR: this.props.requirements[0] });
		console.log('Inside GetREquirements: ', document.getElementsByClassName('Accuracy').value);
		console.log('Requirements Arr: ', this.props.requirements);
	}
	onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
		console.log(e.target.value);
	}
	clearDefault(a) {
		if (a.defaultValue == this.props.requirements[0].accuracy) {
			this.props.requirements[0].accuracy = '';
		}
	}

	render() {
		console.log('Inside Render: ', this.state.tempR);
		console.log('Render() Requirements Arr: ', this.props.requirements);
		const displayCompetitions = (
			<div className="page-contents">
				<table class="table-view-competitions">
					<tbody>
						{this.props.compOBJ.map((compVar, i) => (
							<tr key={compVar.id} className="table-competition-row">
								<td className="td-col">
									<Collapsible
										trigger={
											<div>
												<div className="test1">
													<label
														class="competition-containers"
														onClick={() => this.getRequirements(compVar.id)}
													>
														{compVar.name} {compVar.requirements}
													</label>
												</div>
												<div className="test2">
													<label class="users-per-comp">
														{compVar.status == true ? (
															<i class=" fa fa-group">
																<span class="user-per-comp-num">
																	{this.props.dict[compVar.id]}
																</span>
															</i>
														) : null}
													</label>
												</div>
											</div>
										}
									>
										<div>
											<div class="comp-req-container">
												<Form onSubmit={this.onSubmit}>
													<Container>
														<Row>
															<Col xs={4} md={4} />
															<Col xs={4} md={4}>
																<label>ACCURACY</label>
															</Col>
															<Col xs={4} md={4}>
																<label>TOTAL</label>
															</Col>
														</Row>
														<Row>
															<Col xs={4} md={4}>
																<label>Bronze : </label>
															</Col>
															<Col xs={4} md={4}>
																<div className="comp-input-control">
																	<input
																		className="req-input"
																		type="number"
																		name="B_accuracy"
																		id="B_accuracy"
																		min="0"
																		max="360"
																		required
																		autoComplete="off"
																		autoCorrect="off"
																		value={this.props.requirements[0].accuracy}
																		onChange={this.onChange}
																		onClick={() => {}}
																		onFocus={this.clearDefault(this)}
																	/>
																</div>
															</Col>
															<Col xs={4} md={4}>
																<div className="comp-input-control">
																	<input
																		className="req-input"
																		type="number"
																		name="B_total"
																		id="B_total"
																		min="0"
																		max="0"
																		required
																		autoComplete="off"
																		autoCorrect="off"
																		value={this.props.requirements[0].total}
																		onChange={this.onChange}
																	/>
																</div>
															</Col>
														</Row>

														<Row>
															<Col xs={4} md={4}>
																<label>Silver : </label>
															</Col>
															<Col xs={4} md={4}>
																<div className="comp-input-control">
																	<input
																		className="req-input"
																		type="number"
																		name="S_accuracy"
																		id="S_accuracy"
																		min="0"
																		max="360"
																		required
																		autoComplete="off"
																		autoCorrect="off"
																		value={this.props.requirements[1].accuracy}
																		onChange={this.onChange}
																		onClick={() => {}}
																		onFocus={this.clearDefault(this)}
																	/>
																</div>
															</Col>
															<Col xs={4} md={4}>
																<div className="comp-input-control">
																	<input
																		className="req-input"
																		type="number"
																		name="S_total"
																		id="S_total"
																		min="0"
																		max="0"
																		required
																		autoComplete="off"
																		autoCorrect="off"
																		value={this.props.requirements[1].total}
																		onChange={this.onChange}
																	/>
																</div>
															</Col>
														</Row>

														<Row>
															<Col xs={4} md={4}>
																<label>Gold : </label>
															</Col>
															<Col xs={4} md={4}>
																<div className="comp-input-control">
																	<input
																		className="req-input"
																		type="number"
																		name="G_accuracy"
																		id="G_accuracy"
																		min="0"
																		max="360"
																		required
																		autoComplete="off"
																		autoCorrect="off"
																		value={this.props.requirements[2].accuracy}
																		onChange={this.onChange}
																		onClick={() => {}}
																		onFocus={this.clearDefault(this)}
																	/>
																</div>
															</Col>
															<Col xs={4} md={4}>
																<div className="comp-input-control">
																	<input
																		className="req-input"
																		type="number"
																		name="G_total"
																		id="G_total"
																		min="0"
																		max="0"
																		required
																		autoComplete="off"
																		autoCorrect="off"
																		value={this.props.requirements[2].total}
																		onChange={this.onChange}
																	/>
																</div>
															</Col>
														</Row>

														<Row>
															<Col xs={8} md={8}>
																<label>Selected for Letter of Good Standing </label>
															</Col>
															<Col xs={4} md={4}>
																<div>
																	<Switch
																		color={'primary'}
																		className={
																			compVar.status ? (
																				'activeButton'
																			) : (
																				'inactiveButton'
																			)
																		}
																		focus={true}
																		checked={false}
																		onClick={() => {}}
																	/>
																</div>
															</Col>
														</Row>

														<Row>
															<Col xs={4} md={4}>
																<label>Shots Needed: </label>
															</Col>
															<Col xs={4} md={4}>
																<div className="comp-input-control">
																	<input
																		className="req-input"
																		type="number"
																		name="shortsNeeded"
																		id="shortsNeeded"
																		min="0"
																		max="360"
																		required
																		autoComplete="off"
																		autoCorrect="off"
																		value={() => {}}
																		onChange={this.onChange}
																		onClick={() => {}}
																		onFocus={() => {}}
																	/>
																</div>
															</Col>
															<Col xs={4} md={4}>
																<div className="req-submit-btn-container">
																	<button variant="secondary"	type="submit"
																		id="submit-btn"	className="comp-success-submit-btn">
																		update
                                    </button>
																</div>
															</Col>
														</Row>
													</Container>
												</Form>
											</div>
										</div>
									</Collapsible>
								</td>
								<td className="test3">
									<div className={compVar.status ? 'activeButton' : 'inactiveButton'}>
										<Switch
											color={'primary'}
											className={
												compVar.status ? 'activeButton' : 'inactiveButton'
											} /** "Active"*/
											focus={true}
											checked={compVar.status}
											onClick={() => this.changeStatus(compVar.status, i)}
										/>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
		return (
			<div className="view-page">
				<div className="table-competition-container">
					<div className="content-competitions">{displayCompetitions}</div>
				</div>
			</div>
		);
	}
}
ViewComp.propTypes = {
	fetchcomp: PropTypes.func.isRequired,
	fetchParticipants: PropTypes.func.isRequired,
	fetchRequirements: PropTypes.func.isRequired,
	compOBJ: PropTypes.array.isRequired,
	postOBJ: PropTypes.array.isRequired,
	requirements: PropTypes.array.isRequired,
	tempR: PropTypes.shape({
		id: PropTypes.arrayOf(PropTypes.number),
		competition: null,
		standard: PropTypes.string,
		accuracy: PropTypes.arrayOf(PropTypes.number),
		total: PropTypes.arrayOf(PropTypes.number)
	}),

	updateByIdComp: PropTypes.func.isRequired,
	dict: PropTypes.shape({
		Id: PropTypes.arrayOf(PropTypes.number),
		count: PropTypes.arrayOf(PropTypes.number)
	})
};
const mapStateToProps = (state) => ({
	compOBJ: state.compOBJ.allComps,
	newcompOBJ: state.compOBJ.selectedComp,
	updatedComp: state.compOBJ.updatedComp,
	dict: state.compOBJ.dict,
	requirements: state.compOBJ.requirements
});
export default connect(mapStateToProps, { fetchcomp, updateByIdComp, fetchParticipants, fetchRequirements })(ViewComp);
