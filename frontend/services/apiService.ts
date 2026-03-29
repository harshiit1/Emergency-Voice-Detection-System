import { getCurrentLocation } from "./locationService";

export const uploadAudioForTranscription = async (audioUri: any) => {
  const formData = new FormData();

  formData.append("file", {
    uri: audioUri,
    name: "recording.wav",
    type: "audio/wav",
  } as any);

  const response = await fetch(
    `http://192.168.1.9:8000/api/VoiceTranscribe/transcribe`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await response.json();
  return data;
};

export const handleEmergency = async (transcript: string) => {
  const location = await getCurrentLocation();
  const now = new Date().toISOString();
  const payload = {
    EventId: 0,
    UserId: 102,
    Transcript: transcript,
    Latitude: location.latitude,
    Longitude: location.longitude,
    Status: "PENDING",
    CreatedOn: now,
    ModifiedOn: now,
  };
  console.log(payload)
  await fetch(`http://192.168.1.9:8000/api/emergency/AddEmergencyAlert`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};
