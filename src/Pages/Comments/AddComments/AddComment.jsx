import { observer } from "mobx-react";
import React from "react";
class AddComment extends React.Component {
  render() {
    return (
      <>
        <button
          className="AddCommentButton"
          onClick={() => {
            this.props.add.setToggle();
          }}
        >
          Add Comment
        </button>
        {this.props.add.toggle && (
          <div className="AddCommentWrapper" id={"AddCommentWrapper"}>
            <div className="AddCommentInputs">
              <label>Comment</label>
              <textarea
                maxLength={300}
                id={"AddCommentTextarea"}
                onChange={(e) => this.props.add.setContent(e.target.value)}
              ></textarea>
              <button
                onClick={() => {
                  this.props.add.addComment(this.props.id);
                  this.props.add.setToggle();
                }}
              >
                Add
              </button>
              <button
                className="CloseAddCommentButton"
                onClick={() => this.props.add.setToggle()}
              >
                X
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default observer(AddComment);
