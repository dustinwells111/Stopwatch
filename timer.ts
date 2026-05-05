const startBtn = document.querySelector<HTMLButtonElement>('#start')!
const stopBtn = document.querySelector<HTMLButtonElement>('#stop')!
const clearBtn = document.querySelector<HTMLButtonElement>('#clear')!
const display = document.querySelector<HTMLSpanElement>('#tiktok')!
const infoBox = document.querySelector<HTMLSpanElement>('#textbox')!

let elapsedTime = 0  // in milliseconds
let isRunning = false
let intervalId: number | null = null

// Format time as MM:SS or HH:MM:SS
function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

// Update the display
function updateDisplay(): void {
  display.textContent = formatTime(elapsedTime)
}

// Start or resume the stopwatch
startBtn.addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true
    startBtn.textContent = 'Resume'
    stopBtn.textContent = 'Pause'
    infoBox.textContent = 'Stopwatch running...'

    const startTime = Date.now() - elapsedTime

    intervalId = window.setInterval(() => {
      elapsedTime = Date.now() - startTime
      updateDisplay()
    }, 10)
  }
})

// Stop/pause the stopwatch
stopBtn.addEventListener('click', () => {
  if (isRunning) {
    isRunning = false
    startBtn.textContent = 'Resume'
    stopBtn.textContent = 'Resume'
    infoBox.textContent = 'Stopwatch paused'

    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }
  }
})

// Clear/reset the stopwatch
clearBtn.addEventListener('click', () => {
  isRunning = false
  elapsedTime = 0
  startBtn.textContent = 'Start'
  stopBtn.textContent = 'Stop'
  infoBox.textContent = 'Stopwatch cleared'

  if (intervalId !== null) {
    clearInterval(intervalId)
    intervalId = null
  }

  updateDisplay()
})

// Initialize display
updateDisplay()

