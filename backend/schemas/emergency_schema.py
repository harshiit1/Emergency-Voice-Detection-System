from pydantic import BaseModel
from datetime import datetime
from typing import Literal

class IEmergencyModel(BaseModel):
    AlertId: int
    UserId: int
    Transcript: str
    Latitude: float
    Longitude: float
    Status: Literal["PENDING" ,"ACCEPTED"]
    CreatedOn: datetime
    ModifiedOn: datetime | None = None