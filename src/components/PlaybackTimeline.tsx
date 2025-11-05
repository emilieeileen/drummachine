import type { PadId } from "./Pads";

export interface HitEvent {
  padId: PadId;
  time: number;
  color: string;
}

interface TimelineProps {
  events: HitEvent[];
  currentIndex: number | null;
}

const PlaybackTimeline = ({ events, currentIndex }: TimelineProps) => {
  if (events.length === 0) return <div className="timeline" />;

  const maxTime = events[events.length - 1].time || 1;

  return (
    <div className="timeline">
      <div className="timeline-label">Your beat:</div>
      <div className="timeline-bar">
        {events.map((event, index) => {
          const leftPercent = (event.time / maxTime) * 100;
          const isActive = currentIndex !== null && index <= currentIndex;

          return (
            <div
              key={index}
              className={`timeline-hit ${isActive ? "timeline-hit-active" : ""}`}
              style={{ left: `${leftPercent}%`, backgroundColor: event.color }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PlaybackTimeline;
