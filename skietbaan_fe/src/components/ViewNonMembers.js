import React, { Component } from 'react';
import '../components/ViewMembers.css';
import Collapsible from 'react-collapsible';
import { BASE_URL } from '../actions/types.js';
import arrowUp from '../components/assets/upArrow.png';
import arrowDown from '../components/assets/downArrow.png';
import { getCookie } from '../components/cookie.js';
import Export from '../components/assets/Export.png';
import RedBullet from '../components/assets/RedBullet.png';
import { Row, Col } from 'react-bootstrap';


class ViewNonMembers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			array: [],
			isOpened: false,
			height: 100,
			timeLeftOnMembership: [],
			filterText: '',
			membershipsID: '',
			updateName: '',
			indexNumber: 0,
			lastSize: 0,
			navbarState: false,
			arrowChange: false,
			height: window.innerHeight,
			width: window.innerWidth,
			getData: false,
			membershipIds: [],
			exportMsg: false,
			exceptionCaught: false
		};
		this.getTimeLeft = this.getTimeLeft.bind(this);
		this.onChangeText = this.onChangeText.bind(this);
		this.status = this.status.bind(this);
		this.getCurrentDate = this.getCurrentDate.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.updateMember = this.updateMember.bind(this);
		this.toggleNavbar = this.toggleNavbar.bind(this);
		this.toggleNavbar2 = this.toggleNavbar2.bind(this);
		this.onChangeArrow = this.onChangeArrow.bind(this);
		this.updateDimensions = this.updateDimensions.bind(this);
		this.getBodyHeight = this.getBodyHeight.bind(this);
	}

	toggleNavbar() {
		this.setState({
			navbarState: !this.state.navbarState
		});
		var navbar = document.querySelector('.navbar-admin');
		if (navbar.classList.contains('hidden')) {
			navbar.classList.remove('hidden');
		} else {
			navbar.classList.add('hidden');
		}
	}

	toggleNavbar2() {
		var navbar = document.querySelector('.navbar-admin');
		if (this.state.lastSize > document.body.clientHeight) {
			navbar.setAttribute('hidden', 'true');
			this.toggleNavbar();
		} else {
			navbar.removeAttribute('hidden');
			this.toggleNavbar();
		}
	}
	componentWillMount() {
		window.addEventListener('resize', this.updateDimensions);
	}
	componentDidMount() {
		this.updateDimensions();
		this.getNonMembers();
		this.getTimeLeft();
	}
	updateDimensions() {
		this.setState({
			height: window.innerHeight,
			width: window.innerWidth
		});
	}
	getBodyHeight() {
		if (this.state.width < 575) {
			return (this.state.height - 240) + "px";
		} else {
			return "66vh";
		}
	}
	getNonMembers() {
		fetch(BASE_URL + '/api/Features/SearchNonMember', {
			method: 'Get',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				return data;
			})
			.then((data) =>
				this.setState({
					array: data.map(user => {
						return {
							...user,
							selected: false
						}
					}),
					getData: true
				}))
				.catch(err => {
					this.setState({ exceptionCaught: true })
				});

		fetch(BASE_URL + "/api/Features/SearchMember")
			.then(res => res.json())
			.then(data =>
				this.setState({
					membershipIds: data.map(memberIds => memberIds.memberID)
				})
			).catch(err => {
				this.setState({ exceptionCaught: true })
			});
	}

	getTimeLeft() {
		fetch(BASE_URL + '/api/Features/TimeLeft', {
			method: 'Get',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				return data;
			})
			.then((data) =>
				this.setState({
					timeLeftOnMembership: data
				})
			)
			.catch((err) => {
				/* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
			});
	}

	updateMember(index) {
		if (this.state.membershipIds.indexOf(this.state.membershipsID) === -1) {
			delete this.state.array[index].selected
			let RequestObject = {
				username: this.state.array[index].username,
				memberID: this.state.membershipsID,
				memberExpiryDate: this.getCurrentDate() + 'T00:00:00'
			};
			fetch(BASE_URL + '/api/Features/Update', {
				method: 'Post',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(RequestObject)
			})
				.then(function (response) {
					return response.json();
				})
				.then((data) => {
					this.getNonMembers();
					this.setState({ filterText: '' });
				})
				.catch((err) => {
					/* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
				});
		}
	}

	onChangeText(event) {
		this.setState({ filterText: event.target.value });
	}

	status(timeLeft) {
		if (timeLeft < 2 || timeLeft === 2) {
			return true;
		} else {
			return false;
		}
	}

	getCurrentDate() {
		let curr = new Date();
		curr.setDate(curr.getDate() + 365);
		let date = curr.toISOString().substr(0, 10);
		return date;
	}

	handleChange(event) {
		this.setState({ membershipsID: event.target.value });
	}

	onChangeArrow = (index) => {
		this.setState({ membershipsID: "" });
		this.state.array[index].selected = !this.state.array[index].selected;
		this.forceUpdate();
	}
	ExportData = () => {
		this.setState({ exportMsg: true })
	}
	render() {
		if (!getCookie('token')) {
			window.location = '/registerPage';
		}
		if (this.state.lastSize === 0) {
			this.state.lastSize = document.body.clientHeight;
			document.addEventListener('DOMContentLoaded', () => {
				window.addEventListener('resize', () => {
					this.toggleNavbar2();
				});
			});
		}
		const postItems = (
			<div>
				{(this.state.array.length === 0 && this.state.getData === true) ? <div className="view-non-error-container"><label className="view-non-error-msg">No members have been created yet.</label></div> :
					<table striped hover condensed className="table-member">
						<tbody>
							{this.state.array
								.filter((post) => {
									return (
										!this.state.filterText ||
										post.username.toLowerCase().startsWith(this.state.filterText.toLowerCase()) ||
										post.email.toLowerCase().startsWith(this.state.filterText.toLowerCase())
									);
								})
								.map((posts, index) => (
									<tr className="view-members-user" key={posts.id} >
										<td className="first-column">

											<Collapsible
												trigger={
													<div className="username-and-email" onClick={() => this.onChangeArrow(index)}>
														<div className="view-non-members-users-email">
															<b>{posts.username}</b>
															<div className="view-non-members-email">{posts.email}</div>
														</div>

														<div className="view-non-members-arrow" >
															{posts.selected === true ? <img
																className="view-non-members-image"
																src={arrowDown}
															/> :
																<img
																	className="view-non-members-image"
																	src={arrowUp}
																/>}
														</div>
													</div>
												}
											>
												<div className="membership-details">
													<div>
														<input
															type="number"
															className="view-non-members-text-boxes"
															id="membershipID"
															placeholder="Membership Number"
															autoComplete="Off"
															value={this.state.membershipsID}
															onChange={this.handleChange}
														/>
													</div>
													<div>
														<button
															className="view-non-members-confirm"
															onClick={() => this.updateMember(index)}
														>
															CONFIRM MEMBERSHIP
												</button>
													</div>
												</div>
											</Collapsible>
										</td>
									</tr>
								))}
						</tbody>
					</table>}</div>
		);
		return (
			<div className="centre-view-member">
				<div className="username-search">
					<Row>
						<Col>
							<div className="search">
								<input
									autoComplete="off"
									type="text"
									className="user-value"
									id="usernameValue"
									placeholder="Enter Username"
									value={this.state.filterText}
									onChange={this.onChangeText}
								/>


							</div>
						</Col>
						<Col className="export-col-container">	<div className="export-container">
							<img
								src={Export}
								className="export-icon"
								alt="Is a Member"
								onClick={() => this.ExportData()}
							/>
						</div></Col>
					</Row>
				</div>
				<div className={this.state.getData === false && this.state.exceptionCaught === false ?
					"loader-container-members" : "hidden"}>
					<div className={this.state.getData === false && this.state.exceptionCaught === false ?
						"loader" : "hidden"}>
					</div>
					<div className={this.state.getData === false && this.state.exceptionCaught === false ?
						"target-loader-image" : "hidden"}>
					</div>
					<div className={this.state.getData === false && this.state.exceptionCaught === false ?
						"loading-message-members" : "hidden"}>Loading...</div>
				</div>
				{this.state.exportMsg === false ?
					<div className="table-search-members" style={{ height: this.getBodyHeight() }}>
						{postItems}
					</div> :
					<div className="exportMsg-container"><label className="exportMsg-responce">
						SBmembers.csv sent to fs@retrorabbit.co.za
				</label>
						<img
							src={RedBullet}
							className="export-success"
							alt="Is a Member"
						/>
					</div>
				}
			</div>

		);
	}
}

export default ViewNonMembers;
