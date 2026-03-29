import { getCurrentLocation } from "./locationService";

const BASE_URL = "http://192.168.1.11:8000/api";
export const uploadAudioForTranscription = async (audioUri: any) => {
  const formData = new FormData();

  formData.append("file", {
    uri: audioUri,
    name: "recording.wav",
    type: "audio/wav",
  } as any);

  const response = await fetch(`${BASE_URL}/VoiceTranscribe/transcribe`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data;
};

export const handleEmergency = async (transcript: string) => {
  const location = await getCurrentLocation();
  const now = new Date().toISOString();
  const uniqueId = Math.floor(Math.random() * 900) + 100;
  const alertId = Math.floor(Math.random() * 900) + 100;

  const payload = {
    AlertId: alertId,
    UserId: uniqueId,
    Transcript: transcript,
    Latitude: location.latitude,
    Longitude: location.longitude,
    Status: "PENDING",
    CreatedOn: now,
    ModifiedOn: now,
  };
  console.log(payload);
  await fetch(`${BASE_URL}/emergency/AddEmergencyAlert`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

export const getPendingRequests = async () => {
  try {
    const res = await fetch(`${BASE_URL}/emergency/GetPendingEmergencyAlerts`);
    const data = await res.json();
    return data.map((item: any) => ({
      ResponseId: item.AlertId || item.ResponseId || 0,
      Status: item.Status,
      CreatedOn: item.CreatedOn,
      Latitude: item.Latitude,
      Longitude: item.Longitude,
      MapsURL: item.MapsURL,
      Transcript: item.Transcript || "Emergency Alert",
    }));
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const updateEmergencyRequestStatus = async (id: number) => {
  const res = await fetch(
    `${BASE_URL}/emergency/UpdateEmergencyStatus/${id}?Status=ACCEPTED`,
    {
      method: "PATCH",
    },
  );

  if (!res.ok) {
    console.error("Update failed with status:", res.status);
  }
  return res.ok;
};
