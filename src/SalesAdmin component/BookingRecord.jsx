import React, { useState, useEffect, useContext } from 'react';
import { firedb } from '../firebase';
import './BookingRecord.css';
import { BiEdit } from 'react-icons/bi';
import { FiAlertTriangle } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
import { AiFillEdit } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { Input, Modal, Spinner } from 'reactstrap';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { useToasts } from 'react-toast-notifications';
import numeral from 'numeral';
import { ApiContext } from './../Context/ApiContext';

const BookingRecord = () => {
  const { surveyid } = useParams();
  const [surveyId, setSurveyId] = useState('');
  const [travellerDocuments, setTravellerDocuments] = useState([]);
  const [childrenDocuments, setChildrenDocuments] = useState([]);
  const { addToast } = useToasts();
  const { employees } = useContext(ApiContext);
  const [deleteId, setDeleteId] = useState('');
  const [editpaymentId, setEditpaymentId] = useState('');
  const [step, setStep] = useState(1);
  const [edit, setEdit] = useState(true);
  const [visaEdit, setVisaEdit] = useState(true);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [updatePaymentOpen, setUpdatePaymentOpen] = useState(false);
  const [reminderOpen, setReminderOpen] = useState(false);
  const [detailsLoaded, setDetailsLoaded] = useState(false);
  const [internationalModal, setInternationalModal] = useState(false);
  const [showDeletePaymentModal, setShowDeletePaymentModal] = useState(false);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [showParti, setShowParti] = useState(false);
  const [showRecvType, setShowRecvType] = useState(false);
  const [showGenVendor, setShowGenVendor] = useState(false);
  const [showGenVisaOnArrival, setShowGenVisaOnArrival] = useState(false);
  const [showGenSales, setShowGenSales] = useState(false);
  const [showGenBook, setShowGenBook] = useState(false);
  const [showVisaStat, setShowVisaStat] = useState(false);
  const [showVisaVendor, setShowVisaVendor] = useState(false);
  const [showVisaApmt, setShowVisaApmt] = useState(false);
  const [showTcs, setShowTcs] = useState(false);
  const [showType, setShowType] = useState(false);
  const [showRemindTime, setShowRemindTime] = useState(false);
  const [payParticulars, setPayParticulars] = useState('');
  const [recvType, setRecvType] = useState('');
  const [genVendorName, setGenVendorName] = useState('');

  console.log(`travellerDocuments`, travellerDocuments);
  console.log(`childrenDocuments`, childrenDocuments);

  const getDocuments = (email, destination, onwardDate) => {
    console.log(`object`, email, destination, onwardDate);
    firedb
      .ref(`onBoard`)
      .orderByChild('email')
      .equalTo(email)
      .on('value', (data) => {
        if (!data) {
          console.log('no data');
          setTravellerDocuments([]);
          setChildrenDocuments([]);
        } else {
          console.log(`data.val()`, data.val());
          data.forEach((d) => {
            if (
              d.val().destination === destination &&
              d.val().onwardDate === onwardDate
            ) {
              setTravellerDocuments(d.val().travellers);
              setChildrenDocuments(d.val().childrens);
            }
          });
        }
      });
  };

  function openInternationalModal() {
    setInternationalModal(true);
  }
  function closeInternationalModal() {
    setInternationalModal(false);
  }
  function openDeletePaymentModal() {
    setShowDeletePaymentModal(true);
  }
  function closeDeletePaymentModal() {
    setShowDeletePaymentModal(false);
  }

  const [newPayment, setNewPayment] = useState({
    id: uuidv4(),
    date: '',
    particulars: '',
    recievedType: '',
    recievedAmount: 0,
    spentAmount: 0,
    remark: '',
  });

  const time = [
    {
      name: '08.00 AM',
      value: 8,
    },
    {
      name: '09.00 AM',
      value: 9,
    },
    {
      name: '10.00 AM',
      value: 10,
    },
    {
      name: '11.00 AM',
      value: 11,
    },
    {
      name: '12.00 PM',
      value: 12,
    },
    {
      name: '01.00 PM',
      value: 13,
    },
    {
      name: '02.00 PM',
      value: 14,
    },
    {
      name: '03.00 PM',
      value: 15,
    },
    {
      name: '04.00 PM',
      value: 16,
    },
    {
      name: '05.00 PM',
      value: 17,
    },
    {
      name: '06.00 PM',
      value: 18,
    },
    {
      name: '07.00 PM',
      value: 19,
    },
    {
      name: '08.00 PM',
      value: 20,
    },
    {
      name: '09.00 PM',
      value: 21,
    },
    {
      name: '10.00 PM',
      value: 22,
    },
    {
      name: '11.00 PM',
      value: 23,
    },
    {
      name: '12.00 AM',
      value: 24,
    },
  ];

  const getTime = (s) => {
    let ti = '';
    time.filter((t) => {
      if (t.value === parseInt(s)) {
        ti = t.name;
      }
    });
    return ti;
  };
  const [newReminder, setNewReminder] = useState({
    id: uuidv4(),
    reminderDate: '',
    title: '',
    body: '',
    reminderTime: 0,
    isStarted: false,
    isCompleted: false,
  });

  const { reminderDate, reminderTime, title, body } = newReminder;
  const {
    date,
    particulars,
    recievedType,
    recievedAmount,
    spentAmount,
    remark,
  } = newPayment;
  const [general, setGeneral] = useState({
    customerName: '',
    email: '',
    phoneNumber: '',
    bookedDate: '',
    salesHandleName: '',
    bookingHandleName: '',
    bookingValue: '',
    destination: '',
    totalTravelDays: '',
    paymentDueDate: '',
    adults: 0,
    children: 0,
    vendorName: '',
    onwardDate: '',
    returnDate: '',
    bookingRemarks: '',
    isBookingCancelled: false,
    cancelBookingRemarks: '',
    tcs: '',
    tourType: '',
    panNumber: '',
    finalMargin: '',
  });

  const {
    customerName,
    phoneNumber,
    tourType,
    panNumber,
    email,
    bookedDate,
    salesHandleName,
    bookingHandleName,
    bookingValue,
    destination,
    totalTravelDays,
    paymentDueDate,
    tcs,
    adults,
    children,
    vendorName,
    onwardDate,
    returnDate,
    isBookingCancelled,
    cancelBookingRemarks,
    bookingRemarks,
    finalMargin,
  } = general;

  const [paymentDetails, setPaymentDetails] = useState({
    invoiceNumber: '',
    totalAmount: 0,
    amountDetails: '',
  });

  const { invoiceNumber, totalAmount, amountDetails } = paymentDetails;

  const [visaDetails, setVisaDetails] = useState({
    visaOnArrival: '',
    processingDate: '',
    completedDate: '',
    visaStatus: '',
    visaVendor: '',
    visaValidityDate: '',
    visaAppointmentDate: '',
    visaAppointment: '',
  });

  const {
    visaOnArrival,
    processingDate,
    completedDate,
    visaStatus,
    visaVendor,
    visaValidityDate,
    visaAppointmentDate,
    visaAppointment,
  } = visaDetails;

  const calculatePayment = () => {
    let totalAmountReceived = 0;
    let totalSpentAmount = 0;
    let tcsValue = 0;
    let gst = 0;
    let marginBeforeGst = 0;
    let finalMargin = 0;

    amountDetails.forEach(
      (a) => (totalAmountReceived += parseInt(a.recievedAmount))
    );
    amountDetails.forEach((a) => (totalSpentAmount += parseInt(a.spentAmount)));
    if (general.tcs === 'Yes') {
      tcsValue = (parseInt(bookingValue) * 5) / 100;
      console.log(`tcsValue`, tcsValue);
    }
    marginBeforeGst = totalAmountReceived - totalSpentAmount;

    gst = (marginBeforeGst * 5) / 105;
    finalMargin = marginBeforeGst - gst;

    function round(value, precision) {
      var multiplier = Math.pow(10, precision || 0);
      return Math.round(value * multiplier) / multiplier;
    }
    return [
      totalAmountReceived,
      totalSpentAmount,
      tcsValue,
      round(gst, 1),
      marginBeforeGst,
      round(finalMargin, 1),
    ];
  };
  const [reminders, setReminders] = useState([]);

  const setReminder = (newReminder, reminder) => {
    var datess = moment(newReminder.reminderDate).set({
      hour: parseInt(newReminder.reminderTime),
      minute: 0,
      seconds: 0,
    });
    var dates = moment();
    let diff = datess - dates;
    setTimeout(() => {
      let newRemind = reminder.map((r) => {
        if (r.id === newReminder.id) {
          r.isStarted = true;
        }
        return r;
      });

      firedb
        .ref(`bookingdetails1/${surveyid}/reminders`)
        .set(newRemind)
        .then(() => {
          addToast(' Successfully', {
            appearance: 'success',
          });
          setNewReminder({
            id: '',
            reminderDate: '',
            title: '',
            body: '',
            reminderTime: 0,
            isCompleted: false,
            isStarted: false,
          });
        })
        .catch((err) => console.log(`err`, err));
    }, diff);
  };

  const setReminderComplete = (reminder) => {
    let newRemind = reminders.map((r) => {
      if (r.id === reminder.id) {
        r.isCompleted = !r.isCompleted;
      }
      return r;
    });

    firedb
      .ref(`bookingdetails1/${surveyid}/reminders`)
      .set(newRemind)
      .then(() => {
        addToast('Status updated', {
          appearance: 'success',
        });
      })
      .catch((err) => console.log(`err`, err));
  };

  const updatePaymentDetails = () => {
    if (
      date === '' ||
      recievedType === '' ||
      recievedAmount === '' ||
      spentAmount === '' ||
      particulars === ''
    ) {
      return alert('All fields are required');
    }
    let newPayment = amountDetails.map((a) => {
      if (a.id === editpaymentId) {
        a.id = editpaymentId;
        a.date = date;
        a.particulars = particulars;
        a.recievedType = recievedType;
        a.recievedAmount = recievedAmount;
        a.spentAmount = spentAmount;
        a.remark = remark;
      }
      return a;
    });
    firedb
      .ref(`bookingdetails1/${surveyid}/paymentDetails`)
      .set({
        invoiceNumber: invoiceNumber,
        totalAmount: totalAmount,
        amountDetails: newPayment,
      })
      .then(() => {
        addToast('Payment updated Successfully', {
          appearance: 'success',
        });
        setNewPayment({
          date: '',
          particulars: '',
          recievedType: '',
          recievedAmount: 0,
          spentAmount: 0,
          remark: '',
        });
        setUpdatePaymentOpen(false);
        setEditpaymentId('');
      })
      .catch((err) => console.log(`err`, err));
  };

  const deletePaymentDetails = (id) => {
    let deletePayment = amountDetails.filter((a) => a.id !== id);
    firedb
      .ref(`bookingdetails1/${surveyid}/paymentDetails`)
      .set({
        invoiceNumber: invoiceNumber,
        totalAmount: totalAmount,
        amountDetails: deletePayment,
      })
      .then(() => {
        addToast('Payment Deleted Successfully', {
          appearance: 'error',
        });
      })
      .catch((err) => console.log(`err`, err));
  };

  const submitBookingDetails = (e) => {
    console.log(`phoneNumber`, phoneNumber);
    e.preventDefault();
    if (surveyId === '') {
      return alert('SurveyId required');
    }
    const bookingDetails = {
      surveyId: surveyId,
      general: {
        customerName: customerName,
        phoneNumber: phoneNumber,
        isBookingCancelled: isBookingCancelled,
        bookingRemarks: bookingRemarks,
        cancelBookingRemarks: cancelBookingRemarks,
        email: email,
        bookedDate: bookedDate,
        salesHandleName: salesHandleName,
        bookingHandleName: bookingHandleName,
        bookingValue: bookingValue,
        destination: destination,
        totalTravelDays: totalTravelDays,
        paymentDueDate: paymentDueDate,
        adults: adults,
        children: children,
        vendorName: vendorName,
        onwardDate: onwardDate,
        returnDate: returnDate,
        tcs: tcs,
        tourType: tourType,
        panNumber: panNumber,
        finalMargin: finalMargin,
      },
      paymentDetails: {
        invoiceNumber: invoiceNumber,
        totalAmount: totalAmount,
        amountDetails: amountDetails,
      },
      visaDetails: {
        visaOnArrival: visaOnArrival,
        processingDate: processingDate,
        completedDate: completedDate,
        visaStatus: visaStatus,
        visaVendor: visaVendor,
        visaValidityDate: visaValidityDate,
        visaAppointmentDate: visaAppointmentDate,
        visaAppointment: visaAppointment,
      },
      reminders: reminders,
    };
    firedb
      .ref(`bookingdetails1`)
      .push(bookingDetails)
      .then(() => {
        addToast('Added Successfully', {
          appearance: 'success',
        });
        setEdit(false);
        setIsNewRecord(true);
      })
      .catch((err) => console.log(`err`, err));
  };

  const addPaymentDetails = () => {
    if (
      date === '' ||
      recievedType === '' ||
      recievedAmount === '' ||
      spentAmount === '' ||
      particulars === ''
    ) {
      return alert('All fields are required');
    }
    let payment = [];
    if (amountDetails) {
      payment = [...amountDetails, newPayment];
    } else {
      payment = [newPayment];
    }

    console.log('surveyid', surveyid);
    console.log(`payment`, payment);
    firedb
      .ref(`bookingdetails1/${surveyid}/paymentDetails`)
      .set({
        invoiceNumber: invoiceNumber,
        totalAmount: totalAmount,
        amountDetails: payment,
      })
      .then(() => {
        addToast('Payment added Successfully', {
          appearance: 'success',
        });
        setPaymentOpen(false);
        setNewPayment({
          date: '',
          particulars: '',
          recievedType: '',
          recievedAmount: 0,
          spentAmount: 0,
          remark: '',
          id: uuidv4(),
        });
      })

      .catch((err) => console.log(`err`, err));
  };

  const addReminders = () => {
    if (
      reminderDate === '' ||
      title === '' ||
      body === '' ||
      reminderTime <= 0
    ) {
      return alert('All fields are required');
    }
    let reminder = [];
    if (reminders) {
      reminder = [...reminders, newReminder];
    } else {
      reminder = [newReminder];
    }
    firedb
      .ref(`bookingdetails1/${surveyid}/reminders`)
      .set(reminder)
      .then(() => {
        setReminderOpen(false);
        addToast('Reminder added Successfully', {
          appearance: 'success',
        });
        setReminder(newReminder, reminder);
        setNewReminder({
          id: '',
          reminderDate: '',
          title: '',
          body: '',
          reminderTime: 0,
          isStarted: false,
          isCompleted: false,
        });
      })
      .catch((err) => console.log(`err`, err));
  };

  const updateBookingDetails = () => {
    console.log(`phoneNumber`, phoneNumber);

    const bookingDetails = {
      surveyId: surveyId,
      general: {
        customerName: customerName,
        phoneNumber: phoneNumber,
        tcs: tcs,
        tourType: tourType,
        panNumber: panNumber,
        email: email,
        bookedDate: bookedDate,
        salesHandleName: salesHandleName,
        bookingHandleName: bookingHandleName,
        bookingValue: bookingValue,
        destination: destination,
        totalTravelDays: totalTravelDays,
        paymentDueDate: paymentDueDate,
        adults: adults,
        children: children,
        vendorName: vendorName,
        onwardDate: onwardDate,
        returnDate: returnDate,
        isBookingCancelled: isBookingCancelled,
        cancelBookingRemarks: cancelBookingRemarks,
        bookingRemarks: bookingRemarks,
        finalMargin: finalMargin,
      },
      paymentDetails: {
        invoiceNumber: invoiceNumber,
        totalAmount: totalAmount,
        amountDetails: amountDetails,
      },
      visaDetails: {
        visaOnArrival: visaOnArrival,
        processingDate: processingDate,
        completedDate: completedDate,
        visaStatus: visaStatus,
        visaVendor: visaVendor,
        visaValidityDate: visaValidityDate,
        visaAppointmentDate: visaAppointmentDate,
        visaAppointment: visaAppointment,
      },
      reminders: reminders,
    };
    firedb
      .ref(`bookingdetails1/${surveyid}`)
      .update(bookingDetails)
      .then(() => {
        addToast('Updated Successfully', {
          appearance: 'success',
        });
        setEdit(false);
      })
      .catch((err) => console.log(`err`, err));
  };

  const cancelBookingdetails = () => {
    firedb
      .ref(`bookingdetails1/${surveyid}`)
      .child('general')
      .update({
        isBookingCancelled: isBookingCancelled,
        cancelBookingRemarks: cancelBookingRemarks,
      })
      .then(() => {
        addToast('Booking cancelled Successfully', {
          appearance: 'success',
        });
        setGeneral({
          ...general,
          isBookingCancelled: false,
          cancelBookingRemarks: '',
        });
      })
      .catch((err) => console.log(`err`, err));
  };

  // const deleteBookingDetails = () => {
  //   firedb
  //     .ref(`bookingDetails/${surveyId}`)
  //     .set()
  //     .then(() => console.log(`sucess`))
  //     .catch((err) => console.log(`err`, err));
  // };

  const submitVisaDetails = () => {
    const bookingDetails = {
      visaDetails: {
        visaOnArrival: visaOnArrival,
        processingDate: processingDate,
        completedDate: completedDate,
        visaStatus: visaStatus,
        visaVendor: visaVendor,
        visaValidityDate: visaValidityDate,
        visaAppointmentDate: visaAppointmentDate,
        visaAppointment: visaAppointment,
      },
    };
    firedb
      .ref(`bookingdetails1/${surveyid}`)
      .update(bookingDetails)
      .then(() => {
        addToast('Visa added Successfully', {
          appearance: 'success',
        });
        setVisaEdit(false);
      })
      .catch((err) => console.log(`err`, err));
  };

  useEffect(() => {
    if (surveyid) {
      const getBookingDetails = () => {
        setEdit(false);
        setVisaEdit(false);
        setDetailsLoaded(true);
        setIsNewRecord(true);
        firedb.ref(`bookingdetails1/${surveyid}`).on('value', (data) => {
          const { general, paymentDetails, visaDetails, surveyId, reminders } =
            data.val();

          getDocuments(general.email, general.destination, general.onwardDate);
          setSurveyId(surveyId);
          setGeneral({
            tourType: general.tourType,
            panNumber: general.panNumber,
            tcs: general.tcs,
            customerName: general.customerName,
            phoneNumber: general.phoneNumber,
            email: general.email,
            bookedDate: general.bookedDate,
            salesHandleName: general.salesHandleName,
            bookingHandleName: general.bookingHandleName,
            bookingValue: general.bookingValue,
            destination: general.destination,
            totalTravelDays: general.totalTravelDays,
            paymentDueDate: general.paymentDueDate,
            adults: general.adults,
            children: general.children,
            vendorName: general.vendorName,
            onwardDate: general.onwardDate,
            returnDate: general.returnDate,
            isBookingCancelled: general.isBookingCancelled,
            bookingRemarks: general.bookingRemarks,
            cancelBookingRemarks: general.cancelBookingRemarks,
            finalMargin: general.finalMargin,
          });
          if (Object.keys(paymentDetails).includes('amountDetails')) {
            setPaymentDetails({
              invoiceNumber: paymentDetails.invoiceNumber,
              totalAmount: paymentDetails.totalAmount,
              amountDetails: paymentDetails.amountDetails,
            });
          } else {
            setPaymentDetails({
              invoiceNumber: paymentDetails.invoiceNumber,
              totalAmount: paymentDetails.totalAmount,
              amountDetails: [],
            });
          }

          setVisaDetails({
            visaOnArrival: visaDetails.visaOnArrival,
            processingDate: visaDetails.processingDate,
            completedDate: visaDetails.completedDate,
            visaStatus: visaDetails.visaStatus,
            visaVendor: visaDetails.visaVendor,
            visaValidityDate: visaDetails.visaValidityDate,
            visaAppointmentDate: visaDetails.visaAppointmentDate,
            visaAppointment: visaDetails.visaAppointment,
          });
          if (reminders) {
            setReminders(reminders);
          }
          //     }
          //   });
          // }
        });
        setDetailsLoaded(false);
      };
      getBookingDetails();
    }
  }, [surveyid]);

  // const generalHandle = (e) => {
  //   const { name, value } = e.target;
  //   setGeneral({
  //     ...general,
  //     [name]: value,
  //   });
  // };

  // const payParticulars = [
  //   'Payment Recieved',
  //   'Hotel Payment',
  //   'Flight Payment',
  //   'Taxi Payment',
  //   'Special Benefits',
  //   'Visa',
  //   'Refund',
  //   'Tours Booking',
  //   'Bike Payment',
  //   'TCS-Taxes',
  //   'Vendor Payments',
  //   'Insurance',
  //   'Train Tickets',
  //   'Resort Payment',
  // ];

  // const RecvType = [
  //   'SBI CU',
  //   'IDFC Cu',
  //   'SBI Card',
  //   'AMEX Card',
  //   'HDFC Card',
  //   'Wallets',
  // ];

  // const GenVendorName = [
  //   'One Above',
  //   'TBO Group',
  //   'Aueraga Global',
  //   'KLOOK',
  //   'Viator',
  //   'Delhi Tamil Cars',
  //   'Tripmore Travels',
  //   'GoCabs',
  //   'M.K Travels Goa',
  // ];

  const payParticularss = () => {
    let p = [];
    firedb.ref('particularDetail').on('value', (data) => {
      data.forEach((d) => {
        p.push(d.val().name);
      });
      setPayParticulars(p);
    });
  };
  const paymentTypes = () => {
    let p = [];
    firedb.ref('paymentTypeDetail').on('value', (data) => {
      data.forEach((d) => {
        p.push(d.val().name);
      });
      setRecvType(p);
    });
  };
  const vendors = () => {
    let p = [];
    firedb.ref('vendorDetail').on('value', (data) => {
      data.forEach((d) => {
        p.push(d.val().name);
      });
      setGenVendorName(p);
    });
  };

  useEffect(() => {
    payParticularss();
    paymentTypes();
    vendors();
  }, []);

  const renderItems = (step) => {
    switch (step) {
      case 1:
        return (
          <div className='bookingGeneral'>
            {edit ? (
              <>
                <div className='paymentMainn'>
                  <h3>General Information</h3>
                  <div className='paymentMainnBtn'>
                    {surveyid && (
                      <button
                        style={{ backgroundColor: 'red', marginRight: 100 }}
                        onClick={openInternationalModal}>
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
                <div className='bookingGeneralDetails'>
                  <div className='generalInput'>
                    <label>Survey ID</label>
                    <input
                      type='text'
                      value={surveyId}
                      onChange={(e) => setSurveyId(e.target.value)}
                    />
                  </div>
                  <div className='generalInput'>
                    <label>Customer Name</label>
                    <input
                      type='text'
                      value={customerName}
                      onChange={(e) =>
                        setGeneral({
                          ...general,
                          customerName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInput'>
                    <label>Destination</label>
                    <input
                      type='text'
                      value={destination}
                      onChange={(e) =>
                        setGeneral({
                          ...general,
                          destination: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInput'>
                    <label>Email</label>
                    <input
                      type='text'
                      value={email}
                      onChange={(e) =>
                        setGeneral({
                          ...general,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInput'>
                    <label>Phone Number</label>
                    <input
                      type='number'
                      value={phoneNumber}
                      onChange={(e) =>
                        setGeneral({
                          ...general,
                          phoneNumber: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className='generalInput'>
                    <label>Booked Date</label>
                    <input
                      type='date'
                      value={bookedDate}
                      onChange={(e) =>
                        setGeneral({
                          ...general,
                          bookedDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInput'>
                    <label>Booking Value</label>
                    <input
                      type='number'
                      value={bookingValue}
                      onChange={(e) =>
                        setGeneral({
                          ...general,
                          bookingValue: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInput'>
                    <div className='generalInputtParti'>
                      <label>Tour Type</label>
                      <div
                        className='generalSelectt'
                        onClick={() => {
                          setShowType(!showType);
                          setShowGenBook(false);
                          setShowGenVendor(false);
                          setShowGenSales(false);
                          setShowTcs(false);
                        }}>
                        {tourType !== '' ? (
                          <>
                            <div>{tourType}</div>
                            <IoIosArrowDown />
                          </>
                        ) : (
                          <>
                            <div>Select</div>
                            <IoIosArrowDown />
                          </>
                        )}
                      </div>
                      {showType ? (
                        <div className='generalLi3'>
                          <li
                            onClick={() => {
                              setGeneral({
                                ...general,
                                tourType: 'International',
                              });
                              setShowType(!showType);
                            }}>
                            International
                          </li>
                          <li
                            onClick={() => {
                              setGeneral({
                                ...general,
                                tourType: 'Domestic',
                              });
                              setShowType(!showType);
                            }}>
                            Domestic
                          </li>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className='generalInput'>
                    <label>Customer Pan Number</label>
                    <input
                      type='text'
                      value={panNumber}
                      onChange={(e) =>
                        setGeneral({
                          ...general,
                          panNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInput'>
                    <div className='generalInputtParti'>
                      <label>Tcs</label>
                      <div
                        className='generalSelectt'
                        onClick={() => {
                          setShowTcs(!showTcs);
                          setShowGenBook(false);
                          setShowGenVendor(false);
                          setShowGenSales(false);
                          setShowType(false);
                        }}>
                        {tcs !== '' ? (
                          <>
                            <div>{tcs}</div>
                            <IoIosArrowDown />
                          </>
                        ) : (
                          <>
                            <div>Select</div>
                            <IoIosArrowDown />
                          </>
                        )}
                      </div>
                      {showTcs ? (
                        <div className='generalLi3'>
                          <li
                            onClick={() => {
                              setGeneral({
                                ...general,
                                tcs: 'Yes',
                              });
                              setShowTcs(!showTcs);
                            }}>
                            Yes
                          </li>
                          <li
                            onClick={() => {
                              setGeneral({
                                ...general,
                                tcs: 'No',
                              });
                              setShowTcs(!showTcs);
                            }}>
                            No
                          </li>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className='generalInput'>
                    <div className='generalInputtParti'>
                      <label>Sales Handle Name</label>
                      <div
                        className='generalSelectt'
                        onClick={() => {
                          setShowGenSales(!showGenSales);
                          setShowGenBook(false);
                          setShowGenVendor(false);
                          setShowTcs(false);
                          setShowType(false);
                        }}>
                        {salesHandleName ? (
                          <>
                            <div>{salesHandleName}</div>
                            <IoIosArrowDown />
                          </>
                        ) : (
                          <>
                            <div>Select</div>
                            <IoIosArrowDown />
                          </>
                        )}
                      </div>
                      {showGenSales ? (
                        <div className='generalLi1'>
                          {employees?.map((e, i) => {
                            if (
                              e.designation !== 'Junior Software Engg' &&
                              e.designation !== 'CFO'
                            )
                              return (
                                <li
                                  key={i}
                                  onClick={() => {
                                    setGeneral({
                                      ...general,
                                      salesHandleName: e.name,
                                    });
                                    setShowGenSales(!showGenSales);
                                  }}>
                                  {e.name}
                                </li>
                              );
                          })}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className='generalInput'>
                    <div className='generalInputtParti'>
                      <label>Booking Handle Name</label>
                      <div
                        className='generalSelectt'
                        onClick={() => {
                          setShowGenBook(!showGenBook);
                          setShowGenSales(false);
                          setShowGenVendor(false);
                          setShowTcs(false);
                          setShowType(false);
                        }}>
                        {bookingHandleName ? (
                          <>
                            <div>{bookingHandleName}</div>
                            <IoIosArrowDown />
                          </>
                        ) : (
                          <>
                            <div>Select</div>
                            <IoIosArrowDown />
                          </>
                        )}
                      </div>
                      {showGenBook ? (
                        <div className='generalLi2'>
                          {employees?.map((e, i) => {
                            if (
                              e.designation !== 'Junior Software Engg' &&
                              e.designation !== 'CFO' &&
                              e.designation !== 'Travel Associate' &&
                              e.designation !== 'Accounts'
                            )
                              return (
                                <li
                                  key={i}
                                  onClick={() => {
                                    setGeneral({
                                      ...general,
                                      bookingHandleName: e.name,
                                    });
                                    setShowGenBook(!showGenBook);
                                  }}>
                                  {e.name}
                                </li>
                              );
                          })}
                          {/* <li
                            onClick={() => {
                              setGeneral({
                                ...general,
                                bookingHandleName: 'Vikash',
                              });
                              setShowGenBook(!showGenBook);
                            }}>
                            Vikash
                          </li>
                          <li
                            onClick={() => {
                              setGeneral({
                                ...general,
                                bookingHandleName: 'Sam',
                              });
                              setShowGenBook(!showGenBook);
                            }}>
                            Sam
                          </li> */}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className='generalInput'>
                    <label>Total Travel Days</label>
                    <input
                      type='text'
                      value={totalTravelDays}
                      onChange={(e) =>
                        setGeneral({
                          ...general,
                          totalTravelDays: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInput'>
                    <label>Payment Due Date</label>
                    <input
                      type='date'
                      value={paymentDueDate}
                      onChange={(e) =>
                        setGeneral({
                          ...general,
                          paymentDueDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInput'>
                    <label>Onward Date</label>
                    <input
                      type='date'
                      value={onwardDate}
                      onChange={(e) =>
                        setGeneral({
                          ...general,
                          onwardDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInput'>
                    <label>Return Date</label>
                    <input
                      type='date'
                      value={returnDate}
                      onChange={(e) =>
                        setGeneral({
                          ...general,
                          returnDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInput'>
                    <label>Adult(s)</label>
                    <input
                      type='number'
                      value={adults}
                      onChange={(e) =>
                        setGeneral({
                          ...general,
                          adults: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInput'>
                    <label>Child(s)</label>
                    <input
                      type='number'
                      value={children}
                      onChange={(e) =>
                        setGeneral({
                          ...general,
                          children: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className='generalInput'>
                    <div className='generalInputtParti'>
                      <label>Vendor Name</label>
                      <div
                        className='generalSelectt'
                        onClick={() => {
                          setShowGenVendor(!showGenVendor);
                          setShowGenBook(false);
                          setShowGenSales(false);
                          setShowTcs(false);
                          setShowType(false);
                        }}>
                        {vendorName ? (
                          <>
                            <div>{vendorName}</div>
                            <IoIosArrowDown />
                          </>
                        ) : (
                          <>
                            <div>Select</div>
                            <IoIosArrowDown />
                          </>
                        )}
                      </div>
                      {genVendorName && (
                        <>
                          {showGenVendor ? (
                            <div className='generalLi4'>
                              {genVendorName.map((p) => {
                                return (
                                  <li
                                    onClick={() => {
                                      setGeneral({
                                        ...general,
                                        vendorName: p,
                                      });
                                      setShowGenVendor(!showGenVendor);
                                    }}>
                                    {p}
                                  </li>
                                );
                              })}
                            </div>
                          ) : null}
                        </>
                      )}
                    </div>
                  </div>
                  <div className='generalInput'>
                    <label>Remarks</label>
                    <textarea
                      rows={1}
                      value={bookingRemarks}
                      onChange={(e) =>
                        setGeneral({
                          ...general,
                          bookingRemarks: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInput'>
                    <label>Final Margin</label>
                    <input
                      type='number'
                      value={finalMargin}
                      onChange={(e) =>
                        setGeneral({
                          ...general,
                          finalMargin: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className='generalInput'>
                  {surveyid === undefined ? (
                    <div className='generalButton'>
                      <button onClick={submitBookingDetails}>Submit</button>
                    </div>
                  ) : (
                    <div className='generalButton'>
                      <button onClick={updateBookingDetails}>Update</button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div
                className='bookingGeneralDetails'
                style={{ padding: '1.5em' }}>
                <div className='generalInput'>
                  <label>Survey Id</label>
                  <h6>{surveyId}</h6>
                </div>
                <div className='generalInput'>
                  <label>Customer Name</label>
                  <h6>{customerName}</h6>
                </div>
                <div className='generalInput'>
                  <label>Destination</label>
                  <h6>{destination}</h6>
                </div>
                <div className='generalInput'>
                  <label>Email</label>
                  <h6>{email}</h6>
                </div>
                <div className='generalInput'>
                  <label>Phone Number</label>
                  <h6>{phoneNumber}</h6>
                </div>
                <div className='generalInput'>
                  <label>Booked Date</label>
                  <h6>{bookedDate}</h6>
                </div>
                <div className='generalInput'>
                  <label>Booking Value</label>
                  <h6>RS.{numeral(bookingValue).format('0,')}</h6>
                </div>
                <div className='generalInput'>
                  <label>Tcs</label>
                  <h6>{tcs}</h6>
                </div>
                <div className='generalInput'>
                  <label>Tour Type</label>
                  <h6>{tourType}</h6>
                </div>
                <div className='generalInput'>
                  <label>Pan Number</label>
                  <h6>{panNumber}</h6>
                </div>
                <div className='generalInput'>
                  <label>Sales Handle Name</label>
                  <h6>{salesHandleName}</h6>
                </div>
                <div className='generalInput'>
                  <label>Booking Handle Name</label>
                  <h6>{bookingHandleName}</h6>
                </div>
                <div className='generalInput'>
                  <label>Total Travel Days</label>
                  <h6>{totalTravelDays}</h6>
                </div>
                <div className='generalInput'>
                  <label>Payment Due Date</label>
                  <h6>{paymentDueDate}</h6>
                </div>
                <div className='generalInput'>
                  <label>Onward Date</label>
                  <h6>{onwardDate}</h6>
                </div>
                <div className='generalInput'>
                  <label>Return Date</label>
                  <h6>{returnDate}</h6>
                </div>
                <div className='generalInput'>
                  <label>Adult(s)</label>
                  <h6>{adults}</h6>
                </div>
                <div className='generalInput'>
                  <label>Child(s)</label>
                  <h6>{children}</h6>
                </div>
                <div className='generalInput'>
                  <label>Vendor Name</label>
                  <h6>{vendorName}</h6>
                </div>
                <div className='generalInput'>
                  <label>Booking Remarks</label>
                  <h6>{bookingRemarks}</h6>
                </div>
                <div className='generalInput'>
                  <label>Final Margin</label>
                  <h6>{finalMargin}</h6>
                </div>
              </div>
            )}
          </div>
        );
      case 2:
        return (
          <div className='bookingGeneral'>
            <div className='paymentMainn'>
              <h3>Payment Information</h3>
              <div className='paymentMainnBtn'>
                <button onClick={() => setPaymentOpen(!paymentOpen)}>
                  + Add Payment
                </button>
              </div>
              {paymentOpen ? (
                <div className='paymentMainnForm'>
                  <div className='generalInputt'>
                    <label>Date</label>
                    <input
                      type='date'
                      value={date}
                      onChange={(e) =>
                        setNewPayment({
                          ...newPayment,
                          date: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInputt'>
                    <div className='generalInputtParti'>
                      <label>Particulars</label>
                      <div
                        className='generalSelect'
                        onClick={() => {
                          setShowParti(!showParti);
                          setShowRecvType(false);
                        }}>
                        {particulars ? (
                          <>
                            <div>{particulars}</div>
                            <IoIosArrowDown />
                          </>
                        ) : (
                          <>
                            <div>Select</div>
                            <IoIosArrowDown />
                          </>
                        )}
                      </div>
                      {payParticulars != '' && (
                        <>
                          {showParti ? (
                            <div className='generalLi'>
                              {payParticulars.map((p) => {
                                return (
                                  <li
                                    onClick={() => {
                                      setNewPayment({
                                        ...newPayment,
                                        particulars: p,
                                      });
                                      setShowParti(!showParti);
                                    }}>
                                    {p}
                                  </li>
                                );
                              })}
                            </div>
                          ) : null}
                        </>
                      )}
                    </div>
                  </div>
                  <div className='generalInputt'>
                    <div className='generalInputtParti'>
                      <label>Payment Type</label>
                      <div
                        className='generalSelect'
                        onClick={() => setShowRecvType(!showRecvType)}>
                        {recievedType ? (
                          <>
                            <div>{recievedType}</div>
                            <IoIosArrowDown />
                          </>
                        ) : (
                          <>
                            <div>Select</div>
                            <IoIosArrowDown />
                          </>
                        )}
                      </div>
                      {recvType && (
                        <>
                          {showRecvType ? (
                            <div className='generalLi'>
                              {recvType.map((p) => {
                                return (
                                  <li
                                    onClick={() => {
                                      setNewPayment({
                                        ...newPayment,
                                        recievedType: p,
                                      });
                                      setShowRecvType(!showRecvType);
                                    }}>
                                    {p}
                                  </li>
                                );
                              })}
                            </div>
                          ) : null}
                        </>
                      )}
                    </div>
                  </div>
                  <div className='generalInputt'>
                    <label>Recieved Amount</label>
                    <input
                      type='number'
                      value={recievedAmount}
                      onChange={(e) =>
                        setNewPayment({
                          ...newPayment,
                          recievedAmount: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInputt'>
                    <label>Spent Amount</label>
                    <input
                      type='number'
                      value={spentAmount}
                      onChange={(e) =>
                        setNewPayment({
                          ...newPayment,
                          spentAmount: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInputt'>
                    <label>Remark</label>
                    <input
                      type='text'
                      value={remark}
                      onChange={(e) =>
                        setNewPayment({
                          ...newPayment,
                          remark: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalbtns'>
                    <div className='generalInputtBtn'>
                      <button onClick={addPaymentDetails}>Add Payment</button>
                    </div>
                    <div className='generalInputtBtnCan'>
                      <button
                        onClick={() => {
                          setPaymentOpen(!paymentOpen);
                          setNewPayment({
                            date: '',
                            particulars: '',
                            recievedType: '',
                            recievedAmount: 0,
                            spentAmount: 0,
                            remark: '',
                          });
                        }}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
              {updatePaymentOpen ? (
                <div className='paymentMainnForm'>
                  <div className='generalInputt'>
                    <label>Date</label>
                    <input
                      type='date'
                      value={date}
                      onChange={(e) =>
                        setNewPayment({
                          ...newPayment,
                          date: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInputt'>
                    <div className='generalInputtParti'>
                      <label>Particulars</label>
                      <div
                        className='generalSelect'
                        onClick={() => {
                          setShowParti(!showParti);
                          setShowRecvType(false);
                        }}>
                        {particulars ? (
                          <>
                            <div>{particulars}</div>
                            <IoIosArrowDown />
                          </>
                        ) : (
                          <>
                            <div>Select</div>
                            <IoIosArrowDown />
                          </>
                        )}
                      </div>
                      {payParticulars != '' && (
                        <>
                          {showParti ? (
                            <div className='generalLi'>
                              {payParticulars.map((p) => {
                                return (
                                  <li
                                    onClick={() => {
                                      setNewPayment({
                                        ...newPayment,
                                        particulars: p,
                                      });
                                      setShowParti(!showParti);
                                    }}>
                                    {p}
                                  </li>
                                );
                              })}
                            </div>
                          ) : null}
                        </>
                      )}
                    </div>
                  </div>
                  <div className='generalInputt'>
                    <div className='generalInputtParti'>
                      <label>Recieved Type</label>
                      <div
                        className='generalSelect'
                        onClick={() => setShowRecvType(!showRecvType)}>
                        {recievedType ? (
                          <>
                            <div>{recievedType}</div>
                            <IoIosArrowDown />
                          </>
                        ) : (
                          <>
                            <div>Select</div>
                            <IoIosArrowDown />
                          </>
                        )}
                      </div>
                      {recvType && (
                        <>
                          {showRecvType ? (
                            <div className='generalLi'>
                              {recvType.map((p) => {
                                return (
                                  <li
                                    onClick={() => {
                                      setNewPayment({
                                        ...newPayment,
                                        recievedType: p,
                                      });
                                      setShowRecvType(!showRecvType);
                                    }}>
                                    {p}
                                  </li>
                                );
                              })}
                            </div>
                          ) : null}
                        </>
                      )}
                    </div>
                  </div>
                  <div className='generalInputt'>
                    <label>Recieved Amount</label>
                    <input
                      type='number'
                      value={recievedAmount}
                      onChange={(e) =>
                        setNewPayment({
                          ...newPayment,
                          recievedAmount: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInputt'>
                    <label>Spent Amount</label>
                    <input
                      type='number'
                      value={spentAmount}
                      onChange={(e) =>
                        setNewPayment({
                          ...newPayment,
                          spentAmount: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInputt'>
                    <label>Remark</label>
                    <input
                      type='text'
                      value={remark}
                      onChange={(e) =>
                        setNewPayment({
                          ...newPayment,
                          remark: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalbtns'>
                    <div className='generalInputtBtn'>
                      <button onClick={updatePaymentDetails}>
                        Update Payment
                      </button>
                    </div>
                    <div className='generalInputtBtnCan'>
                      <button
                        onClick={() =>
                          setUpdatePaymentOpen(!updatePaymentOpen)
                        }>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {!amountDetails || amountDetails.length === 0 ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '1em 0',
                }}>
                <img
                  style={{ height: 280, width: 280 }}
                  src='https://image.freepik.com/free-vector/reminders-concept-illustration_114360-4278.jpg'
                  alt='re'
                />
                <h5 style={{ fontFamily: 'andika' }}>No payments to show</h5>
              </div>
            ) : (
              <div className='b-table scroll-table'>
                <div className='paymentTableHead'>
                  <h5>Date</h5>
                  <h5>Particulars</h5>
                  <h5>Recieved Type</h5>
                  <h5>Recieved Amount</h5>
                  <h5>Spent Amount</h5>
                  <h5>Remark</h5>
                  <h5>Edit</h5>
                </div>

                <>
                  {amountDetails.map((c, i) => {
                    return (
                      <div className='paymentTableBody'>
                        <h5>{c.date}</h5>
                        <h5>{c.particulars}</h5>
                        <h5>{c.recievedType}</h5>
                        <h5>
                          {parseInt(c.recievedAmount) === 0
                            ? '-'
                            : numeral(c.recievedAmount).format('0,')}
                        </h5>
                        <h5>
                          {parseInt(c.spentAmount) === 0
                            ? '-'
                            : numeral(c.spentAmount).format('0,')}
                        </h5>
                        <h5>{c.remark}</h5>
                        <h5>
                          <AiFillEdit
                            className='paymentEdit'
                            onClick={() => {
                              setEditpaymentId(c.id);
                              setUpdatePaymentOpen(!updatePaymentOpen);
                              setNewPayment({
                                date: c.date,
                                particulars: c.particulars,
                                recievedType: c.recievedType,
                                recievedAmount: c.recievedAmount,
                                spentAmount: c.spentAmount,
                                remark: c.remark,
                              });
                            }}
                          />
                          <MdDeleteForever
                            className='paymentDelete'
                            onClick={() => {
                              setDeleteId(c.id);
                              openDeletePaymentModal();
                            }}
                          />
                        </h5>
                      </div>
                    );
                  })}
                </>
                {calculatePayment()[1] !== 0 && (
                  <div className='payment-details'>
                    <div className='single-pay'>
                      <h2>Total Booking Value</h2>
                      <h6>RS.{numeral(bookingValue).format('0,')}</h6>
                    </div>
                    {general.tcs === 'Yes' && (
                      <div className='single-pay'>
                        <h2>TCS 5%</h2>
                        <h6>
                          RS.{numeral(calculatePayment()[2]).format('0,')}
                        </h6>
                      </div>
                    )}
                    <div className='single-pay'>
                      <h2>Total Amount Received</h2>
                      <h6>RS.{numeral(calculatePayment()[0]).format('0,')}</h6>
                    </div>
                    {general.tcs === 'Yes' ? (
                      <div className='single-pay'>
                        <h2>Booking & Vendor Payment + TCS 5%</h2>
                        <h6>
                          RS.{numeral(calculatePayment()[1]).format('0,')}
                        </h6>
                      </div>
                    ) : (
                      <div className='single-pay'>
                        <h2>Booking & Vendor Payment</h2>
                        <h6>
                          RS.{numeral(calculatePayment()[1]).format('0,')}
                        </h6>
                      </div>
                    )}
                    <div className='single-pay'>
                      <h2>Margin Before GST</h2>
                      <h6>RS.{numeral(calculatePayment()[4]).format('0,')}</h6>
                    </div>
                    <div className='single-pay'>
                      <h2> GST 5%</h2>
                      <h6>RS.{numeral(calculatePayment()[3]).format('0,')}</h6>
                    </div>
                    <div className='single-pay final'>
                      <h2>Final Margin </h2>
                      <h6>RS.{numeral(calculatePayment()[5]).format('0,')}</h6>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      case 3:
        return (
          <div className='bookingGeneral'>
            <div>
              <h3>Visa Information</h3>
            </div>
            {visaEdit ? (
              <>
                <div className='bookingPaymentDetails'>
                  <div>
                    <div className='generalInput'>
                      <div className='generalInputtParti'>
                        <label>Visa On Arrival</label>
                        <div
                          className='generalSelectt'
                          onClick={() => {
                            setShowGenVisaOnArrival(!showGenVisaOnArrival);
                            setShowVisaStat(false);
                            setShowVisaVendor(false);
                            setShowVisaApmt(false);
                          }}>
                          {visaOnArrival ? (
                            <>
                              <div>{visaOnArrival}</div>
                              <IoIosArrowDown />
                            </>
                          ) : (
                            <>
                              <div>Select</div>
                              <IoIosArrowDown />
                            </>
                          )}
                        </div>
                        {showGenVisaOnArrival ? (
                          <div className='generalLi6'>
                            <li
                              onClick={() => {
                                setVisaDetails({
                                  ...visaDetails,
                                  visaOnArrival: 'Yes',
                                });
                                setShowGenVisaOnArrival(!showGenVisaOnArrival);
                              }}>
                              Yes
                            </li>
                            <li
                              onClick={() => {
                                setVisaDetails({
                                  ...visaDetails,
                                  visaOnArrival: 'No',
                                });
                                setShowGenVisaOnArrival(!showGenVisaOnArrival);
                              }}>
                              No
                            </li>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className='generalInput'>
                      <label>Processing Date</label>
                      <input
                        type='date'
                        value={processingDate}
                        onChange={(e) =>
                          setVisaDetails({
                            ...visaDetails,
                            processingDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className='generalInput'>
                      <label>Completed Date</label>
                      <input
                        type='date'
                        value={completedDate}
                        onChange={(e) =>
                          setVisaDetails({
                            ...visaDetails,
                            completedDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className='generalInput'>
                      <div className='generalInputtParti'>
                        <label>Visa Status</label>
                        <div
                          className='generalSelectt'
                          onClick={() => {
                            setShowVisaStat(!showVisaStat);
                            setShowVisaVendor(false);
                            setShowGenVisaOnArrival(false);
                            setShowVisaApmt(false);
                          }}>
                          {visaStatus ? (
                            <>
                              <div>{visaStatus}</div>
                              <IoIosArrowDown />
                            </>
                          ) : (
                            <>
                              <div>Select</div>
                              <IoIosArrowDown />
                            </>
                          )}
                        </div>
                        {showVisaStat ? (
                          <div className='generalLi5'>
                            <li
                              onClick={() => {
                                setVisaDetails({
                                  ...visaDetails,
                                  visaStatus: 'Applied',
                                });
                                setShowVisaStat(!showVisaStat);
                              }}>
                              Applied
                            </li>
                            <li
                              onClick={() => {
                                setVisaDetails({
                                  ...visaDetails,
                                  visaStatus: 'Pending',
                                });
                                setShowVisaStat(!showVisaStat);
                              }}>
                              Pending
                            </li>
                            <li
                              onClick={() => {
                                setVisaDetails({
                                  ...visaDetails,
                                  visaStatus: 'Approved',
                                });
                                setShowVisaStat(!showVisaStat);
                              }}>
                              Approved
                            </li>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className='generalInput'>
                      <div className='generalInputtParti'>
                        <label>Visa Vendor</label>
                        <div
                          className='generalSelectt'
                          onClick={() => {
                            setShowVisaVendor(!showVisaVendor);
                            setShowVisaStat(false);
                            setShowGenVisaOnArrival(false);
                            setShowVisaApmt(false);
                          }}>
                          {visaVendor ? (
                            <>
                              <div>{visaVendor}</div>
                              <IoIosArrowDown />
                            </>
                          ) : (
                            <>
                              <div>Select</div>
                              <IoIosArrowDown />
                            </>
                          )}
                        </div>
                        {showVisaVendor ? (
                          <div className='generalLi5'>
                            <li
                              onClick={() => {
                                setVisaDetails({
                                  ...visaDetails,
                                  visaVendor: 'VFS Global',
                                });
                                setShowVisaVendor(!showVisaVendor);
                              }}>
                              VFS Global
                            </li>
                            <li
                              onClick={() => {
                                setVisaDetails({
                                  ...visaDetails,
                                  visaVendor: 'TBO Group',
                                });
                                setShowVisaVendor(!showVisaVendor);
                              }}>
                              TBO Group
                            </li>
                            <li
                              onClick={() => {
                                setVisaDetails({
                                  ...visaDetails,
                                  visaVendor: 'Sky & Sky VISA',
                                });
                                setShowVisaVendor(!showVisaVendor);
                              }}>
                              Sky & Sky VISA
                            </li>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className='generalInput'>
                      <label>Visa Validity Date</label>
                      <input
                        type='date'
                        value={visaValidityDate}
                        onChange={(e) =>
                          setVisaDetails({
                            ...visaDetails,
                            visaValidityDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className='generalInput'>
                      <div className='generalInputtParti'>
                        <label>Visa Appointment</label>
                        <div
                          className='generalSelectt'
                          onClick={() => {
                            setShowVisaApmt(!showVisaApmt);
                            setShowGenVisaOnArrival(false);
                            setShowVisaStat(false);
                            setShowVisaVendor(false);
                          }}>
                          {visaAppointment ? (
                            <>
                              <div>{visaAppointment}</div>
                              <IoIosArrowDown />
                            </>
                          ) : (
                            <>
                              <div>Select</div>
                              <IoIosArrowDown />
                            </>
                          )}
                        </div>
                        {showVisaApmt ? (
                          <div className='generalLi6'>
                            <li
                              onClick={() => {
                                setVisaDetails({
                                  ...visaDetails,
                                  visaAppointment: 'Yes',
                                });
                                setShowVisaApmt(!showVisaApmt);
                              }}>
                              Yes
                            </li>
                            <li
                              onClick={() => {
                                setVisaDetails({
                                  ...visaDetails,
                                  visaAppointment: 'No',
                                });
                                setShowVisaApmt(!showVisaApmt);
                              }}>
                              No
                            </li>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    {visaAppointment === 'Yes' ? (
                      <div className='generalInput'>
                        <label>Visa Appointment Date</label>
                        <input
                          type='date'
                          value={visaAppointmentDate}
                          onChange={(e) =>
                            setVisaDetails({
                              ...visaDetails,
                              visaAppointmentDate: e.target.value,
                            })
                          }
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className='generalButton'>
                  <button onClick={submitVisaDetails}>Submit</button>
                </div>
              </>
            ) : (
              <div className='bookingPaymentDetails'>
                <div>
                  <div className='generalInput'>
                    <label>Visa On Arrival</label>
                    <h6>{visaOnArrival}</h6>
                  </div>
                  <div className='generalInput'>
                    <label>Processing Date</label>
                    <h6>{processingDate}</h6>
                  </div>
                  <div className='generalInput'>
                    <label>Completed Date</label>
                    <h6>{completedDate}</h6>
                  </div>
                  <div className='generalInput'>
                    <label>Visa Status</label>
                    <h6>{visaStatus}</h6>
                  </div>
                </div>
                <div>
                  <div className='generalInput'>
                    <label>Visa Vendor</label>
                    <h6>{visaVendor}</h6>
                  </div>
                  <div className='generalInput'>
                    <label>Visa Validity Date</label>
                    <h6>{visaValidityDate}</h6>
                  </div>
                  <div className='generalInput'>
                    <label>Visa Appointment</label>
                    <h6>{visaAppointment}</h6>
                  </div>
                  {visaAppointment === 'Yes' ? (
                    <div className='generalInput'>
                      <label>Visa Appointment Date</label>
                      <h6>{visaAppointmentDate}</h6>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        );
      case 4:
        return (
          <div className='bookingGeneral'>
            <div className='paymentMainn'>
              <h3>Reminders</h3>
              <div className='paymentMainnBtn'>
                <button onClick={() => setReminderOpen(true)}>
                  + Add Reminder
                </button>
              </div>
              {reminderOpen ? (
                <div className='paymentMainnForm'>
                  <div className='generalInputt'>
                    <label>Title </label>
                    <input
                      type='text'
                      value={title}
                      onChange={(e) =>
                        setNewReminder({
                          ...newReminder,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInputt'>
                    <label>Message</label>
                    <input
                      type='text'
                      value={body}
                      onChange={(e) =>
                        setNewReminder({
                          ...newReminder,
                          body: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInputt'>
                    <label>Reminder Date</label>
                    <input
                      style={{
                        marginTop: 12,
                      }}
                      type='date'
                      value={reminderDate}
                      onChange={(e) =>
                        setNewReminder({
                          ...newReminder,
                          reminderDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInputt'>
                    <div className='generalInputtParti'>
                      <label>Reminder Time</label>
                      <div
                        className='generalSelect'
                        onClick={() => {
                          setShowRemindTime(!showRemindTime);
                        }}>
                        {reminderTime ? (
                          <>
                            <div>{getTime(reminderTime)}</div>
                            <IoIosArrowDown />
                          </>
                        ) : (
                          <>
                            <div>Select</div>
                            <IoIosArrowDown />
                          </>
                        )}
                      </div>
                      {showRemindTime ? (
                        <div className='generalLi7'>
                          {time.map((p) => {
                            return (
                              <li
                                onClick={() => {
                                  setNewReminder({
                                    ...newReminder,
                                    reminderTime: p.value,
                                  });
                                  setShowRemindTime(!showRemindTime);
                                }}>
                                {p.name}
                              </li>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className='generalbtns'>
                    <div className='generalInputtBtn'>
                      <button onClick={addReminders}>Add Reminder</button>
                    </div>
                    <div className='generalInputtBtnCan'>
                      <button
                        onClick={() => {
                          setReminderOpen(false);
                          setNewReminder({
                            reminderDate: '',
                            title: '',
                            body: '',
                            reminderTime: 0,
                            isCompleted: false,
                          });
                        }}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {!reminders || reminders.length === 0 ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '1em 0',
                }}>
                <img
                  style={{ height: 280, width: 280 }}
                  src='https://image.freepik.com/free-vector/reminders-concept-illustration_114360-4278.jpg'
                  alt='reminder'
                />
                <h5 style={{ fontFamily: 'andika' }}>No reminders to show</h5>
              </div>
            ) : (
              <div className='b-table scroll-table'>
                <div className='paymentTableHead'>
                  <h5>Date</h5>
                  <h5>Time</h5>
                  <h5>Title</h5>
                  <h5>Message</h5>
                  <h5>Status</h5>
                  <h5>Mark as Complete</h5>
                </div>
                {reminders.map((c, i) => {
                  return (
                    <div className='paymentTableBody'>
                      <h5>{c.reminderDate}</h5>
                      <h5>{getTime(c.reminderTime)}</h5>
                      <h5>{c.title}</h5>
                      <h5>{c.body}</h5>
                      <h5>{c.isCompleted ? 'Completed' : 'Pending'}</h5>
                      <h5 style={{ alignSelf: 'center' }}>
                        <Input
                          type='checkbox'
                          checked={c.isCompleted}
                          onChange={() => setReminderComplete(c)}
                          value={c.isCompleted}
                        />
                      </h5>
                      {/* <h5 onClick={() => setReminder(c)}>Set</h5> */}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      case 5:
        return (
          <div className='bookingGenerall'>
            {travellerDocuments.length > 0 && (
              <div>
                {travellerDocuments.map((d, i) => {
                  const { documents, name } = d;
                  return (
                    <div>
                      <h5 className='docHeading'>Documents for {name}</h5>
                      <div>
                        {documents?.map((file, index) => {
                          return (
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                              }}>
                              <a
                                target='_blank'
                                href={file.fileUrl}
                                style={{ fontFamily: 'Andika', paddingTop: 5 }}>
                                {index + 1}.{file.fileName}
                              </a>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {childrenDocuments.length > 0 && (
              <div>
                {childrenDocuments.map((d, i) => {
                  const { documentsc, namec } = d;
                  return (
                    <div>
                      <h5 className='docHeading'>Documents for {namec}</h5>
                      <div>
                        {documentsc?.map((file, index) => {
                          return (
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                              }}>
                              <a
                                target='_blank'
                                href={file.fileUrl}
                                style={{ fontFamily: 'Andika', paddingTop: 5 }}>
                                {index + 1}.{file.fileName}
                              </a>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      default:
        break;
    }
  };

  return (
    <div className='bookingRecord'>
      <Modal
        className='modal-dialog-centered modal-danger'
        contentClassName='bg-gradient-danger'
        isOpen={internationalModal}>
        <div className='modal-header'>
          <h6 className='modal-title' id='modal-title-notification'>
            Cancel Booking - {surveyId}
          </h6>
          <button
            aria-label='Close'
            className='close'
            data-dismiss='modal'
            type='button'
            onClick={closeInternationalModal}>
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className='cancel-booking'>
          <div className='generalInput'>
            <label>Reason for cancellation</label>
            <textarea
              value={cancelBookingRemarks}
              onChange={(e) =>
                setGeneral({
                  ...general,
                  cancelBookingRemarks: e.target.value,
                })
              }
            />
          </div>
          <div className='cancel-check'>
            <Input
              type='checkbox'
              checked={isBookingCancelled}
              onChange={() =>
                setGeneral({
                  ...general,
                  isBookingCancelled: !isBookingCancelled,
                })
              }
              value={isBookingCancelled}
            />
            <h6>
              Once a booking is cancelled, this data cannot be retrieved. Are
              you sure you want to proceed?
            </h6>
          </div>
          <div className='paymentMainnBtn cancel-button'>
            <button
              disabled={!isBookingCancelled}
              onClick={() => {
                cancelBookingdetails();
                setInternationalModal(false);
              }}
              style={{ backgroundColor: isBookingCancelled ? 'red' : 'gray' }}>
              Cancel Booking
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        className='modal-dialog-centered modal-danger'
        contentClassName='bg-gradient-danger'
        isOpen={showDeletePaymentModal}>
        <div className='modal-header'>
          <h6 className='modal-title' id='modal-title-notification'>
            Delete Payment
          </h6>
          <button
            aria-label='Close'
            className='close'
            data-dismiss='modal'
            type='button'
            onClick={closeDeletePaymentModal}>
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className='deletePaymentModal'>
          <div className='deletePaymentModalflex'>
            <FiAlertTriangle className='deletePaymentIcon' />
            <h6>Are you sure you want to delete this Payment?</h6>
          </div>
          <div className='deletePaymentModalButton'>
            <button onClick={closeDeletePaymentModal}>Cancel</button>
            <button
              onClick={() => {
                deletePaymentDetails(deleteId);
                closeDeletePaymentModal();
              }}>
              Delete
            </button>
          </div>
        </div>
      </Modal>
      {isNewRecord && (
        <div className='bookingMain'>
          <h5>Survey ID : {surveyId} </h5>
          <h5>Name : {customerName}</h5>
          <h5>Destination : {destination}</h5>
          <h5>Onward Date : {onwardDate}</h5>
          <h5>Return Date: {returnDate}</h5>
        </div>
      )}
      <div className='bookingTermMain'>
        <div className='bookingTerm'>
          <div
            className={step === 1 ? 'bookingColor' : 'bookingColorNon'}></div>
          <h6
            onClick={() => {
              if (isNewRecord) setStep(1);
            }}
            className={step === 1 ? 'bb' : 'bc'}>
            General
          </h6>
          <div className='bookingBorder'></div>
          <div
            className={step === 2 ? 'bookingColor' : 'bookingColorNon'}></div>
          <h6
            onClick={() => {
              if (isNewRecord) setStep(2);
            }}
            className={step === 2 ? 'bb' : 'bc'}>
            Payment
          </h6>
          <div className='bookingBorder'></div>
          <div
            className={step === 3 ? 'bookingColor' : 'bookingColorNon'}></div>
          <h6
            onClick={() => {
              if (isNewRecord) setStep(3);
            }}
            className={step === 3 ? 'bb' : 'bc'}>
            Visa
          </h6>
          <div className='bookingBorder'></div>
          <div
            className={step === 4 ? 'bookingColor' : 'bookingColorNon'}></div>
          <h6
            onClick={() => {
              if (isNewRecord) setStep(4);
            }}
            className={step === 4 ? 'bb' : 'bc'}>
            Reminders
          </h6>

          {travellerDocuments?.length > 0 && (
            <>
              <div className='bookingBorder'></div>

              <div
                className={
                  step === 5 ? 'bookingColor' : 'bookingColorNon'
                }></div>
              <h6
                onClick={() => {
                  if (isNewRecord) setStep(5);
                }}
                className={step === 5 ? 'bb' : 'bc'}>
                Documents
              </h6>
            </>
          )}
        </div>
        <div className='renderTerm'>
          {detailsLoaded ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
              }}>
              <Spinner
                style={{ width: '4rem', height: '4rem' }}
                color='primary'
              />
            </div>
          ) : (
            <>
              <div>{renderItems(step)}</div>
              {step === 1 ? (
                <div className='bookingEdit' onClick={() => setEdit(!edit)}>
                  <BiEdit className='bookingArrowIcon' />
                </div>
              ) : null}
              {step === 3 ? (
                <div
                  className='bookingEdit'
                  onClick={() => setVisaEdit(!visaEdit)}>
                  <BiEdit className='bookingArrowIcon' />
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingRecord;
