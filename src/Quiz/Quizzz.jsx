import React from 'react';
import luckyseatvideo from '../assests/Quiz/video/luckyseatvideo.mp4';
import './Quizzzz.css';

const Quizzz = () => {
  return (
    <div>
      <div style={{ width: '50%', height: '50%' }}>
        <div
          dangerouslySetInnerHTML={{
            __html: `<video className="app__backgroundVideo" autoplay loop muted playsinline>
          <source src=${luckyseatvideo} type="video/mp4" />
          Your browser does not support the video tag.
          </video>`,
          }}
        />
      </div>
      {/* <video
          style={{ width: '50%', height: '50%' }}
          ref={videoRef}
          loop
          autoPlay
          muted
          playsInline>
          <source src={luckyseatvideo} type='video/mp4' />
        </video> */}
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
