import React, { Component } from 'react';
import { withRouter , BrowserRouter} from 'react-router-dom';
import '../scss/navbar.css';
import 'font-awesome/css/font-awesome.min.css';
import '../bootstrap/NavbarMenuStyle.css';
import history from './history';
import { NAV_BAR_ICONS } from '../actions/types.js'

class NavbarMenu extends Component {
	constructor(props) {
		super(props);

		this.state = {
			expanded: false
		};

		this.isHome = this.isHome.bind(this);
		this.isCreate = this.isCreate.bind(this);
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
			return <img src={NAV_BAR_ICONS.LEADERBOARD_RED}
				className="leaderboard-icon-grey" alt='Leaderboard tab Selected'></img>
		}
		else {
			return <img src={NAV_BAR_ICONS.LEADERBOARD_GRAY}
				className="leaderboard-icon-grey" alt='Leaderboard tab not Selected'></img>
		}
	}

	isCreate() {
		if (window.location.pathname.endsWith("/create")
			|| window.location.pathname.endsWith("/registermember")
			|| window.location.pathname.endsWith("/viewmembers")
			|| window.location.pathname.endsWith("/create-comp")
			|| window.location.pathname.endsWith("/view-comp")) {
			return <img src={NAV_BAR_ICONS.CREATE_RED}
				className="create-icon-grey" alt='Create tab Selected'></img>
		}
		else {
			return <img src={NAV_BAR_ICONS.CREATE_GRAY}
				className="create-icon-grey" alt='Create tab not Selected'></img>
		}
	}

	isScoreCapture() {
		if (window.location.pathname.endsWith("/scorecapture")) {
			return <img src={NAV_BAR_ICONS.SCORE_CAPTURE_RED}
				className="add-score-icon-grey" alt='ScoreCapture tab Selected'></img>
		}
		else {
			return <img src={NAV_BAR_ICONS.SCORE_CAPTURE_GRAY}
				className="add-score-icon-grey" alt='ScoreCapture tab not Selected'></img>
		}
	}

	isProfile() {
		if (window.location.pathname.endsWith("/profile")) {
			return <img src={NAV_BAR_ICONS.PROFILE_RED}
				className="profile-icon-grey" alt='Profile tab Selected'></img>
		}
		else {
			return <img src={NAV_BAR_ICONS.PROFILE_GRAY}
				className="profile-icon-grey" alt='Profile tab not Selected'></img>
		}
	}

	isDocuments() {
		if (window.location.pathname.endsWith("/documents")) {
			return <img src={NAV_BAR_ICONS.DOCS_RED}
				className="docs-icon-grey" alt='Document tab Selected'></img>
		}
		else {
			return <img src={NAV_BAR_ICONS.DOCS_GRAY}
				className="docs-icon-grey" alt='Document tab not Selected'></img>
		}
	}

	isNotifications() {
		if (window.location.pathname.endsWith("/notifications")) {
			return <img src={NAV_BAR_ICONS.NOTIFICATIONS_RED}
				className="notifications-icon-grey" alt='Notification tab Selected'></img>
		}
		else {
			return <img src={NAV_BAR_ICONS.NOTIFICATIONS_GRAY}
				className="notifications-icon-grey" alt='Notification tab not Selected'></img>
		}
	}

	isProfilev2() {
		if (window.location.pathname.endsWith("/profile")) {
			return <img src={NAV_BAR_ICONS.PROFILE_RED}
				className="profile-icon-grey-v2" alt='Profile tab Selected'></img>
		}
		else {
			return <img src={NAV_BAR_ICONS.PROFILE_GRAY}
				className="profile-icon-grey-v2" alt='Profile tab not Selected'></img>
		}
	}

	isDocumentsv2() {
		if (window.location.pathname.endsWith("/documents")) {
			return <img src={NAV_BAR_ICONS.DOCS_RED}
				className="docs-icon-grey-v2" alt='Document tab Selected'></img>
		}
		else {
			return <img src={NAV_BAR_ICONS.DOCS_GRAY}
				className="docs-icon-grey-v2" alt='Document tab not Selected'></img>
		}
	}

	isNotificationsv2() {
		if (window.location.pathname.endsWith("/notifications")) {
			return <img src={NAV_BAR_ICONS.NOTIFICATIONS_RED}
				className="notifications-icon-grey-v2" alt='Notification tab Selected'></img>
		}
		else {
			return <img src={NAV_BAR_ICONS.NOTIFICATIONS_GRAY}
				className="notifications-icon-grey-v2" alt='Notification tab not Selected'></img>
		}
	}

	isMore() {
		return <img src={NAV_BAR_ICONS.MORE_GRAY}
			className="more-icon-grey" alt='More icon to expand tray'></img>
	}

	GoTo (page){
		window.location = page;
	}

	render() {
		return (
			<div >
				<table className="navbar-admin">
				<tbody>
					<tr className="first-row-navbar">
						<td className="columns" onClick={() => this.GoTo("/home")}>
							{this.isHome()}
						</td>
						<td className="columns" onClick={() => this.GoTo("/create")}>
							{this.isCreate()}
						</td>
						<td className="columns" onClick={() => this.GoTo("/scorecapture")} >
							{this.isScoreCapture()}
						</td>
						<td className="columns-more" onClick={this.expand}>
							{this.isMore()}
						</td>
						<td className="columns-v2">
							{this.isProfilev2()}
						</td>
						<td className="columns-v2" onClick={() => this.GoTo("/documents")}>
							{this.isDocumentsv2()}
						</td>
						<td className="columns-v2" onClick={() => this.GoTo("notify")}>
							{this.isNotificationsv2()}
						</td>
					</tr>
					<tr className={this.state.expanded ? "second-row-navbar expand":"second-row-navbar"}>
						<td className="columns">
							{this.isProfile()}
						</td>
						<td className="columns" onClick={() => this.GoTo("/documents")}>
							{this.isDocuments()}
						</td>
						<td className="columns" onClick={() => this.GoTo("notify")}>
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

export default NavbarMenu;
