import React, { Component } from 'react';
import { connect } from 'react-redux';
import './groups.css';
import { BASE_URL } from '../actions/types';
import unmarked from './GroupImages/Oval.png';
import deleteS from './GroupImages/deleteS.png';
import whiteBin from './GroupImages/whiteBin.png';
import seleteAll from './GroupImages/seleteAll.png';
import unSelectAll from './GroupImages/unSelectAll.png';
import blackBin from './GroupImages/blackBin.png';
import whitePlus from './GroupImages/whitePlus.png';
import { fetchEditUser, pageState } from '../actions/postActions';
import back from './GroupImages/back.png';

class EditGroup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
			newArray: [],
			filterText: '',
			count: 0,
			selected: 0,
			check: 'select all',
			binState: false,
			height: window.innerHeight,
			width: window.innerWidth
		};
		this.toggleHighlight = this.toggleHighlight.bind(this);
		this.onBack = this.onBack.bind(this);
		this.onChange = this.onChange.bind(this);
		this.delete = this.delete.bind(this);
		this.selectAll = this.selectAll.bind(this);
		this.updateDimensions = this.updateDimensions.bind(this);
		this.getBodyHeight = this.getBodyHeight.bind(this);
		this.extractEmails = this.extractEmails.bind(this);
	}

	async componentDidMount() {
		this.updateDimensions();
		this.props.fetchEditUser(this.props.id);
	}
	componentWillMount() {
		window.addEventListener('resize', this.updateDimensions);
	}
	getBodyHeight() {
		if (this.state.width < 575) {
			return (this.state.height - 262) + "px";
		} else {
			return "59vh";
		}
	}

	updateDimensions() {
		this.setState({
			height: window.innerHeight,
			width: window.innerWidth
		});
	}
	onChange(event) {
		this.setState({ filterText: event.target.value });
	}

	async delete() {
		this.setState({ count: 0 });
		const newArray = [];
		for (var i = 0; i < this.props.editGroup.length; i++) {
			if (this.props.editGroup[i].highlighted === true) {
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
			.catch(function (data) { }).catch(err => {
				/* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
			});
		this.props.fetchEditUser(this.props.id);
	}
	//select user
	toggleHighlight = (event) => {

		const index = this.props.idsForUser.indexOf(event);

		if (this.state.binState === true) {
			if (this.props.editGroup[index].highlighted === true) {
				this.props.editGroup[index].highlighted = false;
				this.setState({ count: this.state.count - 1 });
			} else {
				this.props.editGroup[index].highlighted = true;
				this.setState({ count: this.state.count + 1 });
			}
		}
	};

	changeBinState = () => {
		if (this.state.binState === false) {
			this.setState({ binState: true });
		} else {
			this.setState({ binState: false });
		}
	};
	extractEmails(text) {
		if (this.state.filterText[0] === "@") {
			let ser = text.search("@")
			let word = text.substring(ser, text.length)
			let ss = word.split(".")
			return ss[0];
		}
		else {
			return text;
		}
	}

	onBack() {
		this.props.pageState(0);
	}

	cancel = () => {
		for (var i = 0; i < this.props.editGroup.length; i++) {
			this.props.editGroup[i].highlighted = false;
		}
		this.setState({ count: 0 });
	};

	selectall() {
		let arr = []
		this.state.posts.filter(post => {
		  return (
			!this.state.filterText ||
			post.username
			  .toLowerCase()
			  .startsWith(this.state.filterText.toLowerCase()) ||
			post.email
			  .toLowerCase()
			  .startsWith(this.state.filterText.toLowerCase()) || (this.extractEmails(post.email)).startsWith(this.state.filterText.toLowerCase())
		  );
		}).map(data => arr.push(data.id))
	
		if (this.state.check === "Select all") {
		  this.setState({ count: this.state.posts.length });
		  for (var i = 0; i < arr.length; i++) {
			(this.state.posts[this.state.ids.indexOf(arr[i])]).highlighted = true;
		  }
		  this.setState({ check: "Unselect all" });
		} else {
		  this.setState({ count: 0 });
		  for (var j = 0; j < arr.length; j++) {
			(this.state.posts[this.state.ids.indexOf(arr[j])]).highlighted = false;
		  }
		  this.setState({ check: "Select all" });
		}
	  }
	goToNext = () => {
		this.props.pageState(2);
	};
	render() {
		const postitems = (
			<div className="check-edit" style={{ height: this.getBodyHeight() }}>
				{this.props.editGroup.length === 0 ? <div className="edit-no-user-container">
					<label className="edit-no-user-msg">No users have been created yet.</label>
				</div> :
					<ul class="list-group">
						{this.props.editGroup
							.filter((post) => {
								return (
									!this.state.filterText ||
									post.username.toLowerCase().startsWith(this.state.filterText.toLowerCase()) ||
									(this.extractEmails(post.email)).startsWith(this.state.filterText.toLowerCase()) ||
									post.email.toLowerCase().startsWith(this.state.filterText.toLowerCase())
								);
							})
							.map((post, index) => (
								<li className="listItem" key={post.id} onClick={() => this.toggleHighlight(post.id)}>
									{this.state.binState === true ? (
										<img
											className="checkbox-delete"
											src={post.highlighted === true ? deleteS : unmarked}
											alt=""
										/>
									) : null}
									<label className={post.highlighted ? 'edit-blabe2' : 'edit-blabe'}>
										<div className={post.highlighted ? 'userName-active' : 'userName'}>
											{post.username}
										</div>

										<div className={post.highlighted ? 'emails-active' : 'email'}>{post.email}</div>
									</label>
								</li>
							))}
					</ul>}
			</div>
		);
		return (
			<div className="edit-The-Main">
				<div className="navBar-container">
					<div className="the-nav-bar-edit">
						<div className="leftContainer">
							<img className="back-image" onClick={this.onBack} src={back} alt="" />
							<label className="center-labels">{this.props.name}</label>
						</div>
						<div className="group-icon-spacing">
							<div className="plus-next" onClick={() => this.changeBinState()}>
								<img
									className="bin-image"
									src={this.state.binState ? blackBin : whiteBin}
									alt=""
								/>
							</div>
							<div className="delete-icons" onClick={() => this.goToNext()}>
								<img className="plus-image" src={whitePlus} alt="" />
							</div>
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
						{this.state.binState === true && this.props.editGroup.length !== 0 ? (
							<div className="switchAll" onClick={this.selectAll}>
								<img
									className="btn-select-all"
									src={this.state.count === this.props.editGroup.length ? seleteAll : unSelectAll}
									alt=""
								/>
							</div>
						) : null}
					</div>
				</div>
				{postitems} :
				{this.state.count === 0 ? null : (
					<div className="bpanel">
						<button className="confirm-group" onClick={() => this.delete()}>
							DELETE USER
						</button>

						<button className="cancel-delete" onClick={() => this.cancel()}>
							CANCEL
						</button>
					</div>
				)}
			</div>
		);
	}
}
const mapStateToProps = (state) => ({
	id: state.posts.groupId,
	name: state.posts.groupName,
	editGroup: state.posts.editGroup,
	page: state.posts.page,
	idsForUser: state.posts.idsForUser
});

export default connect(mapStateToProps, { fetchEditUser, pageState })(EditGroup);
