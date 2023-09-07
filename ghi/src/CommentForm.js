import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";

const CommentForm = () => {
  const [accountId, setAccountId] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [content, setContent] = useState("");
  const [createdOn, setCreatedOn] = useState("");
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const handleCommentCreation = async (e) => {
    e.preventDefault();

    const commentData = {};

    commentData.account_id = accountId;
    commentData.review_id = reviewId;
    commentData.content = content;
    commentData.created_on = createdOn;

    const url = `${process.env.REACT_APP_API_HOST}/reviews/comments`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, fetchConfig);

    if (response.ok) {
      e.target.reset();
      navigate("/");
    }
  };
  return (
    <div className="card text-bg-light mb-3">
      <h5 className="card-header">New Comment</h5>
      <div className="card-body">
        <form onSubmit={(e) => handleCommentCreation(e)}>
          <div className="mb-3">
            <label className="form-label">Account ID</label>
            <input
              name="accountid"
              type="number"
              className="form-control"
              onChange={(e) => {
                setAccountId(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Review ID</label>
            <input
              name="reviewid"
              type="number"
              className="form-control"
              onChange={(e) => {
                setReviewId(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Content</label>
            <input
              name="content"
              type="text"
              className="form-control"
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Created On</label>
            <input
              name="createdon"
              type="date"
              className="form-control"
              onChange={(e) => {
                setCreatedOn(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              className="btn btn-primary"
              type="submit"
              value="Create Comment"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;
