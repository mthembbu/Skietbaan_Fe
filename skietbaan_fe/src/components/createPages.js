import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import './Create.css';
import history from './history';
import { getCookie } from './cookie.js';
import { BASE_URL } from '../actions/types.js';
import ViewMembers from '../components/ViewMembers';
import Radio from '@material-ui/core/Radio';
import CreateComp from '../components/CreateComp';
import AddGroup from '../components/AddGroup';
import ViewNonMembers from '../components/ViewNonMembers';
import ViewMembersExpiring from '../components/ViewMembersExpiring';
import ViewComp from '../components/ViewComp';
import GroupComponent from '../components/GroupComponent';
import CompComponent from '../components/CompComponent';
import { compSelectedPages } from '../actions/competition.action';
import { pageState } from '../actions/postActions';
export class createPages extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isToken: true,
			selectedButton: 1,
			selectedButtonCreateViewGroups: 1,
			selectedButtonCreateViewCompetitions: 1,
			selectedValue: 'A',
			user: []
		};

		this.groupsPage = this.groupsPage.bind(this);
		this.comptetitionsPage = this.comptetitionsPage.bind(this);
		this.membersPage = this.membersPage.bind(this);
		this.createGroups = this.createGroups.bind(this);
		this.viewGroups = this.viewGroups.bind(this);
		this.createCompetitions = this.createCompetitions.bind(this);
		this.viewCompetitions = this.viewCompetitions.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.updateCreateContainer = this.updateCreateContainer.bind(this);
		this.noShadowOnMember = this.noShadowOnMember.bind(this);
	}
	updateCreateContainer() {
		switch (this.selectedButton) {
			case 1:
				if (this.state.selectedButtonCreateViewGroups === 1) {
				} else if (this.state.selectedButtonCreateViewGroups === 1) {

				}
				break;
			case 2:
				if (this.state.selectedButtonCreateViewGroups === 1) {
				} else if (this.state.selectedButtonCreateViewGroups === 1) {

				}
				break;
			case 3:
				if (this.state.selectedValue === 'A') {
				} else if (this.state.selectedValue === 'B') {
				} else if (this.state.selectedValue === 'C') {
				}
				break;
		}
	}
	noShadowOnMember() {
		if (this.state.selectedButton === 3) {
			return "0px 0px 0px 0px grey";
		} else {
			return "0px 21px 18px -26px grey";
		}
	}

	groupsPage() {
		
		this.setState({ selectedButton: 1 });
		this.props.pageState(10);
	}

	comptetitionsPage() {
		
		this.setState({ selectedButton: 2 });
		this.props.compSelectedPages(1);
	}

	membersPage() {
		this.setState({ selectedButton: 3 });
	}

	createGroups() {
	
		this.setState({ selectedButtonCreateViewGroups: 1 });
		this.props.pageState(10);
		this.props.compSelectedPages(2);
	}

	viewGroups() {
		this.props.compSelectedPages(2);
		this.setState({ selectedButtonCreateViewGroups: 2 });
		this.props.pageState(0);
		
	}

	createCompetitions() {

		this.setState({ selectedButtonCreateViewCompetitions: 1 });
		this.props.compSelectedPages(2);
	}

	viewCompetitions() {
		
		this.setState({ selectedButtonCreateViewCompetitions: 2 });
		this.props.compSelectedPages(2);

	}
	handleChange = (event) => {
		this.setState({ selectedValue: event });
	};
	componentDidMount() {
		if (getCookie('token') !== null) {
			let token = getCookie('token');
			fetch(BASE_URL + '/api/features/getuserbytoken/' + token, {
				method: 'Get',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			})
				.then((response) => response.json())
				.then(function (data) {
					if (data.admin === false) {
					   history.push('/home');
					}
				})
				.catch(function (data) { })
				.catch((err) => {
					/* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
				});
		} else {
			window.location = '/registerPage';
		}

	}

	render() {
		if (!getCookie('token')) {
			window.location = '/registerPage';
		}
		return (
			<Row className="row justify-content-center">
				<Col sm={8} className="createpage-bootstrap-col-center-container">
					<div className="create-main-container">
						{this.props.page === 0 || this.props.page===10 ? (
							<div className="create-nav-container">
								<div className={this.state.selectedButton === 3 ? 'create-top-nav-members' : 'create-top-nav'}>
									{/* top */}
										<div class="page-name-bar">
											<div className="gun-overlay-image">
												<label className="label-for-score">CREATE</label>
											</div>
										</div>
									<Row className="row justify-content-center">
										<div className="create-switch-top">
											<div
												className={
													this.state.selectedButton === 1 ? 'switch-active' : 'switch-inactive'
												}
												onClick={this.groupsPage}
											>
												GROUPS
										</div>
											<div
												className={
													this.state.selectedButton === 2 ? 'switch-active' : 'switch-inactive'
												}
												onClick={this.comptetitionsPage}
											>
												COMPETITIONS
										</div>
											<div
												className={
													this.state.selectedButton === 3 ? 'switch-active' : 'switch-inactive'
												}
												onClick={this.membersPage}
											>
												MEMBERS
										</div>
										</div>
									</Row>
									<Row className="row justify-content-center">
										<div className="temp-container" style={{ boxShadow: this.noShadowOnMember() }}> {/* inline style to avoid affecting all bootstrap col-sm-8 in all pages */}
											<div className={this.state.selectedButton === 3 ? "create-switch-bottom-hide"
												: "create-switch-bottom"} >
												<div
													className={
														(this.state.selectedButton === 1 && this.props.page!==0) || (this.state.selectedButton === 2 && this.props.selectedButton !== 2) ? (
															'switch-active-left'
														) : (
																'switch-inactive'
															)
													}
													onClick={this.createGroups}
												>
													CREATE
										</div>
												<div
													className={
														(this.state.selectedButton === 1 && this.props.page===0) && (this.state.selectedButton === 2 && this.props.selectedButton === 2)? (
															'switch-active-right'
														) : (
																'switch-inactive'
															)
													}
													onClick={this.viewGroups}
												>
													VIEW
										</div>
											</div>
										</div>
									</Row>
									<Row className="row justify-content-center">
											{this.state.selectedButton === 3 ? (
												<div className="member-radio">
													<div className="radio-A">
														<Radio
															className="a-radio"
															aria-label="A"
															checked={this.state.selectedValue === 'A'}
															onChange={() => this.handleChange('A')}
															value="b"
															color={'primary'}
															name="radio-button-demo"
															aria-label="B"
														/>

														<label className="member-user-label">USERS</label>
													</div>
													<div className="radio-B">
														<Radio
															className="b-radio"
															aria-label="A"
															checked={this.state.selectedValue === 'B'}
															value="b"
															aria-label="B"
															color={'primary'}
															onChange={() => this.handleChange('B')}
														/>
														<label className="member-user-label">MEMBERS</label>
													</div>
													<div className="radio-C">
														<Radio
															className="c-radio"
															aria-label="A"
															checked={this.state.selectedValue === 'C'}
															value="b"
															aria-label="B"
															color={'primary'}
															onChange={() => this.handleChange('C')}
														/>
														<label className="member-user-label">EXPIRING</label>
													</div>
												</div>
											) : null}
									</Row>
								</div>
							</div>
						) : null}


						<div className="components-create">
							{this.state.selectedButton === 1 && this.props.page===10 ? (
								<AddGroup />
							) : this.state.selectedButton === 1 && this.props.page===0 || this.state.selectedButton === 1 && this.props.page===1 || this.state.selectedButton === 1 && this.props.page===2 ? (
								<GroupComponent />
							) : null}
							{this.state.selectedButton === 2 ? <CompComponent /> : null}
							{this.state.selectedButton === 3 && this.state.selectedValue === 'A' ? (
								<ViewNonMembers />
							) : this.state.selectedButton === 3 && this.state.selectedValue === 'B' ? (
								<ViewMembers />
							) : this.state.selectedButton === 3 && this.state.selectedValue === 'C' ? (
								<ViewMembersExpiring />
							) : null}
						</div>
					</div>
				</Col>
			</Row>
		);
	}
}

const mapStateToProps = (state) => ({
	page: state.posts.page
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, { compSelectedPages,pageState })(createPages);
