from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import comments, accounts, accessibility, reviews
import os
from routers import locations
from authenticator import authenticator

app = FastAPI()
app.include_router(comments.router)
app.include_router(accounts.router)
app.include_router(accessibility.router)
app.include_router(reviews.router)
app.include_router(locations.router)
app.include_router(authenticator.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "You hit the root path!"}


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00"
        }
    }
