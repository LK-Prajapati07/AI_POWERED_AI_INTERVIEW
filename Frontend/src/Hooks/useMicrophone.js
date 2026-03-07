import { useRef, useState, useEffect, useCallback } from "react";

export const useMicrophone = () => {
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);

  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [error, setError] = useState(null);

  const cleanupStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  const startRecording = useCallback(async () => {
    try {
      if (isRecording) return;

      if (!window.MediaRecorder) {
        setError("MediaRecorder not supported in this browser.");
        return;
      }

      setError(null);
      setAudioBlob(null);

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: "audio/webm",
        });

        setAudioBlob(blob);
        cleanupStream();
      };

      recorder.start();
      setIsRecording(true);

    } catch (err) {
      setError("Microphone permission denied or unavailable.");
      cleanupStream();
    }
  }, [isRecording, cleanupStream]);

  const stopRecording = useCallback(() => {
    if (!mediaRecorderRef.current || !isRecording) return;

    mediaRecorderRef.current.stop();
    setIsRecording(false);
  }, [isRecording]);

  /* ================= Cleanup On Unmount ================= */
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current?.state === "recording") {
        mediaRecorderRef.current.stop();
      }
      cleanupStream();
    };
  }, [cleanupStream]);

  return {
    isRecording,
    audioBlob,
    error,
    startRecording,
    stopRecording,
  };
};