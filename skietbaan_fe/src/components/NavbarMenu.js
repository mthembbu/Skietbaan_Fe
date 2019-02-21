import React, { Component } from 'react';
import { Navbar, NavDropdown, Form, Nav, Container } from 'react-bootstrap';
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
					<i className="fa fa-file-o">Documents</i>
					</Navbar.Brand>
						<Nav className="mr-auto">
							<NavDropdown title="Create" id="basic-nav-dropdown" variant="outline-dark">
								<NavDropdown.Item href="/new-competition">New Competition</NavDropdown.Item>
								<NavDropdown.Item href="#">New Groups</NavDropdown.Item>
								<NavDropdown.Item href="/register">New Members</NavDropdown.Item>
								<NavDropdown.Divider />
							</NavDropdown>
						</Nav>
						<Form inline>
							<i className="fa fa-user-circle"></i>
							<NavDropdown title="Username" id="basic-nav-dropdown" variant="outline-dark">
								<NavDropdown.Item href="/">Awards</NavDropdown.Item>
								<NavDropdown.Item href="/">Statistics</NavDropdown.Item>
								<NavDropdown.Item href="/">Settings</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="/">Sign In</NavDropdown.Item>
							</NavDropdown>
						</Form>
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}
export default NavbarMenu;