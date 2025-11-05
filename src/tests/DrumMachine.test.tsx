import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DrumMachine from "../components/DrumMachine";

describe("DrumMachine", () => {
  it("renders the DrumMachine component", () => {
    render(<DrumMachine />);
    const recordButton = screen.getByRole("button", { name: /record/i });
    const playButton = screen.getByRole("button", {name: /play/i});
    const clearButton = screen.getByRole("button", {name: /clear/i});
    expect(recordButton).toBeInTheDocument();
    expect(playButton).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();

    const bassPad = screen.getByRole("button", { name: /bass/i });
    const snarePad = screen.getByRole("button", { name: /snare/i });
    const hihatPad = screen.getByRole("button", { name: /hi-hat/i });
    expect(bassPad ).toBeInTheDocument();
    expect(snarePad).toBeInTheDocument();
    expect(hihatPad).toBeInTheDocument();
  });
  it("adds active class to pad when clicked or keypad triggered", async () => {
    render(<DrumMachine />);
    const bassPad = screen.getByRole("button", { name: /bass/i });
    expect(bassPad ).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(bassPad);
    await waitFor(() => expect(bassPad).toHaveClass("drum-pad-active"));
  });
  it("changes state of record buttons when selected by user", async () => {
    render(<DrumMachine />);
    const recordButton = screen.getByRole("button", { name: /record/i });
    expect(recordButton).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(recordButton);

    const stopButton = screen.getByRole("button", { name: /stop/i });

    expect(stopButton).toBeInTheDocument();
    await user.click(stopButton);
    const recordButtonAgain = screen.getByRole("button", { name: /record/i });
    expect(recordButtonAgain).toBeInTheDocument();
  });
  it("records drum hits then plays back then clears", async () => {
    render(<DrumMachine />);
    const recordButton = screen.getByRole("button", { name: /record/i });
    const playButton = screen.queryByRole("button", {name: /play/i});
    const clearButton = screen.queryByRole("button", {name: /clear/i});
    expect(recordButton).toBeInTheDocument();
    expect(playButton).toBeDisabled();
    expect(clearButton).toBeDisabled();

    const bassPad = screen.getByRole("button", { name: /bass/i });
    const snarePad = screen.getByRole("button", { name: /snare/i });
    const hihatPad = screen.getByRole("button", { name: /hi-hat/i });
    expect(bassPad ).toBeInTheDocument();
    expect(snarePad).toBeInTheDocument();
    expect(hihatPad).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(recordButton);

    const stopButton = screen.getByRole("button", { name: /stop/i });
    expect(stopButton).toBeInTheDocument();
    await user.click(bassPad);
    await user.click(snarePad);
    await user.click(hihatPad);

    await user.click(stopButton);
    const playButtonVisible = screen.getByRole("button", {name: /play/i});
    expect(playButtonVisible).toBeInTheDocument();
    await user.click(playButtonVisible);

    const pauseButton = screen.getByRole("button", { name: /pause/i });
    expect(pauseButton).toBeInTheDocument();

    const clearButtonVisible = screen.getByRole("button", {name: /clear/i});
    expect(clearButtonVisible).toBeInTheDocument();
    await user.click(clearButtonVisible);
  })
});