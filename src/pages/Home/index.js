import React from 'react';

function Home() {
  const test = async () => {
    const response = await fetch('/download', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: 'https://youtu.be/epKPjVWsQLk',
      }),
    });
    const content = await response.json();
    console.log(content);
  };
  return (
    <div className="test">
      <button onClick={test}>test</button>
    </div>
  );
}

export default Home;
