import React, { Component } from 'react';
import { fetchcomp, updateByIdComp, fetchParticipants,fetchRequirements,UpdateRequirements } from '../actions/competition.action';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../scss/view-comp.css';
import { URL } from '../actions/types';
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
			bronzeAccuracy: '',
			bronzeTotal: '',
			silverAccuracy: '',
			silverTotal: '',
			goldAccuracy: '',
			goldTotal: '',
			dict: {}
		};

		this.changeStatus = this.changeStatus.bind(this);
		this.getRequirements = this.getRequirements.bind(this);
		this.onChange = this.onChange.bind(this);
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
	HandleOnSubmit=(index)=> {
		const BronzeData = {
			standard: 'Bronze',
			accuracy: this.state.bronzeAccuracy,
			total: this.state.bronzeTotal
		};
		const SilverData = {
			standard: 'Silver',
			accuracy: this.state.silverAccuracy,
			total: this.state.silverTotal
    };
    const GoldData = {  standard: "Gold",
                          accuracy: this.state.goldAccuracy,
                          total: this.state.goldTotal
                        };
    const RData = [BronzeData,SilverData,GoldData];
    this.props.UpdateRequirements(index,RData);
	}
	//The method that fetches the requirements everytime the competition is clicked on
	//End-point: URL/R/{ID}
	getRequirements(index) {
		fetch(URL + '/R/' + index).then((response) => response.json()).then((requirementsData) =>
			this.setState({
				bronzeAccuracy: requirementsData[0].accuracy,
				bronzeTotal: requirementsData[0].total,
				silverTotal: requirementsData[1].total,
				silverAccuracy: requirementsData[1].total,
				goldTotal: requirementsData[2].total,
				goldAccuracy: requirementsData[1].total
			})
		);
	}
	onChange({ target }) {
		this.setState({ [target.name]: target.value });
	}
	render() {
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
												<div className="test1" onClick={() => this.getRequirements(compVar.id)}>
													<label class="competition-containers">
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
												<Form >
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
																		name="bronzeAccuracy"
																		id="B_accuracy"
																		required
																		autoComplete="off"
																		autoCorrect="off"
																		value={this.state.bronzeAccuracy}
																		onChange={this.onChange}
																	/>
																</div>
															</Col>
															<Col xs={4} md={4}>
																<div className="comp-input-control">
																	<input
																		className="req-input"
																		type="number"
																		name="bronzeTotal"
																		id="B_total"
																		required
																		autoComplete="off"
																		autoCorrect="off"
																		value={this.state.bronzeTotal}
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
																		name="silverAccuracy"
																		id="S_accuracy"
																		required
																		autoComplete="off"
																		autoCorrect="off"
																		value={this.state.silverAccuracy}
																		onChange={this.onChange}
																	/>
																</div>
															</Col>
															<Col xs={4} md={4}>
																<div className="comp-input-control">
																	<input
																		className="req-input"
																		type="number"
																		name="silverTotal"
																		id="S_total"
																		required
																		autoComplete="off"
																		autoCorrect="off"
																		value={this.state.silverTotal}
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
																		name="goldAccuracy"
																		id="G_accuracy"
																		required
																		autoComplete="off"
																		autoCorrect="off"
																		value={this.state.goldAccuracy}
																		onChange={this.onChange}
																	/>
																</div>
															</Col>
															<Col xs={4} md={4}>
																<div className="comp-input-control">
																	<input
																		className="req-input"
																		type="number"
																		name="goldTotal"
																		id="G_total"
																		required
																		autoComplete="off"
																		autoCorrect="off"
																		value={this.state.goldTotal}
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
																		autoComplete="off"
																		autoCorrect="off"
																		onChange={this.onChange}
																	/>
																</div>
															</Col>
															<Col xs={4} md={4}>
																<div className="req-submit-btn-container">
																	<button
																		variant="secondary"
																		type="submit"
																		id="submit-btn"
																		className="comp-success-submit-btn"
                                    onClick={() => this.HandleOnSubmit(compVar.id)}
																	>
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
export default connect(mapStateToProps, { fetchcomp, updateByIdComp, fetchParticipants, fetchRequirements,  UpdateRequirements})(ViewComp);
