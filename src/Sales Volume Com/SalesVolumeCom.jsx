import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { firedb } from '../firebase';

const SalesVolumeCom = () => {
  const isMounted = useRef(false);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [bookedData, setBookedData] = useState([]);
  const [data, setData] = useState([]);

  // console.log('bookedData', bookedData);
  console.log('data', data);

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

  function getData() {
    let datas = [];
    firedb.ref('bookingdetails1').on('value', (data) => {
      if (isMounted.current) {
        data.forEach((i) => {
          if (
            !i.val().general.isBookingCancelled &&
            i.val().general.bookedData !== '' &&
            '2022' === moment(i.val().general.bookedDate).format('YYYY')
          )
            // console.log('i', i.val().general);
            datas.push(i.val().general);
        });
      }
      setData(datas);
    });
    // let booking = [];
    // firedb.ref('bookingdetails1').on('value', (data) => {
    //   if (isMounted.current) {
    //     if (data.val() === null || data.val() === undefined) {
    //       return;
    //     }
    //     data.forEach((i) => {
    //       if (
    //         i.val().general.bookedDate !== '' &&
    //         i.val().general.onwardDate !== ''
    //       ) {
    //         let booked = moment(i.val().general.bookedDate).month();
    //         // let onward = moment(i.val().general.onwardDate).month();
    //         if (!i.val().general.isBookingCancelled) {
    //           month[booked].val.push(i.val());
    //           //   month1[onward].val.push(i.val());
    //         }
    //         booking.push(i.val());
    //       }
    //     });
    //     setBookedData(month);
    //     setBookingDetails(booking);
    //   }
    // });
    // let booking = [];
    // firedb.ref('bookingdetails1').on('value', (data) => {
    //   data.forEach((i) => {
    //     if (isMounted.current) {
    //       if (
    //         i.val().general.bookedDate !== '' &&
    //         i.val().general.onwardDate !== ''
    //       ) {
    //         let booked = moment(i.val().general.bookedDate).month();
    //         if (
    //           !i.val().general.isBookingCancelled &&
    //           '2022' === moment(i.val().general.bookedDate).format('YYYY')
    //         ) {
    //           month[booked].val.push(i.val());
    //         }
    //         booking.push(i.val());
    //       }
    //     }
    //   });
    // });
  }

  useEffect(() => {
    isMounted.current = true;
    getData();
    return () => (isMounted.current = false);
  }, []);

  // const getTotal = (v) => {
  //   const final = v.reduce((total, current) => {
  //     total = total + parseInt(current.general.bookingValue);
  //     return total;
  //   }, 0);
  //   console.log('final', final);
  //   return final;
  // };

  // const getTotal = (data) => {
  //   // console.log(`data`, data)
  //   let value = 0;
  //   if (data) {
  //     data.forEach(
  //       (d, i) => (value = value + parseInt(d.general.bookingValue))
  //     );
  //   }
  //   return value;
  // };

  return (
    <div>
      <table>
        <tr>
          <th>Month</th>
          <th>Sales Volume</th>
        </tr>
        {/* {bookedData.map((b) => {
          return (
            <tr>
              <td>{b.name}</td>
              <td>{getTotal(b?.val)}</td>
            </tr>
          );
        })} */}
      </table>
    </div>
  );
};

export default SalesVolumeCom;
