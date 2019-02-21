import React, { Component } from 'react';
import { Navbar, NavDropdown, Form, Nav, Container, Figure } from 'react-bootstrap';
import '../scss/navbar.css';
class NavbarMenu extends Component {
	render() {
		// rendering the basic navbar within the render class
		return (
			<div>
				{/** *<Navbar bg="light" expand="lg">
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
							<Nav.Link href="/create">
								<Figure>
									<Figure.Image
										width={25}
										height={80}
										alt="25x120"
										src="img/add_img.png"
										align="centre"
									/>
									<Figure.Caption>Create</Figure.Caption>
								</Figure>
							</Nav.Link>
						</Nav>
						<Form inline>
							<NavDropdown title="Username" id="basic-nav-dropdown" variant="outline-dark">
								<NavDropdown.Item href="/home">Profile</NavDropdown.Item>
								<NavDropdown.Item href="/notifications">Notifications</NavDropdown.Item>
								<NavDropdown.Item href="/home">Documents</NavDropdown.Item>
							</NavDropdown>
						</Form>
					</Navbar.Collapse>
				</Navbar> */}
				<nav class="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark fixed-top">
					<a class="navbar-brand" href="/home">
						{/** *SKIETBAAN*/}
					</a>
					{/** The part of the Navigation-Bar that remains in a mobile device 
					<ul class="navbar navbar-nav mr-auto">
						<li class="nav-item">
							<a class="nav-link" href="">
								<img src="" width="30" height="30" alt=""/>
								<i class="fa fa-trophy">
								<span class=" badge badge-danger">1</span>
								</i>
							</a>
						</li>
					</ul>*/}

					<button
						id="h-btn"
						class="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span class="navbar-toggler-icon" />
					</button>

					<div class="collapse navbar-collapse" id="navbarSupportedContent">
						<div class="container-fluid">
							<ul class="navbar-nav mr-auto nav-fill">
								<li class="nav-item ">
									<a class="nav-link" href="/home">
										{/** <img src="../../public/img/trophy.png" width="30" height="30" alt=""> </img>*/}
										<i class="fa fa-trophy" width="30">
											<span class="badge badge-danger">2</span>
										</i>
										LEADERBOARD
									</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="/create">
										{/** <img src="../../public/img/trophy.png" width="30" height="30" alt=""> </img>*/}
										<i class="fa fa-plus-circle">
											<span class="badge badge-danger" />
										</i>
										CREATE
									</a>
								</li>
								<li class="nav-item">
									<a class="nav-link " href="/scorecapture">
										{/** <img src="../../public/img/trophy.png" width="30" height="30" alt=""> </img>*/}
										<i class="fa fa-dot-circle-o">
											<span class="badge badge-warning" />
										</i>
										ADD SCORE
									</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="/notifications">
										{/** <img src="../../public/img/trophy.png" width="30" height="30" alt=""> </img>*/}
										<i class="fa fa-bell">
											<span class="badge badge-danger">11</span>
										</i>
										NOTIFICATIONS
									</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="#">
										{/** <img src="../../public/img/trophy.png" width="30" height="30" alt=""> </img>*/}
										<i class="fa fa-user">
											<span class="badge badge-success" />
										</i>
										PROFILE
									</a>
								</li>

								<li class="nav-item">
									<a class="nav-link" href="#">
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
