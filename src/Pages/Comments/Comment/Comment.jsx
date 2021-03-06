import React from "react";
import { observer } from "mobx-react";
import AddComment from "../AddComments/AddComment";
import DeleteComment from "../DeleteComments/DeleteComment";
import EditComment from "../EditComments/EditComment";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.id;
    props.stores.comments.setId(this.props.id);
  }
  render() {
    const stores = this.props.stores;
    const id = this.props.id;
    return (
      <>
        {stores.delete.deleteAction && (
          <div className="DeleteConfirmationWrapper">
            <div className="DeleteConfirmationComponents">
              <label>Are you sure that you want to delete comment?</label>
              <div className="DeleteConfirmationButtons">
                <button
                  onClick={() => stores.delete.setDelete(stores.delete.id)}
                >
                  Yes
                </button>
                <button onClick={() => stores.delete.setDeleteAction(false)}>
                  No
                </button>
              </div>
            </div>
          </div>
        )}
        <div
          className="CommentCoinName"
          style={
            stores.comments.coinName ? undefined : { visibility: "hidden" }
          }
        >
          {stores.comments.coinName ? stores.comments.coinName : "blank"}
        </div>
        <div className="CommentButtonWrapper">
          <AddComment id={id} add={stores.add} page={stores.page} />
          <div className="CoinCommentChoice">
            <button className="CoinCommentChoiceButton">Change coin</button>
            <div className="CoinCommentChoiceContent">
              {stores.comments.coinNames.map(
                (item, i) =>
                  item.name !== stores.comments.coinName && (
                    <a key={i} href={item.id}>
                      {item.name}
                    </a>
                  )
              )}
            </div>
          </div>
        </div>

        <div className="CommentWrapper">
          {!stores.edit.editCommentId && stores.comments.pageComments
            ? stores.comments.pageComments.map((item, i) => (
                <div key={i} className="EachComment">
                  <div>user</div>
                  <div>Comment</div>
                  <div className="CommentTimestamp">{item.createdAt}</div>
                  <div className="CommentContent">{item.comment}</div>
                  <DeleteComment id={item.id} delete={stores.delete} />
                  <EditComment id={item.id} edit={stores.edit} />
                </div>
              ))
            : stores.comments.pageComments &&
              stores.comments.pageComments.map((item, i) =>
                item.id !== stores.edit.editCommentId ? (
                  <div key={i} className="EachComment">
                    <div>user</div>
                    <div>Comment</div>
                    <div className="CommentTimestamp">{item.createdAt}</div>
                    <div className="CommentContent">{item.comment}</div>
                    <DeleteComment id={item.id} delete={stores.delete} />
                    <EditComment id={item.id} edit={stores.edit} />
                  </div>
                ) : (
                  <div key={i} className="EachComment">
                    <div>user</div>
                    <div>Comment</div>
                    <div className="CommentTimestamp">{item.createdAt}</div>
                    <textarea
                      style={{ resize: "none", height: "50px" }}
                      maxLength={255}
                      onChange={(e) => stores.edit.setEdit(e.target.value)}
                      defaultValue={item.comment}
                    ></textarea>
                    <button
                      className="DeleteComment"
                      onClick={() => stores.edit.setEditCommentId("")}
                    >
                      Cancel
                    </button>
                    <button
                      className="EditComment"
                      onClick={() => {
                        stores.edit.setHandleEdit(item.id);
                        stores.edit.setEditCommentId("");
                      }}
                    >
                      confirm
                    </button>
                  </div>
                )
              )}
        </div>
      </>
    );
  }
}
export default observer(Comment);
