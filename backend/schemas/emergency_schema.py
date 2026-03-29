from pydantic import BaseModel
from datetime import datetime
from typing import Literal

class IEmergencyModel(BaseModel):
    EventId: int
    UserId: int
    Latitude: float
    Longitude: float
    Status: Literal["PENDING" ,"RECEIVED", "ASSIGNED"]
    CreatedOn: datetime
    ModifiedOn: datetime | None = None