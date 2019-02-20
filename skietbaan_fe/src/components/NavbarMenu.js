import React, { Component } from 'react';
import { Navbar, NavDropdown, Form, Nav, Container } from 'react-bootstrap';
import '../scss/navbar.css';
import LB from '../resources/trophy.png';

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
										 {/*<img src="../resources/trophy.png" width="30" height="30" alt="Sbuda"/>*/}
									 <i class="fa fa-trophy" width="30"><span class="badge badge-danger">2</span></i>
									<a class="nav-link" href="/">
									<a class="nav-link" href="/">
										{/** <img src="../../public/img/trophy.png" width="30" height="30" alt=""> </img>*/}
										<i class="fa fa-file-o">
											<span class="badge badge-danger">11</span>
										</i>
										DOCUMENTS
									</a>
								</li>
							</ul>
							{/**<div>
						<form class="form-inline my-2 my-md-0">
							 <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
							<button class="btn btn-outline-success my-4 my-md-0" type="submit">
								Search
							</button>
						</form>
						</div> */}
						</div>
					</div>
				</nav>
			</div>
		);
	}
}
export default NavbarMenu;
