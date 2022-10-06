import React, { useEffect, useRef } from 'react';
import luckyseatvideo from '../assests/Quiz/video/luckyseatvideo.mp4';

const Quizzz = () => {
  const videoRef = useRef(undefined);
  useEffect(() => {
    videoRef.current.defaultMuted = true;
    console.log('sd');
  });

  return (
    <div>
      <div>
        <video
          style={{ width: '50%', height: '50%' }}
          ref={videoRef}
          loop
          autoPlay
          muted
          playsInline>
          <source src={luckyseatvideo} type='video/mp4' />
        </video>
      </div>
      <div>
        <h1>Video</h1>
      </div>
      <div>
        <h1>Video</h1>
      </div>
    </div>
  );
};

export default Quizzz;
