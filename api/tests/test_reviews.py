from fastapi.testclient import TestClient
from main import app
from queries.reviews import ReviewQueries

client = TestClient(app)


class EmptyReviewQueries:
    def get_all_reviews(self):
        return []


def test_get_reviews():
    app.dependency_overrides[ReviewQueries] = EmptyReviewQueries

    response = client.get("/api/reviews")
    app.dependency_overrides = {}

    assert response.status_code == 404
    assert response.json() == {"detail": "No reviews found"}
