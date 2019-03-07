import React, { Component } from 'react';
import '../scss/navbar.css';
import 'font-awesome/css/font-awesome.min.css';
import '../bootstrap/NavbarMenuUserStyles.css';
import profileRed from '../components/navbar-icons/profile-red.png';
import profileGray from '../components/navbar-icons/profile-grey.png';
import docsRed from '../components/navbar-icons/docs-red.png';
import docsGray from '../components/navbar-icons/docs-grey.png';
import leaderboardRed from '../components/navbar-icons/leaderboard-red.png';
import leaderboardGray from '../components/navbar-icons/leaderboard-grey.png';
import notificationsRed from '../components/navbar-icons/notifications-red.png';
import notificationsGray from '../components/navbar-icons/notifications-grey.png';
import scorecaptureRed from '../components/navbar-icons/add-score-red.png';
import scorecaptureGray from '../components/navbar-icons/add-score-grey.png';
import moreGray from '../components/navbar-icons/more-grey.png';

class NavbarMenuUser extends Component {
	constructor(props) {
		super(props);

		this.state = {
			expanded: false
		};

		this.isHome = this.isHome.bind(this);
		this.isScoreCapture = this.isScoreCapture.bind(this);
		this.isProfile = this.isProfile.bind(this);
		this.isDocuments = this.isDocuments.bind(this);
		this.isNotifications = this.isNotifications.bind(this);
		this.expand = this.expand.bind(this);
		this.isMore = this.isMore.bind(this);
		this.GoTo= this.GoTo.bind(this);
	}

	expand() {
		this.setState({ expanded: !this.state.expanded });
	}

	isHome() {
		if (window.location.pathname.endsWith("/home")) {
			return <img src={leaderboardRed}
				className="leaderboard-icon-grey" alt='Leaderboard tab Selected'></img>
		}
		else {
			return <img src={leaderboardGray}
				className="leaderboard-icon-grey" alt='Leaderboard tab not Selected'></img>
		}
	}

	isScoreCapture() {
		if (window.location.pathname.endsWith("/scorecapture")) {
			return <img src={scorecaptureRed}
				className="add-score-icon-grey" alt='ScoreCapture tab Selected'></img>
		}
		else {
			return <img src={scorecaptureGray}
				className="add-score-icon-grey" alt='ScoreCapture tab not Selected'></img>
		}
	}

	isProfile() {
		if (window.location.pathname.endsWith("/profile")) {
			return <img src={profileRed}
				className="profile-icon-grey" alt='Profile tab Selected'></img>
		}
		else {
			return <img src={profileGray}
				className="profile-icon-grey" alt='Profile tab not Selected'></img>
		}
	}

	isDocuments() {
		if (window.location.pathname.endsWith("/documents")) {
			return <img src={docsRed}
				className="docs-icon-grey" alt='Document tab Selected'></img>
		}
		else {
			return <img src={docsGray}
				className="docs-icon-grey" alt='Document tab not Selected'></img>
		}
	}

	isNotifications() {
		if (window.location.pathname.endsWith("/notifications")) {
			return <img src={notificationsRed}
				className="notifications-icon-grey" alt='Notification tab Selected'></img>
		}
		else {
			return <img src={notificationsGray}
				className="notifications-icon-grey" alt='Notification tab not Selected'></img>
		}
	}

	isDocumentsv2() {
		if (window.location.pathname.endsWith("/documents")) {
			return <img src={docsRed}
				className="docs-icon-grey-v2" alt='Document tab Selected'></img>
		}
		else {
			return <img src={docsGray}
				className="docs-icon-grey-v2" alt='Document tab not Selected'></img>
		}
	}

	isNotificationsv2() {
		if (window.location.pathname.endsWith("/notifications")) {
			return <img src={notificationsRed}
				className="notifications-icon-grey-v2" alt='Notification tab Selected'></img>
		}
		else {
			return <img src={notificationsGray}
				className="notifications-icon-grey-v2" alt='Notification tab not Selected'></img>
		}
	}

	isMore() {
		return <img src={moreGray}
			className="more-icon-grey" alt='More icon to expand tray'></img>
	}

	GoTo (page){
		window.location = page;
	}
	render() {
		// rendering the basic navbar within the render class
		return (
			<div >
				<table className="navbar-admin">
				<tbody>
					<tr className="first-row-navbar">
						<td className="columns" onClick={() => this.GoTo("/home")}>
							{this.isHome()}
						</td>
						<td className="columns" onClick={() => this.GoTo("/scorecapture")} >
							{this.isScoreCapture()}
						</td>
						<td className="columns" onClick={() => this.GoTo("#")}>
							{this.isProfile()}
						</td>
						<td className="columns-more" onClick={this.expand}>
							{this.isMore()}
						</td>
						<td className="columns-v2" onClick={() => this.GoTo("/documents")}>
							{this.isDocumentsv2()}
						</td>
						<td className="columns-v2" onClick={() => this.GoTo("notify")}>
							{this.isNotificationsv2()}
						</td>
					</tr>
					<tr className={this.state.expanded ? "second-row-navbar expand":"second-row-navbar"}>
						<td className="columns" onClick={() => this.GoTo("/documents")}>
							{this.isDocuments()}
						</td>
						<td className="columns" onClick={() => this.GoTo("/notify")}>
							{this.isNotifications()}
						</td>
						<td></td>
					</tr>
					</tbody>
				</table>
			</div>
		);
	}
}
export default NavbarMenuUser;