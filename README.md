Welcome to Emily's Drum Machine

How to run
The application is set up with Vite so simply run npm run dev to start the application locally
To run the unit tests, run npm test

Methodology
I wanted to ensure a clean design while also making sure I hit all the requirement marks as well as a few of the extra points.

How it works
There are 3 drums, Bass, Snare and Hi-hat. Each has it's own color to help differentiate. Users can click the button with their mouse or use the keypad shortcuts to trigger the button. On trigger, the button flashes an emoji.

Users have the option to record their beat. Simply click the record button or use the Spacebar key to start the recording. users can then click the drums as they like. Stop the recording by hitting the Spacebar or clicking the Stop button. Once a beat has been recorded, the Play and Clear buttons become active.. To play back the recording, simply click the Play button or use the enter key. To clear your beat, click the Clear button or the backspace key. I have also included a timeline bar to visually represent the beat with each drum hit having a mark to match the color of the drum hit. On playback, these flash at each point the drum is hit. Your beat is also shown on a timeline with marks corresponding to the colors of the drums hit in your beat. 

Into the code
For readability, I always try to separate our logic and view into separate files. The logic for the drum machine is kept in a custom hook in the useDrumMachine.tx file. I then separate out the views into corresponding folders for consistency and to keep the code in clean short files that are easy to understand.
For the recording and playback. I use useCallback and useEffect hooks to help with state management to trigger the "flash" of drums as well has record the beat and store it locally for persistency and playback.

How it works
The recording process is started with an empty event array. A timer begins and as the user hits the drum pads, each beat is recorded as individual objects, consisting of the padId, the time elapsed since the recording started and the color. To keep the timing consistent, I logged the time since the recording started so that on playback the same pad is it at the same time interval it was at the time of recording. The functionality is more complex as many states are managed within each bit of functionality. For example, triggering each buttons controls its own state (ie if a user clicks Record, the isRecording state is set to true. Once this state is true, the events array is created and beats hit are recorded as objects in the array). For the recording button I used useRef to set a reference value for the start time that when triggered by the change in the button state, captures that start of the recording time. This is to ensure that when the drum pad components are rerendered with each hit, the start of the recording is kept unchanged. The Record button at this time now displays the word Stop and when the button is hit again the isRecording state is set to false, the ref is cleared and no other hits are recorded. 

During the recording, when each drum is hit, if the events array is present, it takes the padID, time and DRUM_COLOR and creates an object which is then pushed into the events array. This stores the hit at the exact point it occurred in the sequence. This events arrayed is then passed into the Timeline to create a visual display of the beat alongside it being saved for playback when the use hits the play button. 

For persistency, I knew I wanted to store the beat in localStorage so if the page refreshes after the beat is recorded, it is saved. I created a storage key called drumMachineRecording_v1. Each time the application is mounted, it looks for this value stored in local storage to see if a recording was previously made. The loading logic runs inside the useState initializer for events, so it is always linked to the event object made at the time of recording and when mounted, the application loads the recording immediately. If an event object is present, the function stringifies it into JSON and stores it in local storage.