import React, { useState, useEffect } from 'react';
import useDocumentTitle from '@rehooks/document-title';

function Pomodoro() {
  useDocumentTitle('clmntrss | Pomodoro');

  const [pomodoroInfo, setPomodoroInfo] = useState({
    time: 0,
    timeType: 0,
    play: false,
    title: '',
  });

  useEffect(() => {
    setPomodoroInfo({ ...pomodoroInfo, time: 1 });
  }, []);

  const setTime = (newTime) => {
    setPomodoroInfo({ ...pomodoroInfo, time: newTime, play: true });
  };

  const play = () => {
    if (pomodoroInfo.play) return;
    setPomodoroInfo({ ...pomodoroInfo, play });
  };

  const test = () => {
    console.log('test');
    fetch('/download?URL=https://youtu.be/wizpDlxAzQs', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        payment_intent_id: 'issou',
      }),
    });
  };
  return (
    <div className="test">
      <button onClick={test}>test</button>
    </div>
  );
}

export default Pomodoro;
