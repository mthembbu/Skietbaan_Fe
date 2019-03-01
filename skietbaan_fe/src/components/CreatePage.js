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
								<h4 className="create-menu-header">Create</h4>
							</p>
						</div>
					</div>
				</div>
				<div class="container centre create-page-centre m-4 p-4">
					<div class="row mb-1 pb-1">
						<div class="col col-sm-6 col-xm-6">
							<a href="/create-comp" class="btn btn-create" role="button">
								<p class="btn-create-text">Competitions</p>
							</a>
						</div>
						<div class="col col-sm-6 col-xm-6">
							<a href="/view-comp" class="btn btn-outline-secondary btn-view" role="button">
								<p class="create-view-text">View </p>
							</a>
						</div>
					</div>
					<div class="row mb-1 pb-1">
						<div class="col col-sm-6 col-xm-6">
							<a href="/registermember" class="btn btn-create-m" role="button">
								<p class="btn-create-text">Members</p>
							</a>
						</div>
						<div class="col col-sm-6 col-xm-6">
							<a href="/viewmembers" class="btn btn-outline-secondary btn-view" role="button">
								<p class="create-view-text">View </p>
							</a>
						</div>
					</div>
					<div class="row mb-1 pb-1">
						<div class="col col-sm-6 col-xm-6">
							<a href="/create-comp" class="btn btn-create-gr" role="button">
								<p class="btn-create-text">Groups</p>
							</a>
						</div>
						<div class="col col-sm-6 col-xm-6">
							<a class="btn btn-outline-secondary btn-view" href="#" role="button">
								<p class="create-view-text">View </p>
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default CreatePage;
