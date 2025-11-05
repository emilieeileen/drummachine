import RecordButtons from "./RecordButtons";
import Pads from "./Pads";
import PlaybackTimeline from "./PlaybackTimeline";
import { useDrumMachine } from "./useDrumMachine";
import "../styles/drummachine.scss";

const DrumMachine = () => {
  const {
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
  } = useDrumMachine();

  return (
    <div className="drum-container">
      <h1 className="drum-title">Emily's Drum Machine</h1>

      <div className="drum-panel drum-panel-record">
        <RecordButtons
          isRecording={isRecording}
          isPlaying={isPlaying}
          hasEvents={hasEvents}
          onRecord={handleRecord}
          onPlayPause={handlePlayPause}
          onClear={handleClear}
        />
      </div>

      <div className="drum-panel drum-panel-pads">
        <Pads activePad={activePad} onPadTrigger={triggerPad} />
      </div>

      <PlaybackTimeline events={events} currentIndex={currentIndex} />
    </div>
  );
};

export default DrumMachine;
