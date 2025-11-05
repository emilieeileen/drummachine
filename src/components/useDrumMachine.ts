import { useState, useCallback, useRef, useEffect } from "react";
import type { PadId } from "./Pads";

export interface HitEvent {
  padId: PadId;
  time: number;
  color: string;
}

const DRUM_COLORS: Record<PadId, string> = {
  kick: "#A23E48",
  snare: "#4C6A92",
  hihat: "#E3B23C",
};

const STORAGE_KEY = "drumMachineRecording_v1";

export const useDrumMachine = () => {
  const [activePad, setActivePad] = useState<PadId | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [events, setEvents] = useState<HitEvent[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed as HitEvent[];
    } catch {
      return [];
    }
  });

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const recordingStartRef = useRef<number | null>(null);
  const playbackTimeoutsRef = useRef<number[]>([]);

  const hasEvents = events.length > 0;

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch {
      // ignore errors
    }
  }, [events]);

  const flashPad = (padId: PadId) => {
    setActivePad(padId);
    setTimeout(() => setActivePad(null), 300);
  };

  const clearPlaybackTimeouts = () => {
    playbackTimeoutsRef.current.forEach((id) => window.clearTimeout(id));
    playbackTimeoutsRef.current = [];
  };

  const triggerPad = useCallback(
    (padId: PadId) => {
      flashPad(padId);
      if (!isRecording || recordingStartRef.current === null) return;

      const timeFromStart = performance.now() - recordingStartRef.current;
      setEvents((prev) => [
        ...prev,
        { padId, time: timeFromStart, color: DRUM_COLORS[padId] },
      ]);
    },
    [isRecording]
  );

  const handleRecord = () => {
    if (!isRecording) {
      setEvents([]);
      recordingStartRef.current = performance.now();
      setIsRecording(true);
      setIsPlaying(false);
      clearPlaybackTimeouts();
      setCurrentIndex(null);
    } else {
      setIsRecording(false);
      recordingStartRef.current = null;
    }
  };

  const startPlayback = () => {
    if (!hasEvents) return;

    setIsPlaying(true);
    setCurrentIndex(null);
    clearPlaybackTimeouts();

    events.forEach((event, index) => {
      const timeoutId = window.setTimeout(() => {
        flashPad(event.padId);
        setCurrentIndex(index);
        if (index === events.length - 1) {
          setIsPlaying(false);
          window.setTimeout(() => setCurrentIndex(null), 200);
        }
      }, event.time);

      playbackTimeoutsRef.current.push(timeoutId);
    });
  };

  const stopPlayback = () => {
    setIsPlaying(false);
    clearPlaybackTimeouts();
  };

  const handlePlayPause = () => {
    if (isRecording) return;
    if (!isPlaying) startPlayback();
    else stopPlayback();
  };

  const handleClear = () => {
    setIsRecording(false);
    setIsPlaying(false);
    setEvents([]);
    setCurrentIndex(null);
    recordingStartRef.current = null;
    clearPlaybackTimeouts();
  };

  return {
    activePad,
    isRecording,
    isPlaying,
    events,
    currentIndex,
    hasEvents,
    triggerPad,
    handleRecord,
    handlePlayPause,
    handleClear,
  };
};
