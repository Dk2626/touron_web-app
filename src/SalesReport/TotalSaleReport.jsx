import React, { useState, useEffect, useContext, useRef } from 'react';
import { firedb } from '../firebase';
import '../SalesAdmin component/SalesRequest.css';
import './TotalSaleReport.css';
import { Chart, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import moment from 'moment';
import Speedo from '.././assests/Stats/Speedo.png';
import MWhite from '.././assests/Stats/Medal-Blue.png';
import MBlue from '.././assests/Stats/Medal-White.png';
import { IoIosArrowDown } from 'react-icons/io';
import { BsInfoCircle } from 'react-icons/bs';
import { Ellipsis } from 'react-spinners-css';
import { ApiContext } from './../Context/ApiContext';
Chart.register(ArcElement);
// import ReactExport from 'react-export-excel';

// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const TotalSaleReport = () => {
  const isMounted = useRef(false);
  const { employees } = useContext(ApiContext);
  const [exportYear, setExportYear] = useState('');
  const [awardForm, setAwardForm] = useState({
    kicker: {
      name1: '',
      category1: '',
      name2: '',
      category2: '',
      name3: '',
      category3: '',
    },
    astronaut: {
      name1: '',
      category1: '',
      name2: '',
      category2: '',
      name3: '',
      category3: '',
    },
    software: {
      name1: '',
      category1: '',
      name2: '',
      category2: '',
      name3: '',
      category3: '',
    },
    winston: {
      name1: '',
      category1: '',
      name2: '',
      category2: '',
      name3: '',
      category3: '',
    },
    titanium: {
      name1: '',
      category1: '',
      name2: '',
      category2: '',
      name3: '',
      category3: '',
    },
    donDraper: {
      name1: '',
      category1: '',
      name2: '',
      category2: '',
      name3: '',
      category3: '',
    },
    ideaDigger: {
      name1: '',
      category1: '',
      name2: '',
      category2: '',
      name3: '',
      category3: '',
    },
    darer: {
      name1: '',
      category1: '',
      name2: '',
      category2: '',
      name3: '',
      category3: '',
    },
    smarty: {
      name1: '',
      category1: '',
      name2: '',
      category2: '',
      name3: '',
      category3: '',
    },
    gumDrop: {
      name1: '',
      category1: '',
      name2: '',
      category2: '',
      name3: '',
      category3: '',
    },
    perfectFind: {
      name1: '',
      category1: '',
      name2: '',
      category2: '',
      name3: '',
      category3: '',
    },
  });
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
  const [category, setCategory] = useState('Monthly');

  // console.log(`bookedValueData`, bookedValueData)
  // console.log(`bookedMarginValueData`, bookedMarginValueData);

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
  const {
    kicker,
    astronaut,
    software,
    winston,
    titanium,
    donDraper,
    ideaDigger,
    darer,
    smarty,
    gumDrop,
    perfectFind,
  } = awardForm;

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
      }
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

  const getExcel = () => {
    const person = ['Vikash', 'Kirthika', 'Ganesh', 'Bharathwaaj', 'Santhosh'];
    let months = [
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

    bookingDetails.forEach((c, i) => {
      months.forEach((m, index) => {
        person.forEach((s) => {
          if (
            index === moment(c.general.onwardDate).month() &&
            c.general.salesHandleName === s &&
            exportYear === moment(c.general.onwardDate).format('YYYY') &&
            // marginBookingValueYear ===
            //   moment(c.general.onwardDate).format("YYYY") &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        });
      });
    });

    // jan
    const VikashJan = months[0].val.filter(
      (f) => f.general.salesHandleName == 'Vikash'
    );
    const KirthikaJan = months[0].val.filter(
      (f) => f.general.salesHandleName == 'Kirthika'
    );
    const GaneshJan = months[0].val.filter(
      (f) => f.general.salesHandleName == 'Ganesh'
    );
    const BharathJan = months[0].val.filter(
      (f) => f.general.salesHandleName == 'Bharathwaaj'
    );
    const SanthoshJan = months[0].val.filter(
      (f) => f.general.salesHandleName == 'Santhosh'
    );
    const AllJan = months[0].val;

    // feb
    const VikashFeb = months[1].val.filter(
      (f) => f.general.salesHandleName == 'Vikash'
    );
    const KirthikaFeb = months[1].val.filter(
      (f) => f.general.salesHandleName == 'Kirthika'
    );
    const GaneshFeb = months[1].val.filter(
      (f) => f.general.salesHandleName == 'Ganesh'
    );
    const BharathFeb = months[1].val.filter(
      (f) => f.general.salesHandleName == 'Bharathwaaj'
    );
    const SanthoshFeb = months[1].val.filter(
      (f) => f.general.salesHandleName == 'Santhosh'
    );
    const AllFeb = months[1].val;

    // mar
    const VikashMar = months[2].val.filter(
      (f) => f.general.salesHandleName == 'Vikash'
    );
    const KirthikaMar = months[2].val.filter(
      (f) => f.general.salesHandleName == 'Kirthika'
    );
    const GaneshMar = months[2].val.filter(
      (f) => f.general.salesHandleName == 'Ganesh'
    );
    const BharathMar = months[2].val.filter(
      (f) => f.general.salesHandleName == 'Bharathwaaj'
    );
    const SanthoshMar = months[2].val.filter(
      (f) => f.general.salesHandleName == 'Santhosh'
    );
    const AllMar = months[2].val;

    // aprl
    const VikashAprl = months[3].val.filter(
      (f) => f.general.salesHandleName == 'Vikash'
    );
    const KirthikaAprl = months[3].val.filter(
      (f) => f.general.salesHandleName == 'Kirthika'
    );
    const GaneshAprl = months[3].val.filter(
      (f) => f.general.salesHandleName == 'Ganesh'
    );
    const BharathAprl = months[3].val.filter(
      (f) => f.general.salesHandleName == 'Bharathwaaj'
    );
    const SanthoshAprl = months[3].val.filter(
      (f) => f.general.salesHandleName == 'Santhosh'
    );
    const AllAprl = months[3].val;

    // may
    const VikashMay = months[4].val.filter(
      (f) => f.general.salesHandleName == 'Vikash'
    );
    const KirthikaMay = months[4].val.filter(
      (f) => f.general.salesHandleName == 'Kirthika'
    );
    const GaneshMay = months[4].val.filter(
      (f) => f.general.salesHandleName == 'Ganesh'
    );
    const BharathMay = months[4].val.filter(
      (f) => f.general.salesHandleName == 'Bharathwaaj'
    );
    const SanthoshMay = months[4].val.filter(
      (f) => f.general.salesHandleName == 'Santhosh'
    );
    const AllMay = months[4].val;

    // jun
    const VikashJune = months[5].val.filter(
      (f) => f.general.salesHandleName == 'Vikash'
    );
    const KirthikaJune = months[5].val.filter(
      (f) => f.general.salesHandleName == 'Kirthika'
    );
    const GaneshJune = months[5].val.filter(
      (f) => f.general.salesHandleName == 'Ganesh'
    );
    const BharathJune = months[5].val.filter(
      (f) => f.general.salesHandleName == 'Bharathwaaj'
    );
    const SanthoshJune = months[5].val.filter(
      (f) => f.general.salesHandleName == 'Santhosh'
    );
    const AllJune = months[5].val;

    //  jul
    const VikashJuly = months[6].val.filter(
      (f) => f.general.salesHandleName == 'Vikash'
    );
    const KirthikaJuly = months[6].val.filter(
      (f) => f.general.salesHandleName == 'Kirthika'
    );
    const GaneshJuly = months[6].val.filter(
      (f) => f.general.salesHandleName == 'Ganesh'
    );
    const BharathJuly = months[6].val.filter(
      (f) => f.general.salesHandleName == 'Bharathwaaj'
    );
    const SanthoshJuly = months[6].val.filter(
      (f) => f.general.salesHandleName == 'Santhosh'
    );
    const AllJuly = months[6].val;

    //  aug
    const VikashAug = months[7].val.filter(
      (f) => f.general.salesHandleName == 'Vikash'
    );
    const KirthikaAug = months[7].val.filter(
      (f) => f.general.salesHandleName == 'Kirthika'
    );
    const GaneshAug = months[7].val.filter(
      (f) => f.general.salesHandleName == 'Ganesh'
    );
    const BharathAug = months[7].val.filter(
      (f) => f.general.salesHandleName == 'Bharathwaaj'
    );
    const SanthoshAug = months[7].val.filter(
      (f) => f.general.salesHandleName == 'Santhosh'
    );
    const AllAug = months[7].val;

    //  sep
    const VikashSep = months[8].val.filter(
      (f) => f.general.salesHandleName == 'Vikash'
    );
    const KirthikaSep = months[8].val.filter(
      (f) => f.general.salesHandleName == 'Kirthika'
    );
    const GaneshSep = months[8].val.filter(
      (f) => f.general.salesHandleName == 'Ganesh'
    );
    const BharathSep = months[8].val.filter(
      (f) => f.general.salesHandleName == 'Bharathwaaj'
    );
    const SanthoshSep = months[8].val.filter(
      (f) => f.general.salesHandleName == 'Santhosh'
    );
    const AllSep = months[8].val;

    //  oct
    const VikashOct = months[9].val.filter(
      (f) => f.general.salesHandleName == 'Vikash'
    );
    const KirthikaOct = months[9].val.filter(
      (f) => f.general.salesHandleName == 'Kirthika'
    );
    const GaneshOct = months[9].val.filter(
      (f) => f.general.salesHandleName == 'Ganesh'
    );
    const BharathOct = months[9].val.filter(
      (f) => f.general.salesHandleName == 'Bharathwaaj'
    );
    const SanthoshOct = months[9].val.filter(
      (f) => f.general.salesHandleName == 'Santhosh'
    );
    const AllOct = months[9].val;

    //  nov
    const VikashNov = months[10].val.filter(
      (f) => f.general.salesHandleName == 'Vikash'
    );
    const KirthikaNov = months[10].val.filter(
      (f) => f.general.salesHandleName == 'Kirthika'
    );
    const GaneshNov = months[10].val.filter(
      (f) => f.general.salesHandleName == 'Ganesh'
    );
    const BharathNov = months[10].val.filter(
      (f) => f.general.salesHandleName == 'Bharathwaaj'
    );
    const SanthoshNov = months[10].val.filter(
      (f) => f.general.salesHandleName == 'Santhosh'
    );
    const AllNov = months[10].val;

    //  dec
    const VikashDec = months[11].val.filter(
      (f) => f.general.salesHandleName == 'Vikash'
    );
    const KirthikaDec = months[11].val.filter(
      (f) => f.general.salesHandleName == 'Kirthika'
    );
    const GaneshDec = months[11].val.filter(
      (f) => f.general.salesHandleName == 'Ganesh'
    );
    const BharathDec = months[11].val.filter(
      (f) => f.general.salesHandleName == 'Bharathwaaj'
    );
    const SanthoshDec = months[11].val.filter(
      (f) => f.general.salesHandleName == 'Santhosh'
    );
    const AllDec = months[11].val;

    let a = [
      {
        name: 'Vikash',
        year: exportYear,
        jan: VikashJan.length == 0 ? 0 : getMarginAmountExcel(VikashJan),
        feb: VikashFeb.length == 0 ? 0 : getMarginAmountExcel(VikashFeb),
        mar: VikashMar.length == 0 ? 0 : getMarginAmountExcel(VikashMar),
        apr: VikashAprl.length == 0 ? 0 : getMarginAmountExcel(VikashAprl),
        may: VikashMay.length == 0 ? 0 : getMarginAmountExcel(VikashMay),
        jun: VikashJune.length == 0 ? 0 : getMarginAmountExcel(VikashJune),
        jul: VikashJuly.length == 0 ? 0 : getMarginAmountExcel(VikashJuly),
        aug: VikashAug.length == 0 ? 0 : getMarginAmountExcel(VikashAug),
        sep: VikashSep.length == 0 ? 0 : getMarginAmountExcel(VikashSep),
        oct: VikashOct.length == 0 ? 0 : getMarginAmountExcel(VikashOct),
        nov: VikashNov.length == 0 ? 0 : getMarginAmountExcel(VikashNov),
        dec: VikashDec.length == 0 ? 0 : getMarginAmountExcel(VikashDec),
      },
      {
        name: 'Kirthika',
        year: exportYear,
        jan: KirthikaJan.length == 0 ? 0 : getMarginAmountExcel(KirthikaJan),
        feb: KirthikaFeb.length == 0 ? 0 : getMarginAmountExcel(KirthikaFeb),
        mar: KirthikaMar.length == 0 ? 0 : getMarginAmountExcel(KirthikaMar),
        apr: KirthikaAprl.length == 0 ? 0 : getMarginAmountExcel(KirthikaAprl),
        may: KirthikaMay.length == 0 ? 0 : getMarginAmountExcel(KirthikaMay),
        jun: KirthikaJune.length == 0 ? 0 : getMarginAmountExcel(KirthikaJune),
        jul: KirthikaJuly.length == 0 ? 0 : getMarginAmountExcel(KirthikaJuly),
        aug: KirthikaAug.length == 0 ? 0 : getMarginAmountExcel(KirthikaAug),
        sep: KirthikaSep.length == 0 ? 0 : getMarginAmountExcel(KirthikaSep),
        oct: KirthikaOct.length == 0 ? 0 : getMarginAmountExcel(KirthikaOct),
        nov: KirthikaNov.length == 0 ? 0 : getMarginAmountExcel(KirthikaNov),
        dec: KirthikaDec.length == 0 ? 0 : getMarginAmountExcel(KirthikaDec),
      },
      {
        name: 'Ganesh',
        year: exportYear,
        jan: GaneshJan.length == 0 ? 0 : getMarginAmountExcel(GaneshJan),
        feb: GaneshFeb.length == 0 ? 0 : getMarginAmountExcel(GaneshFeb),
        mar: GaneshMar.length == 0 ? 0 : getMarginAmountExcel(GaneshMar),
        apr: GaneshAprl.length == 0 ? 0 : getMarginAmountExcel(GaneshAprl),
        may: GaneshMay.length == 0 ? 0 : getMarginAmountExcel(GaneshMay),
        jun: GaneshJune.length == 0 ? 0 : getMarginAmountExcel(GaneshJune),
        jul: GaneshJuly.length == 0 ? 0 : getMarginAmountExcel(GaneshJuly),
        aug: GaneshAug.length == 0 ? 0 : getMarginAmountExcel(GaneshAug),
        sep: GaneshSep.length == 0 ? 0 : getMarginAmountExcel(GaneshSep),
        oct: GaneshOct.length == 0 ? 0 : getMarginAmountExcel(GaneshOct),
        nov: GaneshNov.length == 0 ? 0 : getMarginAmountExcel(GaneshNov),
        dec: GaneshDec.length == 0 ? 0 : getMarginAmountExcel(GaneshDec),
      },
      {
        name: 'Bharathwaaj',
        year: exportYear,
        jan: BharathJan.length == 0 ? 0 : getMarginAmountExcel(BharathJan),
        feb: BharathFeb.length == 0 ? 0 : getMarginAmountExcel(BharathFeb),
        mar: BharathMar.length == 0 ? 0 : getMarginAmountExcel(BharathMar),
        apr: BharathAprl.length == 0 ? 0 : getMarginAmountExcel(BharathAprl),
        may: BharathMay.length == 0 ? 0 : getMarginAmountExcel(BharathMay),
        jun: BharathJune.length == 0 ? 0 : getMarginAmountExcel(BharathJune),
        jul: BharathJuly.length == 0 ? 0 : getMarginAmountExcel(BharathJuly),
        aug: BharathAug.length == 0 ? 0 : getMarginAmountExcel(BharathAug),
        sep: BharathSep.length == 0 ? 0 : getMarginAmountExcel(BharathSep),
        oct: BharathOct.length == 0 ? 0 : getMarginAmountExcel(BharathOct),
        nov: BharathNov.length == 0 ? 0 : getMarginAmountExcel(BharathNov),
        dec: BharathDec.length == 0 ? 0 : getMarginAmountExcel(BharathDec),
      },
      {
        name: 'Santhosh',
        year: exportYear,
        jan: SanthoshJan.length == 0 ? 0 : getMarginAmountExcel(SanthoshJan),
        feb: SanthoshFeb.length == 0 ? 0 : getMarginAmountExcel(SanthoshFeb),
        mar: SanthoshMar.length == 0 ? 0 : getMarginAmountExcel(SanthoshMar),
        apr: SanthoshAprl.length == 0 ? 0 : getMarginAmountExcel(SanthoshAprl),
        may: SanthoshMay.length == 0 ? 0 : getMarginAmountExcel(SanthoshMay),
        jun: SanthoshJune.length == 0 ? 0 : getMarginAmountExcel(SanthoshJune),
        jul: SanthoshJuly.length == 0 ? 0 : getMarginAmountExcel(SanthoshJuly),
        aug: SanthoshAug.length == 0 ? 0 : getMarginAmountExcel(SanthoshAug),
        sep: SanthoshSep.length == 0 ? 0 : getMarginAmountExcel(SanthoshSep),
        oct: SanthoshOct.length == 0 ? 0 : getMarginAmountExcel(SanthoshOct),
        nov: SanthoshNov.length == 0 ? 0 : getMarginAmountExcel(SanthoshNov),
        dec: SanthoshDec.length == 0 ? 0 : getMarginAmountExcel(SanthoshDec),
      },
      {
        name: 'All',
        year: exportYear,
        jan: AllJan.length == 0 ? 0 : getMarginAmountExcel(AllJan),
        feb: AllFeb.length == 0 ? 0 : getMarginAmountExcel(AllFeb),
        mar: AllMar.length == 0 ? 0 : getMarginAmountExcel(AllMar),
        apr: AllAprl.length == 0 ? 0 : getMarginAmountExcel(AllAprl),
        may: AllMay.length == 0 ? 0 : getMarginAmountExcel(AllMay),
        jun: AllJune.length == 0 ? 0 : getMarginAmountExcel(AllJune),
        jul: AllJuly.length == 0 ? 0 : getMarginAmountExcel(AllJuly),
        aug: AllAug.length == 0 ? 0 : getMarginAmountExcel(AllAug),
        sep: AllSep.length == 0 ? 0 : getMarginAmountExcel(AllSep),
        oct: AllOct.length == 0 ? 0 : getMarginAmountExcel(AllOct),
        nov: AllNov.length == 0 ? 0 : getMarginAmountExcel(AllNov),
        dec: AllDec.length == 0 ? 0 : getMarginAmountExcel(AllDec),
      },
    ];
    return a;
  };

  const getMarginAmountExcel = (data) => {
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

  // const salesRequestValue = (s) => {
  //   requestDetails.forEach((c, i) => {
  //     month2.forEach((m, index) => {
  //       if (s === "All") {
  //         if (index === moment(c.requestDate).month()) {
  //           m.val.push(c)
  //         }
  //       } else {
  //         if (
  //           index === moment(c.requestDate).month() &&
  //           c.salesHandleName === s
  //         ) {
  //           m.val.push(c)
  //         }
  //       }
  //     })
  //   })
  //   // setReqData([...month2])
  //   setReqData(month2)
  //   return month2
  // }

  // const salesYearRequestValue = (s) => {
  //   requestDetails.forEach((c, i) => {
  //     month2.forEach((m, index) => {
  //       if (s === "All") {
  //         if (index === moment(c.requestDate).month()) {
  //           m.val.push(c)
  //         }
  //       } else {
  //         if (
  //           index === moment(c.requestDate).month() &&
  //           s === moment(c.requestDate).format("YYYY")
  //         ) {
  //           m.val.push(c)
  //         }
  //       }
  //     })
  //   })
  //   // setReqData([...month2])
  //   setReqData(month2)
  //   return month2
  // }

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

  const finalReqDetailss = () => {
    let finalReq = [];

    firedb
      .ref('assignedTasks')
      .child('requestID')
      .equalTo('TO-220321-1712215')
      .on('value', (data) => {
        // console.log(`data.val()`, data)
      });
    // firedb.ref("requests").on("value", (r) => {
    //   firedb.ref("assignedTasks").on("value", (a) => {
    //     if (
    //       r.val() === null ||
    //       r.val() === undefined ||
    //       a.val() === null ||
    //       a.val() === undefined
    //     ) {
    //       return;
    //     }

    //     r.forEach((rr) => {
    //       a.forEach((aa) => {
    //         if (rr.val().requestID === aa.val().requestID) {
    //           finalReq.push({
    //             customerName: rr.val().name,
    //             onwardDate: rr.val().fromDate,
    //             returnDate: rr.val().toDate,
    //             Destination: rr.val().destination,
    //             requestDate: rr.val().requestDate,
    //             salesHandleName: aa.val().name,
    //           });
    //         }
    //       });
    //     });
    //   });
    // });
    // setRequestDetails(finalReq);
    // setTimeout(() => {
    //   finalReq.forEach((c, i) => {
    //     month2.forEach((m, index) => {
    //       if (index === moment(c.requestDate).month()) {
    //         m.val.push(c);
    //       }
    //     });
    //   });
    //   setReqData([...month2]);
    // }, 5000);
  };

  const getAwardData = () => {
    firedb
      .ref(`awardData/${moment().format('MMMM YYYY')}`)
      .on('value', (data) => {
        if (isMounted.current) {
          if (data.val() === null || data.val() === undefined) {
            return;
          }
          const {
            kicker,
            astronaut,
            software,
            winston,
            titanium,
            donDraper,
            ideaDigger,
            darer,
            smarty,
            gumDrop,
            perfectFind,
          } = data.val();
          setAwardForm({
            kicker: {
              name1: kicker.name1,
              category1: kicker.category1,
              name2: kicker.name2,
              category2: kicker.category2,
              name3: kicker.name3,
              category3: kicker.category3,
            },
            astronaut: {
              name1: astronaut.name1,
              category1: astronaut.category1,
              name2: astronaut.name2,
              category2: astronaut.category2,
              name3: astronaut.name3,
              category3: astronaut.category3,
            },
            software: {
              name1: software.name1,
              category1: software.category1,
              name2: software.name2,
              category2: software.category2,
              name3: software.name3,
              category3: software.category3,
            },
            winston: {
              name1: winston.name1,
              category1: winston.category1,
              name2: winston.name2,
              category2: winston.category2,
              name3: winston.name3,
              category3: winston.category3,
            },
            titanium: {
              name1: titanium.name1,
              category1: titanium.category1,
              name2: titanium.name2,
              category2: titanium.category2,
              name3: titanium.name3,
              category3: titanium.category3,
            },
            donDraper: {
              name1: donDraper.name1,
              category1: donDraper.category1,
              name2: donDraper.name2,
              category2: donDraper.category2,
              name3: donDraper.name3,
              category3: donDraper.category3,
            },
            ideaDigger: {
              name1: ideaDigger.name1,
              category1: ideaDigger.category1,
              name2: ideaDigger.name2,
              category2: ideaDigger.category2,
              name3: ideaDigger.name3,
              category3: ideaDigger.category3,
            },
            darer: {
              name1: darer.name1,
              category1: darer.category1,
              name2: darer.name2,
              category2: darer.category2,
              name3: darer.name3,
              category3: darer.category3,
            },
            smarty: {
              name1: smarty.name1,
              category1: smarty.category1,
              name2: smarty.name2,
              category2: smarty.category2,
              name3: smarty.name3,
              category3: smarty.category3,
            },
            gumDrop: {
              name1: gumDrop.name1,
              category1: gumDrop.category1,
              name2: gumDrop.name2,
              category2: gumDrop.category2,
              name3: gumDrop.name3,
              category3: gumDrop.category3,
            },
            perfectFind: {
              name1: perfectFind.name1,
              category1: perfectFind.category1,
              name2: perfectFind.name2,
              category2: perfectFind.category2,
              name3: perfectFind.name3,
              category3: perfectFind.category3,
            },
          });
        }
      });
  };

  useEffect(() => {
    isMounted.current = true;
    getAwardData();
    return () => (isMounted.current = false);
  }, []);

  // useEffect(() => {
  //   finalReqDetailss();
  // }, []);

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

  const statsDatas = [
    {
      title: 'Kicker',
      name: kicker.name1,
      containerClass: 'stats__data stats__data-blue',
      buttonClass: 'data-button data-button-blue',
      image: MWhite,
      category: kicker.category1,
      desc: 'Those who took Highest no of bookings for the month.',
    },
    {
      title: 'Astronaut',
      name: astronaut.name1,
      containerClass: 'stats__data stats__data-white',
      buttonClass: 'data-button data-button-white',
      image: MBlue,
      category: astronaut.category1,
      desc: 'Those who have highest profitable margins for the month.',
    },
    {
      title: 'Software Master',
      name: software.name1,
      containerClass: 'stats__data stats__data-blue',
      buttonClass: 'data-button data-button-blue',
      image: MWhite,
      category: software.category1,
      desc: 'Knows everything about the software.',
    },
    {
      title: 'Winston',
      name: winston.name1,
      containerClass: 'stats__data stats__data-white',
      buttonClass: 'data-button data-button-white',
      image: MBlue,
      category: winston.category1,
      desc: 'Who gets more customer appreciation.',
    },
    {
      title: 'Titanium',
      name: titanium.name1,
      containerClass: 'stats__data stats__data-blue',
      buttonClass: 'data-button data-button-blue',
      image: MWhite,
      category: titanium.category1,
      desc: 'Who is working beyond their limits at additional responsibility.',
    },
    {
      title: 'Don Draper',
      name: donDraper.name1,
      containerClass: 'stats__data stats__data-white',
      buttonClass: 'data-button data-button-white',
      image: MBlue,
      category: donDraper.category1,
      desc: 'A Strong Hold of everything.',
    },
    {
      title: 'Idea Digger',
      name: ideaDigger.name1,
      containerClass: 'stats__data stats__data-blue',
      buttonClass: 'data-button data-button-blue',
      image: MWhite,
      category: ideaDigger.category1,
      desc: 'Goes to the person who’s idea is working out well.',
    },
    {
      title: 'Darer',
      name: darer.name1,
      containerClass: 'stats__data stats__data-white',
      buttonClass: 'data-button data-button-white',
      image: MBlue,
      category: darer.category1,
      desc: 'Who takes most challenging task.',
    },

    {
      title: 'Smarty',
      name: smarty.name1,
      containerClass: 'stats__data stats__data-blue',
      buttonClass: 'data-button data-button-blue',
      image: MWhite,
      category: smarty.category1,
      desc: 'The Most outstanding person.',
    },
    {
      title: 'Gumdrop',
      name: gumDrop.name1,
      containerClass: 'stats__data stats__data-white',
      buttonClass: 'data-button data-button-white',
      image: MBlue,
      category: gumDrop.category1,
      desc: 'For the person who is Kind Hearted & loved by everyone.',
    },
    {
      title: 'Perfect Find',
      name: perfectFind.name1,
      containerClass: 'stats__data stats__data-blue',
      buttonClass: 'data-button data-button-blue',
      image: MWhite,
      category: perfectFind.category1,
      desc: 'This award is only once a Year based on no of awards issued per year.',
    },
    {
      title: 'Kicker',
      name: kicker.name2,
      containerClass: 'stats__data stats__data-blue',
      buttonClass: 'data-button data-button-blue',
      image: MWhite,
      category: kicker.category2,
      desc: 'Those who took Highest no of bookings for the month.',
    },
    {
      title: 'Astronaut',
      name: astronaut.name2,
      containerClass: 'stats__data stats__data-white',
      buttonClass: 'data-button data-button-white',
      image: MBlue,
      category: astronaut.category2,
      desc: 'Those who have highest profitable margins for the month.',
    },
    {
      title: 'Software Master',
      name: software.name2,
      containerClass: 'stats__data stats__data-blue',
      buttonClass: 'data-button data-button-blue',
      image: MWhite,
      category: software.category2,
      desc: 'Knows everything about the software.',
    },
    {
      title: 'Winston',
      name: winston.name2,
      containerClass: 'stats__data stats__data-white',
      buttonClass: 'data-button data-button-white',
      image: MBlue,
      category: winston.category2,
      desc: 'Who gets more customer appreciation.',
    },
    {
      title: 'Titanium',
      name: titanium.name2,
      containerClass: 'stats__data stats__data-blue',
      buttonClass: 'data-button data-button-blue',
      image: MWhite,
      category: titanium.category2,
      desc: 'Who is working beyond their limits at additional responsibility.',
    },
    {
      title: 'Don Draper',
      name: donDraper.name2,
      containerClass: 'stats__data stats__data-white',
      buttonClass: 'data-button data-button-white',
      image: MBlue,
      category: donDraper.category2,
      desc: 'A Strong Hold of everything.',
    },

    {
      title: 'Idea Digger',
      name: ideaDigger.name2,
      containerClass: 'stats__data stats__data-blue',
      buttonClass: 'data-button data-button-blue',
      image: MWhite,
      category: ideaDigger.category2,
      desc: 'Goes to the person who’s idea is working out well.',
    },
    {
      title: 'Darer',
      name: darer.name2,
      containerClass: 'stats__data stats__data-white',
      buttonClass: 'data-button data-button-white',
      image: MBlue,
      category: darer.category2,
      desc: 'Who takes most challenging task.',
    },

    {
      title: 'Smarty',
      name: smarty.name2,
      containerClass: 'stats__data stats__data-blue',
      buttonClass: 'data-button data-button-blue',
      image: MWhite,
      category: smarty.category2,
      desc: 'The Most outstanding person.',
    },
    {
      title: 'Gumdrop',
      name: gumDrop.name2,
      containerClass: 'stats__data stats__data-white',
      buttonClass: 'data-button data-button-white',
      image: MBlue,
      category: gumDrop.category2,
      desc: 'For the person who is Kind Hearted & loved by everyone.',
    },
    {
      title: 'Perfect Find',
      name: perfectFind.name2,
      containerClass: 'stats__data stats__data-blue',
      buttonClass: 'data-button data-button-blue',
      image: MWhite,
      category: perfectFind.category2,
      desc: 'This award is only once a Year based on no of awards issued per year.',
    },
    {
      title: 'Kicker',
      name: kicker.name3,
      containerClass: 'stats__data stats__data-blue',
      buttonClass: 'data-button data-button-blue',
      image: MWhite,
      category: kicker.category3,
      desc: 'Those who took Highest no of bookings for the month.',
    },
    {
      title: 'Astronaut',
      name: astronaut.name3,
      containerClass: 'stats__data stats__data-white',
      buttonClass: 'data-button data-button-white',
      image: MBlue,
      category: astronaut.category3,
      desc: 'Those who have highest profitable margins for the month.',
    },
    {
      title: 'Software Master',
      name: software.name3,
      containerClass: 'stats__data stats__data-blue',
      buttonClass: 'data-button data-button-blue',
      image: MWhite,
      category: software.category3,
      desc: 'Knows everything about the software.',
    },
    {
      title: 'Winston',
      name: winston.name3,
      containerClass: 'stats__data stats__data-white',
      buttonClass: 'data-button data-button-white',
      image: MBlue,
      category: winston.category3,
      desc: 'Who gets more customer appreciation.',
    },
    {
      title: 'Titanium',
      name: titanium.name3,
      containerClass: 'stats__data stats__data-blue',
      buttonClass: 'data-button data-button-blue',
      image: MWhite,
      category: titanium.category3,
      desc: 'Who is working beyond their limits at additional responsibility.',
    },
    {
      title: 'Don Draper',
      name: donDraper.name3,
      containerClass: 'stats__data stats__data-white',
      buttonClass: 'data-button data-button-white',
      image: MBlue,
      category: donDraper.category3,
      desc: 'A Strong Hold of everything.',
    },

    {
      title: 'Idea Digger',
      name: ideaDigger.name3,
      containerClass: 'stats__data stats__data-blue',
      buttonClass: 'data-button data-button-blue',
      image: MWhite,
      category: ideaDigger.category3,
      desc: 'Goes to the person who’s idea is working out well.',
    },
    {
      title: 'Darer',
      name: darer.name3,
      containerClass: 'stats__data stats__data-white',
      buttonClass: 'data-button data-button-white',
      image: MBlue,
      category: darer.category3,
      desc: 'Who takes most challenging task.',
    },

    {
      title: 'Smarty',
      name: smarty.name3,
      containerClass: 'stats__data stats__data-blue',
      buttonClass: 'data-button data-button-blue',
      image: MWhite,
      category: smarty.category3,
      desc: 'The Most outstanding person.',
    },
    {
      title: 'Gumdrop',
      name: gumDrop.name3,
      containerClass: 'stats__data stats__data-white',
      buttonClass: 'data-button data-button-white',
      image: MBlue,
      category: gumDrop.category3,
      desc: 'For the person who is Kind Hearted & loved by everyone.',
    },
    {
      title: 'Perfect Find',
      name: perfectFind.name3,
      containerClass: 'stats__data stats__data-blue',
      buttonClass: 'data-button data-button-blue',
      image: MWhite,
      category: perfectFind.category3,
      desc: 'This award is only once a Year based on no of awards issued per year.',
    },
  ];

  if (loader) {
    return (
      <div className='loads'>
        Fetching Data <Ellipsis color='#E07C24' />
      </div>
    );
  }

  return (
    <div
      className='booking-container'
      style={{
        padding: '20px',
        backgroundColor: '#fff',
        fontFamily: 'Mont-light',
      }}>
      <div className='booking-name-container'>
        <div>
          <h3 className='booking-name'>
            <span className='stats'>
              <img className='stats-image' src={Speedo} alt='stats' />
            </span>
            Master Data Dashboard
          </h3>
        </div>
      </div>
      <div className='stats__filter'>
        <h6 className='stats_filter-header'>Rockstar's</h6>
        <div className='stats__filter-container'>
          <h6 className='stats__filter--name'>By Category</h6>
          <div className='stats__filter--buttons'>
            <div className='radio--filter'>
              <input
                className='radio-input'
                value='Monthly'
                type='radio'
                checked={category === 'Monthly' ? true : false}
                onChange={(e) => setCategory(e.target.value)}
                name='category'
                id='Monthly'
              />
              <label htmlFor='Monthly' className='radio-label'>
                <span className='cutsom-radio'></span>
                Monthly
              </label>
            </div>
            <div className='radio--filter'>
              <input
                className='radio-input'
                value='Quaterly'
                checked={category === 'Quaterly' ? true : false}
                onChange={(e) => setCategory(e.target.value)}
                type='radio'
                name='category'
                id='Quaterly'
              />
              <label htmlFor='Quaterly' className='radio-label'>
                <span className='cutsom-radio'></span>
                Quaterly
              </label>
            </div>
            <div className='radio--filter'>
              <input
                className='radio-input'
                value='Yearly'
                type='radio'
                checked={category === 'Yearly' ? true : false}
                onChange={(e) => setCategory(e.target.value)}
                name='category'
                id='Yearly'
              />
              <label htmlFor='Yearly' className='radio-label'>
                <span className='cutsom-radio'></span>
                Yearly
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className='stats__data-container'>
        {statsDatas.map((data, index) => {
          if (
            category === 'Monthly' && data.name
              ? data.category === category
              : null || (category === 'Quaterly' && data.name)
              ? data.category === category
              : null || (category === 'Yearly' && data.name)
              ? data.category === category
              : null
          )
            return (
              <div className={data.containerClass} key={index}>
                <img className='data-image' src={data.image} alt='medal' />
                <h4 className='data-name'>{data.title}</h4>

                <div className={data.buttonClass}>
                  <h6>{data.name}</h6>
                </div>
                <div className='data-icon'>
                  <div className='data--Decs'>{data.desc}</div>
                  <BsInfoCircle />
                </div>
              </div>
            );
        })}
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

            {exportYear.length == 4 ? (
              <>
                {/* <button onClick={() => getExcel()}>Export</button> */}

                {/* <div>
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
                </div> */}
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
            )}

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
