from models.alert_model import insert_emergency_alert
from services.maps_services import generate_maps_link

def create_emergency(data):
    mapsURL = generate_maps_link(data.Latitude, data.Longitude)
    result = insert_emergency_alert(data)

    return {
        "ResponseId": result[0],
        "Status": result[1],
        "CreatedOn": result[2],
        "MapsURL": mapsURL
    }