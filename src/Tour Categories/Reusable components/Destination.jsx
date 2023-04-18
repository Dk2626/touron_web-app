import React from 'react';
import './Destination.css';
const Destination = ({
  destination,
  startPoint,
  preferanece,
  setDestination,
  setPreferanece,
  nextStep,
  prevStep,
  setStartPoint,
}) => {
  return (
    <div className='destination-container'>
      {/* <img className="destination-img" src={imgSrc} alt="" /> */}
      <div className='destination-questions checkout'>
        <div className='que1'>
          <h6>Enter the holiday destination you want to travel</h6>
          {/* <select id='cars'>
            <option value='volvo'>Volvo</option>
            <option value='saab'>Saab</option>
            <option value='opel'>Opel</option>
            <option value='audi'>Audi</option>
          </select> */}
          <input
            type='text'
            onChange={(e) => setDestination(e.target.value)}
            value={destination}
            className='user-input-alter user-input'
          />
        </div>
        <div className='que2'>
          <h6>From where would you like to start your journey </h6>

          <input
            type='text'
            onChange={(e) => {
              setStartPoint(e.target.value);
            }}
            value={startPoint}
            className='user-input-alter user-input'
          />
        </div>
        <div className='que3'>
          <h6>Your preferences when you travel (Optional):</h6>
          <input
            type='text'
            onChange={(e) => setPreferanece(e.target.value)}
            value={preferanece}
            className='user-input-alter user-input'
          />
        </div>
      </div>
      <div className='navigation_btn'>
        <>
          <button className='previous-button' onClick={() => prevStep()}>
            Previous
          </button>
          {destination !== '' && startPoint !== '' ? (
            <button className='next-button' onClick={() => nextStep()}>
              Next
            </button>
          ) : (
            <button
              disabled
              className='next-button'
              style={{ color: '#c1c1c1' }}
              onClick={() => nextStep()}>
              Next
            </button>
          )}
        </>
      </div>
    </div>
  );
};

export default Destination;
