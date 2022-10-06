import React from 'react';
import luckyseatvideo from '../assests/Quiz/video/luckyseatvideo.mp4';
// import ReactPlayer from 'react-player';

const Quizzz = () => {
  return (
    <div>
      <div>
        {/* <ReactPlayer url={luckyseatvideo} width='50%' height='50%' controls /> */}
        <video
          src={luckyseatvideo}
          width='50%'
          height='50%'
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
      <div>
        <h1>Video</h1>
      </div>
    </div>
  );
};

export default Quizzz;
