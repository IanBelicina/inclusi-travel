from fastapi.testclient import TestClient
from main import app
from queries.accessibility import AcessibilityQueries

client = TestClient(app)


class EmptyAccessibilityQueries:
    def get_all_accessibilities(self):
        return []


def test_get_all_accessibilities():
    app.dependency_overrides[AcessibilityQueries] = EmptyAccessibilityQueries

    response = client.get("/api/acessibility")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == {"accessibilities": []}
