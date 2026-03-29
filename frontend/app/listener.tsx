import { useCallback, useEffect, useRef } from "react";
import { includes_emergency_keyword } from "@/utils/keyword_detector";
import { startRecording, stopRecording } from "@/services/voiceService";
import {
  handleEmergency,
  uploadAudioForTranscription,
} from "@/services/apiService";

export const useEmergencyListener = (
  onEmergencyDetected: (text: string) => void,
) => {
  const isListening = useRef(false);
  const isProcessing = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const listenLoop = useCallback(async () => {
      if (!isListening.current || isProcessing.current) return;

    try {
      isProcessing.current = true; // LOCK

      await startRecording();

      await new Promise((resolve) => {
        timeoutRef.current = setTimeout(resolve, 4000);
      });

      const uri = await stopRecording();
      
      isProcessing.current = false; 
      if (isListening.current) {
        listenLoop(); 
      }

      if (uri) {
        uploadAudioForTranscription(uri)
          .then((result) => {
            if (result?.text && includes_emergency_keyword(result.text)) {
              handleEmergency(result.text); 
              onEmergencyDetected(result.text);
            }
          })
          .catch((err) => console.log("Background upload failed", err));
      }
    } catch (ex) {
      console.error("Listening loop error:", ex);
      isProcessing.current = false;
      if (isListening.current) setTimeout(listenLoop, 1000);
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
