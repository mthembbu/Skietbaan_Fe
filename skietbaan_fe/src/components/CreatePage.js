import React, { Component } from 'react';
import '../scss/create-page.css';
import { getCookie } from '../components/cookie.js';
class CreatePage extends Component {

	constructor(props) {
		super(props);

		this.GoComps = this.GoComps.bind(this);
		this.GoMembers = this.GoMembers.bind(this);
		this.GoGroups = this.GoGroups.bind(this);
		this.ViewComps = this.ViewComps.bind(this);
		this.ViewMembers = this.ViewMembers.bind(this);
		this.ViewGroups = this.ViewGroups.bind(this);
	}

	GoComps() {
		window.location = "/create-comp";
	}

	GoMembers() {
		window.location = "/registerMember";
	}

	GoGroups() {
		window.location = "/AddGroup";
	}

	ViewComps() {
		window.location = "/view-comp";
	}

	ViewMembers() {
		window.location = "/viewMembers";
	}

	ViewGroups() {
		window.location = "/EditGroup";
	}

	render() {
		if(!getCookie("token")){
            window.location = "/registerPage";
        }
		return (
			<div className="create-page-container">
				<div class="page-name-create-page">
					<label className="create-menu-header">Create</label>
				</div>
				<div class="container centre">
					<div className="container-of-buttons">
						<div className="buttons-create">
							<div className="create-spacing">
								<button className="button-create-competitions" onClick={this.GoComps}>
									Competitions</button>
							</div>
							<div className="create-spacing">
								<button className="button-create-members" onClick={this.GoMembers}>
									Members</button>
							</div>
							<div className="create-spacing">
								<button className="button-create-groups" onClick={this.GoGroups}>
									Groups</button>
							</div>
						</div>
						<div className="buttons-view">
							<div className="view-spacing">
								<button className="button-view-competitions" onClick={this.ViewComps}>
									View</button>
							</div>
							<div className="view-spacing">
								<button className="button-view-members" onClick={this.ViewMembers}>
									View</button>
							</div>
							<div className="view-spacing">
								<button className="button-view-groups" onClick={this.ViewGroups}>
									View</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default CreatePage;
