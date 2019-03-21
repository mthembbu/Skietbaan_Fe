import React, { Component } from 'react';
import { connect } from 'react-redux';
import './groups.css';
import { withRouter } from 'react-router-dom';
import { BASE_URL } from '../actions/types';
import unmarked from './GroupImages/Oval.png';
import marked from './GroupImages/MarkedBox.png';
import { fetchEditUser, AddMemberAction } from '../actions/postActions';
import back from './GroupImages/back.png';
import Switch from '@material-ui/core/Switch';
import Close from '@material-ui/icons/Close';
import Delete from '@material-ui/icons/Delete';
import { getCookie } from '../components/cookie.js';
class EditGroup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
			newArray: [],
			filterText: '',
			count: 0,
			selected: 0
		};
		this.toggleHighlight = this.toggleHighlight.bind(this);
		this.onBack = this.onBack.bind(this);
		this.onChange = this.onChange.bind(this);
		this.delete = this.delete.bind(this);
	}
	async UNSAFE_componentWillMount() {
		if (!getCookie('token')) {
			window.location = '/registerPage';
		}
		this.props.fetchEditUser(this.props.id);
	}

	onChange(event) {
		this.setState({ filterText: event.target.value });
	}

	async delete() {
		this.setState({ count: 0 });
		const newArray = [];
		for (var i = 0; i < this.props.editGroup.length; i++) {
			if (this.props.editGroup[i].highlighted === false) {
				newArray.push(this.props.editGroup[i]);
			}
		}
		let request = {
			GroupIds: this.props.id,
			users: newArray
		};
		await fetch(BASE_URL + '/api/groups/deleteMember/', {
			method: 'Post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(request)
		})
			.then((res) => res.json())
			.catch(function(data) {});
		this.props.fetchEditUser(this.props.id);
	}
	toggleHighlight = (event) => {
		if (this.props.editGroup[event].highlighted === true) {
			this.props.editGroup[event].highlighted = false;
			this.setState({ count: this.state.count - 1 });
		} else {
			this.props.editGroup[event].highlighted = true;
			this.setState({ count: this.state.count + 1 });
		}
	};

	onBack() {
		this.props.history.push('/ViewGroups');
	}

	cancel = () => {
		for (var i = 0; i < this.state.posts.length; i++) {
			this.props.groupsList[i].highlighted = true;
			this.props.groupsList[i].background = '#F3F4F9';
		}
		this.setState({ count: 0 });
	};

	goToNext = () => {
		this.props.history.push('/AddMembersGroup');
	};

	render() {
		const postitems = (
			<div className="check">
				<ul class="list-group">
					{this.props.editGroup
						.filter((post) => {
							return (
								!this.state.filterText ||
								post.username.toLowerCase().startsWith(this.state.filterText.toLowerCase()) ||
								post.email.toLowerCase().startsWith(this.state.filterText.toLowerCase())
							);
						})
						.map((post, index) => (
							<li className="listItem" key={post.id} onClick={() => this.toggleHighlight(index)}>
								<img
									className="checkbox-delete"
									src={post.highlighted == true ? marked : unmarked}
									alt=""
								/>
								<label className={post.highlighted ? 'blabe2' : 'blabe'}>
									<div className={post.highlighted ? 'userName-active' : 'userName'}>
										{post.username}
									</div>
									<div className={post.highlighted ? 'emails-active' : 'email'}>{post.email}</div>
								</label>
							</li>
						))}
				</ul>
			</div>
		);
		return (
			<main className="The-Main">
				<div className="navBar-container">
					<div className="the-nav-bar">
						<img className="back-image" onClick={this.onBack} src={back} alt="" />
						<label className="center-labels">{this.props.name}</label>
						<div className="plus-next">
							<Close />
						</div>
						<div className="delete-icon">
							<Delete />
						</div>
					</div>
					<div class="BNavBar">
						<div className="inputBox">
							<input
								className="the-Text"
								id="username"
								type="text"
								onChange={this.onChange}
								autoComplete="off"
								placeholder="Search"
							/>
						</div>
						<div className="switchAll" onClick={this.selectall}>
							All
							<Switch
								checked={
									this.state.count == 0 ? (
										false
									) : null || this.state.count == this.state.posts.length ? (
										true
									) : null
								}
							/>
						</div>
					</div>
				</div>

				{postitems}

				{this.state.count == 0 ? null : (
					<div className="bpanel">
						<button className="confirm-group" onClick={() => this.delete()}>
							DELETE USER
						</button>

						<button className="cancel-delete" onClick={() => this.cancel()}>
							CANCEL
						</button>
					</div>
				)}
			</main>
		);
	}
}
const mapStateToProps = (state) => ({
	id: state.posts.groupId,
	name: state.posts.groupName,
	editGroup: state.posts.editGroup
});

export default withRouter(connect(mapStateToProps, { fetchEditUser, AddMemberAction })(EditGroup));
