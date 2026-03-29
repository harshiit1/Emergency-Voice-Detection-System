from faster_whisper import WhisperModel

model = WhisperModel("tiny", device="cpu")

def transcribe_audio(file_path: str):
    try:
         # result is a tuple: (segments, info)
        segments, info = model.transcribe(file_path, beam_size=5)
        
        # Combine all detected speech segments into one string
        full_text = " ".join([segment.text for segment in segments])

        return full_text.strip()
    except Exception as e:
        print(f"Transcription Error: {e}")
        return ""