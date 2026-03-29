from models.alert_model import insert_emergency_alert

def create_emergency(data):
    result = insert_emergency_alert(data)

    return {
        "ResponseId": result[0],
        "Status": result[1],
        "CreatedOn": result[2],
    }