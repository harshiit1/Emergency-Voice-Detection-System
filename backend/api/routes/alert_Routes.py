from fastapi import APIRouter, HTTPException
from schemas.emergency_schema import IEmergencyModel
from models.alert_model import insert_emergency_alert, get_emergency_details, update_emergency_status, get_pending_emergency_details

router = APIRouter(prefix="/api/emergency", tags=["Emergency"])

@router.post("/AddEmergencyAlert")
def create_alert(data: IEmergencyModel):
    try:
        return insert_emergency_alert(data)
    except Exception as e:
        raise HTTPException(400, str(e))


@router.get("/GetEmergencyAlerts")
def list_alerts():
    return get_emergency_details()



@router.patch("/UpdateEmergencyStatus/{AlertId}")
def update_alert(AlertId: int, Status: str):
    try:
        result = update_emergency_status(AlertId, Status)

        if not result:
            raise HTTPException(404, detail="Alert ID not found in database")

        return {
            "id": result[0],
            "status": result[1]
        }
    except Exception as e:
        raise HTTPException(400, str(e))



@router.get("/GetPendingEmergencyAlerts")
def list_pending_alerts():
    try:
        data = get_pending_emergency_details()
        return data 
    except Exception as e:
        raise HTTPException(400, str(e))
