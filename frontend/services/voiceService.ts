import { Audio } from "expo-av";

let recordingInstance:any = null;

export const startRecording = async () => {
  try {
    // Ask mic permission
    const permission = await Audio.requestPermissionsAsync();

    if (!permission.granted) {
      throw new Error("Microphone permission denied");
    }

    // Configure audio mode
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
    });

    // Start recording
    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    );

    recordingInstance = recording;

    console.log("🎤 Recording started");
  } catch (error) {
    console.log("Start recording error:", error);
  }
};

export const stopRecording = async () => {
  try {
    if (!recordingInstance) {
      throw new Error("No active recording");
    }

    await recordingInstance.stopAndUnloadAsync();

    const uri = recordingInstance.getURI();

    console.log("🛑 Recording stopped:", uri);

    recordingInstance = null;

    return uri;
  } catch (error) {
    console.log("Stop recording error:", error);
    return null;
  }
};