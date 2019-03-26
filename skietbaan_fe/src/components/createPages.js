import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Toolbar from '@material-ui/core/Toolbar';
import { Row, Col } from 'react-bootstrap';
import './Create.css';
import ViewMembers from '../components/ViewMembers';
import CreateComp from '../components/CreateComp';
import AddGroup from '../components/AddGroup';
import ViewComp from '../components/ViewComp';
import GroupComponent from '../components/GroupComponent';

export class createPages extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isToken: true,
			selectedButton: 1,
			selectedButtonCreateViewGroups: 1,
			selectedButtonCreateViewCompetitions: 1
		};

		this.groupsPage = this.groupsPage.bind(this);
		this.comptetitionsPage = this.comptetitionsPage.bind(this);
		this.membersPage = this.membersPage.bind(this);
		this.createGroups = this.createGroups.bind(this);
		this.viewGroups = this.viewGroups.bind(this);
		this.createCompetitions = this.createCompetitions.bind(this);
		this.viewCompetitions = this.viewCompetitions.bind(this);
	}

	groupsPage() {
		this.setState({ selectedButton: 1 });
	}

	comptetitionsPage() {
		this.setState({ selectedButton: 2 });
	}

	membersPage() {
		this.setState({ selectedButton: 3 });
	}

	createGroups() {
		this.setState({ selectedButtonCreateViewGroups: 1 });
	}

	viewGroups() {
		this.setState({ selectedButtonCreateViewGroups: 2 });
	}

	createCompetitions() {
		this.setState({ selectedButtonCreateViewCompetitions: 1 });
	}

	viewCompetitions() {
		this.setState({ selectedButtonCreateViewCompetitions: 2 });
	}

	render() {
		return (
			<div className="create-main-container">
            {this.props.page===0?
				<div className="create-top-nav">
					<div class="page-name-bar">
						<label className="create-all-menu">CREATE</label>
					</div>
					<div className="first-buttons-container">
						<Row className="buttons-row">
							<div className="buttons-squire-rectangle lay-horizontal">
								<Col id="removeLeftButtonPadding" className="pad-button-text-top">
									<div>
										<button
											className={
												this.state.selectedButton === 1 ? (
													'unstyle-button-active btn-block button-fill'
												) : (
													'unstyle-button btn-block button-fill'
												)
											}
											onClick={this.groupsPage}
										>
											<label className="button-text">GROUPS</label>
										</button>
									</div>
								</Col>
								<Col id="padMiddleButton" className="pad-button-text-top">
									<div>
										<button
											className={
												this.state.selectedButton === 2 ? (
													'unstyle-button-active btn-block button-fill'
												) : (
													'unstyle-button btn-block button-fill'
												)
											}
											onClick={this.comptetitionsPage}
										>
											<label className="button-text">COMPETITIONS</label>
										</button>
									</div>
								</Col>
								<Col id="removeRightButtonPadding" className="pad-button-text-top">
									<div>
										<button
											className={
												this.state.selectedButton === 3 ? (
													'unstyle-button-active btn-block button-fill'
												) : (
													'unstyle-button btn-block button-fill'
												)
											}
											onClick={this.membersPage}
										>
											<label className="button-text">MEMBERS</label>
										</button>
									</div>
								</Col>
							</div>
						</Row>
					</div>
					<div
						className={
							this.state.selectedButton === 1 ? (
								'content-container pad-top-13px'
							) : this.state.selectedButton === 2 ? (
								'content-container pad-top-13px'
							) : (
								'content-container'
							)
						}
					>
						{this.state.selectedButton === 1 ? (
							<div className="buttons-container">
								<Row className="buttons-row">
									<div className="buttons-squire-rectangle lay-horizontal">
										<Col id="removeLeftButtonPadding" className="pad-button-text-top">
											<div>
												<button
													className={
														this.state.selectedButtonCreateViewGroups === 1 ? (
															'unstyle-create-active btn-block button-fill'
														) : (
															'unstyle-create btn-block button-fill'
														)
													}
													onClick={this.createGroups}
												>
													<label className="button-text">CREATE</label>
												</button>
											</div>
										</Col>
										<Col id="padMiddleButton" className="pad-button-text-top">
											<div>
												<button
													className={
														this.state.selectedButtonCreateViewGroups === 2 ? (
															'unstyle-view-active btn-block button-fill'
														) : (
															'unstyle-view btn-block button-fill'
														)
													}
													onClick={this.viewGroups}
												>
													<label className="button-text">VIEW</label>
												</button>
											</div>
										</Col>
									</div>
								</Row>
							</div>
						) : this.state.selectedButton === 2 ? (
							<div className="buttons-container">
								<Row className="buttons-row">
									<div className="buttons-squire-rectangle lay-horizontal">
										<Col id="removeLeftButtonPadding" className="pad-button-text-top">
											<div>
												<button
													className={
														this.state.selectedButtonCreateViewCompetitions === 1 ? (
															'unstyle-create-active btn-block button-fill'
														) : (
															'unstyle-create btn-block button-fill'
														)
													}
													onClick={this.createCompetitions}
												>
													<label className="button-text">CREATE</label>
												</button>
											</div>
										</Col>
										<Col id="padMiddleButton" className="pad-button-text-top">
											<div>
												<button
													className={
														this.state.selectedButtonCreateViewCompetitions === 2 ? (
															'unstyle-view-active btn-block button-fill'
														) : (
															'unstyle-view btn-block button-fill'
														)
													}
													onClick={this.viewCompetitions}
												>
													<label className="button-text">VIEW</label>
												</button>
											</div>
										</Col>
									</div>
								</Row>
							</div>
						) : this.state.selectedButton === 3 ? (
							<ViewMembers />
						) : null}
					</div>
				</div>:null}
                <div>
        {(this.state.selectedButton===1 && this.state.selectedButtonCreateViewGroups===1)?<AddGroup />:(this.state.selectedButton===1 && this.state.selectedButtonCreateViewGroups===2)?<GroupComponent />:null}
        {(this.state.selectedButton===2 && this.state.selectedButtonCreateViewCompetitions===1)?<CreateComp/>:(this.state.selectedButton===2 && this.state.selectedButtonCreateViewCompetitions===2)?<ViewComp />:null}
      </div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	page: state.posts.page
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(createPages);
