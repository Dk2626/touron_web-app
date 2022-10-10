import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { ApiContext } from '../Context/ApiContext';
import moment from 'moment';
import { firedb } from '../firebase';
import '../SalesAdmin component/SalesRequest.css';
import './TotalSaleReport.css';
import { IoIosArrowDown } from 'react-icons/io';
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend
);

const TotalSaleReport = () => {
  const isMounted = useRef(false);
  const { employees } = useContext(ApiContext);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [requestDetails, setRequestDetails] = useState([]);
  const [bookedData, setBookedData] = useState([]);
  const [bookedValueData, setBookedValueData] = useState([]);
  const [bookedMarginValueData, setBookedMarginValueData] = useState([]);
  const [onwardData, setOnwardData] = useState([]);
  const [reqBookedData, setReqBookedData] = useState([]);
  const [bookCancelled, setBookCancelled] = useState([]);
  const [bookingState, setBookingState] = useState('');
  const [showBookingState, setShowBookingState] = useState(false);
  const [bookingStateYear, setBookingStateYear] = useState('');
  const [showBookingStateYear, setShowBookingStateYear] = useState(false);
  const [bookingValue, setBookingValue] = useState('');
  const [showBookingValue, setShowBookingValue] = useState(false);
  const [bookingValueYear, setBookingValueYear] = useState('');
  const [showBookingValueYear, setShowBookingValueYear] = useState(false);
  const [marginBookingValue, setMarginBookingValue] = useState('');
  const [showMarginBookingValue, setShowMarginBookingValue] = useState(false);
  const [marginBookingValueYear, setMarginBookingValueYear] = useState('');
  const [showMarginBookingValueYear, setShowMarginBookingValueYear] =
    useState(false);
  const [travelState, setTravelState] = useState('');
  const [showTravelState, setShowTravelState] = useState(false);
  const [travelStateYear, setTravelStateYear] = useState('');
  const [showTravelStateYear, setShowTravelStateYear] = useState(false);
  const [requestValue, setRequestValue] = useState('');
  const [showRequestValue, setShowRequestValue] = useState(false);
  const [requestValueYear, setRequestValueYear] = useState('');
  const [showRequestValueYear, setShowRequestValueYear] = useState(false);
  const [reqData, setReqData] = useState([
    {
      name: 'January',
      val: [],
    },
    {
      name: 'Feburary',
      val: [],
    },
    {
      name: 'March',
      val: [],
    },
    {
      name: 'April',
      val: [],
    },
    {
      name: 'May',
      val: [],
    },
    {
      name: 'June',
      val: [],
    },
    {
      name: 'July',
      val: [],
    },
    {
      name: 'August',
      val: [],
    },
    {
      name: 'September',
      val: [],
    },
    {
      name: 'October',
      val: [],
    },
    {
      name: 'November',
      val: [],
    },
    {
      name: 'December',
      val: [],
    },
  ]);
  const [loader, setLoader] = useState(false);

  const empl = employees
    .filter(
      (a) => a.designation === 'CEO' || a.designation == 'Travel Associate'
    )
    .map((a) => a.name);
  const years = ['All', '2020', '2021', '2022', '2023', '2024', '2025'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const empNames = ['All', ...empl];

  let month = [
    {
      name: 'January',
      val: [],
    },
    {
      name: 'Feburary',
      val: [],
    },
    {
      name: 'March',
      val: [],
    },
    {
      name: 'April',
      val: [],
    },
    {
      name: 'May',
      val: [],
    },
    {
      name: 'June',
      val: [],
    },
    {
      name: 'July',
      val: [],
    },
    {
      name: 'August',
      val: [],
    },
    {
      name: 'September',
      val: [],
    },
    {
      name: 'October',
      val: [],
    },
    {
      name: 'November',
      val: [],
    },
    {
      name: 'December',
      val: [],
    },
  ];
  let month1 = [
    {
      name: 'January',
      val: [],
    },
    {
      name: 'Feburary',
      val: [],
    },
    {
      name: 'March',
      val: [],
    },
    {
      name: 'April',
      val: [],
    },
    {
      name: 'May',
      val: [],
    },
    {
      name: 'June',
      val: [],
    },
    {
      name: 'July',
      val: [],
    },
    {
      name: 'August',
      val: [],
    },
    {
      name: 'September',
      val: [],
    },
    {
      name: 'October',
      val: [],
    },
    {
      name: 'November',
      val: [],
    },
    {
      name: 'December',
      val: [],
    },
  ];

  let month2 = [
    {
      name: 'January',
      val: [],
    },
    {
      name: 'Feburary',
      val: [],
    },
    {
      name: 'March',
      val: [],
    },
    {
      name: 'April',
      val: [],
    },
    {
      name: 'May',
      val: [],
    },
    {
      name: 'June',
      val: [],
    },
    {
      name: 'July',
      val: [],
    },
    {
      name: 'August',
      val: [],
    },
    {
      name: 'September',
      val: [],
    },
    {
      name: 'October',
      val: [],
    },
    {
      name: 'November',
      val: [],
    },
    {
      name: 'December',
      val: [],
    },
  ];

  let month3 = [
    {
      name: 'January',
      val: [],
    },
    {
      name: 'Feburary',
      val: [],
    },
    {
      name: 'March',
      val: [],
    },
    {
      name: 'April',
      val: [],
    },
    {
      name: 'May',
      val: [],
    },
    {
      name: 'June',
      val: [],
    },
    {
      name: 'July',
      val: [],
    },
    {
      name: 'August',
      val: [],
    },
    {
      name: 'September',
      val: [],
    },
    {
      name: 'October',
      val: [],
    },
    {
      name: 'November',
      val: [],
    },
    {
      name: 'December',
      val: [],
    },
  ];

  const getAllBookingDetail = () => {
    setLoader(true);
    let booking = [];
    firedb.ref('bookingdetails1').on('value', (data) => {
      if (isMounted.current) {
        if (data.val() === null || data.val() === undefined) {
          return;
        }
        data.forEach((i) => {
          if (
            i.val().general.bookedDate !== '' &&
            i.val().general.onwardDate !== ''
          ) {
            let booked = moment(i.val().general.bookedDate).month();
            let onward = moment(i.val().general.onwardDate).month();
            if (!i.val().general.isBookingCancelled) {
              month[booked].val.push(i.val());
              month1[onward].val.push(i.val());
            }
            if (i.val().general.isBookingCancelled) {
              month3[booked].val.push(i.val());
            }
            booking.push(i.val());
          }
        });

        setBookedValueData(month);
        setBookedData(month);
        setBookingDetails(booking);
        setReqBookedData(month);
        setOnwardData(month1);
        setBookedMarginValueData(month1);
        setBookCancelled(month3);
        setLoader(false);
        // setBookedData([...month])
        // setReqBookedData([...month])
        // setOnwardData([...month1])
        // setBookCancelled([...month3])
      }
    });
  };

  useEffect(() => {
    isMounted.current = true;
    getAllBookingDetail();
    return () => (isMounted.current = false);
  }, []);

  const salesBook = (s) => {
    bookingDetails.forEach((c, i) => {
      month.forEach((m, index) => {
        if (s === 'All') {
          if (
            index === moment(c.general.bookedDate).month() &&
            bookingStateYear === moment(c.general.bookedDate).format('YYYY') &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        } else {
          if (
            index === moment(c.general.bookedDate).month() &&
            c.general.salesHandleName === s &&
            bookingStateYear === moment(c.general.bookedDate).format('YYYY') &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        }
      });
    });
    // setBookedData([...month])
    setBookedData(month);
    return month;
  };

  const salesBookCount = (s) => {
    let count = [];
    bookingDetails.forEach((c, i) => {
      if (
        c.general.salesHandleName === s &&
        c.general.isBookingCancelled === false
      ) {
        count.push(c);
      }
    });
    return count;
  };

  const salesYear = (s) => {
    bookingDetails.forEach((c, i) => {
      month.forEach((m, index) => {
        if (s === 'All') {
          if (
            index === moment(c.general.bookedDate).month() &&
            bookingState === c.general.salesHandleName &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        } else {
          if (
            index === moment(c.general.bookedDate).month() &&
            s === moment(c.general.bookedDate).format('YYYY') &&
            bookingState === c.general.salesHandleName &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        }
      });
    });
    // setBookedData([...month])
    setBookedData(month);
    return month;
  };

  const salesBookValue = (s) => {
    bookingDetails.forEach((c, i) => {
      month.forEach((m, index) => {
        if (s === 'All') {
          if (
            index === moment(c.general.bookedDate).month() &&
            bookingValueYear === moment(c.general.bookedDate).format('YYYY') &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        } else {
          if (
            index === moment(c.general.bookedDate).month() &&
            c.general.salesHandleName === s &&
            bookingValueYear === moment(c.general.bookedDate).format('YYYY') &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        }
      });
    });
    // setBookedValueData([...month])
    setBookedValueData(month);
    return month;
  };

  const salesYearBookValue = (s) => {
    bookingDetails.forEach((c, i) => {
      month.forEach((m, index) => {
        if (s === 'All') {
          if (
            index === moment(c.general.bookedDate).month() &&
            bookingValue === c.general.salesHandleName &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        } else {
          if (
            index === moment(c.general.bookedDate).month() &&
            s === moment(c.general.bookedDate).format('YYYY') &&
            bookingValue === c.general.salesHandleName &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        }
      });
    });
    // setBookedValueData([...month])
    setBookedValueData(month);
    return month;
  };

  const salesTravelCount = (s) => {
    let count = [];
    bookingDetails.forEach((c, i) => {
      if (
        c.general.salesHandleName === s &&
        c.general.onwardDate &&
        c.general.isBookingCancelled === false
      ) {
        count.push(c);
      }
    });
    return count;
  };

  const salesTravelValue = (s) => {
    bookingDetails.forEach((c, i) => {
      month1.forEach((m, index) => {
        if (s === 'All') {
          if (
            index === moment(c.general.onwardDate).month() &&
            travelStateYear === moment(c.general.onwardDate).format('YYYY') &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        } else {
          if (
            index === moment(c.general.onwardDate).month() &&
            c.general.salesHandleName === s &&
            travelStateYear === moment(c.general.onwardDate).format('YYYY') &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        }
      });
    });
    // setOnwardData([...month1])
    setOnwardData(month1);
    return month1;
  };

  const salesYearTravelValue = (s) => {
    bookingDetails.forEach((c, i) => {
      month1.forEach((m, index) => {
        if (s === 'All') {
          if (
            index === moment(c.general.onwardDate).month() &&
            travelState === c.general.salesHandleName &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        } else {
          if (
            index === moment(c.general.onwardDate).month() &&
            s === moment(c.general.onwardDate).format('YYYY') &&
            travelState === c.general.salesHandleName &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        }
      });
    });
    // setOnwardData([...month1])
    setOnwardData(month1);
    return month1;
  };

  const salesMarginBookValue = (s) => {
    bookingDetails.forEach((c, i) => {
      month1.forEach((m, index) => {
        if (s === 'All') {
          if (
            index === moment(c.general.onwardDate).month() &&
            marginBookingValueYear ===
              moment(c.general.onwardDate).format('YYYY') &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        } else {
          if (
            index === moment(c.general.onwardDate).month() &&
            c.general.salesHandleName === s &&
            marginBookingValueYear ===
              moment(c.general.onwardDate).format('YYYY') &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        }
      });
    });
    // setBookedMarginValueData([...month])
    setBookedMarginValueData(month1);
    return month1;
  };

  const salesYearMarginBookValue = (s) => {
    bookingDetails.forEach((c, i) => {
      month1.forEach((m, index) => {
        if (s === 'All') {
          if (
            index === moment(c.general.onwardDate).month() &&
            marginBookingValue === c.general.salesHandleName &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        } else {
          if (
            index === moment(c.general.onwardDate).month() &&
            s === moment(c.general.onwardDate).format('YYYY') &&
            marginBookingValue === c.general.salesHandleName &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        }
      });
    });
    // setBookedMarginValueData([...month])
    setBookedMarginValueData(month1);
    return month1;
  };

  const salesReqBook = (s) => {
    bookingDetails.forEach((c, i) => {
      month.forEach((m, index) => {
        if (s === 'All') {
          if (
            index === moment(c.general.bookedDate).month() &&
            requestValueYear === moment(c.general.bookedDate).format('YYYY') &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        } else {
          if (
            index === moment(c.general.bookedDate).month() &&
            c.general.salesHandleName === s &&
            requestValueYear === moment(c.general.bookedDate).format('YYYY') &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        }
      });
    });
    // setReqBookedData([...month])
    setReqBookedData(month);
    return month;
  };

  const salesReqCount = (s) => {
    let count = [];
    requestDetails.forEach((c, i) => {
      if (c.salesHandleName === s && c.requestDate) {
        count.push(c);
      }
    });
    return count;
  };

  const salesReqBookCount = (s) => {
    let count = [];
    bookingDetails.forEach((c, i) => {
      if (
        c.general.salesHandleName === s &&
        c.general.isBookingCancelled === false
      ) {
        count.push(c);
      }
    });
    return count;
  };

  const salesReqBookCountCancel = (s) => {
    let count = [];
    bookingDetails.forEach((c, i) => {
      if (
        c.general.salesHandleName === s &&
        c.general.isBookingCancelled === true
      ) {
        count.push(c);
      }
    });
    return count;
  };

  const salesYearReqBook = (s) => {
    bookingDetails.forEach((c, i) => {
      month.forEach((m, index) => {
        if (s === 'All') {
          if (
            index === moment(c.general.bookedDate).month() &&
            requestValue === c.general.salesHandleName &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        } else {
          if (
            index === moment(c.general.bookedDate).month() &&
            s === moment(c.general.bookedDate).format('YYYY') &&
            requestValue === c.general.salesHandleName &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        }
      });
    });
    // setReqBookedData([...month])
    setReqBookedData(month);
    return month;
  };

  const salesReqBookCancelled = (s) => {
    bookingDetails.forEach((c, i) => {
      month3.forEach((m, index) => {
        if (s === 'All') {
          if (
            index === moment(c.general.bookedDate).month() &&
            requestValueYear === moment(c.general.bookedDate).format('YYYY') &&
            c.general.isBookingCancelled === true
          ) {
            m.val.push(c);
          }
        } else {
          if (
            index === moment(c.general.bookedDate).month() &&
            c.general.salesHandleName === s &&
            requestValueYear === moment(c.general.bookedDate).format('YYYY') &&
            c.general.isBookingCancelled === true
          ) {
            m.val.push(c);
          }
        }
      });
    });
    //  setBookCancelled([...month3])
    setBookCancelled(month3);
    return month3;
  };

  const salesYearReqBookCancelled = (s) => {
    bookingDetails.forEach((c, i) => {
      month3.forEach((m, index) => {
        if (s === 'All') {
          if (
            index === moment(c.general.bookedDate).month() &&
            requestValue === c.general.salesHandleName &&
            c.general.isBookingCancelled === true
          ) {
            m.val.push(c);
          }
        } else {
          if (
            index === moment(c.general.bookedDate).month() &&
            s === moment(c.general.bookedDate).format('YYYY') &&
            requestValue === c.general.salesHandleName &&
            c.general.isBookingCancelled === true
          ) {
            m.val.push(c);
          }
        }
      });
    });
    // setBookCancelled([...month3])
    setBookCancelled(month3);
    return month3;
  };

  const getAmount = (data) => {
    // console.log(`data`, data)
    let value = 0;
    if (data) {
      data.forEach(
        (d, i) => (value = value + parseInt(d.general.bookingValue))
      );
    }
    return value;
  };

  const getMarginAmount = (data) => {
    let value = 0;
    if (data) {
      data.forEach((d) => {
        if (d.general.finalMargin !== '') {
          value = value + parseInt(d.general.finalMargin);
        }
      });
      return value;
    }
  };

  const options = {
    scales: {
      xAxes: [
        {
          gridLines: {
            color: 'rgba(0, 0, 0, 0)',
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            color: 'rgba(0, 0, 0, 0)',
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      <div style={{ textAlign: 'center', margin: '10px' }}>
        <h3 style={{ fontFamily: 'Andika', fontWeight: 'bold' }}>
          Total Sales Report
        </h3>
      </div>
      <div className='booking__count-container'>
        <div className='booking__count-doughnut'>
          <div className='booking--header'>
            <h1 className='booking__count--header'>No Of Booking Per Person</h1>
          </div>
          <div className='pie--chart'>
            <Pie
              data={{
                labels: empNames.slice(1),
                datasets: [
                  {
                    label: 'No of booking',
                    data: empNames
                      .slice(1)
                      .map((a) => salesBookCount(a).length),
                    backgroundColor: [
                      '#ffa600',
                      '#003f5c',
                      '#bc5090',
                      '#50DBB4',
                      '#FC766AF',
                      '#3DBE29',
                    ],
                  },
                ],
              }}
              height={300}
              width={300}
            />
          </div>
        </div>
        <div className='booking__count-bar'>
          <div className='booking--header'>
            <h1 className='booking__count--header'>No Of Booking Per Month</h1>
            <div className='month'>
              <label>Show For</label>
              <div
                className='bookState'
                onClick={() => {
                  setShowBookingState(!showBookingState);
                  setShowBookingStateYear(false);
                  setShowBookingValue(false);
                  setShowBookingValueYear(false);
                  setShowTravelState(false);
                  setShowTravelStateYear(false);
                  setShowRequestValue(false);
                  setShowRequestValueYear(false);
                  setShowMarginBookingValue(false);
                  setShowMarginBookingValueYear(false);
                }}>
                {bookingState ? (
                  <div className='icon-select'>
                    <div>{bookingState}</div>
                    <IoIosArrowDown />
                  </div>
                ) : (
                  <div className='icon-select'>
                    <div>All</div>
                    <IoIosArrowDown />
                  </div>
                )}
              </div>
              {showBookingState && (
                <div className='select_option'>
                  {empNames.map((name, i) => {
                    return (
                      <li
                        key={i}
                        onClick={() => {
                          setShowBookingState(!showBookingState);
                          salesBook(name);
                          setBookingState(name);
                          // setBookingStateYear("All")
                        }}>
                        {name}
                      </li>
                    );
                  })}
                </div>
              )}
            </div>
            <div className='month'>
              <label>Year</label>
              <div
                className='bookState'
                onClick={() => {
                  setShowBookingStateYear(!showBookingStateYear);
                  setShowBookingState(false);
                  setShowBookingValue(false);
                  setShowBookingValueYear(false);
                  setShowTravelState(false);
                  setShowTravelStateYear(false);
                  setShowRequestValue(false);
                  setShowRequestValueYear(false);
                  setShowMarginBookingValue(false);
                  setShowMarginBookingValueYear(false);
                }}>
                {bookingStateYear ? (
                  <div className='icon-select'>
                    <div>{bookingStateYear}</div>
                    <IoIosArrowDown />
                  </div>
                ) : (
                  <div className='icon-select'>
                    <div>All</div>
                    <IoIosArrowDown />
                  </div>
                )}
              </div>
              {showBookingStateYear && (
                <div className='select_optionn'>
                  {years.map((y, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        salesYear(y);
                        setShowBookingStateYear(!showBookingStateYear);
                        setBookingStateYear(y);
                        // setBookingState("All")
                      }}>
                      {y}
                    </li>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className='bar--chart'>
            <Bar
              data={{
                labels: months,
                datasets: [
                  {
                    label: 'No of booking:',
                    data: bookedData.map((a) => a.val.length),
                    backgroundColor: '#FC766AFF',
                  },
                ],
              }}
              options={options}
            />
          </div>
        </div>
      </div>
      <div className='booking__count-container'>
        <div className='booking__count-doughnut'>
          <div className='booking--header'>
            <h1 className='booking__count--header'>Sales Volume Per Person</h1>
          </div>
          <div className='pie--chart'>
            <Pie
              data={{
                labels: empNames.slice(1),
                datasets: [
                  {
                    label: 'No of booking',
                    data: empNames
                      .slice(1)
                      .map((a) => getAmount(salesBookCount(a))),
                    backgroundColor: [
                      '#ffa600',
                      '#003f5c',
                      '#bc5090',
                      '#50DBB4',
                      '#FC766AF',
                      '#3DBE29',
                    ],
                  },
                ],
              }}
              height={300}
              width={300}
            />
          </div>
        </div>
        <div className='booking__count-bar'>
          <div className='booking--header'>
            <h1 className='booking__count--header'>Booking Value</h1>
            <div className='month'>
              <label>Show For</label>
              <div
                className='bookState'
                onClick={() => {
                  setShowBookingValue(!showBookingValue);
                  setShowBookingState(false);
                  setShowBookingStateYear(false);
                  setShowBookingValueYear(false);
                  setShowTravelState(false);
                  setShowTravelStateYear(false);
                  setShowRequestValue(false);
                  setShowRequestValueYear(false);
                  setShowMarginBookingValueYear(false);
                  setShowMarginBookingValue(false);
                }}>
                {bookingValue ? (
                  <div className='icon-select'>
                    <div>{bookingValue}</div>
                    <IoIosArrowDown />
                  </div>
                ) : (
                  <div className='icon-select'>
                    <div>All</div>
                    <IoIosArrowDown />
                  </div>
                )}
              </div>
              {showBookingValue && (
                <div className='select_option'>
                  {empNames.map((name, i) => {
                    return (
                      <li
                        key={i}
                        onClick={() => {
                          setShowBookingValue(!showBookingValue);
                          salesBookValue(name);
                          setBookingValue(name);
                          // setBookingValueYear("All")
                        }}>
                        {name}
                      </li>
                    );
                  })}
                </div>
              )}
            </div>
            <div className='month'>
              <label>Year</label>
              <div
                className='bookState'
                onClick={() => {
                  setShowBookingValueYear(!showBookingValueYear);
                  setShowBookingState(false);
                  setShowBookingStateYear(false);
                  setShowBookingValue(false);
                  setShowTravelState(false);
                  setShowTravelStateYear(false);
                  setShowRequestValue(false);
                  setShowRequestValueYear(false);
                  setShowMarginBookingValueYear(false);
                  setShowMarginBookingValue(false);
                }}>
                {bookingValueYear ? (
                  <div className='icon-select'>
                    <div>{bookingValueYear}</div>
                    <IoIosArrowDown />
                  </div>
                ) : (
                  <div className='icon-select'>
                    <div>All</div>
                    <IoIosArrowDown />
                  </div>
                )}
              </div>
              {showBookingValueYear && (
                <div className='select_optionn'>
                  {years.map((y, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        salesYearBookValue(y);
                        setShowBookingValueYear(!showBookingValueYear);
                        setBookingValueYear(y);
                        // setBookingValue("All")
                      }}>
                      {y}
                    </li>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className='bar--chart'>
            <Bar
              data={{
                labels: months,
                datasets: [
                  {
                    label: 'Total Booking Value :',

                    data: bookedValueData.map((b) => getAmount(b?.val)),
                    backgroundColor: '#101820FF',
                  },
                ],
              }}
              options={options}
            />
          </div>
        </div>
      </div>
      <div className='booking__count-container'>
        <div className='booking__count-doughnut'>
          <div className='booking--header'>
            <h1 className='booking__count--header'>
              No Of Travellers Per Person
            </h1>
          </div>
          <div className='pie--chart'>
            <Pie
              data={{
                labels: empNames.slice(1),
                datasets: [
                  {
                    label: 'No of booking',
                    data: empNames
                      .slice(1)
                      .map((a) => salesTravelCount(a).length),
                    backgroundColor: [
                      '#ffa600',
                      '#003f5c',
                      '#bc5090',
                      '#50DBB4',
                      '#FC766AF',
                      '#3DBE29',
                    ],
                  },
                ],
              }}
              height={300}
              width={300}
            />
          </div>
        </div>
        <div className='booking__count-bar'>
          <div className='booking--header'>
            <h1 className='booking__count--header'>
              No Of Travellers Per Month
            </h1>
            <div className='month'>
              <label>Show For</label>
              <div
                className='bookState'
                onClick={() => {
                  setShowTravelState(!showTravelState);
                  setShowBookingState(false);
                  setShowBookingStateYear(false);
                  setShowBookingValue(false);
                  setShowBookingValueYear(false);
                  setShowTravelStateYear(false);
                  setShowRequestValue(false);
                  setShowRequestValueYear(false);
                  setShowMarginBookingValue(false);
                  setShowMarginBookingValueYear(false);
                }}>
                {travelState ? (
                  <div className='icon-select'>
                    <div>{travelState}</div>
                    <IoIosArrowDown />
                  </div>
                ) : (
                  <div className='icon-select'>
                    <div>All</div>
                    <IoIosArrowDown />
                  </div>
                )}
              </div>
              {showTravelState && (
                <div className='select_option'>
                  {empNames.map((name, i) => {
                    return (
                      <li
                        key={i}
                        onClick={() => {
                          setShowTravelState(!showTravelState);
                          salesTravelValue(name);
                          setTravelState(name);
                          // setTravelStateYear("All")
                        }}>
                        {name}
                      </li>
                    );
                  })}
                </div>
              )}
            </div>
            <div className='month'>
              <label>Year</label>
              <div
                className='bookState'
                onClick={() => {
                  setShowTravelStateYear(!showTravelStateYear);
                  setShowBookingState(false);
                  setShowBookingStateYear(false);
                  setShowBookingValue(false);
                  setShowBookingValueYear(false);
                  setShowTravelState(false);
                  setShowRequestValue(false);
                  setShowRequestValueYear(false);
                  setShowMarginBookingValue(false);
                  setShowMarginBookingValueYear(false);
                }}>
                {travelStateYear ? (
                  <div className='icon-select'>
                    <div>{travelStateYear}</div>
                    <IoIosArrowDown />
                  </div>
                ) : (
                  <div className='icon-select'>
                    <div>All</div>
                    <IoIosArrowDown />
                  </div>
                )}
              </div>
              {showTravelStateYear && (
                <div className='select_optionn'>
                  {years.map((y, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        salesYearTravelValue(y);
                        setShowTravelStateYear(!showTravelStateYear);
                        setTravelStateYear(y);
                        // setTravelState("All")
                      }}>
                      {y}
                    </li>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className='bar--chart'>
            <Bar
              data={{
                labels: months,
                datasets: [
                  {
                    label: 'No of Travellers : ',
                    data: onwardData.map((a) => a.val.length),
                    backgroundColor: '#FEE715FF',
                  },
                ],
              }}
              options={options}
            />
          </div>
        </div>
      </div>
      <div className='booking__count-container'>
        <div className='booking__count-doughnut'>
          <div className='booking--header'>
            <h1 className='booking__count--header'>Margin Volume Per Person</h1>
          </div>
          <div className='pie--chart'>
            <Pie
              data={{
                labels: empNames.slice(1),
                datasets: [
                  {
                    label: 'No of booking',
                    data: empNames
                      .slice(1)
                      .map((a) => getMarginAmount(salesBookCount(a))),
                    backgroundColor: [
                      '#ffa600',
                      '#003f5c',
                      '#bc5090',
                      '#50DBB4',
                      '#FC766AF',
                      '#3DBE29',
                    ],
                  },
                ],
              }}
              height={300}
              width={300}
            />
          </div>
        </div>
        <div className='booking__count-bar'>
          <div className='booking--header'>
            <h1 className='booking__count--header'>Margin Value</h1>

            {/* {exportYear.length == 4 ? (
              <>
                <div>
                  <ExcelFile
                    element={
                      <button className='exports'>Export to Excel</button>
                    }>
                    <ExcelSheet data={getExcel()} name='Queries'>
                      <ExcelColumn label='Name' value='name' />
                      <ExcelColumn label='Year' value='year' />
                      <ExcelColumn label='Jan' value='jan' />
                      <ExcelColumn label='Feb' value='feb' />
                      <ExcelColumn label='Mar' value='mar' />
                      <ExcelColumn label='Aprl' value='apr' />
                      <ExcelColumn label='May' value='may' />
                      <ExcelColumn label='Jun' value='jun' />
                      <ExcelColumn label='Jul' value='jul' />
                      <ExcelColumn label='Aug' value='aug' />
                      <ExcelColumn label='Sep' value='sep' />
                      <ExcelColumn label='Oct' value='oct' />
                      <ExcelColumn label='Nov' value='nov' />
                      <ExcelColumn label='Dec' value='dec' />
                    </ExcelSheet>
                  </ExcelFile>
                </div>
              </>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h6 style={{ paddingRight: '10px' }}>Enter year to export</h6>
                <input
                  type='number'
                  min='1'
                  max='999'
                  placeholder='2021'
                  onChange={(e) => setExportYear(e.target.value)}
                />
              </div>
            )} */}

            <div className='month'>
              <label>Show For</label>
              <div
                className='bookState'
                onClick={() => {
                  setShowMarginBookingValue(!showMarginBookingValue);
                  setShowMarginBookingValueYear(false);
                  setShowBookingState(false);
                  setShowBookingStateYear(false);
                  setShowBookingValue(false);
                  setShowBookingValueYear(false);
                  setShowTravelState(false);
                  setShowTravelStateYear(false);
                  setShowRequestValue(false);
                  setShowRequestValueYear(false);
                }}>
                {marginBookingValue ? (
                  <div className='icon-select'>
                    <div>{marginBookingValue}</div>
                    <IoIosArrowDown />
                  </div>
                ) : (
                  <div className='icon-select'>
                    <div>All</div>
                    <IoIosArrowDown />
                  </div>
                )}
              </div>
              {showMarginBookingValue && (
                <div className='select_option'>
                  {empNames.map((name, i) => {
                    return (
                      <li
                        key={i}
                        onClick={() => {
                          setShowMarginBookingValue(!showMarginBookingValue);
                          salesMarginBookValue(name);
                          setMarginBookingValue(name);
                        }}>
                        {name}
                      </li>
                    );
                  })}
                </div>
              )}
            </div>
            <div className='month'>
              <label>Year</label>
              <div
                className='bookState'
                onClick={() => {
                  setShowMarginBookingValueYear(!showMarginBookingValueYear);
                  setShowMarginBookingValue(false);
                  setShowBookingState(false);
                  setShowBookingStateYear(false);
                  setShowBookingValue(false);
                  setShowBookingValueYear(false);
                  setShowTravelState(false);
                  setShowTravelStateYear(false);
                  setShowRequestValue(false);
                  setShowRequestValueYear(false);
                }}>
                {marginBookingValueYear ? (
                  <div className='icon-select'>
                    <div>{marginBookingValueYear}</div>
                    <IoIosArrowDown />
                  </div>
                ) : (
                  <div className='icon-select'>
                    <div>All</div>
                    <IoIosArrowDown />
                  </div>
                )}
              </div>
              {showMarginBookingValueYear && (
                <div className='select_optionn'>
                  {years.map((y, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        setShowMarginBookingValueYear(
                          !showMarginBookingValueYear
                        );
                        salesYearMarginBookValue(y);
                        setMarginBookingValueYear(y);
                      }}>
                      {y}
                    </li>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className='bar--chart'>
            <Bar
              data={{
                labels: months,
                datasets: [
                  {
                    label: 'Total Margin Value :',

                    data: bookedMarginValueData.map((b) =>
                      getMarginAmount(b?.val)
                    ),
                    backgroundColor: '#6A1B4D',
                  },
                ],
              }}
              options={options}
            />
          </div>
        </div>
      </div>
      <div className='booking__count-container'>
        <div className='booking__count-doughnut'>
          <div className='booking--header'>
            <h1 className='booking__count--header'>Sales Volume Comparison</h1>
          </div>
          <div className='pie--chart'>
            <Pie
              data={{
                labels: empNames.slice(1),
                datasets: [
                  {
                    label: 'No of Request',
                    data: empNames.slice(1).map((a) => salesReqCount(a).length),
                    backgroundColor: [
                      '#ffa600',
                      '#003f5c',
                      '#bc5090',
                      '#50DBB4',
                      '#FC766AF',
                      '#3DBE29',
                    ],
                  },
                  {
                    label: 'No of booking ',
                    data: empNames
                      .slice(1)
                      .map((a) => salesReqBookCount(a).length),

                    backgroundColor: [
                      '#ffa600',
                      '#003f5c',
                      '#bc5090',
                      '#50DBB4',
                      '#FC766AF',
                      '#3DBE29',
                    ],
                  },
                  {
                    label: 'No of booking cancelled ',
                    data: empNames
                      .slice(1)
                      .map((a) => salesReqBookCountCancel(a).length),

                    backgroundColor: [
                      '#ffa600',
                      '#003f5c',
                      '#bc5090',
                      '#f7f7f7',
                      '#50DBB4',
                    ],
                  },
                ],
              }}
              height={300}
              width={300}
            />
          </div>
        </div>
        <div className='booking__count-bar'>
          <div className='booking--header'>
            <h1 className='booking__count--header'>Comparisons</h1>
            <div className='month'>
              <label>Show For</label>
              <div
                className='bookState'
                onClick={() => {
                  setShowRequestValue(!showRequestValue);
                  setShowBookingState(false);
                  setShowBookingStateYear(false);
                  setShowBookingValue(false);
                  setShowBookingValueYear(false);
                  setShowTravelState(false);
                  setShowTravelStateYear(false);
                  setShowRequestValueYear(false);
                  setShowMarginBookingValue(false);
                  setShowMarginBookingValueYear(false);
                }}>
                {requestValue ? (
                  <div className='icon-select'>
                    <div>{requestValue}</div>
                    <IoIosArrowDown />
                  </div>
                ) : (
                  <div className='icon-select'>
                    <div>All</div>
                    <IoIosArrowDown />
                  </div>
                )}
              </div>
              {showRequestValue && (
                <div className='select_option'>
                  {empNames.map((name, i) => {
                    return (
                      <li
                        key={i}
                        onClick={() => {
                          // salesRequestValue(name)
                          salesReqBook(name);
                          salesReqBookCancelled(name);
                          setShowRequestValue(!showRequestValue);
                          setRequestValue(name);
                          // setRequestValueYear("All")
                        }}>
                        {name}
                      </li>
                    );
                  })}
                </div>
              )}
            </div>
            <div className='month'>
              <label>Year</label>
              <div
                className='bookState'
                onClick={() => {
                  setShowRequestValueYear(!showRequestValueYear);
                  setShowBookingState(false);
                  setShowBookingStateYear(false);
                  setShowBookingValue(false);
                  setShowBookingValueYear(false);
                  setShowTravelState(false);
                  setShowTravelStateYear(false);
                  setShowRequestValue(false);
                  setShowMarginBookingValue(false);
                  setShowMarginBookingValueYear(false);
                }}>
                {requestValueYear ? (
                  <div className='icon-select'>
                    <div>{requestValueYear}</div>
                    <IoIosArrowDown />
                  </div>
                ) : (
                  <div className='icon-select'>
                    <div>All</div>
                    <IoIosArrowDown />
                  </div>
                )}
              </div>
              {showRequestValueYear && (
                <div className='select_optionn'>
                  {years.map((y, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        // salesYearRequestValue(y)
                        salesYearReqBook(y);
                        salesYearReqBookCancelled(y);
                        setShowRequestValueYear(!showRequestValueYear);
                        setRequestValueYear(y);
                        // setRequestValue("All")
                      }}>
                      {y}
                    </li>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className='bar--chart'>
            <Bar
              data={{
                labels: months,
                datasets: [
                  // {
                  //   label: "Total Request Value :",
                  //   data: reqData.map((a) => a.val.length),
                  //   backgroundColor: "#6CE5E8",
                  // },
                  {
                    label: 'Total Booking Value :',
                    data: reqBookedData.map((a) => a.val.length),
                    backgroundColor: '#41B8D5',
                  },
                  {
                    label: 'Total Booking Cancelled :',
                    data: bookCancelled.map((a) => a.val.length),
                    backgroundColor: '#2D8BBA',
                  },
                ],
              }}
              options={options}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalSaleReport;
