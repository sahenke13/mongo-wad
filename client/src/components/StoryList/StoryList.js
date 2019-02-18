import React, { Component } from "react";
import API from "../../utils/API";
import Story from "../Story";
import "./StoryList.css";
import { Link } from "react-router-dom";

export default class StoryList extends Component {
	state = {
		stories: []
	};

	componentDidMount() {
		this.loadStories();
	}

	loadStories = () => {
		API.getStories()
			.then(res => {
				this.setState({ stories: res.data });
				console.log(res.data);
			})
			.catch(err => console.log("getStories error", err));
	};

	render() {
		return (
			<div className="container" id="story">
				<div className="storyContainer">
					{this.state.stories.length ? (
						this.state.stories.map(story => {
							const { _id, title, genre } = story;
							return (
								<Link to={`/currentEntry/${_id}`} key={_id}>
									<Story key={_id} title={title} id={_id} genre={genre} />
								</Link>
							);
						})
					) : (
						<h1 className="text-white">No stories (yet). Start writing now!</h1>
					)}
				</div>
			</div>
		);
	}
}
