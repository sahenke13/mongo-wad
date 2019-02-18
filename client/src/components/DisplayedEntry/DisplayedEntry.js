import React, { Component } from "react";
import "./DisplayEntry.css";
import NewEntryModal from "../NewEntry";
import API from "../../utils/API";
import YourStory from "../YourStory";
import StoryHeader from "../StoryHeader";
import StartingEntries from "../StartingEntries";
import CurrentEntry from "../CurrentEntry";
import NextEntryArray from "../NextEntryArray";

export default class DisplayedEntry extends Component {
	state = {
		yourStory: [],
		storyInfo: [],
		currentEntry: "",
		firstEntriesArray: [],
		previousEntryId: null,
		currentId: "",
		newEntryContent: "",
		nextEntriesArray: []
	};

	componentDidMount = () => {
		this.handleFindStory(this.props.id);
	};

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};
	// maybe do something like this but instead of passing id thru pass thru nextEntryArray in params??
	handleFindStory = id => {
		API.getStory(id)
			.then(res => {
				this.setState(() => {
					return { storyInfo: res.data };
				});
			})
			.catch(err => console.log("this is an error", err));

		API.displayRootEntries(id).then(res => {
			this.setState({
				firstEntriesArray: res.data
			});
		});
	};

	//need to set voteCount to 0?? grab votes??
	handleNewEntrySubmit = () => {
		let EntryId = this.state.currentId ? this.state.currentId : null;
		API.saveEntry({
			storyId: this.state.storyInfo._id,
			content: this.state.newEntryContent,
			previousEntryId: EntryId,
			voteCount: 0
		})
			.then(res => {
				let prevId = res.data.previousEntryId;
				let curEntry = res.data;
				let curId = res.data._id;

				API.updateEntry(prevId, {
					$push: {
						nextEntryArray: curId
					}
				});

				let yourStoryArray = [...this.state.yourStory, curEntry];

				this.setState({
					currentEntry: curEntry,
					previousEntryId: prevId,
					currentId: curId,
					yourStory: yourStoryArray,
					newEntryContent: ""
				});
			})
			.catch(err => console.log("this is an error", err));
	};

	handleEntryClicked = id => {
		this.setState({ currentId: id, nextEntriesArray: [] }, () => {
			this.handleUpdateCurrentEntry(id);
		});
	};

	displayNextEntries = nextEntryArray => {
		API.displayNextEntries(nextEntryArray).then(res => {
			let nextEntries = res.data;

			this.setState({
				nextEntriesArray: nextEntries
			});
		});
	};

	handleUpdateCurrentEntry = id => {
		API.displayEntry(id)
			.then(res => {
				let selectedSegment = res.data;
				let yourStoryArray = [...this.state.yourStory, selectedSegment];
				this.setState(() => {
					return {
						currentEntry: res.data,
						previousEntryId: res.data.previousEntryId,
						yourStory: yourStoryArray
					};
				});
				this.displayNextEntries(res.data.nextEntryArray);
			})
			.catch(err => console.log("this is an error", err));
	};

	handleBackButtonUpdateCurrentEntry = id => {
		let yourStoryArray = [...this.state.yourStory];
		API.displayEntry(id).then(res => {
			let item = res.data;
			this.setState({
				currentEntry: item,
				previousEntryId: item.previousEntryId,
				yourStory: yourStoryArray
			});
			this.displayNextEntries(res.data.nextEntryArray);
		});
	};

	handleBackButtonClicked = () => {
		let yourStoryArray = this.state.yourStory;
		yourStoryArray.pop();

		yourStoryArray.length === 0
			? this.setState(
					{
						currentId: "",
						nextEntriesArray: [],
						currentEntry: ""
					},
					() => {
						this.handleFindStory(this.props.id);
					}
			  )
			: this.setState(
					{
						yourStory: yourStoryArray,
						currentId: this.state.previousEntryId
					},

					() => {
						this.handleBackButtonUpdateCurrentEntry(this.state.previousEntryId);
					}
			  );
	};
	refreshSorting = () => {
		console.log("handleSorting Clicked");
		let nextEntryIdArray = this.state.currentEntry.nextEntryArray;
		API.displayNextEntries(nextEntryIdArray).then(res => {
			let nextEntries = res.data;
			this.setState({
				nextEntriesArray: nextEntries
			});
		});
	};
	render() {
		const { title, genre, description } = this.state.storyInfo;
		const {
			firstEntriesArray,
			currentEntry,
			yourStory,
			currentId,
			nextEntriesArray
		} = this.state;

		return (
			<div className="container" id="displayContainer">
				{/* <StoryHeader title={title} genre={genre} description={description} /> */}
				<StoryHeader title={title} genre={genre} description={description} />
				<div className="row">
					{this.state.currentId === "" ? (
						<div className="col-lg-6 m-1">
							<StartingEntries
								firstEntriesArray={firstEntriesArray}
								entryClicked={id => this.handleEntryClicked(id)}
							/>
						</div>
					) : (
						<div className="col-lg-6 m-2">
							<CurrentEntry
								content={currentEntry.content}
								backButton={this.handleBackButtonClicked}
							/>
						</div>
					)}
					{/* add your story information below. Probably through a component that
           we pass props to. */}
					<div className="col-lg-5 m-2">
						<YourStory stories={yourStory} />
					</div>
					<div className="container">
						{/* does this.state.currentEntry.nextEntryArray exist? */}

						<NextEntryArray
							nextEntriesArray={nextEntriesArray}
							nextEntryClicked={id => this.handleEntryClicked(id)}
							currentId={currentId}
							sortEntry={() => this.refreshSorting()}
						/>
					</div>
				</div>

				<div className="row" id="btnGuy">
					<div className="col-md-12">
						<button
							type="button"
							className="btn text-white submitGuy my-2"
							data-toggle="modal"
							data-target="#entryModal"
						>
							New Entry
						</button>
					</div>
				</div>

				<NewEntryModal
					newEntryContent={this.state.newEntryContent}
					handleInputChange={this.handleInputChange}
					newEntrySubmit={this.handleNewEntrySubmit}
				/>
			</div>
		);
	}
}
