import { useCallback, useEffect, useRef } from "react";
import { includes_emergency_keyword } from "@/utils/keyword_detector";
import { startRecording, stopRecording } from "@/services/voiceService";
import {
  handleEmergency,
  uploadAudioForTranscription,
} from "@/services/apiService";
import { getCurrentLocation } from "@/services/locationService";

export const useEmergencyListener = (
  onEmergencyDetected: (text: string) => void,
) => {
  const isListening = useRef(false);
  const isProcessing = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const listenLoop = useCallback(async () => {
    if (!isListening.current || isProcessing.current) return;

    try {
      await startRecording();
      await getCurrentLocation();
      await new Promise((resolve) => {
        timeoutRef.current = setTimeout(resolve, 3000);
      });

      const uri = await stopRecording();

      if (isListening.current) {
        listenLoop();
      }

      isProcessing.current = false;

      if (uri) {
        const result = await uploadAudioForTranscription(uri);

        if (result?.text && includes_emergency_keyword(result.text)) {
          console.log("🚨 EMERGENCY DETECTED:", result.text);
          handleEmergency(result.text);
          onEmergencyDetected(result.text);
        }
      }
    } catch (ex) {
      console.error("Listening loop error:", ex);
      isProcessing.current = false;
      setTimeout(() => {
        if (isListening.current) listenLoop();
      }, 2000);
    }
  }, [onEmergencyDetected]);

  const startContinuousListening = () => {
    if (isListening.current) return;
    isListening.current = true;
    listenLoop();
  };

  const stopContinuousListening = () => {
    isListening.current = false;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    return () => stopContinuousListening();
  }, []);

  return {
    startContinuousListening,
    stopContinuousListening,
  };
};
