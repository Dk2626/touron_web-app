import React, { useState, useRef, useEffect, useContext } from 'react';
import { firedb } from '../firebase';
import { Link } from 'react-router-dom';
import { Ellipsis } from 'react-spinners-css';
import { IoMdNotifications } from 'react-icons/io';
import numeral from 'numeral';
import moment from 'moment';
import { ApiContext } from './../Context/ApiContext';

const BookingB2C = () => {
  const isMounted = useRef(false);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [loading1, setLoading1] = useState(false);
  const [currentPage, setCurrentpage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [bookingLength, setBookingLength] = useState([]);
  const [currentBooking, setCurrentBooking] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const { employees } = useContext(ApiContext);
  const [handleBy, setHandleBy] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    isMounted.current = true;
    setLoading1(true);
    firedb
      .ref('bookingdetails1')
      .limitToLast(currentPage * pageSize)
      .on('value', (data) => {
        if (isMounted.current) {
          if (data.val() === null || data.val() === undefined) {
            setLoading1(false);
            return;
          }
          if (data.val() !== null || data.val() !== undefined) {
            let newReq = {};
            let revReq = Object.keys(data.val()).reverse();
            revReq.forEach((i) => {
              newReq[i] = data.val()[i];
            });
            setBookingDetails({
              ...newReq,
            });
          }
        }
      });
    setLoading1(false);
    return () => (isMounted.current = false);
  }, [currentPage, pageSize]);

  const filterBooking = () => {
    if (search) {
      let srh = {};
      Object.keys(bookingLength).forEach((b, i) => {
        const { general, surveyId } = bookingLength[b];
        if (
          general.customerName
            ?.toString()
            .trim()
            .toLowerCase()
            .includes(search.trim().toLowerCase()) ||
          general.destination
            ?.toString()
            .trim()
            .toLowerCase()
            .includes(search.trim().toLowerCase()) ||
          surveyId
            ?.toString()
            .trim()
            .toLowerCase()
            .includes(search.trim().toLowerCase())
        ) {
          srh[b] = bookingDetails[b];
        }
      });
      return srh;
    } else {
    }
  };

  console.log('first', filterBooking());

  const completedtRequest = (returnDate, isBookingCancelled) => {
    const date = moment(returnDate);

    if (isBookingCancelled) return 'cancelled';

    if (moment() > date) return 'completed';

    return '';
  };

  const getDepatureDate = (date) => {
    const countDate = Date.parse(date);
    const now = new Date().getTime();
    const gap = countDate - now;
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const d = Math.floor(gap / day);
    if (d >= 0) return d;
    return 0;
  };

  const getBookingLength = () => {
    firedb.ref('bookingdetails1').on('value', (data) => {
      if (isMounted.current) {
        if (data.val() === null || data.val() === undefined) {
          setLoading1(false);
          return;
        }
        if (data.val() !== null || data.val() !== undefined) {
          let newReq = {};
          let revReq = Object.keys(data.val()).reverse();
          revReq.forEach((i) => {
            newReq[i] = data.val()[i];
          });
          setBookingLength({
            ...newReq,
          });
        }
      }
    });
  };

  useEffect(() => {
    isMounted.current = true;
    getBookingLength();
    return () => (isMounted.current = false);
  }, []);

  let pagesCount = Object.keys(bookingLength).length;

  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentpage(index);
  };

  var months = [
    'All',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const getMonth = (num) => {
    return months[num + 1];
  };

  return (
    <div>
      <div className='booking-container'>
        <div className='booking-name-container'>
          <div>
            <h3 style={{ color: '#666666' }}>Booking Management</h3>
          </div>
          <Link to='/bookingrecord' target='_blank'>
            <div className='add-booking'>
              <h6> + Add Booking</h6>
            </div>
          </Link>
        </div>
        <div className='booking-stats-container'>
          <div className='booking-stats'>
            <h3>Total booking</h3>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h6>{Object.keys(bookingLength).length}</h6>
              <span>Show</span>
            </div>
          </div>
          <div className='booking-stats'>
            <h3>Current Travelling</h3>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* <h6>{currentBookings().length}</h6> */}
              {/* <span onClick={() => setCurrentBooking('current')}>Show</span> */}
            </div>
          </div>
          <div className='booking-stats'>
            <h3>Upcoming travel in 7 Days</h3>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}>
              {/* <h6>{Object.keys(render('week', 7)).length}</h6> */}
              {/* <span onClick={() => setBMonth('07')}>Show</span> */}
            </div>
          </div>
          <div className='booking-stats'>
            <h3>Travellers in {getMonth(new Date().getMonth())}</h3>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* <span onClick={() => setBMonth(new Date().getMonth())}>Show</span> */}
            </div>
          </div>
        </div>
        <div className='filters'>
          <div className='month'>
            <label>Show Item : </label>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value)}>
              <option value='20'>20</option>
              <option value='50'>50</option>
              <option value='100'>100</option>
            </select>
          </div>
          <div className='month'>
            <label>Upcoming Travel in : </label>
            <select
            // value={upTravel}
            >
              <option value='' selected disabled hidden>
                select One
              </option>
              <option value='07'>7 Days</option>
              <option value='15'>15 Days</option>
            </select>
          </div>
          <div className='month'>
            <label>Year : </label>
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              <option value='2020'>2020</option>
              <option value='2021'>2021</option>
              <option value='2022'>2022</option>
              <option value='2023'>2023</option>
              <option value='2024'>2024</option>
              <option value='2025'>2025</option>
            </select>
          </div>
          <div className='month'>
            <label>Booked By Month : </label>
            <select>
              {months.map((m, i) => (
                <option key={i} value={m === 'All' ? 'All' : i - 1}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div className='month'>
            <label>Travel By Month : </label>
            <select>
              {months.map((m, i) => (
                <option key={i} value={m === 'All' ? 'All' : i - 1}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div className='month'>
            <label>Handle By : </label>
            <select
              onChange={(e) => {
                // setBMonth(`handle${e.target.value}`);
                setHandleBy(e.target.value);
              }}>
              <option value='All'>All</option>
              {employees?.map((e, i) => {
                if (
                  e.designation === 'CEO' ||
                  e.designation == 'Travel Associate'
                )
                  return (
                    <option key={i} value={e.name}>
                      {e.name}
                    </option>
                  );
              })}
            </select>
          </div>
          <div className='month'>
            <label>Search by Name / Dest / Id:</label>
            <input type='text' onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <div className='b-table'>
          <div
            className='table-heading-container'
            style={{
              backgroundColor: '#ddefff',
            }}>
            <h5>Sl.NO</h5>
            <h5>Survey Id</h5>
            <h5>Name</h5>
            <h5>Destination</h5>
            <h5>Booking Value</h5>
            <h5>Departure</h5>
            <h5>Return</h5>
            <h5>Departure in</h5>
            <h5>Handled By</h5>
            {/* <h5>Notification</h5> */}
          </div>
          {search === '' ? (
            <>
              {loading1 ? (
                <div className='req-lo'>
                  Fetching Data <Ellipsis color='#0057ff' />
                </div>
              ) : (
                <>
                  {bookingDetails.length !== 0 ? (
                    <>
                      {Object.keys(bookingDetails)
                        .slice(
                          (currentPage === 1 ? 0 : currentPage - 1) * pageSize,
                          currentPage * pageSize
                        )
                        .map((c, i) => {
                          return (
                            <div>
                              <Link
                                target='_blank'
                                className='plink'
                                key={i}
                                to={{
                                  pathname: `/bookingrecord/${c}/${bookingDetails[c]?.general?.customerName}`,
                                }}>
                                <div
                                  style={{
                                    fontSize: 6,
                                    backgroundColor:
                                      bookingDetails[c].general.tourType ===
                                      'International'
                                        ? '#E5D68A'
                                        : '#fff',
                                    position: 'relative',
                                  }}
                                  className={`table-heading-row  ${completedtRequest(
                                    bookingDetails[c].general.returnDate,
                                    bookingDetails[c].general.isBookingCancelled
                                  )}`}>
                                  <h5>{i + 1}</h5>
                                  <h5>{bookingDetails[c]?.surveyId}</h5>
                                  <h5>
                                    {bookingDetails[c].general.customerName}
                                  </h5>
                                  <h5>
                                    {bookingDetails[c].general.destination}
                                  </h5>

                                  <h5>
                                    {numeral(
                                      bookingDetails[c].general.bookingValue
                                    ).format('0,')}
                                  </h5>

                                  <h5>
                                    {bookingDetails[c].general.onwardDate}
                                  </h5>
                                  <h5>
                                    {bookingDetails[c].general.returnDate}
                                  </h5>
                                  <h5>
                                    {getDepatureDate(
                                      bookingDetails[c].general.onwardDate
                                    )}{' '}
                                    days
                                  </h5>

                                  <h5>
                                    {bookingDetails[c].general.salesHandleName}
                                  </h5>
                                  {/* <h5 className='notifyIcon'>
                                <IoMdNotifications size={25} />

                                {getRemindersCount(
                                  bookingDetails[c].reminders
                                )[0] === 0 ? null : (
                                  <span className='notifyValue'>
                                    {
                                      getRemindersCount(
                                        bookingDetails[c].reminders
                                      )[0]
                                    }
                                  </span>
                                )}

                                {getRemindersCount(
                                  bookingDetails[c].reminders
                                )[1].length > 0 && (
                                  <div className='notifyReminder'>
                                    {getRemindersCount(
                                      bookingDetails[c].reminders
                                    )[1].map((s, i) => (
                                      <span>
                                        {i + 1}.{s}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </h5> */}
                                </div>
                              </Link>
                            </div>
                          );
                        })}
                      <div className='pagination-table'>
                        {currentPage === 1 ? null : (
                          <div
                            className='pag-count'
                            onClick={(e) => {
                              handleClick(e, currentPage - 1);
                            }}
                            style={{
                              backgroundColor: '#0057ff',
                              color: '#fff',
                            }}>
                            <h5>{'<'}</h5>
                          </div>
                        )}
                        {new Array(pagesCount).fill('1').map((c, i) => {
                          if (i + 1 < currentPage + 5 && i > currentPage - 2) {
                            return (
                              <div
                                key={i}
                                className='pag-count'
                                onClick={(e) => handleClick(e, i + 1)}
                                style={{
                                  backgroundColor:
                                    currentPage - 1 === i ? '#0057ff' : '#fff',
                                  color:
                                    currentPage - 1 === i ? '#fff' : '#333',
                                }}>
                                <h5>{i + 1}</h5>
                              </div>
                            );
                          }
                        })}
                        {pagesCount - 1 === currentPage ? null : (
                          <div
                            className='pag-count'
                            onClick={(e) => handleClick(e, currentPage + 1)}
                            style={{
                              backgroundColor: '#0057ff',
                              color: '#fff',
                            }}>
                            <h5>{'>'}</h5>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <tr>
                      <div className='noFind'>No Booking details found</div>
                    </tr>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {Object.keys(filterBooking()).map((c, i) => {
                const df = bookingLength[c];
                console.log('v', df);

                return (
                  <div>
                    <div>sds</div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingB2C;
