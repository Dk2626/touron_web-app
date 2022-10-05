import React from 'react';
import luckyseatvideo from '../assests/Quiz/video/luckyseatvideo.mp4';
import ReactPlayer from 'react-player';

const Quizzz = () => {
  return (
    <div>
      <ReactPlayer url={luckyseatvideo} width='50%' height='50%' controls />
    </div>
  );
};

export default Quizzz;
