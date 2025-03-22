import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Howl } from 'howler';
import clockMp3 from '../src/media/clock.mp3'
import bellMp3 from '../src/media/bell.mp3'

//assets
const clockLoop = new Howl({
  src: [clockMp3],
  loop: true
})

const bellSfx = new Howl({
  src: [bellMp3],
})

const workBackgroundColor = "#194885";
const workButtonColor = "#215FB0";
const breakBackgroundColor = "#4A0000";
const breakButtonColor = "#800000";

function App() {
  const [ isRunning, setIsRunning ] = useState(false)
  const [ timeMin, setTimeMin ] = useState(25)
  const [ timeSec, setTimeSec ] = useState(0)
  const [ onBreak, setOnBreak ] = useState(false)
  const [ workInterval, setWorkInterval ] = useState(0)
  const [ breakInterval, setBreakInterval ] = useState(0)

  // useEffect
  useEffect(() => {
    if (isRunning) {
      const intervalPom = setInterval(() => {
        // Decrease Seconds
        if (timeSec > 0) {
          setTimeSec((timeSec) => timeSec - 1)
        }
        // Decrease Minutes
        if (timeSec === 0) {
          setTimeMin((timeMin) => timeMin - 1)
          setTimeSec(59)
        }
        // Check if time ends
        if (timeMin === 0 && timeSec === 0) {
          setTimeSec(0)
          clockLoop.stop()
          bellSfx.play()
          // keep track of intervals
          if (!onBreak) {
            setWorkInterval((workInterval) => workInterval + 1)
            setTimeMin(5)
            setOnBreak(true)
          }
          if (onBreak) {
            setBreakInterval((breakInterval) => breakInterval + 1)
            setTimeMin(25)
            setOnBreak(false)
          }
        }
      }, 1000)
      return () => clearInterval(intervalPom)
      }
      

  }, [isRunning, timeMin, timeSec, workInterval, breakInterval])

  // Component functions
  const startTimer = () => {
    clockLoop.play()
    setIsRunning(true)
  }

  const pauseTimer = () => {
    setIsRunning(false)
    clockLoop.pause()
  }

  const resetTimer = () => {
    clockLoop.stop()
    setTimeMin(25)
    setTimeSec(0)
    setWorkInterval(0)
    setBreakInterval(0)
    setOnBreak(false)
    setIsRunning(false)
  }

  const reduceTime = () => {
    if(timeMin > 0) {
      setTimeMin((timeMin) => timeMin - 1)
    }
  }

  const increaseTime = () => {
    if (timeMin < 100) {
      setTimeMin((timeMin) => timeMin + 1)
    }
  }

  // Rendered JSX
  return (
    <div
      style={{
        backgroundColor: onBreak ? breakBackgroundColor : workBackgroundColor,
        minHeight: "100vh", // Ensures the background covers the full viewport
        margin: 0, // Removes default margin
        padding: 0, // Removes default padding
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Centers content horizontally
        justifyContent: "space-between", // Spaces out content vertically
      }}
    >
      <div className="d-flex align-items-center flex-column text-white">
        <div className="lead">
          <h2 className="display-2" style={{ fontWeight: "bold" }}>Pomodoro Timer</h2> {/* Bold heading */}
        </div>
        <div className="interval-indicators d-flex justify-content-center py-3">
          <h3 className="mx-3">Work Intervals: {workInterval}</h3>
          <h3 className="mx-3" style={{ marginLeft: "12em" }}>
            Breaks Completed: {breakInterval}
          </h3>
        </div>
        <div className="Timer py-4 my-2">
          {/* Rounded box for timer */}
          <div
            style={{
              backgroundColor: onBreak ? breakButtonColor : workButtonColor,
              borderRadius: "25px", // Rounded corners
              padding: "40px 40px", // Increased padding for better spacing
              display: "flex",
              flexDirection: "row", // Align items horizontally
              alignItems: "center", // Center vertically
              justifyContent: "space-between", // Distribute space between time and buttons
              width: "fit-content",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              margin: "0 auto", // Centers the box horizontally
            }}
          >
            {/* Timer on the left side */}
            <h2
              className="display-1"
              style={{
                fontSize: "8rem", // Adjust size as needed
                margin: 0, // Remove any margin
                color: "white", // Text color
                // fontWeight: "bold", // Make the time bold
              }}
            >
              {timeMin}:{timeSec < 10 ? "0" + timeSec : timeSec}
            </h2>
  
            {/* Buttons on the right side */}
            <div
              style={{
                display: "flex",
                flexDirection: "column", // Stack buttons vertically
                gap: "30px", // More space between buttons
                justifyContent: "center", // Center vertically
                alignItems: "center", // Align buttons to the center
                paddingLeft: "40px", // More space between buttons and time
              }}
            >
              <Button
                className="mx-2"
                size="lg"
                style={{
                  width: "75px",
                  height: "75px",
                  backgroundColor: onBreak ? breakBackgroundColor : workBackgroundColor, // Corrected color for the plus button
                  color: "white",
                  border: "none", // Remove borders
                  borderRadius: "50%", // Round button
                  display: "flex", // Flexbox to center content
                  alignItems: "center", // Center vertically
                  justifyContent: "center", // Center horizontally
                }}
                onClick={increaseTime}
              >
                <h1 style={{ margin: 0, fontSize: "2rem", marginTop: "-1px" }}>+</h1> {/* Shift up by 1px */}
              </Button>
              <Button
                className="mx-2"
                size="lg"
                style={{
                  width: "75px",
                  height: "75px",
                  backgroundColor: onBreak ? breakBackgroundColor : workBackgroundColor, // Corrected color for the minus button
                  color: "white",
                  border: "none", // Remove borders
                  borderRadius: "50%", // Round button
                  display: "flex", // Flexbox to center content
                  alignItems: "center", // Center vertically
                  justifyContent: "center", // Center horizontally
                }}
                onClick={reduceTime}
              >
                <h1 style={{ margin: 0, fontSize: "2rem", marginTop: "-1px" }}>−</h1> {/* Shift up by 1px */}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="Ctrl py-3 d-flex justify-content-around" style={{ margin: "0 15%" }}>
        <Button
          size="lg"
          style={{
            width: "150px",
            height: "75px",
            backgroundColor: onBreak ? breakButtonColor : workButtonColor, // Button color set to #215FB0
            border: "none", // Remove borders
            color: "white",
            marginRight: "40px",
          }} 
          onClick={startTimer}
        >
          Start
        </Button>
        <Button
          size="lg"
          style={{
            width: "150px",
            height: "75px",
            backgroundColor: onBreak ? breakButtonColor : workButtonColor, // Button color set to #215FB0
            border: "none", // Remove borders
            color: "white",
            marginLeft: "40px",
            marginRight: "40px",
          }} 
          onClick={pauseTimer}
        >
          Pause
        </Button>
        <Button
          size="lg"
          style={{
            width: "150px",
            height: "75px",
            backgroundColor: onBreak ? breakButtonColor : workButtonColor, // Button color set to #215FB0
            border: "none", // Remove borders
            color: "white",
            marginLeft: "40px",
          }} 
          onClick={resetTimer}
        >
          Reset
        </Button>
      </div>
    </div>
  );

  
  
  
  
}

export default App;
