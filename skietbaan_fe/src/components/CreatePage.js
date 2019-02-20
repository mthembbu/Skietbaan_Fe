import React, { Component } from 'react';
import '../scss/createcomp.css';
import Collapsible from 'react-collapsible';
import { Button, Nav, Tab, Container, Row, Col } from 'react-bootstrap';
import CreateComp from './CreateComp';
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
				<Container id="create-container">
					<Collapsible
						id="Competitions"
						trigger={
							<a href="">
								<Button variant="outline-secondary" size="md" width="125px">
									<strong>Competitions</strong>
								</Button>
							</a>
						}
					>
						<Container id="competition-container" />
						<Tab.Container>
							<Nav className="justify-content-center" fill variant="tabs" defaultActiveKey="">
								<Nav.Item>
									<Nav.Link eventKey="first">COMPETITION</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="second">VIEW COMPETITION</Nav.Link>
								</Nav.Item>
							</Nav>
							<Container>
								<Row>
									<Col>
										<Tab.Content>
											<Tab.Pane eventKey="first">
												<p>
													<CreateComp />
												</p>
											</Tab.Pane>
										</Tab.Content>
									</Col>
									<Col>
										<Tab.Content>
											<Tab.Pane eventKey="second">
												<p>
													2 of 2
													<h1>The VIEW COMPETITION PAGE</h1>
												</p>
											</Tab.Pane>
										</Tab.Content>
									</Col>
								</Row>
							</Container>
						</Tab.Container>
					</Collapsible>
					<br />
					{/** The collapse for creating and view the Member  */}
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
							<Nav className="justify-content-center" fill variant="tabs" defaultActiveKey="">
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
										<h1>the CREATE MEMBER page</h1>
									</p>
								</Tab.Pane>
							</Tab.Content>
							<Tab.Content>
								<Tab.Pane eventKey="second">
									<p>
										<h1>the VIEW MEMBER</h1>
									</p>
								</Tab.Pane>
							</Tab.Content>
						</Tab.Container>
						<br />
					</Collapsible>
					<br />
					{/** The collapse for creating and view the group  */}
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
										<h1>This is the CREATE GROUP page</h1>
									</p>
								</Tab.Pane>
							</Tab.Content>
							<Tab.Content>
								<Tab.Pane eventKey="second">
									<p>
										<h1>This is the VIEW GROUPS page</h1>
									</p>
								</Tab.Pane>
							</Tab.Content>
						</Tab.Container>
					</Collapsible>
					<br />
				</Container>
			</div>
		);
	}
}
export default CreatePage;
