import React, { useState, useEffect, useRef } from 'react';
import { firedb } from '../firebase';
import './LuckySeatAdmin.css';
import { useToasts } from 'react-toast-notifications';

const LuckySeatAdmin = () => {
  const isMounted = useRef(false);
  const { addToast } = useToasts();
  const [showLuck, setShowLuck] = useState('');
  const [friValue, setFriValue] = useState({
    datef: '',
    seatf: '',
    audinof: '',
    movieNamef: '',
    showTimef: '',
    revealDatef: '',
  });
  const [satValue, setSatValue] = useState({
    dates: '',
    seats: '',
    audinos: '',
    movieNames: '',
    showTimes: '',
    revealDates: '',
  });
  const [sunValue, setSunValue] = useState({
    datesu: '',
    seatsu: '',
    audinosu: '',
    movieNamesu: '',
    showTimesu: '',
    revealDatesu: '',
  });

  const { datef, seatf, audinof, movieNamef, showTimef, revealDatef } =
    friValue;
  const { dates, seats, audinos, movieNames, showTimes, revealDates } =
    satValue;
  const { datesu, seatsu, audinosu, movieNamesu, showTimesu, revealDatesu } =
    sunValue;

  const getLuckData = () => {
    firedb.ref('luckySeat').on('value', (data) => {
      if (isMounted.current) {
        data.forEach((d) => {
          setShowLuck(d.val());
        });
      }
    });
  };

  useEffect(() => {
    isMounted.current = true;
    getLuckData();
    return () => (isMounted.current = false);
  }, [showLuck]);

  const updateF = () => {
    firedb
      .ref('luckyseatdate/-ND7MDNABYcwk3euOeeK')
      .set({
        date: datef,
        seat: seatf,
        audi: audinof,
        movieName: movieNamef,
        showTime: showTimef,
        revealDate: revealDatef,
      })
      .then(() => {
        setFriValue({
          datef: '',
          seatf: '',
          audinof: '',
          movieNamef: '',
          showTimef: '',
          revealDatef: '',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateS = () => {
    firedb
      .ref('luckyseatdate/-ND7MOZ99h4TvhsTWz4m')
      .set({
        date: dates,
        seat: seats,
        audi: audinos,
        movieName: movieNames,
        showTime: showTimes,
        revealDate: revealDates,
      })
      .then(() => {
        setSatValue({
          dates: '',
          seats: '',
          audinos: '',
          movieNames: '',
          showTimes: '',
          revealDates: '',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateSu = () => {
    firedb
      .ref('luckyseatdate/-ND7MP9SCJ1UlchqMAcx')
      .set({
        date: datesu,
        seat: seatsu,
        audi: audinosu,
        movieName: movieNamesu,
        showTime: showTimesu,
        revealDate: revealDatesu,
      })
      .then(() => {
        setSunValue({
          datesu: '',
          seatsu: '',
          audinosu: '',
          movieNamesu: '',
          showTimesu: '',
          revealDatesu: '',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showLucky = () => {
    firedb
      .ref('luckySeat')
      .set({
        luckySeat: 'on',
      })
      .then(() => {
        addToast('Lucky Seat showed successfully', {
          appearance: 'success',
        });
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const hideLucky = () => {
    firedb
      .ref('luckySeat')
      .set({
        luckySeat: 'off',
      })
      .then(() => {
        addToast('Lucky Seat hided successfully', {
          appearance: 'success',
        });
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  return (
    <div className='LuckySeatAdminMain--'>
      <div
        className={showLuck == 'on' ? 'showLuckyButtonR' : 'showLuckyButtonG'}
        onClick={showLuck == 'on' ? hideLucky : showLucky}>
        {showLuck == 'on' ? 'Hide Lucky Seat' : 'Show Lucky Seat'}
      </div>
      <div>
        <div>
          <h3>Friday</h3>
        </div>
        <div>
          <div>
            <label>Date</label>
            <input
              type='name'
              value={datef}
              onChange={(e) =>
                setFriValue({
                  ...friValue,
                  datef: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Seat</label>
            <input
              type='name'
              value={seatf}
              onChange={(e) =>
                setFriValue({
                  ...friValue,
                  seatf: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Audi No</label>
            <input
              type='name'
              value={audinof}
              onChange={(e) =>
                setFriValue({
                  ...friValue,
                  audinof: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Movie name</label>
            <input
              type='name'
              value={movieNamef}
              onChange={(e) =>
                setFriValue({
                  ...friValue,
                  movieNamef: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Show time</label>
            <input
              type='name'
              value={showTimef}
              onChange={(e) =>
                setFriValue({
                  ...friValue,
                  showTimef: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Reveal Date</label>
            <input
              type='name'
              value={revealDatef}
              onChange={(e) =>
                setFriValue({
                  ...friValue,
                  revealDatef: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div onClick={updateF}>Update</div>
      </div>
      <div>
        <div>
          <h3>Saturday</h3>
        </div>
        <div>
          <div>
            <label>Date</label>
            <input
              type='name'
              value={dates}
              onChange={(e) =>
                setSatValue({
                  ...satValue,
                  dates: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Seat</label>
            <input
              type='name'
              value={seats}
              onChange={(e) =>
                setSatValue({
                  ...satValue,
                  seats: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Audi No</label>
            <input
              type='name'
              value={audinos}
              onChange={(e) =>
                setSatValue({
                  ...satValue,
                  audinos: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Movie name</label>
            <input
              type='name'
              value={movieNames}
              onChange={(e) =>
                setSatValue({
                  ...satValue,
                  movieNames: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Show time</label>
            <input
              type='name'
              value={showTimes}
              onChange={(e) =>
                setSatValue({
                  ...satValue,
                  showTimes: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Reveal Date</label>
            <input
              type='name'
              value={revealDates}
              onChange={(e) =>
                setSatValue({
                  ...satValue,
                  revealDates: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div onClick={updateS}>Update</div>
      </div>
      <div>
        <div>
          <h3>Sunday</h3>
        </div>
        <div>
          <div>
            <label>Date</label>
            <input
              type='name'
              value={datesu}
              onChange={(e) =>
                setSunValue({
                  ...sunValue,
                  datesu: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Seat</label>
            <input
              type='name'
              value={seatsu}
              onChange={(e) =>
                setSunValue({
                  ...sunValue,
                  seatsu: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Audi No</label>
            <input
              type='name'
              value={audinosu}
              onChange={(e) =>
                setSunValue({
                  ...sunValue,
                  audinosu: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Movie name</label>
            <input
              type='name'
              value={movieNamesu}
              onChange={(e) =>
                setSunValue({
                  ...sunValue,
                  movieNamesu: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Show time</label>
            <input
              type='name'
              value={showTimesu}
              onChange={(e) =>
                setSunValue({
                  ...sunValue,
                  showTimesu: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Reveal Date</label>
            <input
              type='name'
              value={revealDatesu}
              onChange={(e) =>
                setSunValue({
                  ...sunValue,
                  revealDatesu: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div onClick={updateSu}>Update</div>
      </div>
    </div>
  );
};

export default LuckySeatAdmin;
