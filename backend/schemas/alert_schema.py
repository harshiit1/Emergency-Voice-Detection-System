from datetime import datetime

class IAlterModel:
    AlertId: int
    AlterTime: str
    AlertStatus: str
    Description: str | None = None
    Latitude: float | None = None
    Longitude: float | None = None
    CreatedAt: datetime 
    UpdatedAt: datetime | None = None
    ResolvedBy: int | None = None