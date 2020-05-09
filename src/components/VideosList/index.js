import React from 'react';
import { Container, VideoTitle, VideoContainer } from './styles';

const VideosList = ({ videos }) => (
  <Container>
    {videos &&
      videos.map((video, index) => {
        const videoName = video.replace(/\.[^/.]+$/, '');
        return (
          <VideoContainer>
            <VideoTitle>{videoName}</VideoTitle>
          </VideoContainer>
        );
      })}
  </Container>
);

export default VideosList;
