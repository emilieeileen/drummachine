import { useEffect } from "react";
  
interface PadsProps {
  activePad: PadId | null;
  onPadTrigger: (padId: PadId) => void;
}

export type PadId = "kick" | "snare" | "hihat";

interface Pad {
  id: PadId;
  label: string;
  key: string;
  emoji: string;
  color: string;
}

const PADS: Pad[] = [
  { id: "kick", label: "Bass", key: "a", emoji: "💥", color: "#A23E48" },
  { id: "snare", label: "Snare", key: "s", emoji: "🥁", color: "#4C6A92"  },
  { id: "hihat", label: "Hi-hat", key: "d", emoji: "✨", color: "#E3B23C"  },
];

const Pads = ({ activePad, onPadTrigger }: PadsProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const key = e.key.toLowerCase();
      const pad = PADS.find((p) => p.key === key);
      if (pad) {
        e.preventDefault();
        onPadTrigger(pad.id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onPadTrigger]);

  return (
    <div className="drum-pad-grid">
      {PADS.map((pad) => (
        <div key={pad.id} className="drum-pad-wrapper">
          <button
            onClick={() => onPadTrigger(pad.id)}
            className={`drum-pad ${
              activePad === pad.id ? "drum-pad-active" : ""
            }`}
            style={{
              backgroundColor: activePad === pad.id ? "#1D1E18" : pad.color,
            }}
          >
            <div className="drum-label">{activePad === pad.id ? pad.emoji : pad.label}</div>
            <div className="drum-hint">({pad.key.toUpperCase()})</div>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Pads;
