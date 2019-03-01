import React, { Component } from 'react';
import '../scss/create-page.css';
class CreatePage extends Component {
	render() {
		return (
			<div>
				<div class="container ">
					<div class="row create-menu">
						<div class="col-12">
							<p align="centre">
								<label className="create-menu-header">Create</label>
							</p>
						</div>
					</div>
				</div>
				<div class="container centre create-page-centre m-4 p-4">
					<div class="row mb-1 pb-1">
						<div class="col col-sm-6 col-xm-6">
							<a href="/create-comp" class="btn btn-create" role="button">
								<label className="color-create-red" class="btn-create-text">Competitions</label>
							</a>
						</div>
						<div class="col col-sm-6 col-xm-6">
							<a href="/view-comp" class="btn btn-outline-secondary btn-view" role="button">
								<label className="color-create-red" class="create-view-text">View </label>
							</a>
						</div>
					</div>
					<div class="row mb-1 pb-1">
						<div class="col col-sm-6 col-xm-6">
							<a href="/registermember" class="btn btn-create-m" role="button">
								<label className="color-create-red" class="btn-create-text">Members</label>
							</a>
						</div>
						<div class="col col-sm-6 col-xm-6">
							<a href="/viewmembers" class="btn btn-outline-secondary btn-view" role="button">
								<label className="color-create-red" class="create-view-text">View </label>
							</a>
						</div>
					</div>
					<div class="row mb-1 pb-1">
						<div class="col col-sm-6 col-xm-6">
							<a href="/create-comp" class="btn btn-create-gr" role="button">
								<label className="color-create-red" class="btn-create-text">Groups</label>
							</a>
						</div>
						<div class="col col-sm-6 col-xm-6">
							<a class="btn btn-outline-secondary btn-view" href="#" role="button">
								<label className="color-create-red" class="create-view-text">View </label>
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default CreatePage;
