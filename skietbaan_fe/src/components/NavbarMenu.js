import React, { Component } from 'react';
import { Navbar, NavDropdown, Form, Nav, Container } from 'react-bootstrap';
import '../scss/navbar.css';
class NavbarMenu extends Component {
	render() {
		// rendering the basic navbar within the render class
		return (
			<div>
				{' '}
				<Navbar bg="light" expand="lg">
					<Navbar.Brand href="/home">SKIETBAAN APP</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link href="/home">Leader Board</Nav.Link>
							<Nav.Link href="/scorecapture">Score Capture</Nav.Link>
							<NavDropdown title="Create" id="basic-nav-dropdown" variant="outline-dark">
								<NavDropdown.Item href="/new-competition">New Competition</NavDropdown.Item>
								<NavDropdown.Item href="/groupsname">New Groups</NavDropdown.Item>
								<NavDropdown.Item href="/register-member">New Members</NavDropdown.Item>
								<NavDropdown.Divider />
							</NavDropdown>
						</Nav>
						<Form inline>
							<NavDropdown title="Username" id="basic-nav-dropdown" variant="outline-dark">
								<NavDropdown.Item href="/home">Profile</NavDropdown.Item>
								<NavDropdown.Item href="/notifications">Notifications</NavDropdown.Item>
								<NavDropdown.Item href="/home">Documents</NavDropdown.Item>
							</NavDropdown>
						</Form>
					</Navbar.Collapse>
				</Navbar>
			</div>	
		);
	}
}
export default NavbarMenu;