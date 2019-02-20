import React, { Component } from 'react';
import { Navbar, NavDropdown, Form, Nav, Container, Figure } from 'react-bootstrap';
import '../scss/navbar.css';

class NavbarMenu extends Component {
	render() {
		// rendering the basic navbar within the render class
		return (
			<div>
				<nav class="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark fixed-top">
					<a class="navbar-brand" href="/home">
						{/** *SKIETBAAN*/}
					</a>
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
										{/*GC TODO: Refactor for Image displays: <img src="../resources/trophy.png" width="30" height="30" alt="Sbuda"/>*/}
										<i class="fa fa-trophy" width="30">
											<span class="badge badge-danger">2</span>
										</i>
										LEADERBOARD
									</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="/create">
										{/***GC TODO: Refactor for Image displays: <img src="../../public/img/trophy.png" width="30" height="30" alt=""> </img>*/}
										<i class="fa fa-plus-circle">
											<span class="badge badge-danger" />
										</i>
										CREATE
									</a>
								</li>
								<li class="nav-item">
									<a class="nav-link " href="/scorecapture">
										{/***GC TODO: Refactor for Image displays: <img src="../../public/img/trophy.png" width="30" height="30" alt=""> </img>*/}
										<i class="fa fa-dot-circle-o">
											<span class="badge badge-warning" />
										</i>
										ADD SCORE
									</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="/notifications">
										{/***GC TODO: Refactor for Image displays: <img src="../../public/img/trophy.png" width="30" height="30" alt=""> </img>*/}
										<i class="fa fa-bell">
											<span class="badge badge-danger">11</span>
										</i>
										NOTIFICATIONS
									</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="/">
										{/***GC TODO: Refactor for Image displays: <img src="../../public/img/trophy.png" width="30" height="30" alt=""> </img>*/}
										<i class="fa fa-user">
											<span class="badge badge-success" />
										</i>
										PROFILE
									</a>
								</li>

								<li class="nav-item">
									<a class="nav-link" href="/">
										{/***GC TODO: Refactor for Image displays: <img src="../../public/img/trophy.png" width="30" height="30" alt=""> </img>*/}
										<i class="fa fa-file-o">
											<span class="badge badge-danger">11</span>
										</i>
										DOCUMENTS
									</a>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</div>
		);
	}
}
export default NavbarMenu;
