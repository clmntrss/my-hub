import React, { useState, useEffect, useRef } from 'react';
import Mousetrap from 'mousetrap';
import useDocumentTitle from '@rehooks/document-title';
import useInterval from '../../hooks/useInterval';

const Pomodoro = () => {
  useDocumentTitle('clmntrss | Pomodoro');

  const [pomodoroInfo, setPomodoroInfo] = useState({
    time: 0,
    timeType: 0,
    play: false,
    title: '',
  });

  const notifRef = useRef(null);

  useEffect(() => {
    setDefaultTime();
    startShortcuts();
    Notification.requestPermission();
  }, []);

  const elapseTime = () => {
    if (pomodoroInfo.time === 0) {
      reset(0);
      alert();
    }
    if (pomodoroInfo.play) {
      let newState = pomodoroInfo.time - 1;
      setPomodoroInfo({
        ...pomodoroInfo,
        time: newState,
        title: getTitle(newState),
      });
    }
  };

  const format = (seconds) => {
    let m = Math.floor((seconds % 3600) / 60);
    let s = Math.floor((seconds % 3600) % 60);
    let timeFormated = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
    return timeFormated;
  };

  const getFormatTypes = () => {
    return [
      { type: 'code', time: 1500 },
      { type: 'social', time: 300 },
      { type: 'coffee', time: 900 },
    ];
  };

  const formatType = (timeType) => {
    let timeTypes = getFormatTypes();
    for (let i = 0; i < timeTypes.length; i++) {
      let timeObj = timeTypes[i];
      if (timeObj.time === timeType) {
        return timeObj.type;
      }
    }
    return null;
  };

  //TODO : check this for interval
  const restartInterval = () => {};

  const play = () => {
    if (pomodoroInfo.play) return;
    restartInterval();
    setPomodoroInfo({ ...pomodoroInfo, play: true });
  };

  //TODO : check this for interval

  const reset = (resetFor) => {};

  const togglePlay = () => {
    if (pomodoroInfo.play) return reset();
    return play();
  };

  const setTime = (newTime) => {
    restartInterval();
    setPomodoroInfo({
      ...pomodoroInfo,
      time: newTime,
      timeType: newTime,
      title: getTitle(newTime),
      play: false,
    });
  };

  const setDefaultTime = () => {
    let defaultTime = 1500;
    setPomodoroInfo({
      ...pomodoroInfo,
      time: defaultTime,
      timeType: defaultTime,
      title: getTitle(defaultTime),
      play: false,
    });
  };

  const getTitle = (time) => {
    time = typeof time === 'undefined' ? pomodoroInfo.time : time;
    let _title = format(time) + ' | Pomodoro';
    return _title;
  };

  const startShortcuts = () => {
    Mousetrap.bind('space', togglePlay());
    Mousetrap.bind(['ctrl+left', 'meta+left'], toggleMode(-1));
    Mousetrap.bind(['ctrl+right', 'meta+right'], toggleMode(1));
  };

  const toggleMode = (gotoDirection) => {
    let timeTypes = getFormatTypes();
    let currentPosition = -1;

    for (let i = 0; i < timeTypes.length; i++) {
      if (timeTypes[i].time === pomodoroInfo.timeType) {
        currentPosition = i;
        break;
      }
    }

    if (currentPosition !== -1) {
      let newMode = timeTypes[currentPosition + gotoDirection];
      if (newMode) setTime(newMode.time);
    }
  };

  const _setLocalStorage = (item, element) => {
    let value = element.target.checked;
    localStorage.setItem('react-pomodoro' + item, value);
  };

  const _getLocalStorage = (item) => {
    return localStorage.getItem('react-pomodoro' + item) === 'true'
      ? true
      : false;
  };

  const alert = () => {
    if (notifRef.current.checked) {
      if (pomodoroInfo.timeType === 1500) {
        let notification = new Notification('Relax :)', {
          lang: 'en',
          body: 'Go talk or drink a coffee',
        });
      } else {
        let notification = new Notification('The time is over', {
          lang: 'en',
          body: 'Hey, back to code !',
        });
      }
    }
  };

  return (
    <div className="test">
      <button>test</button>
      <span className="check">
        <input type="checkbox" ref={notifRef} id="notification" />
        <label htmlFor="notification"></label>
        <span className="checkTitle">Notification</span>
      </span>
    </div>
  );
};

export default Pomodoro;
