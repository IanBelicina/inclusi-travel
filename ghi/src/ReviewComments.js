import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";

function ReviewComments({ reviewIdInt }) {
  const { token } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [userData, setUserData] = useState({});

  async function getReviewComments() {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/reviews/${reviewIdInt}/comments`
    );
    if (response.ok) {
      const data = await response.json();
      setComments(data);
    }
  }

  async function handleDeleteComment(commentId) {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
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
    }
  }

  const handleCommentCreation = async (e) => {
    e.preventDefault();

    const commentData = {};

    commentData.account_id = userData.account.id;
    commentData.review_id = reviewIdInt;
    commentData.content = content;

    commentData.created_on = new Date().toISOString().slice(0, 10);

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
      getReviewComments();
    }
  };

  async function getUserData() {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/token`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setUserData(data);
    }
  }

  useEffect(() => {
    getReviewComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <>
      <div className="card text-bg-light mb-3">
        <div className="card-body">
          <form onSubmit={(e) => handleCommentCreation(e)}>
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

      <div>
        {comments.map((comment) => {
          return (
            <div key={comment.id}>
              <div>{comment.content}</div>
              <div>{comment.created_on}</div>
              <div>
                {comment.account_id === userData?.account?.id && (
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ReviewComments;
