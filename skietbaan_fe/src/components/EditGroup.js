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
import { Row, Col } from "react-bootstrap";
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
	}

	async componentDidMount() {
		this.updateDimensions();
	 this.props.fetchEditUser(this.props.id);
	}
    componentWillMount() {
		window.addEventListener('resize', this.updateDimensions);
    }
    getBodyHeight() {
		return this.state.height - 240;
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
			.catch(function(data) {}).catch(err =>  {
				/* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
			  });
		this.props.fetchEditUser(this.props.id);
	}
//select user
	toggleHighlight = (event) => {
		if (this.state.binState === true) {
			if (this.props.editGroup[event].highlighted === true) {
				this.props.editGroup[event].highlighted = false;
				this.setState({ count: this.state.count - 1 });
			} else {
				this.props.editGroup[event].highlighted = true;
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

	onBack() {
		this.props.pageState(0);
	}

	cancel = () => {
		for (var i = 0; i < this.props.editGroup.length; i++) {
			this.props.editGroup[i].highlighted = false;
		}
		this.setState({ count: 0 });
	};

	selectAll() {
		if (this.state.binState === true) {
			if (this.state.check == 'select all') {
				this.setState({ count: this.props.editGroup.length });
				for (var i = 0; i < this.props.editGroup.length; i++) {
					this.props.editGroup[i].highlighted = true;
				}
				this.setState({ check: 'Unselect all' });
			} else {
				this.setState({ count: 0 });
				for (var i = 0; i < this.props.editGroup.length; i++) {
					this.props.editGroup[i].highlighted = false;
				}
				this.setState({ check: 'select all' });
			}
		}
	}

	goToNext = () => {
		this.props.pageState(2);
	};
	render() {
		const postitems = (
			<div className="check" style={{ height: this.getBodyHeight() + 'px' }}>
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
								{this.state.binState === true ? (
									<img
										className="checkbox-delete"
										src={post.highlighted == true ? deleteS : unmarked}
										alt=""
									/>
								) : null}
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
			<Row className="row justify-content-center">
				   <Col sm={8} className="createpage-bootstrap-col-center-container">
				   <main className="The-Main">
				<div className="navBar-container">
					<div className="the-nav-bar">
						<div className="leftContainer">
							<img className="back-image" onClick={this.onBack} src={back} alt="" />
							<label className="center-labels">{this.props.name}</label>
						</div>
						<div className="group-icon-spacing">
							<div className="plus-next" onClick={() => this.changeBinState()}>
								<img
									className="checkbox-delete"
									src={this.state.binState ? blackBin : whiteBin}
									alt=""
								/>
							</div>
							<div className="delete-icons" onClick={() => this.goToNext()}>
								<img className="checkbox-delete" src={whitePlus} alt="" />
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
						{this.state.binState === true ? (
							<div className="switchAll" onClick={this.selectAll}>
								<img
									className="checkbox-delete"
									src={this.state.count === this.props.editGroup.length ? seleteAll : unSelectAll}
									alt=""
								/>
							</div>
						) : null}
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
                   </Col>
            </Row>
		);
	}
}
const mapStateToProps = (state) => ({
	id: state.posts.groupId,
	name: state.posts.groupName,
	editGroup: state.posts.editGroup,
	page: state.posts.page
});

export default connect(mapStateToProps, { fetchEditUser, pageState })(EditGroup);
