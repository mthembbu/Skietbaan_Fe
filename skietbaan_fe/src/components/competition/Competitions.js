import React, { Component } from 'react';
import { Table, Jumbotron, Tab, Row, Col, Nav } from 'react-bootstrap';
class Competitions extends Component {
	/**
   * The constructo for the Competition component
   */
	constructor(props) {
		super(props);
	}
	/**
  * The method to fetch the list of competition objects from the json object
  */

	componentWillMount() {}
	/**
     * The method to render the Competition page
     */
	render() {
		return (
			<div className="container">
				<div>
					<Jumbotron>
						<h1>
							<b>SkietBaan App - Display for Competitions</b>
						</h1>
						<p>
							<Tab.Container id="left-tabs-example" defaultActiveKey="first">
								<Row>
									<Col sm={3}>
										<Nav variant="pills" className="flex-column">
											<Nav.Item>
												<Nav.Link eventKey="first">Tab 1</Nav.Link>
											</Nav.Item>
											<Nav.Item>
												<Nav.Link eventKey="second">Tab 2</Nav.Link>
											</Nav.Item>
										</Nav>
									</Col>
									<Col sm={9}>
										<Tab.Content>
											<Tab.Pane eventKey="first">
												<Sonnet />
											</Tab.Pane>
											<Tab.Pane eventKey="second">
												<Sonnet />
											</Tab.Pane>
										</Tab.Content>
									</Col>
								</Row>
							</Tab.Container>;
						</p>
					</Jumbotron>
				</div>

				<div main className="scrollbar" data-simplebar data-simplebar-auto-hide="false">
					<h1>The competition page</h1>
				</div>
			</div> /** End of the competitions container*/
		);
	}
}
export default Competitions;
