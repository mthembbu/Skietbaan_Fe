import React, { Component } from "react";
import "../components/ViewMembers.css";
import Collapsible from "react-collapsible";
import { BASE_URL } from "../actions/types.js";
import memberIcon from "../components/assets/greyMembershipIcon.png";
import { getCookie } from "../components/cookie.js";
import { Row, Col } from "react-bootstrap";
import Export from "../components/assets/Export.png";
import RedBullet from "../components/assets/RedBullet.png";
import exportClick from "../components/assets/exportPress.png";
import { fetchNumberOfNotification } from "../actions/notificationAction";
import { pageState } from '../actions/postActions';
import { connect } from "react-redux";
class ViewMembersExpiring extends Component {
	constructor(props) {
		super(props);
		this.state = {
			array: [],
			isOpened: false,
			height: 100,
			timeLeftOnMembership: [],
			filterText: "",
			selectedValue: false,
			dateValue: "",
			lastSize: 0,
			navbarState: false,
			height: window.innerHeight,
			width: window.innerWidth,
			getData: false,
			exportMsg: false,
			exceptionCaught: false,
			dateCheck: false,
			exportResponse: "",
			dateErrorMgs: false,
			successMgs: false,
			AdvanceDateExist: false,
			userIndex: 0
		};
		this.getExpiringMembers = this.getExpiringMembers.bind(this);
		this.getTimeLeft = this.getTimeLeft.bind(this);
		this.status = this.status.bind(this);
		this.handleRadioChange = this.handleRadioChange.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.updateMember = this.updateMember.bind(this);
		this.getCurrentDate = this.getCurrentDate.bind(this);
		this.toggleNavbar = this.toggleNavbar.bind(this);
		this.toggleNavbar2 = this.toggleNavbar2.bind(this);
		this.updateDimensions = this.updateDimensions.bind(this);
		this.getBodyHeight = this.getBodyHeight.bind(this);
		this.expiringDateCheck = this.expiringDateCheck.bind(this);
		this.extractEmails = this.extractEmails.bind(this);
		this.onChangeText = this.onChangeText.bind(this);
	}

	toggleNavbar() {
		this.setState({
			navbarState: !this.state.navbarState
		});
		var navbar = document.querySelector(".navbar-admin");
		if (navbar.classList.contains("hidden")) {
			navbar.classList.remove("hidden");
		} else {
			navbar.classList.add("hidden");
		}
	}
	onChangeText(event) {
		this.setState({ filterText: event.target.value });
	}

	toggleNavbar2() {
		var navbar = document.querySelector(".navbar-admin");
		if (this.state.lastSize > document.body.clientHeight) {
			navbar.setAttribute("hidden", "true");
			this.toggleNavbar();
		} else {
			navbar.removeAttribute("hidden");
			this.toggleNavbar();
		}
	}
	componentWillMount() {
		window.addEventListener("resize", this.updateDimensions);
	}
	componentDidMount() {
		this.updateDimensions();
		this.getExpiringMembers();
		this.getTimeLeft();
	}
	componentWillUnmount() {
		this.props.pageState(10);
	}
	updateDimensions() {
		this.setState({
			height: window.innerHeight,
			width: window.innerWidth
		});
	}
	getBodyHeight() {
		if (this.state.width < 575) {
      return this.state.height - (240 - 184) + "px";
		} else {
			return "50vh";
		}
	}
	getExpiringMembers() {
		fetch(BASE_URL + "/api/Features/SearchExpiringMember", {
			method: "Get",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			}
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				return data;
			})
			.then(
				data =>
					this.setState({
						array: data,
						getData: true
					}),
				this.props.fetchNumberOfNotification(this.state.token)
			)
			.catch(err => {
				this.setState({ exceptionCaught: true });
			});
	}

	getTimeLeft() {
		fetch(BASE_URL + "/api/Features/SearchExpiringMemberTimeLeft", {
			method: "Get",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			}
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				return data;
			})
			.then(data =>
				this.setState({
					timeLeftOnMembership: data
				})
			)
			.catch(err => {
				/* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
			});
	}

	updateMember(index) {
		if (this.state.dateCheck === true) {
			if (this.state.array[index].advanceExpiryDate === null) {
				let RequestObject = {
					username: this.state.array[index].username,
					EntryDate: this.getCurrentDate() + "T00:00:00",
					memberExpiryDate: this.state.dateValue + "T00:00:00"
				};
				fetch(BASE_URL + "/api/Features/RenewMembership", {
					method: "Post",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json"
					},
					body: JSON.stringify(RequestObject)
				})
					.then(function (response) {
						return response.json();
					})
					.then(data => {
						this.setState({ successMgs: true });
						setTimeout(() => {
						}, 3000);
						this.setState({ filterText: "" });

					})
					.catch(err => {
						/* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
					});
			} else {
				this.setState({ AdvanceDateExist: true });
				this.setState({ dateErrorMgs: false });
			}
		} else {
			if (this.state.array[index].advanceExpiryDate != null) {
				this.setState({ dateErrorMgs: false });
			} else {
				this.setState({ dateErrorMgs: true });
			}
		}
	}

	handleDateChange(event) {
		this.setState({ dateValue: "" });
		this.setState({ dateValue: event.target.value });
		var selectedDate = new Date(event.target.value);
		var now = new Date();
		if (selectedDate > now) {
			this.setState({ dateCheck: true, dateErrorMgs: false });
		} else if (
			now.getFullYear() === selectedDate.getFullYear() &&
			now.getDate() === selectedDate.getDate() &&
			now.getMonth() === selectedDate.getMonth()
		) {
			this.setState({ dateCheck: true, dateErrorMgs: false });
		} else {
			this.setState({ dateCheck: false, dateErrorMgs: true });
		}
	}

	expiringDateCheck(event) {
		var now = new Date();
		var selectedDate = new Date(event);
		if (now > selectedDate) {
			return true;
		} else {
			return false;
		}
	}
	status(timeLeft) {
		if (timeLeft < 2 || timeLeft === 2) {
			return true;
		} else {
			return false;
		}
	}

	handleRadioChange(event) {
		this.setState({ selectedValue: event });
	}

	getCurrentDate() {
		let curr = new Date();
		curr.setDate(curr.getDate());
		let date = curr.toISOString().substr(0, 10);
		return date;
	}
	ExportData = () => {
		let token = getCookie("token");
		let filter = "expiring";
		fetch(
			BASE_URL +
			`/api/Features/generateCSV?filter=${filter}&adminToken=${token}`,
			{
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				}
			}
		)
			.then(res => res.json())
			.then(data => this.setState({ exportResponse: data, exportMsg: true }))
			.catch(err => {
				/* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
			});
	};
	onChangeArrow = (index) => {
		if (index !== this.state.userIndex) {
			this.state.array[this.state.userIndex].selected = false;
			this.state.array[index].selected = true;
		} else {
			this.state.array[index].selected = !this.state.array[index].selected;
		}
		this.setState({
			dateValue: "",
			AdvanceDateExist: false,
			dateErrorMgs: false,
			successMgs: false,
			userIndex: index
		});
		this.forceUpdate();
	};

	extractEmails(text) {
		if (this.state.filterText[0] === "@") {
			let ser = text.search("@");
			let word = text.substring(ser, text.length);
			let ss = word.split(".");
			return ss[0];
		} else {
			return text;
		}
	}

	render() {
		if (!getCookie("token")) {
			window.location = "/registerPage";
		}
		if (this.state.lastSize === 0) {
			this.state.lastSize = document.body.clientHeight;
			document.addEventListener("DOMContentLoaded", () => {
				window.addEventListener("resize", () => {
					this.toggleNavbar2();
				});
			});
		}
		const postItems = (
			<div>
				{this.state.array.length === 0 && this.state.getData === true ? (
					<div className="view-non-error-container">
						<label className="view-non-error-msg">No users expiring yet.</label>
					</div>
				) : (
						<table striped hover condensed className="table-member">
							<tbody>
								{this.state.array
									.filter(post => {
										return (
											!this.state.filterText ||
											post.username
												.toLowerCase()
												.startsWith(this.state.filterText.toLowerCase()) ||
											post.email
												.toLowerCase()
												.startsWith(this.state.filterText.toLowerCase()) ||
											this.extractEmails(post.email).startsWith(
												this.state.filterText.toLowerCase()
											) ||
											post.memberID.startsWith(this.state.filterText)
										);
									})
									.map((post, index) => (
										<tr className="view-members-user" key={post.id}>
											<td className="first-column">
												<Collapsible
													open={post.selected}
													trigger={
														<div
															className="username-and-email"
															onClick={() => this.onChangeArrow(index)}
														>
															<div className="view-members-username-email">
																<b>{post.username}</b>
																<div className="view-non-members-email">
																	{post.email}
																</div>
															</div>
															<div className="view-exp-members-icon">
																<img
																	src={memberIcon}
																	className="membership-icon"
																	alt="Is a Member"
																/>
															</div>

															<div className="expiry-time-column">
																<div
																	className={
																		this.status(
																			this.state.timeLeftOnMembership[index]
																		)
																			? "bad"
																			: "okay"
																	}
																>
																	<div>
																		<b>
																			{post.memberExpiryDate
																				.substring(0, 10)
																				.split("-")
																				.join("/")}
																		</b>
																		{this.expiringDateCheck(
																			post.memberExpiryDate
																				.substring(0, 10)
																				.split("-")
																				.join("/")
																		) === false ? (
																				<div>
																					{this.state.timeLeftOnMembership[index]}{" "}
																					Months
                                    </div>
																			) : (
																				<div>
																					{post.advanceExpiryDate != null
																						? "RENEWED"
																						: "EXPIRED"}
																				</div>
																			)}
																	</div>
																</div>
															</div>
														</div>
													}
												>
													{this.state.successMgs === false &&
														post.advanceExpiryDate == null ? (
															<div className="non-member-renew-date-container">
																<input
																	type="date"
																	className="view-expiring-members-text-boxes"
																	id="expdate"
																	value={this.state.datevalue}
																	onChange={this.handleDateChange}
																/>
															</div>
														) : null}
													{this.state.AdvanceDateExist === true ? null : this
														.state.dateErrorMgs === true ? (
															<label className="non-member-renew-error-msg">
																Date selected is invalid
                          </label>
														) : null}
													{this.state.AdvanceDateExist === true ? (
														<label className="non-member-renew-error-msg">
															User already been renewed in advance
                          </label>
													) : null}
													{this.state.successMgs === false &&
														post.advanceExpiryDate == null ? (
															<div className="renew-container">
																<button
																	className={
																		this.state.dateValue === "" ||
																			this.state.dateErrorMgs === true
																			? "view-exp-members-inactive"
																			: "view-exp-members"
																	}
																	onClick={() => this.updateMember(index)}
																>
																	RENEW
                            </button>
															</div>
														) : null}
													{this.state.successMgs === true ? (
														<div className="confirm-button-container">
															<button className="confriming-btn">
																MEMBERSHIP RENEWED{" "}
															</button>
														</div>
													) : post.advanceExpiryDate != null ? (
														<div className="confirm-button-container">
															<button className="confriming-btn">
																MEMBERSHIP RENEWED
                            </button>
														</div>
													) : null}
												</Collapsible>
											</td>
										</tr>
									))}
							</tbody>
						</table>
					)}
			</div>
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
						<Col className="export-col-container">
							{" "}
							<div className="export-container">
								<img
									src={Export}
									className="export-icon"
									alt="Is a Member"
									onClick={e =>
										(e.currentTarget.src = exportClick) && this.ExportData()
									}
								/>
							</div>
						</Col>
					</Row>
				</div>
				<div
					className={
						this.state.getData === false && this.state.exceptionCaught === false
							? "loader-container-members"
							: "hidden"
					}
				>
					<div
						className={
							this.state.getData === false &&
								this.state.exceptionCaught === false
								? "loader"
								: "hidden"
						}
					/>
					<div
						className={
							this.state.getData === false &&
								this.state.exceptionCaught === false
								? "target-loader-image"
								: "hidden"
						}
					/>
					<div
						className={
							this.state.getData === false &&
								this.state.exceptionCaught === false
								? "loading-message-members"
								: "hidden"
						}
					>
						Loading...
          </div>
				</div>
				{this.state.exportMsg === false ? (
					<div
						className="table-search-members"
						style={{ height: this.getBodyHeight() }}
					>
						{postItems}
					</div>
				) : (
						<div>
							{this.state.exportResponse !== ""
								? setTimeout(() => {
									this.setState({ exportMsg: false });
								}, 2000)
								: null}
							<div className="exportMsg-container">
								<label className="exportMsg-responce">
									{this.state.exportResponse}
								</label>
								<img
									src={RedBullet}
									className="export-success"
									alt="Is a Member"
								/>
							</div>
						</div>
					)}
			</div>
		);
	}
}

export default connect(
	null,
	{ fetchNumberOfNotification, pageState }
)(ViewMembersExpiring);