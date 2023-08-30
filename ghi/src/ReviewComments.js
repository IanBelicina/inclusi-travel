import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";

function ReviewComments() {
  const { token } = useContext(AuthContext);
  const { reviewId } = useParams();
  const [comments, setComments] = useState([]);
  const [review, setReview] = useState([]);
  const reviewIdInt = parseInt(reviewId, 10);
  const [accountId, setAccountId] = useState("");
  const [content, setContent] = useState("");

  // console.log(token, "Token");

  async function getUserData() {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/token`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data, "this is data");
    }
  }

  async function getReviewComments() {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/reviews/${reviewIdInt}/comments`
    );
    if (response.ok) {
      const data = await response.json();
      setComments(data);
    }
  }
  // console.log(comments, "this is comments");

  async function getReview() {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/reviews/${reviewIdInt}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      setReview(data);
    }
  }
  // console.log(review, "review");
  async function handleDeleteComment(commentId) {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/reviews/comments/${commentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      getReviewComments();
      // console.log("comment has been deleted");
    }
  }

  const handleCommentCreation = async (e) => {
    e.preventDefault();

    const commentData = {};

    commentData.account_id = accountId;
    commentData.review_id = reviewId;
    commentData.content = content;

    commentData.created_on = new Date().toISOString().slice(0, 10);
    // console.log(commentData, "comment data object");

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
      // console.log(response, "Response");
      e.target.reset();
      getReviewComments();
    }
  };

  useEffect(() => {
    getReviewComments();
    getReview();
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="card mb-4">
        <div className="card-header">Review</div>
        <div className="card-body">
          <h5 className="card-title">{review.body}</h5>
          {/* <p className="card-text">Author: {review.account_id.username}</p> */}
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Review</th>
            <th>Comment</th>
            <th>Created On</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => {
            return (
              <tr key={comment.id}>
                <td>{comment.review.body}</td>
                <td>{comment.content}</td>
                <td>{comment.created_on}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
    </>
  );
}

export default ReviewComments;
