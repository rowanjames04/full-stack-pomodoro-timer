# Full Stack Pomodoro Timer React App

A simple and visually appealing Pomodoro Timer built with React, Node.js, Howler.js for audio, and React Bootstrap for UI components. This app helps users manage work and break intervals effectively by providing an easy-to-use timer with start, pause, reset, and adjustable time features.

## Features

- Work interval timer set to 25 minutes by default
- Break interval timer set to 5 minutes by default
- Audio feedback with ticking clock sound during countdown and bell sound when interval ends
- Visual indicators for work and break sessions with color changes
- Adjustable timer duration (1 to 100 minutes)
- Start, pause, and reset controls
- Tracks the number of completed work and break intervals

## Technologies Used

- React (Functional Components with Hooks)
- Node.js backend (if applicable)
- Howler.js for audio playback
- React Bootstrap for styled buttons and layout
- CSS-in-JS for inline styling

## Installation

1. Clone the repository  
   git clone https://github.com/rowanjames04/full-stack-pomodoro-timer.git

2. Navigate into the project directory  
   cd pomodoro-timer-react

3. Install dependencies  
   npm install

4. Start the backend server (if included)  
   node server.js

5. Run the React frontend  
   npm start

*Note: This project assumes a Node.js backend is part of the full stack setup. If your current repo does not include the backend code, you may remove or modify the backend server steps.*

## Usage

- Click "Start" to begin the work interval timer.
- Use the "+" and "−" buttons to adjust the timer duration before starting.
- Click "Pause" to pause the timer.
- Click "Reset" to reset the timer and intervals.
- When the work interval ends, the timer automatically switches to the break interval and vice versa.

## File Structure

- `src/` — Main source code folder
- `src/media/` — Audio files (clock ticking and bell sounds)
- `App.js` — Main React component with timer logic and UI

## License

This project is licensed under the MIT License.

## Contact

For questions or feedback, please open an issue or contact me at rowanjames419@gmail.com
