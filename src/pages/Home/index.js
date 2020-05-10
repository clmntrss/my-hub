import React, { useState, useEffect } from 'react';
import useDocumentTitle from '@rehooks/document-title';

import VideosList from '../../components/VideosList';
import { Container } from '../../styles/home';

function Home() {
  const [latestDownload, setLatestDownload] = useState({});
  useDocumentTitle('clmntrss | Tools');

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
      <p>Latest video downloads</p>
      <VideosList videos={latestDownload.lastVideos} />
    </Container>
  );
}

export default Home;
