import React from 'react';

function YoutubeSearch() {
  const getPlan = async () => {
    const response = await fetch('/latest-download');
    const json = await response.json();
    console.log(json);
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
      <button onClick={getPlan}>test</button>
    </div>
  );
}

export default YoutubeSearch;
