import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
function ReviewComments() {
  const { token } = useContext(AuthContext);
  const { reviewId } = useParams();
  const [comments, setComments] = useState([]);
  const [review, setReview] = useState([]);
  // const [review, setReview] = useState(null);
  const reviewIdInt = parseInt(reviewId, 10);

  // console.log(token, "Token");

  async function getReviewComments() {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/reviews/${reviewIdInt}/comments`
    );
    if (response.ok) {
      const data = await response.json();
      setComments(data);
    }
  }
  console.log(comments, "this is comments");

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

  useEffect(() => {
    getReviewComments();
    getReview();
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

      {/* <p>This is a review comments page</p> */}
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ReviewComments;
