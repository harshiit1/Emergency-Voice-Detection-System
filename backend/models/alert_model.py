from core.db import get_connection

def insert_emergency_alert(data):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO EmergencyEventMaster (
                EventId, 
                UserId, 
                Latitude, 
                Longitude, 
                Status,
                CreatedOn,
                ModifiedOn
            )
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        RETURNING UserId, Status, CreatedOn;
    """, (data.EventId,data.UserId, data.Latitude, data.Longitude, data.Status, data.CreatedOn, data.ModifiedOn))

    result = cur.fetchone()
    conn.commit()

    cur.close()
    conn.close()

    return result


def get_emergency_details():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("SELECT * FROM EmergencyEventMaster ORDER BY CreatedOn DESC;")
    data = cur.fetchall()

    cur.close()
    conn.close()

    return data


def update_emergency_status(AlertId, Status):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        UPDATE EmergencyEventMaster
        SET Status=%s
        WHERE AlertId=%s
        RETURNING UserId, Status;
    """, (Status, AlertId))

    result = cur.fetchone()
    conn.commit()

    cur.close()
    conn.close()

    return result