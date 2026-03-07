import { useEffect, useRef, useState, useCallback } from "react";

export const useVoiceAnswer = (onResult) => {
  const recognitionRef = useRef(null);
  const recorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);

  const isActiveRef = useRef(false);
  const onResultRef = useRef(onResult);
  const isMutedRef = useRef(false);
  const finalTranscriptRef = useRef("");

  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [error, setError] = useState(null);

  /* ================= Sync refs ================= */

  useEffect(() => {
    onResultRef.current = onResult;
  }, [onResult]);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  /* ================= Start ================= */

  const start = useCallback(async () => {
    if (isActiveRef.current) return;

    try {
      setError(null);
      setAudioBlob(null);
      finalTranscriptRef.current = "";

      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        setError("Speech recognition not supported in this browser");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      streamRef.current = stream;

      /* ================= Media Recorder ================= */

      const mimeType =
        MediaRecorder.isTypeSupported("audio/webm")
          ? "audio/webm"
          : "audio/mp4";

      const recorder = new MediaRecorder(stream, { mimeType });

      recorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        setAudioBlob(blob);
      };

      recorder.start();

      /* ================= Speech Recognition ================= */

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        if (isMutedRef.current) return;

        let interim = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;

          if (event.results[i].isFinal) {
            finalTranscriptRef.current += transcript + " ";
          } else {
            interim += transcript;
          }
        }

        const text = (finalTranscriptRef.current + interim).trim();

        onResultRef.current?.(text);
      };

      /* ================= Auto restart ================= */

      recognition.onend = () => {
        if (isActiveRef.current) {
          recognition.start();
        }
      };

      recognition.onerror = (event) => {
        if (event.error === "not-allowed") {
          setError("Microphone permission denied");
        } else {
          setError(event.error);
        }
      };

      recognition.start();

      recognitionRef.current = recognition;
      isActiveRef.current = true;
      setIsRecording(true);

    } catch (err) {
      setError(err.message || "Microphone initialization failed");
      stop();
    }
  }, []);

  /* ================= Stop ================= */

  const stop = useCallback(() => {
    if (!isActiveRef.current) return;

    try {
      recognitionRef.current?.stop();
      recorderRef.current?.stop();

      streamRef.current?.getTracks().forEach((track) => track.stop());
    } catch {}

    recognitionRef.current = null;
    recorderRef.current = null;
    streamRef.current = null;

    isActiveRef.current = false;
    setIsRecording(false);
  }, []);

  /* ================= Skip ================= */

  const skip = useCallback(() => {
    stop();
    setAudioBlob(null);
    finalTranscriptRef.current = "";
    onResultRef.current?.("");
  }, [stop]);

  /* ================= Toggle Mute ================= */

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;

      if (streamRef.current) {
        streamRef.current.getAudioTracks().forEach((track) => {
          track.enabled = !next;
        });
      }

      return next;
    });
  }, []);

  /* ================= Cleanup ================= */

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return {
    isRecording,
    isMuted,
    audioBlob,
    error,
    start,
    stop,
    skip,
    toggleMute,
  };
};