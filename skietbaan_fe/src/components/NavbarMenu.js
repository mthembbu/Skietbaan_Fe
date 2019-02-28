import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import '../scss/navbar.css';
import 'font-awesome/css/font-awesome.min.css';
import '../bootstrap/NavbarMenuStyle.css';
class NavbarMenu extends Component {
	constructor(props) {
		super(props);

		this.isActive = this.isActive.bind(this);
		this.isHome = this.isHome.bind(this);
		this.isCreate = this.isCreate.bind(this);
		this.isScoreCapture = this.isScoreCapture.bind(this);
		this.isProfile = this.isProfile.bind(this);
		this.isDocuments = this.isDocuments.bind(this);
		this.isNotifications = this.isNotifications.bind(this);
	}

	isActive(route) {
		if (window.location.pathname.endsWith(route)) {
			return "nav-active";
		}
		else {
			return "";
		}
	}

	isHome(){
		if (window.location.pathname.endsWith("/home")) {
			return <img src={require('../components/navbar-icons/leaderboard-red.png')}
						className="leaderboard-icon-grey" alt='Leaderboard tab Selected'></img>
		}
		else {
			return <img src={require('../components/navbar-icons/leaderboard-grey.png')}
						className="leaderboard-icon-grey" alt='Leaderboard tab not Selected'></img>
		}
	}

	isCreate(){
		if (window.location.pathname.endsWith("/create")) {
			return <img src={require('../components/navbar-icons/create-red.png')}
						className="create-icon-grey" alt='Create tab Selected'></img>
		}
		else {
			return <img src={require('../components/navbar-icons/create-grey.png')}
						className="create-icon-grey" alt='Create tab not Selected'></img>
		}
	}

	isScoreCapture(){
		if (window.location.pathname.endsWith("/scorecapture")) {
			return <img src={require('../components/navbar-icons/add-score-red.png')}
						className="add-score-icon-grey" alt='ScoreCapture tab Selected'></img>
		}
		else {
			return <img src={require('../components/navbar-icons/add-score-grey.png')}
						className="add-score-icon-grey" alt='ScoreCapture tab not Selected'></img>
		}
	}

	isProfile(){
		if (window.location.pathname.endsWith("/profile")) {
			return <img src={require('../components/navbar-icons/profile-red.png')}
						className="profile-icon-grey" alt='Profile tab Selected'></img>
		}
		else {
			return <img src={require('../components/navbar-icons/profile-grey.png')}
						className="profile-icon-grey" alt='Profile tab not Selected'></img>
		}
	}

	isDocuments(){
		if (window.location.pathname.endsWith("/documents")) {
			return <img src={require('../components/navbar-icons/docs-red.png')}
						className="docs-icon-grey{" alt='Document tab Selected'></img>
		}
		else {
			return <img src={require('../components/navbar-icons/docs-grey.png')}
						className="docs-icon-grey" alt='Document tab not Selected'></img>
		}
	}

	isNotifications(){
		if (window.location.pathname.endsWith("/notifications")) {
			return <img src={require('../components/navbar-icons/notifications-red.png')}
						className="notifications-icon-grey" alt='Notification tab Selected'></img>
		}
		else {
			return <img src={require('../components/navbar-icons/notifications-grey.png')}
						className="notifications-icon-grey" alt='Notification tab not Selected'></img>
		}
	}

	render() {
		// rendering the basic navbar within the render class
		return (
			<div >
				{/** The default navigation menu */}
				<Navbar bg="light" expand="lg" className="navbar-custom" fixed="top">
					<Navbar.Brand className={this.isActive('/home') ? "nav-active":""} href="/home">
						{this.isHome()}
					</Navbar.Brand>

					<Navbar.Brand className={this.isActive('/create')} href="/create">
						{this.isCreate()}
					</Navbar.Brand>

					<Navbar.Brand className={this.isActive('/scorecapture')} href="/scorecapture">
						{this.isScoreCapture()}
					</Navbar.Brand>

					<Navbar.Toggle aria-controls="basic-navbar-nav" className="more-icon-grey">
						{<img src={require('../components/navbar-icons/more-grey.png')}
							className="more-icon-grey" alt=''></img>}
					</Navbar.Toggle>
					<Navbar.Collapse id="basic-navbar-nav">
						<Navbar>
						<Navbar.Brand href="#">
							{this.isProfile()}
						</Navbar.Brand>

						<Navbar.Brand className={this.isActive('/documents')} href="/documents">
							{this.isDocuments()}
						</Navbar.Brand>

						<Navbar.Brand className={this.isActive('/notifications')} href="/notifications">
							{this.isNotifications()}
						</Navbar.Brand>
						</Navbar>
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}
export default NavbarMenu;