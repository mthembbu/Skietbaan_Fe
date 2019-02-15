import React, { Component } from 'react';
import { Navbar, NavDropdown, Form, Nav, Container } from 'react-bootstrap';
import '../scss/navbar.css';
import 'font-awesome/css/font-awesome.min.css';


class NavbarMenu extends Component {
	render() {
		// rendering the basic navbar within the render class
		return (
			<div >
				{/** The default navigation menu */}
				<Container>
				<Navbar bg="light" expand="lg" className="navbar-custom" fixed="top">
					<Navbar.Brand href="#home">
					 <i className="fa fa-home"></i>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link href="/home">
								<img src="" alt="" width="" height="" />Leader Board
							</Nav.Link>
							<Nav.Link href="/scorecapture">Score Capture</Nav.Link>
							<NavDropdown title="Create" id="basic-nav-dropdown" variant="outline-dark">
								<NavDropdown.Item href="/new-competition">New Competition</NavDropdown.Item>
								<NavDropdown.Item href="/groupsname">New Groups</NavDropdown.Item>
								<NavDropdown.Item href="/register">New Members</NavDropdown.Item>
								<NavDropdown.Divider />
							</NavDropdown>
							<Nav.Link href="/">Documents</Nav.Link>
						</Nav>
						<Form inline>
						<i className="fa fa-user-circle"></i>
							<NavDropdown title="Username" id="basic-nav-dropdown" variant="outline-dark">
								<NavDropdown.Item href="/">Profile</NavDropdown.Item>
								<NavDropdown.Item href="/notifications">Notifications</NavDropdown.Item>
								<NavDropdown.Item href="/">Settings</NavDropdown.Item>
							</NavDropdown>
						</Form>
					</Navbar.Collapse>
				</Navbar>
				</Container>
			</div>
		);
	}
}
export default NavbarMenu;