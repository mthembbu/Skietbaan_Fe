import React, { Component } from 'react';
import '../scss/create-page.css';
class CreatePage extends Component {
	render() {
		return (
			<div>
				<div className="view-header">
					<div>
						<label className="create-menu-header">Create</label>
					</div>
				</div>
				<div class="container centre create-page-centre m-4 p-4">
					<div class="row mb-1 pb-1">
						<div class="col col-sm-6 col-xm-6">
							<a href="/create-comp" class="btn create-btn-c" role="button">
								<label class="btn-create-text">Competitions</label>
							</a>
						</div>
						<div class="col col-sm-6 col-xm-6">
							<a href="/view-comp" class="btn btn-outline-secondary btn-view" role="button">
								<label class="create-view-text">View </label>
							</a>
						</div>
					</div>
					<div class="row mb-1 pb-1">
						<div class="col col-sm-6 col-xm-6">
							<a href="/registermember" class="btn btn-create-m" role="button">
								<label class="btn-create-text">Members</label>
							</a>
						</div>
						<div class="col col-sm-6 col-xm-6">
							<a href="/viewmembers" class="btn btn-outline-secondary btn-view" role="button">
								<label class="create-view-text">View </label>
							</a>
						</div>
					</div>
					<div class="row mb-1 pb-1">
						<div class="col col-sm-6 col-xm-6">
							<a href="/create-comp" class="btn btn-create-gr" role="button">
								<label class="btn-create-text">Groups</label>
							</a>
						</div>
						<div class="col col-sm-6 col-xm-6">
							<a class="btn btn-outline-secondary btn-view" href="#" role="button">
								<label class="create-view-text">View </label>
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default CreatePage;
