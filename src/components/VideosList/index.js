import React from 'react';
import { Container, VideoTitle, VideoContainer } from './styles';

const VideosList = ({ videos }) => (
  <Container>
    {videos &&
      videos.map((video, index) => {
        const videoName = video.replace(/\.[^/.]+$/, '');
        const titleClean = videoName.replace(/\s+/g, '-').toLowerCase();
        return (
          <VideoContainer>
            <img src={`/screenshot/${titleClean}.png`} />
            <VideoTitle>{videoName}</VideoTitle>
          </VideoContainer>
        );
      })}
  </Container>
);

export default VideosList;
