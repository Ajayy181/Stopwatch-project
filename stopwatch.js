function loadPage() {
  const startButton = document.querySelector('.js-start-button');
  const pauseButton = document.querySelector('.js-pause-button');
  const lapButton = document.querySelector('.js-lap-button');
  const resetButton = document.querySelector('.js-reset-button');

  let intervalId;
  
  startButton.addEventListener('click', () => {
    clearInterval(intervalId);
    startStopwatch();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      clearInterval(intervalId);
      startStopwatch();
    }
  });

  pauseButton.addEventListener('click', () => {
    if (pauseButton.innerHTML === 'pause') {
      if (!intervalId) {
        return;
      }
      pauseButton.innerHTML = 'play';
      clearInterval(intervalId);
    } else if (pauseButton.innerHTML === 'play') {
      pauseButton.innerHTML = 'pause';
      playTimerFunction();
    }
  });

  resetButton.addEventListener('click', () => {
    resetTimerFunction();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
      resetTimerFunction();
    }
  });

  lapButton.addEventListener('click', () => {
    if (!intervalId) {
      return;
    }
    lapLoopFunction();
  });

  function startStopwatch() {
    const startButton = document.querySelector('.js-start-button');
    const pauseButton = document.querySelector('.js-pause-button');
    const lapCount = document.querySelector('.js-lap-count');
    const lapLoop = document.querySelector('.js-lap-render');
    let milliseconds = 0;
    let minutes = 0;
    let seconds = 0;

    pauseButton.innerHTML = 'pause';
    lapLoop.innerHTML = '';
    
    intervalId = setInterval(() => {
      milliseconds++;

      const values = {
        milliseconds: milliseconds,
        minutes: minutes,
        seconds: seconds
      };

      localStorage.setItem('timeValues', JSON.stringify(values));

      if (milliseconds >= 100) {
        seconds++;
        milliseconds = 0;
      } else if (seconds >= 60) {
        minutes++;
        seconds = 0;
      }

      startButton.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${milliseconds < 10 ? '0' : ''}${milliseconds}`;
      lapCount.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${milliseconds < 10 ? '0' : ''}${milliseconds}`;
    }, 10);
  }

  function playTimerFunction() {
    const startButton = document.querySelector('.js-start-button');
    const lapCount = document.querySelector('.js-lap-count');

    const values = JSON.parse(localStorage.getItem('timeValues')) || {
      milliseconds: 0,
      minutes: 0,
      seconds: 0
    };

    let { milliseconds, seconds, minutes } = values;

    intervalId = setInterval(() => {
      milliseconds++;

      const values = {
        milliseconds: milliseconds,
        minutes: minutes,
        seconds: seconds
      };

      localStorage.setItem('timeValues', JSON.stringify(values));

      if (milliseconds >= 100) {
        seconds++;
        milliseconds = 0;
      } else if (seconds >= 60) {
        minutes++;
        seconds = 0;
      }

      startButton.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${milliseconds < 10 ? '0' : ''}${milliseconds}`;
      lapCount.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${milliseconds < 10 ? '0' : ''}${milliseconds}`;
    }, 10);
  }

  function resetTimerFunction() {
    const startButton = document.querySelector('.js-start-button');
    const pauseButton = document.querySelector('.js-pause-button');
    const lapCount = document.querySelector('.js-lap-count');
    const lapLoop = document.querySelector('.js-lap-render');

    clearInterval(intervalId);
    localStorage.removeItem('timeValues');

    startButton.innerHTML = '0:00:00';
    lapCount.innerHTML = '0:00:00';
    pauseButton.innerHTML = 'pause';
    intervalId = null;
    lapLoop.innerHTML = '';
  }
  
  let lapNumber = 0;

  function lapLoopFunction() {
    const values = JSON.parse(localStorage.getItem('timeValues')) || {
      milliseconds: 0,
      minutes: 0,
      seconds: 0
    };
    
    let { milliseconds, minutes, seconds } = values;

    const lapLoop = document.querySelector('.js-lap-render');
    let lapLoopHTML = '';
    lapNumber += 1;
    if (lapNumber > 10) {
      alert('Lap cannot be more than 10');
      return;
    }
    
    lapLoopHTML += `
      <div class="lap-loop-paragraph">
        <div class="lap-loop-number">lap ${lapNumber}</div>
        <div class="lap-loop js-lap-loop">${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${milliseconds < 10 ? '0' : ''}${milliseconds}</div>
      </div>
    `;

    lapLoop.innerHTML += lapLoopHTML;
  }
}

loadPage();
