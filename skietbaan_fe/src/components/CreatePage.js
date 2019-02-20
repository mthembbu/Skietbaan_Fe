import React, { Component } from 'react';
import '../scss/createcomp.css';
import Collapsible from 'react-collapsible';
import { Button, Nav, Tab } from 'react-bootstrap';
class CreatePage extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			open: false
		};
		this.toggleOpenClose = this.toggleOpenClose.bind(this);
	}
	// a function to Toggle the mini-menus
	toggleOpenClose() {
		this.setState({ open: !this.state.open });
	}
	// a function to Toggle the mini-menus
	toggleCloseOpen() {
		this.setState({ close: !this.state.close });
	}
	render() {
		return (
			<div>
				<div>
					<Collapsible
						id="Competitions"
						trigger={
							<a href="">
								<Button variant="outline-secondary" size="lg" width="125px">
									<strong>Competitions</strong>
								</Button>
							</a>
						}
					>
						<Tab.Container>
							<Nav className="justify-content-center" fill variant="tabs" defaultActiveKey="/home">
								<Nav.Item>
									<Nav.Link eventKey="first">COMPETITION</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="second">VIEW COMPETITION</Nav.Link>
								</Nav.Item>
							</Nav>

							<Tab.Content>
								<Tab.Pane eventKey="first">
									<p>
										Against that time, if ever that time come, When I shall see thee frown on my
										defects, When as thy love hath cast his utmost sum, Call'd to that audit by
										advis'd respects; Against that time when thou shalt strangely pass, And scarcely
										greet me with that sun, thine eye, When love, converted from the thing it was,
										Shall reasons find of settled gravity; Against that time do I ensconce me here,
										Within the knowledge of mine own desert,
									</p>
								</Tab.Pane>
							</Tab.Content>
							<Tab.Content>
								<Tab.Pane eventKey="second">
									<p>
										I never saw that you did painting need, And therefore to your fair no painting
										set; I found, or thought I found, you did exceed That barren tender of a poet's
										debt: And therefore have I slept in your report, That you yourself, being
										extant, well might show How far a modern quill doth come too short, Speaking of
										worth, what worth in you doth grow. This silence for my sin you did impute,
										Which shall be most my glory being dumb;
									</p>
								</Tab.Pane>
							</Tab.Content>
						</Tab.Container>
						<br />
					</Collapsible>
					<hr />
					<Collapsible
						id="Members"
						trigger={
							<a href="">
								<Button variant="outline-secondary" size="lg" width="125px">
									<strong>Member</strong>
								</Button>
							</a>
						}
					>
						<Tab.Container>
							<Nav className="justify-content-center" fill variant="tabs" defaultActiveKey="/home">
								<Nav.Item>
									<Nav.Link eventKey="first">CREATE MEMBER</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="second">VIEW MEMBERS</Nav.Link>
								</Nav.Item>
							</Nav>

							<Tab.Content>
								<Tab.Pane eventKey="first">
									<p>
										Against that time, if ever that time come, When I shall see thee frown on my
										defects, When as thy love hath cast his utmost sum, Call'd to that audit by
										advis'd respects; Against that time when thou shalt strangely pass, And scarcely
										greet me with that sun, thine eye, When love, converted from the thing it was,
										Shall reasons find of settled gravity; Against that time do I ensconce me here,
										Within the knowledge of mine own desert,
									</p>
								</Tab.Pane>
							</Tab.Content>
							<Tab.Content>
								<Tab.Pane eventKey="second">
									<p>
										I never saw that you did painting need, And therefore to your fair no painting
										set; I found, or thought I found, you did exceed That barren tender of a poet's
										debt: And therefore have I slept in your report, That you yourself, being
										extant, well might show How far a modern quill doth come too short, Speaking of
										worth, what worth in you doth grow. This silence for my sin you did impute,
										Which shall be most my glory being dumb;
									</p>
								</Tab.Pane>
							</Tab.Content>
						</Tab.Container>
						<br />
					</Collapsible>
					<hr />
					<Collapsible
						id="Groups"
						trigger={
							<a href="">
								<Button variant="outline-secondary" size="lg" width="125px">
									<strong>Groups</strong>
								</Button>
							</a>
						}
					>
						<Tab.Container>
							<Nav className="justify-content-center" fill variant="tabs" defaultActiveKey="/home">
								<Nav.Item>
									<Nav.Link eventKey="first"> CREATE GROUP </Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="second">VIEW GROUPS</Nav.Link>
								</Nav.Item>
							</Nav>

							<Tab.Content>
								<Tab.Pane eventKey="first">
									<p>
										Against that time, if ever that time come, When I shall see thee frown on my
										defects, When as thy love hath cast his utmost sum, Call'd to that audit by
										advis'd respects; Against that time when thou shalt strangely pass, And scarcely
										greet me with that sun, thine eye, When love, converted from the thing it was,
										Shall reasons find of settled gravity; Against that time do I ensconce me here,
										Within the knowledge of mine own desert,
									</p>
								</Tab.Pane>
							</Tab.Content>
							<Tab.Content>
								<Tab.Pane eventKey="second">
									<p>
										I never saw that you did painting need, And therefore to your fair no painting
										set; I found, or thought I found, you did exceed That barren tender of a poet's
										debt: And therefore have I slept in your report, That you yourself, being
										extant, well might show How far a modern quill doth come too short, Speaking of
										worth, what worth in you doth grow. This silence for my sin you did impute,
										Which shall be most my glory being dumb;
									</p>
								</Tab.Pane>
							</Tab.Content>
						</Tab.Container>
					</Collapsible>
					<hr />
				</div>
			</div>
		);
	}
}
export default CreatePage;
