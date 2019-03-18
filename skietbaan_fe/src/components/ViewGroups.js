import React, { Component } from 'react';
import { connect } from 'react-redux';
import './groups.css';
import { withRouter } from 'react-router-dom';
import { passId, getName ,FetchGroups} from '../actions/postActions';
import { BASE_URL } from '../actions/types';
import deleteState from './GroupImages/deleteState.png';
import normalstate from './GroupImages/submit-plus.png';
import back from './GroupImages/back.png';
import { getCookie } from '../components/cookie.js';
class ViewGroups extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
			newArray: [],
			count: 0,
			ids: 0,
			indexs: '',
			selected: '',
			deleteState: false
		};
		this.onBack = this.onBack.bind(this);
		this.onChange = this.onChange.bind(this);
		this.delete = this.delete.bind(this);
		this.editGroup = this.editGroup.bind(this);
	}

	async componentWillMount() {
    this.props.FetchGroups()
	}

	onChange(event) {
		this.setState({ filterText: event.target.value });
	}

	onBack() {
		this.props.history.push('/create');
	}
	editGroup(obj) {
		this.props.getName(obj.name);
		this.props.passId(obj.id);
		this.props.history.push('/EditGroup');
	}

	async delete(groupId) {
		this.setState({ ShowMe: false });
		await fetch(BASE_URL + '/api/Groups/' + groupId, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(groupId)
		})
			.then(function(response) {})
			.then(function(data) {})
      .catch(function(data) {});
      this.props.FetchGroups();
	}

	render() {
		const postitems = (
			<div className="the-main">
				<table className="table-member">
					<tbody>
						{this.props.groupsList
							.filter((post) => {
								return (
									!this.state.filterText ||
									post.username.toLowerCase().startsWith(this.state.filterText.toLowerCase()) ||
									post.email.toLowerCase().startsWith(this.state.filterText.toLowerCase()) ||
									post.memberID.startsWith(this.state.filterText)
								);
							})
							.map((post, index) => (
								<tr className="view-group" key={post.id}>
									<td
										className="first-row"
										onClick={() => this.editGroup(post)}
										style={{ color: post.colors, textAlign: 'left' }}
									>
										{post.name}
									</td>
									<td>
										<div className="group-view">
											<button className="Active" onClick={() => this.delete(post.id)}>{post.isActive==true?"Active":"InActive"}</button>
										</div>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		);

		return (
			<main className="The-Main">
			<div className="navBar-contain">			
				<div className="the-nav-bar">
					<a href="" className="back-container">
						<img className="back-image" onClick={this.onBack} src={back} alt="" />
					</a>
					<label className="center-label">View Groups</label>
				</div>
				</div>
				<div className="scrollbar" data-simplebar data-simplebar-auto-hide="false">
					{postitems}
				</div>
			</main>
		);
	}
}
const mapStateToProps = (state) => ({
	name: state.posts.groupName,
  id: state.posts.groupId,
  groupsList:state.posts.groupsList
});

export default withRouter(connect(mapStateToProps, { passId, getName ,FetchGroups})(ViewGroups));
