import React, { Component } from 'react';
import {
	fetchComp,
	updateByIdComp,
	fetchParticipants,
	fetchRequirements,
	updateRequirements,
	compSelectedPages
} from '../actions/competition.action';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../scss/view-comp.css';
import { BASE_URL, handleErrors } from '../actions/types';
import letterhead from './compassets/letterofgoodstanding.png';
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
			dict: {},
			toggleRequirements: false,
			idCompToggel: 0,
			EnableCompName: false,
			isLetterOfStatus: false,
			numberofshots: 0,
			activatedCompetition: null,
			height: window.innerHeight,
			width: window.innerWidth
		};

		this.changeStatus = this.changeStatus.bind(this);
		this.getRequirements = this.getRequirements.bind(this);
		this.onChange = this.onChange.bind(this);
		this.changeToggle = this.changeToggle.bind(this);
		this.changeStatusOfLogs = this.changeStatusOfLogs.bind(this);
		this.updateNumberOfShots = this.updateNumberOfShots.bind(this);
		this.getDefaultShots = this.getDefaultShots.bind(this);
		this.makeLetterOfStatus = this.makeLetterOfStatus.bind(this);
		this.handleOnSubmit = this.handleOnSubmit.bind(this);
		this.updateDimensions = this.updateDimensions.bind(this);
		this.getBodyHeight = this.getBodyHeight.bind(this);
		this.onChangeBronzeAccuracy = this.onChangeBronzeAccuracy.bind(this);
		this.onChangeBronzeTotal = this.onChangeBronzeTotal.bind(this);
		this.onChangeSilverAccuracy = this.onChangeSilverAccuracy.bind(this);
		this.onChangeSilverTotal = this.onChangeSilverTotal.bind(this);
		this.onChangeGoldAccuracy = this.onChangeGoldAccuracy.bind(this);
		this.onChangeGoldTotal = this.onChangeGoldTotal.bind(this);
	}
	componentWillMount() {
		window.addEventListener('resize', this.updateDimensions);
	}
	// The method that mounts everytime there is an action detected
	componentDidMount() {
		this.updateDimensions();
		this.props.fetchComp();
		this.props.fetchParticipants();
		this.getDefaultShots();
	}
	updateDimensions() {
		this.setState({
			height: window.innerHeight,
			width: window.innerWidth
		});
	}
	getBodyHeight() {
		if (this.state.width < 575) {
			return this.state.height - 240;
		} else {
			return 70;
		}
	}
	getDefaultShots() {
		fetch(BASE_URL + '/api/Documents/StatusCompetition')
			.then(handleErrors)
			.then((res) => res.json())
			.then((data) => {
				this.setState({ activatedCompetition: data });
			})
			.catch((err) => {
				/* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
			});
		fetch(BASE_URL + '/api/Documents/NumberOFShots')
			.then(handleErrors)
			.then((res) => res.json())
			.then((data) => {
				this.setState({ numberofshots: data });
			})
			.catch((err) => {
				/* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
			});
	}

	updateNumberOfShots() {
		fetch(BASE_URL + '/api/Documents/changeShots?shots=' + this.state.numberofshots, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state.numberofshots)
		})
			.then(function (response) { })
			.then(function (data) { })
			.catch((err) => {
				/* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
			});
	}

	makeLetterOfStatus(CompID) {
		this.changeStatusOfLogs();

		fetch(BASE_URL + '/api/Documents/getGroup?ID=' + CompID, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(CompID)
		})
			.then(function (response) { })
			.then(function (data) { })
			.catch(function (data) { })
			.catch((err) => {
				/* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
			});
		setTimeout(() => {
			fetch(BASE_URL + '/api/Documents/StatusCompetition')
				.then((res) => res.json())
				.then((data) => {
					this.setState({ activatedCompetition: data });
				})
				.catch((err) => {
					/* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
				});
		}, 2000);
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
		const newCompOBJArr = [...this.props.compOBJ]; //cloning an array of competition
		newCompOBJArr[i].status = !status; //changing the status of a newly cloned array
		this.props.updateByIdComp(newCompOBJArr[i], i + 1); //updating the competition status by ID in the back-end
		const newDict = { ...this.props.dict };
		this.setState({ compOBJ: newCompOBJArr });
		this.setState({ dict: newDict });
	}
	//the method that adds the update for the inputs
	handleOnSubmit = (e, index) => {
		e.preventDefault();
		this.updateNumberOfShots();
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
		const GoldData = {
			standard: 'Gold',
			accuracy: this.state.goldAccuracy,
			total: this.state.goldTotal
		};
		const RData = [BronzeData, SilverData, GoldData];
		this.props.updateRequirements(index, RData);
		this.setState({ toggleRequirements: false });
	};
	//The method that fetches the requirements everytime the competition is clicked on
	//End-point: BASE_URL/R/{ID}
	getRequirements(index) {
		this.setState({ idCompToggel: index });
		this.changeToggle();
		fetch(BASE_URL + '/R/' + index)
			.then((response) => response.json())
			.then((requirementsData) => {
				this.setState({
					bronzeAccuracy: requirementsData[0].accuracy,
					bronzeTotal: requirementsData[0].total,
					silverAccuracy: requirementsData[1].accuracy,
					silverTotal: requirementsData[1].total,
					goldAccuracy: requirementsData[2].accuracy,
					goldTotal: requirementsData[2].total
				});
			})
			.catch((err) => {
				/* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
			});
	}
	onChange({ target }) {
		this.setState({ [target.name]: target.value });
	}
	/** The standards onChange Listeners: */
	onChangeBronzeAccuracy(event){
		if(event.target.value > 3)
			event.target.value = event.target.value.substr(0,3);
		this.setState({bronzeAccuracy:event.target.value});
	}
	onChangeBronzeTotal(event){
		if(event.target.value > 3)
			event.target.value = event.target.value.substr(0,3);
		this.setState({bronzeTotal:event.target.value});
	}
	onChangeSilverAccuracy(event){
		if(event.target.value > 3)
			event.target.value = event.target.value.substr(0,3);
		this.setState({silverAccuracy:event.target.value});
	}
	onChangeSilverTotal(event){
		if(event.target.value > 3)
			event.target.value = event.target.value.substr(0,3);
		this.setState({silverTotal:event.target.value});
	}
	onChangeGoldAccuracy(event){
		if(event.target.value > 3)
			event.target.value = event.target.value.substr(0,3);
		this.setState({goldAccuracy:event.target.value});
	}
	onChangeGoldTotal(event){
		if(event.target.value > 3)
			event.target.value = event.target.value.substr(0,3);
		this.setState({goldTotal:event.target.value});
	}

	changeToggle() {
		this.setState({ toggleRequirements: !this.state.toggleRequirements });
	}

	changeStatusOfLogs() {
		this.setState({ isLetterOfStatus: !this.state.isLetterOfStatus });
	}

	render() {
		const displayCompetitions = (
			<div className="page-contents" style={{ height: this.getBodyHeight() + 'vh' }}>
				<table class="table-view-competitions">
					<tbody>
						{this.props.compOBJ.map((compVar, i) => (
							<tr key={compVar.id} className="table-competition-row">
								<table>
									<tr>
										<td className="td-col">
											<div>
												<div
													className="test1"
													onClick={() => this.getRequirements(compVar.id)}
												>
													<label
														className={
															compVar.status == true ? (
																'competition-container'
															) : (
																	'inactive-competition-container'
																)
														}
													>
														{compVar.name} {compVar.requirements}
													</label>
												</div>
												<div className="test2">
													<label className="users-per-comp">
														{compVar.status == true ? (
															<i class=" fa fa-group">
																<span class="user-per-comp-num">
																	{this.props.dict[compVar.id]}
																</span>
															</i>
														) : null}
													</label>
												</div>

												<div className="test4">
													<div className="document-icon-container">
														{compVar.id === this.state.activatedCompetition ? (
															<img className="letter-image" src={letterhead} />
														) : null}
													</div>
												</div>

												<div className="test3">
													<div
														className={
															compVar.status ? 'activeButton' : 'inactiveButton'
														}
													>
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
															checked={compVar.status}
															onClick={() => this.changeStatus(compVar.status, i)}
														/>
													</div>
												</div>
											</div>
										</td>
									</tr>
									{compVar.status && (
										<tr
											className={
												this.state.toggleRequirements &&
													this.state.idCompToggel === compVar.id ? (
														'table-row-requiremets'
													) : (
														'table-row-requiremets-hide'
													)
											}
										>
											<td>
												<div class="comp-req-container">
													<Form>
														<Container className="standards-container">
															<Row className="standards-label">
																<Col xs={3} md={3} lg={3} />
																<Col xs={5} md={5} lg={5}>
																	<div className="accuracy-header-label">
																		ACCURACY %
																			</div>
																</Col>
																<Col xs={4} md={4}>
																	<div className="total-header-label">
																		TOTAL
																			</div>
																</Col>
															</Row>
															<Row className="bronze-row">
																<Col xs={4} md={4}>
																	<div class="accuracy-header-label">
																		Bronze Award:{' '}
																	</div>
																</Col>
																<Col xs={4} md={4}>
																	<div className="">
																		<input
																			className="bronze-accuracy-input-control"
																			type="number"
																			min={1}
																			max={100}
																			name="bronzeAccuracy"
																			id="B_accuracy"
																			required
																			autoComplete="off"
																			autoCorrect="off"
																			value={this.state.bronzeAccuracy}
																			onChange={this.onChangeBronzeAccuracy}
																		/>
																	</div>
																</Col>
																<Col xs={4} md={4}>
																	<div className="">
																		<input
																			className="bronze-total-input-control"
																			type="number"
																			name="bronzeTotal"
																			id="B_total"
																			required
																			min={1}
																			max={1000}
																			autoComplete="off"
																			autoCorrect="off"
																			value={this.state.bronzeTotal}
																			onChange={this.onChangeBronzeTotal}
																		/>
																	</div>
																</Col>
															</Row>

															<Row className="silver-row">
																<Col xs={4} md={4}>
																	<div class="silver-label">
																		Silver Award:{' '}
																	</div>
																</Col>
																<Col xs={4} md={4}>
																	<div className="">
																		<input
																			className="silver-accuracy-input-control"
																			type="number"
																			name="silverAccuracy"
																			id="S_accuracy"
																			required
																			min="0"
																			max="100"
																			autoComplete="off"
																			autoCorrect="off"
																			value={this.state.silverAccuracy}
																			onChange={this.onChangeSilverAccuracy}
																		/>
																	</div>
																</Col>
																<Col xs={4} md={4}>
																	<div className="">
																		<input
																			className="silver-total-input-control"
																			type="number"
																			name="silverTotal"
																			id="S_total"
																			required
																			min="0"
																			max="600"
																			autoComplete="off"
																			autoCorrect="off"
																			value={this.state.silverTotal}
																			onChange={this.onChangeSilverTotal}
																		/>
																	</div>
																</Col>
															</Row>

															<Row>
																<Col xs={4} md={4}>
																	<div class="accuracy-label">
																		Gold Award:{' '}
																	</div>
																</Col>
																<Col xs={4} md={4}>
																	<div className="">
																		<input
																			className="gold-accuracy-input-control"
																			type="number"
																			name="goldAccuracy"
																			id="G_accuracy"
																			required
																			min="0"
																			max="100"
																			autoComplete="off"
																			autoCorrect="off"
																			value={this.state.goldAccuracy}
																			onChange={this.onChangeGoldAccuracy}
																		/>
																	</div>
																</Col>
																<Col xs={4} md={4}>
																	<div className="">
																		<input
																			className="gold-total-input-control"
																			type="number"
																			name="goldTotal"
																			id="G_total"
																			required
																			min="0"
																			max="600"
																			autoComplete="off"
																			autoCorrect="off"
																			value={this.state.goldTotal}
																			onChange={this.onChangeGoldTotal}
																		/>
																	</div>
																</Col>
															</Row>

															<Row>
																<div className="letter-good-standing-row">
																	<div className="letter-label">
																		Selected for Letter of Good Standing
																			</div>
																	<div className="letter-icon">
																		<div className="letter-icon-container">
																			{compVar.id ===
																				this.state.activatedCompetition ? (
																					<img
																						className="letter-image"
																						src={letterhead}
																					/>
																				) : null}
																		</div>
																	</div>
																	<div className="letter-switch">
																		<Switch
																			color={'primary'}
																			className={
																				!this.state.isLetterOfStatus ? (
																					'activeButton'
																				) : (
																						'inactiveButton'
																					)
																			}
																			focus={true}
																			checked={
																				compVar.id ===
																					this.state
																						.activatedCompetition ? (
																						true
																					) : (
																						false
																					)
																			}
																			onClick={() =>
																				this.makeLetterOfStatus(
																					compVar.id
																				)}
																		/>
																	</div>
																</div>
															</Row>
														</Container>
													</Form>
												</div>
											</td>
										</tr>
									)}
								</table>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
		return (
			<div className="view-page">
				<div className="table-competition-container">
					<div className="content-competitions" >
						{displayCompetitions}
					</div>
				</div>
			</div>
		);
	}
}
ViewComp.propTypes = {
	fetchComp: PropTypes.func.isRequired,
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
export default connect(mapStateToProps, {
	fetchComp,
	updateByIdComp,
	fetchParticipants,
	fetchRequirements,
	updateRequirements,
	compSelectedPages
})(ViewComp);
