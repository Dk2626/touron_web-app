import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { firedb } from '../firebase';
import './Virtual.css';

const Virtual = () => {
  const isMounted = useRef(false);
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    name: '',
    number: '',
    date: '',
    time: '',
    apType: '',
  });

  const [selectedDate, setSelectedDate] = useState('');
  const [alotTime, setAlotTime] = useState([]);
  const [dummySlot, setDummySlot] = useState([]);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOTP] = useState('');

  const { name, number, date, time, apType } = data;

  let times = [
    '11:00AM',
    '11:15AM',
    '11:30AM',
    '11:45AM',
    '12:00PM',
    '12:15PM',
    '12:30PM',
    '12:45PM',
    '01:00PM',
    '01:15PM',
    '01:30PM',
    '01:45PM',
    '02:00PM',
    '02:15PM',
    '02:30PM',
    '02:45PM',
    '03:00PM',
    '03:15PM',
    '03:30PM',
    '03:45PM',
    '04:00PM',
    '04:15PM',
    '04:30PM',
    '04:45PM',
    '05:00PM',
    '05:15PM',
    '05:30PM',
  ];

  // let dummyslot = ['01:00PM', '01:15PM', '01:30PM', '01:45PM', '02:00PM'];

  const submit = () => {
    firedb
      .ref('virtual')
      .push({
        name: name,
        number: number,
        date: date,
        time: time,
        apType: apType,
      })
      .then(() =>
        setData({
          name: '',
          number: '',
          date: '',
          time: '',
          apType: '',
        })
      )
      .catch((err) => console.log(err));
  };

  const handleDateChange = (event) => {
    const inputDate = event.target.value;
    const selectedDate = new Date(inputDate);
    const dayOfWeek = selectedDate.getDay();

    // 0 represents Sunday, and 6 represents Saturday
    if (dayOfWeek === 0) {
      alert('Sorry, We are not operating on Sunday!');
      setData({
        ...data,
        date: '',
      });
    } else {
      setData({
        ...data,
        date: inputDate,
      });
    }
  };

  const getData = () => {
    let arr = [];
    firedb.ref('virtual').on('value', (data) => {
      if (isMounted.current) {
        data.forEach((d) => {
          if (date === d.val().date) {
            arr.push(d.val().time);
          }
        });
        setAlotTime(arr);
      }
    });
  };

  useEffect(() => {
    isMounted.current = true;
    getData();
    return () => (isMounted.current = false);
  }, [date]);

  const getDummySlot = () => {
    let dd = [];
    firedb.ref('dummyslot').on('value', (data) => {
      if (isMounted.current) {
        data.forEach((d) => {
          dd.push(d.val().time);
        });
        setDummySlot(dd);
      }
    });
  };

  useEffect(() => {
    isMounted.current = true;
    getDummySlot();
    return () => (isMounted.current = false);
  }, []);

  // const handleSendOTP = async () => {
  //   try {
  //     const response = await axios.post('https://api.wati.io/v1/sendOTP', {
  //       phone: phoneNumber,
  //       channel: 'whatsapp',
  //     });
  //     // Handle the response as needed
  //     console.log('response', response);
  //   } catch (error) {
  //     // Handle the error appropriately
  //     console.log('error', error);
  //   }
  // };

  const render = () => {
    switch (step) {
      case 1:
        return (
          <div className='virtual_step_1_main'>
            {/* <div>
              <h1>OTP Verification</h1>
              <input
                type='text'
                placeholder='Phone Number'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <button onClick={handleSendOTP}>Send OTP</button>
              <br />
              <input
                type='text'
                placeholder='OTP'
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
              /> */}
            {/* <button onClick={handleVerifyOTP}>Verify OTP</button> */}
            {/* </div> */}

            <div className='virtual_step_1_main_headdd'>
              <h1>Trial Room</h1>
              <h4>Set up your first appointment type</h4>
            </div>
            <div className='virtual_step_1_main_inputs'>
              <div className='virtual_step_1_main_inputs_input'>
                <label>name</label>
                <input
                  type='text'
                  value={name}
                  onChange={(e) =>
                    setData({
                      ...data,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className='virtual_step_1_main_inputs_input'>
                <label>whatsapp number</label>
                <input
                  type='number'
                  value={number}
                  onChange={(e) =>
                    setData({
                      ...data,
                      number: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className='virtual_step_1_main_inputs_radio_lab'>
                  appointment type
                </label>
                <div className='virtual_step_1_main_inputs_radio'>
                  <div>
                    <input
                      type='radio'
                      name='onwardTransportMode'
                      id='Single'
                      value='Single'
                      checked={apType === 'Single'}
                      onChange={(e) =>
                        setData({
                          ...data,
                          apType: e.target.value,
                        })
                      }
                    />
                    <label htmlFor='Single'>Single</label>
                  </div>
                  <div>
                    <input
                      type='radio'
                      name='onwardTransportMode'
                      id='Couple'
                      value='Couple'
                      checked={apType === 'Couple'}
                      onChange={(e) =>
                        setData({
                          ...data,
                          apType: e.target.value,
                        })
                      }
                    />
                    <label htmlFor='Couple'>Couple</label>
                  </div>
                  <div>
                    <input
                      type='radio'
                      name='onwardTransportMode'
                      id='Group'
                      value='Group'
                      checked={apType === 'Group'}
                      onChange={(e) =>
                        setData({
                          ...data,
                          apType: e.target.value,
                        })
                      }
                    />
                    <label htmlFor='Group'>Group</label>
                  </div>
                </div>
              </div>
              <div className='virtual_step_1_main_inputs_input'>
                <label>date</label>
                <input
                  type='date'
                  value={date}
                  onChange={handleDateChange}
                  required
                />
              </div>
              <div className='virtual_step_1_main_inputs_input'>
                <label>book your slot</label>
                <select
                  disabled={!date}
                  value={time}
                  onChange={(e) =>
                    setData({
                      ...data,
                      time: e.target.value,
                    })
                  }>
                  <option value='' selected hidden>
                    Select
                  </option>
                  {times.map((t) => {
                    return (
                      <option
                        value={t}
                        disabled={
                          alotTime.includes(t) || dummySlot.includes(t)
                        }>
                        {alotTime.includes(t) || dummySlot.includes(t)
                          ? `${t} "Slot Booked"`
                          : t}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div>
              <button
                disabled={
                  name == '' ||
                  number == '' ||
                  date == '' ||
                  time == '' ||
                  apType == ''
                }
                className={
                  name == '' ||
                  number == '' ||
                  date == '' ||
                  time == '' ||
                  apType == ''
                    ? 'virtual_step_1_main_btn_dis'
                    : 'virtual_step_1_main_btn'
                }
                onClick={() => submit()}>
                Submit
              </button>
            </div>
          </div>
        );
      default:
        return step;
    }
  };

  return <div>{render()}</div>;
};

export default Virtual;
