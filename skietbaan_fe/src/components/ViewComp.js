import React, { Component } from 'react';
import { fetchcomp, 
		updateByIDcomp 
	} from '../actions/competition.action';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../scss/view-comp.css';
class ViewComp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allcomps: [],
			status: [],
			updatedComp: {}
		};
		this.changeActive = this.changeStatus.bind(this);
		this.onClick = this.onClick.bind(this);
	}

	onClick(){
		window.location = "/create";
	}
	// The method that mounts everytime there is an action detected
	componentWillMount() {
		this.props.fetchcomp();
	}
	
	componentWillReceiveProps(val) {
		for (let i = 0; i < val.length; i++) {
			this.state.status.push(val.compOBJ[i].status);
		}
	}
	//The method that detects the current status and perform the changes
	changeStatus(status, i) {
		const newCompOBJArr = [ ...this.props.compOBJ ]; //cloning an array of competition
		newCompOBJArr[i].status = !status; //changing the status of a newly cloned array
		console.log('data status',newCompOBJArr[i].status)
		this.props.updateByIDcomp(newCompOBJArr[i], i); //updating the competition status by ID in the back-end
		this.setState({ compOBJ: newCompOBJArr });
	}
	render() {
		const displayCompetitions = (
			<div className="page-contents">
			<table class="table-view-competitions">
				<tbody>
					{this.props.compOBJ.map((compVar, i) => (
						<tr key={compVar.id} className="table-competition-row">
							<td>
								<label class="competition-containers">{compVar.name}</label>
							</td>
							<td>
								<div className={compVar.status ? 'activeButton' : 'inactiveButton'}>
									<button
										type="button"
										class="btn btn-outline-secondary "
										data-toggle="tooltip"
										title={compVar.status ? ('Deactivate '.concat(compVar.name)) : ('Activate '.concat(compVar.name))}
										onClick={() => this.changeStatus(compVar.status, i)}
									>
										<strong>{String(compVar.status ? 'De-activate' : 'Re-activate')}</strong>
										<span class="badge badge-light" />
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			</div>
		);
		return (
			<div className="view-page">
				<div className="view-header">
					<div className="image-comtainer">
						<img
							src={require('../components/assets/back-button-white.png')}
							onClick={this.onClick}
							className="go-back-to-create-page"
							alt=""
						/>
					</div>
					<div>
						<label className="label-create-competitions">Create Competition</label>
					</div>
				</div>
				<div className="table-competition-container">
					<div className="content-competitions">{displayCompetitions}</div>
				</div>
			</div>
		);
	}
}
ViewComp.propTypes = {
	fetchcomp: PropTypes.func.isRequired,
	compOBJ: PropTypes.array.isRequired,
	postOBJ: PropTypes.array.isRequired,
	updateByIDcomp: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
	compOBJ: state.compOBJ.allComps,
	newcompOBJ: state.compOBJ.selectedComp,
	updatedComp: state.compOBJ.updatedComp
});
export default connect(mapStateToProps, { fetchcomp, updateByIDcomp })(ViewComp);
