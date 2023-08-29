from fastapi.testclient import TestClient
from main import app
from queries.reviews import ReviewQueries

client = TestClient(app)

class EmptyReviewQueries:
    def get_all_reviews(self):
        return []


def test_get_reviews():
    #Arrange 
    app.dependency_overrides[ReviewQueries] = EmptyReviewQueries

    #ACT
    response = client.get("/api/reviews")
    app.dependency_overrides = {}

    #ASSERT
    #my get_reviews router throws a 404 error if there are no reviews
    assert response.status_code == 404
    assert response.json() == {'detail': 'No reviews found'}

