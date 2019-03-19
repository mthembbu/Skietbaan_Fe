import React, { Component } from 'react';
import { connect } from 'react-redux';
import './groups.css';
import { withRouter } from 'react-router-dom';
import { BASE_URL } from '../actions/types';
import marked from './GroupImages/marked.png';
import redbox from './GroupImages/Rectangle.png';
import { fetchEditUser, AddMemberAction } from '../actions/postActions';
import back from './GroupImages/back.png';
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
	async componentWillMount() {
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
				<ul class="list-group" >
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
									src={post.highlighted==true?marked:redbox}
									alt=""
							
								/>
								<label className={post.highlighted?"blabe":"blabe2"} >
									<div className={post.highlighted?"userName":"userName-active"}>
										{post.username}
									</div>
									<div className={post.highlighted?"email":"emails-active"}>{post.email}</div>
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
					</div>
					<div className="BNavBar">
						<input
							className="the-Text"
							id="username"
							type="text"
							onChange={this.onChange}
							autoComplete="off"
						/>
						<button className="select2" onClick={this.goToNext}>
							Add new
						</button>
					</div>
				</div>
			
					{postitems}
			
				{this.state.count == 0 ? null : (
					<div className="bpanel">
						<table className="group-delete-table">
							<tbody>
								<tr>
									<td>
										<div className="the-textname">Delete</div>
									</td>
									<td>
										<span className="name-of-group">{this.state.selected} </span>
									</td>
									<div className="confrim-cancel">
										<td>
											<button className="group-confirm" onClick={() => this.delete()}>
												Confirm
											</button>
										</td>
										<td className="group-undo">
											<button className="updatess" onClick={() => this.cancel()}>
												Cancel
											</button>
										</td>
									</div>
								</tr>
							</tbody>
						</table>
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
