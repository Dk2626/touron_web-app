import React, { useState, useRef, useEffect } from 'react';
import { firedb } from '../firebase';
import { Link } from 'react-router-dom';
import { Ellipsis } from 'react-spinners-css';
import { IoMdNotifications } from 'react-icons/io';
import numeral from 'numeral';
import moment from 'moment';

const BookingB2C = () => {
  const isMounted = useRef(false);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [loading1, setLoading1] = useState(false);
  const [currentPage, setCurrentpage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

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

  const filterBooking = () => {};

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
                              <h5>{bookingDetails[c].general.customerName}</h5>
                              <h5>{bookingDetails[c].general.destination}</h5>

                              <h5>
                                {numeral(
                                  bookingDetails[c].general.bookingValue
                                ).format('0,')}
                              </h5>

                              <h5>{bookingDetails[c].general.onwardDate}</h5>
                              <h5>{bookingDetails[c].general.returnDate}</h5>
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
                </>
              ) : (
                <>
                  <div>hjvjhv</div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingB2C;
