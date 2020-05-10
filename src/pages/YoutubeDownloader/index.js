import React from 'react';
import useDocumentTitle from '@rehooks/document-title';
import { Container } from '../../styles/home';

function YoutubeDownloader() {
  useDocumentTitle('clmntrss | Youtube Downloader');
  const test = async () => {
    const response = await fetch('/download', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: 'https://youtu.be/vQQ8fsbb-lg',
      }),
    });
    const content = await response.json();
    if (content.status === 'success') {
      console.log('download réussi');
    }
  };

  return (
    <Container>
      <input type="text" placeholder="Rentrez l'url de la vvidéo youtube" />
      <button>Download</button>
    </Container>
  );
}

export default YoutubeDownloader;
