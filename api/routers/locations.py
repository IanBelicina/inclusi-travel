from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from typing import Optional
from psycopg.errors import ForeignKeyViolation
from queries.locations import LocationsOut, LocationQueries, LocationsIn

router = APIRouter()


@router.get("/api/locations/", response_model = LocationsOut)
def get_location(
    queries: LocationQueries = Depends()
):
    return {"locations": queries.get_locations()}

@router.post("/api/locations/", response_model = LocationsOut)
def create_location(
    location: LocationsIn,
    queries: LocationQueries = Depends(),
):
    try:
        return queries.create_location(location)
    except ForeignKeyViolation as e:
        raise HTTPException(status_code=400)
