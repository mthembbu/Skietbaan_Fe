import React, { Component } from 'react';
import { connect } from 'react-redux';
import './groups.css';
import history from "./history";
import { passId, getName ,fetchEditUser,FetchGroups,groupDic} from '../actions/postActions';
import { BASE_URL } from '../actions/types';
import Switch from '@material-ui/core/Switch';
import back from './GroupImages/back.png';
import group from './GroupImages/Group.png';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'
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

	async componentDidMount() {
		if (!getCookie("token")) {
			window.location = "/registerPage";
			}
		this.props.FetchGroups();
		this.props.groupDic();
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
	//  history.push('/EditGroup');
	}

	async delete(groupId) {
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
								<NavLink to='/EditGroup'>
								<tr className="view-group" key={post.id}>
									<td
										className={post.isActive==true?"first-row":"first-row-active"}
										onClick={() => this.editGroup(post)}
									>
										{post.name}
									</td>
									
									<td className="group-container">
									{post.isActive===true?
									<div><img src={group}
									className="groupIcon"
									alt=""
								/>
								<label className="numberOfUser">{ this.props.groupDict[post.id]}</label></div>:null}
									</td>
									<td>
										<div className="group-view">
										<Switch color={"primary"} className="Active" focus={true} checked={post.isActive} onClick={() => this.delete(post.id)}/>
										</div>
									</td>
								</tr>
								</NavLink>
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

ViewGroups.propTypes={
	groupDict:PropTypes.shape({
		Id:PropTypes.arrayOf(PropTypes.number),
		count:PropTypes.arrayOf(PropTypes.number)
	}) 
}

const mapStateToProps = (state) => ({
	name: state.posts.groupName,
  id: state.posts.groupId,
	groupsList:state.posts.groupsList,
	groupDict:state.posts.groupDict
});

export default connect(mapStateToProps, { passId, getName,groupDic,fetchEditUser ,FetchGroups})(ViewGroups);
