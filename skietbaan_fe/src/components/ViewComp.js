import React, { Component } from 'react';
import { fetchcomp, 
		updateByIdComp,
		 fetchParticipants 
	} from '../actions/competition.action';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../scss/view-comp.css';
import history from "./history";
class ViewComp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allcomps: [],
			status: [],
			updatedComp: {},
			participants: [],
			dict: {}
		};
		this.changeStatus = this.changeStatus.bind(this);
		this.onClick = this.onClick.bind(this);
	}
	onClick() {
		history.push("/create")
	}
	// The method that mounts everytime there is an action detected
	componentDidMount() {
		this.props.fetchcomp();
		this.props.fetchParticipants();
	}
	componentWillReceiveProps(val) {
		for (let i = 0; i < val.length; i++) {
			this.state.status.push(val.compOBJ[i].status);
			if (i == this.state.dict.Id) {
				this.state.dict.push(val.compOBJ[i].dict);
			}
		}
	}
	//The method that detects the current status and perform the changes
	changeStatus(status, i) {
		const newCompOBJArr = [ ...this.props.compOBJ ]; //cloning an array of competition
		newCompOBJArr[i].status = !status; //changing the status of a newly cloned array
		this.props.updateByIdComp(newCompOBJArr[i], i + 1); //updating the competition status by ID in the back-end
		const newDict = {...this.props.dict};
		this.setState({ compOBJ: newCompOBJArr });
		this.setState({dict:newDict});	
	}
	render() {
		
		const displayCompetitions = (
			<div className="page-contents">
				<table class="table-view-competitions">
					<tbody>
						{this.props.compOBJ.map((compVar, i) => (
							<tr key={compVar.id} className="table-competition-row">
								<td className="td-col">
									<label class="competition-containers">{compVar.name} {/**1st Character to Uppercase*/}</label>
								</td>
								<td className="td-col">
									<label class="users-per-comp">
										{compVar.status==true ? (
											<i class=" fa fa-group">
												<span class="user-per-comp-num"> {this.props.dict[compVar.id]}</span>
											</i>
										) : (
											null
										)}
									</label>
								</td>
								<td className="td-col">
									<div className={compVar.status ? 'activeButton' : 'inactiveButton'}>
										<button
											type="button"
											class="btn btn-outline-secondary "
											data-toggle="tooltip"
											title={
												compVar.status ? (
													'Deactivate '.concat(compVar.name)
												) : (
													'Activate '.concat(compVar.name)
												)
											}
											onClick={() => this.changeStatus(compVar.status, i)}
										>
											{String(compVar.status ? 'De-activate' : 'Activate')}
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
				
				<div className="table-competition-container">
					<div className="content-competitions">{displayCompetitions}</div>
				</div>
			</div>
		);
	}
}
ViewComp.propTypes = {
	fetchcomp: PropTypes.func.isRequired,
	fetchParticipants: PropTypes.func.isRequired,
	compOBJ: PropTypes.array.isRequired,
	postOBJ: PropTypes.array.isRequired,
	updateByIdComp: PropTypes.func.isRequired,
	dict: PropTypes.shape({
		Id: PropTypes.arrayOf(PropTypes.number),
		count: PropTypes.arrayOf(PropTypes.number)
	})
};
const mapStateToProps = (state) => ({
	compOBJ: state.compOBJ.allComps,
	newcompOBJ: state.compOBJ.selectedComp,
	updatedComp: state.compOBJ.updatedComp,
	dict: state.compOBJ.dict
});
export default connect(mapStateToProps, { fetchcomp, updateByIdComp, fetchParticipants })(ViewComp);
