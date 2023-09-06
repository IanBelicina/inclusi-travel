from fastapi.testclient import TestClient
from main import app
from queries.comments import CommentRepository

client = TestClient(app)


class EmptyCommentRepository:
    def get_all_review_comments(self, review_id: int):
        return []


def test_get_all_review_comments():
    review_id = 1
    app.dependency_overrides[CommentRepository] = EmptyCommentRepository

    response = client.get(f"/reviews/{review_id}/comments")

    app.dependency_overrides = {}

    assert response.status_code == 404
    assert response.json() == {
        "detail": f"No comments found for review id {review_id}"
    }
