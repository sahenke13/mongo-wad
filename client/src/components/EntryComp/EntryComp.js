import React, { Component } from "react";
import API from "../../utils/API";

export default class EntryComp extends Component {
  state = {
    voteCount: null
  };

  componentDidMount = () => {
    console.log("component did Mount");
    this.handleVoteCount(this.props.id);
  };
  handleVoteCount = id => {
    API.getEntry(id).then(res =>
      this.setState({ voteCount: res.data.voteCount })
    );
  };

  handleUpVote = id => {
    API.getEntry(id).then(res => {
      let currentVoteCount = res.data.voteCount + 1;
      this.setState({
        voteCount: currentVoteCount
      });
      API.updateEntry(id, { $set: { voteCount: currentVoteCount } });
    });
  };

  handleDownVote = id => {
    API.getEntry(id).then(res => {
      let currentVoteCount = res.data.voteCount - 1;
      this.setState({
        voteCount: currentVoteCount
      });
      API.updateEntry(id, { $set: { voteCount: currentVoteCount } });
    });
  };

  render() {
    const { content, id, entryClicked, handleSorting } = this.props;

    return (
      <div key={id} className="row my-2 p-2 bg-white border ">
        <div className="col-md-12 text-justify-right" id="nextEntries">
          <span className="pointerGuy" onClick={id => entryClicked(id)}>
            {content}
          </span>
          <span className="align-middle float-right px-2 ">
            <i
              className="fas fa-angle-down px-1 pointerGuy"
              onClick={() => {
                handleSorting();
                this.handleDownVote(id);
              }}
            />
            <i
              className="fas fa-angle-up  px-1 pointerGuy"
              onClick={() => {
                handleSorting();
                this.handleUpVote(id);
              }}
            />
            <div className="mx-auto text-center">{this.state.voteCount}</div>
          </span>
        </div>
      </div>
    );
  }
}
