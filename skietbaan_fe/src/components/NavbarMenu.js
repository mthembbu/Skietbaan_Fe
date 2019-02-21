import React, { Component } from 'react';
import { Navbar, NavDropdown, Form, Nav, Container, Figure } from 'react-bootstrap';
import '../scss/navbar.css';
import 'font-awesome/css/font-awesome.min.css';
import '../bootstrap/NavbarMenuStyle.css';
class NavbarMenu extends Component {
	render() {
		// rendering the basic navbar within the render class
		return (
			<div >
				{/** The default navigation menu */}
				<Navbar bg="light" expand="lg" className="navbar-custom" fixed="top">
					<Navbar.Brand href="/home">
						<i className="fa fa-trophy">Leaderboard</i>
					</Navbar.Brand>
                   
					<Navbar.Brand href="/scorecapture">
						<i className="fa fa-plus-circle">Add Score</i>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Navbar.Brand href="#">
							<i className="fa fa-user">Profile</i>
						</Navbar.Brand>
						<Navbar.Brand href="#">
							<i className="fa fa-file">Documents</i>
						</Navbar.Brand>
						<Navbar.Brand href="#">
							<i className="fa fa-bell">Notification</i>
						</Navbar.Brand>
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}
export default NavbarMenu;
