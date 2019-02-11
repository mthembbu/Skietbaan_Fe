import React, { Component } from 'react';
import { Table, Jumbotron } from 'react-bootstrap';

class Competition extends Component {
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
							This is a simple hero unit, a simple jumbotron-style component for calling extra attention
							to featured content or information.
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
export default Competition;
