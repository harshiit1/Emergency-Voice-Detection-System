from fastapi import APIRouter, HTTPException
from schemas.emergency_schema import IEmergencyModel
from services.alert_services import create_emergency
from models.alert_model import get_emergency_details, update_emergency_status

router = APIRouter(prefix="/api/emergency", tags=["Emergency"])

@router.post("/AddEmergencyAlert")
def create_alert(data: IEmergencyModel):
    try:
        return create_emergency(data)
    except Exception as e:
        raise HTTPException(400, str(e))


@router.get("/GetEmergencyAlerts")
def list_alerts():
    return get_emergency_details()


@router.patch("UpdateEmergencyStatus/{id}")
def update_alert(AlertId: int, Status: str):
    result = update_emergency_status(AlertId, Status)

    if not result:
        raise HTTPException(404, "Emergency not found")

    return {
        "id": result[0],
        "status": result[1]
    }