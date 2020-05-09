import React, { useState, useEffect } from 'react';
import VideosList from '../../components/VideosList';
import { Container } from '../../styles/home';

function Home() {
  const [latestDownload, setLatestDownload] = useState({});
  const test = async () => {
    const response = await fetch('/download', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: 'https://www.youtube.com/watch?v=XBDT2fDiSrk&t=0s',
      }),
    });
    const content = await response.json();
    if (content.status === 'success') {
      console.log('download réussi');
    }
  };

  const getLatestDownload = async () => {
    const response = await fetch('/latest-download');
    const json = await response.json();
    setLatestDownload({ lastVideos: json });
  };

  useEffect(() => {
    getLatestDownload();
  }, []);

  return (
    <Container>
      <button onClick={test}>test</button>
      <p>Latest video downloads</p>
      <VideosList videos={latestDownload.lastVideos} />
    </Container>
  );
}

export default Home;
