from fastapi import APIRouter, Depends, HTTPException
from typing import Optional
from psycopg.errors import ForeignKeyViolation
from queries.locations import LocationsOut, LocationQueries, LocationsIn ,LocationAccessibilityList, LocationListOut, AccessibilityListOut

router = APIRouter()


@router.get("/api/locations/", response_model =LocationListOut)
def get_locations(
    queries: LocationQueries = Depends()
):
    return {"locations": queries.get_all_locations()}

@router.post("/api/locations/", response_model = LocationsOut)
def create_location(
    location: LocationsIn,
    queries: LocationQueries = Depends(),
):
    try:
        return queries.create_location(location)
    except ForeignKeyViolation as e:
        raise HTTPException(status_code=400)

@router.delete("/api/locations/{location_id}/", response_model =bool)
def delete_location(
    location_id: int,
    queries: LocationQueries = Depends()
):
    queries.delete_location(location_id)
    return True

@router.get("/api/locations/{location_id}", response_model = LocationsOut)
def get_location(
    location_id:int,
    queries: LocationQueries = Depends()
):
    record = queries.get_a_location(location_id)
    if record is None:
        raise HTTPException(status_code=404, detail="No location found with id {}".format(location_id))
    else:
        return record

@router.put("/api/locations/{location_id}", response_model = LocationsOut)
def update_location(
    location_id: int,
    location: LocationsIn,
    queries: LocationQueries = Depends()
):
    record = queries.update_a_location(id = location_id, data = location)
    return record

@router.get("/api/locations/{location_id}/accessibilities", response_model=AccessibilityListOut)
def get_location_accessibilities(
    location_id: int,
    queries: LocationQueries = Depends(),
):
    accessibilities = queries.get_location_accessibilities(location_id)
    return {"accessibilities": accessibilities}

@router.post("/api/locations/{location_id}/accessibilities/{accessibility_id}", response_model=bool)
def associate_location_accessibility(
    location_id: int,
    accessibility_id: int,
    queries: LocationQueries = Depends(),
):
    queries.associate_location_accessibility(location_id, accessibility_id)
    return True
