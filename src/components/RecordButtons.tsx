import { useEffect } from "react";

interface RecordButtonsProps {
  isRecording: boolean;
  isPlaying: boolean;
  hasEvents: boolean;
  onRecord: () => void;
  onPlayPause: () => void;
  onClear: () => void;
}

const RecordButtons = ({
  isRecording,
  isPlaying,
  hasEvents,
  onRecord,
  onPlayPause,
  onClear,
}: RecordButtonsProps) => {

  useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.repeat) return;

    switch (event.key) {
      case " ":
        event.preventDefault();
        onRecord();
        break;
      case "Enter":
        event.preventDefault();
        onPlayPause();
        break;
      case "Backspace":
        event.preventDefault();
        onClear();
        break;
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [onRecord, onPlayPause, onClear]);

  return (
    <div className="record-buttons">
      <button
        type="button"
        onClick={onRecord}
        aria-pressed={isRecording}
        className="record-button"
      >
        <div className="record-button-title">{isRecording ? "Stop" : "Record"}</div>
        <div className="record-key-hint">(Space)</div> 
      </button>
      <button
        type="button"
        onClick={onPlayPause}
        disabled={isRecording || !hasEvents}
        aria-pressed={isPlaying}
        className="play-button"
      >
        <div className="record-button-title">{isPlaying ? "Pause" : "Play"}</div>
        <div className="record-key-hint">(Enter)</div> 
      </button>
      <button
        type="button"
        onClick={onClear}
        disabled={!hasEvents && !isRecording}
        className="clear-button"
      >
        <div className="record-button-title">Clear</div>
        <div className="record-key-hint">(Backspace)</div> 
      </button>
    </div>
  );
};

export default RecordButtons;
