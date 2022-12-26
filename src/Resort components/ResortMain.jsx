import React from 'react';
import './ResortMain.css';

const ResortMain = () => {
  let resorts = ['Maldives', 'Bali', 'Thailand'];

  return (
    <div className='resortMain__Home'>
      {resorts.map((resort, i) => {
        return <div key={i}>{resort}</div>;
      })}
      <div></div>
    </div>
  );
};

export default ResortMain;
