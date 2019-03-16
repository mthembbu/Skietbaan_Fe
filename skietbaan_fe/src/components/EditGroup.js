import React, { Component } from 'react';
import { connect } from 'react-redux';
import './groups.css';
import { withRouter } from 'react-router-dom';
import { BASE_URL } from '../actions/types';
import marked from './GroupImages/marked.png';
import redbox from './GroupImages/Rectangle.png';
import { fetchGroups } from "../actions/postActions";
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
	async componentDidMount() {
		if (!getCookie('token')) {
			window.location = '/registerPage';
		}
		if (this.props.id != 0) {
      this.props.fetchGroups(this.props.id)
		} else {
			this.props.history.push('/ViewGroups');
		}
	}
	onChange(event) {
		this.setState({ filterText: event.target.value });
	}

	async delete() {
		this.setState({ count: 0 });
		const newArray = [];
		for (var i = 0; i < this.props.groupsList.length; i++) {
			if (this.props.groupsList[i].highlighted === false) {
        newArray.push(this.props.groupsList[i]);
			}
		}
		let request = {
			GroupIds: this.props.id,
			users:newArray
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
    this.props.fetchGroups(this.props.id)
	}
  toggleHighlight = (user, event) => {
    this.setState({ selected: user });
    if (this.props.groupsList[event].highlighted === true) {
      this.props.groupsList[event].highlighted = false;
      this.setState({ count: this.state.count - 1 });
    } else {
      this.props.groupsList[event].highlighted = true;
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
      this.props.groupsList[i].image = marked;
		}
		this.setState({ count: 0 });
	};

	goToNext = () => {
		this.props.history.push('/AddMembersGroup');
	};
	render() {
    console.log(this.props.groupsList)
		const postitems = (
			<div className="check">
				<ul class="list-group" style={{ textAlign: 'left' }}>
					{this.props.groupsList
						.filter((post) => {
							return (
								!this.state.filterText ||
								post.username.toLowerCase().startsWith(this.state.filterText.toLowerCase()) ||
								post.email.toLowerCase().startsWith(this.state.filterText.toLowerCase())
							);
						})
						.map((post, index) => (
							<li
								class="list-group-item list-group-item-light"
								key={post.id}
								style={{
									background: post.background,
									textAlign: 'left'
								}}
							>
								<img
									className="checkbox-delete"
									onClick={() => this.toggleHighlight(post.username, index)}
									src={post.highlighted?marked:redbox}
									alt=""
								/>
								<label className="blabe">
									<div
										className="userName"
										className={post.highlighted ? 'userName' : 'userName-active'}
									>
										{post.username}
									</div>
									<div className={post.highlighted ? 'email' : 'emails-active'}>{post.email}</div>
								</label>
							</li>
						))}
				</ul>
			</div>
		);

		return (
			<main className="The-Main">
				<div className="the-nav-bar">
					<img className="back-image" onClick={this.onBack} src={back} alt="" />
					<label className="center-labels">{this.props.name}</label>
				</div>
				<div className="BNavBar">
					<input className="the-Text" id="username" type="text" onChange={this.onChange} autoComplete="off" />
					<button className="select2" onClick={this.goToNext}>
						Add new
					</button>
				</div>

				<div className="OnToTheNextOne" />
				<div className="scrollbar" data-simplebar data-simplebar-auto-hide="false">
					{postitems}
				</div>
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
  groupsList:state.posts.groupsList
});

export default withRouter(connect(mapStateToProps,{fetchGroups})(EditGroup));
