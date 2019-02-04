import React, { Component } from "react";
import API from "../../utils/API";

export default class EntryComp extends Component {
  state = {
    voteCount: this.props.data.voteCount
  };

  componentDidMount = () => {
    console.log("component did Mount");
    this.handleVoteCount(this.props.data._id);
  };
  handleVoteCount = id => {
    API.getEntry(id).then(res =>
      this.setState({ voteCount: res.data.voteCount }, () =>
        console.log("this.state.voteCount: ", this.state.voteCount)
      )
    );
  };

  handleUpVote = id => {
    console.log("Up Vote Clicked, id is:", id);
    API.getEntry(id).then(res => {
      let currentVoteCount = res.data.voteCount + 1;
      this.setState({
        voteCount: currentVoteCount
      });
      API.updateEntry(id, { $set: { voteCount: currentVoteCount } });
    });
  };

  handleDownVote = id => {
    console.log("Down Vote Clicked, id is: ", id);
    API.getEntry(id).then(res => {
      let currentVoteCount = res.data.voteCount - 1;
      this.setState({
        voteCount: currentVoteCount
      });

      console.log(currentVoteCount);
      API.updateEntry(id, { $set: { voteCount: currentVoteCount } });
    });
  };

  render() {
    console.log("props ", this.props);
    const { content, _id } = this.props.data;
    const { entryClicked } = this.props;
    return (
      <div key={_id} className="row my-2 p-2 bg-white border ">
        <div className="col-md-12 text-justify-right" id="nextEntries">
          <span className="pointerGuy" onClick={_id => entryClicked(_id)}>
            {content}
          </span>
          <span className="align-middle float-right px-2 ">
            <i
              className="fas fa-angle-down px-1 pointerGuy"
              onClick={() => this.handleDownVote(_id)}
            />
            <i
              className="fas fa-angle-up  px-1 pointerGuy"
              onClick={() => this.handleUpVote(_id)}
            />
            <div className="mx-auto text-center">{this.state.voteCount}</div>
          </span>
        </div>
      </div>
    );
  }
}
