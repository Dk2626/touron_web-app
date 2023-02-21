import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { firedb } from '../firebase';
import './BookingDRecord.css';
import ReactExport from 'react-export-excel';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const BookingDRecord = () => {
  const isMounted = useRef(false);
  const [finalLogs, setFinalLogs] = useState([]);
  // console.log('finalLogs', finalLogs);

  const getRecord = () => {
    let log = [];
    firedb.ref('bookingdetails1').on('value', (data) => {
      if (isMounted.current) {
        data.forEach((d) => {
          if (d.val().paymentDetails.amountDetails) {
            d.val().paymentDetails.amountDetails.forEach((final) => {
              if (
                '2022' === moment(final.date).format('YYYY') &&
                3 === moment(final.date).month()
              ) {
                log.push({
                  date: final.date,
                  surveyId: d.val().surveyId,
                  customerName: d.val().general.customerName,
                  particulars: final.particulars,
                  recievedType: final.recievedType,
                  recievedAmount: final.recievedAmount,
                  spentAmount: final.spentAmount,
                  remark: final.remark,
                });
              }
            });
          }
        });
        let sortLog = log.sort(
          (a, b) =>
            parseInt(a.date.slice(8, 10)) - parseInt(b.date.slice(8, 10))
        );
        setFinalLogs(sortLog);
      }
    });
  };

  useEffect(() => {
    isMounted.current = true;
    getRecord();
    return () => (isMounted.current = false);
  }, []);

  return (
    <div className='BookingDRecord___Main'>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}>
        <ExcelFile
          element={
            <button
              style={{
                backgroundColor: 'blueviolet',
                cursor: 'pointer',
                margin: '10px',
                width: '150px',
                textAlign: 'center',
                color: 'white',
                padding: 10,
                border: 'none',
                outline: 'none',
              }}>
              Export to Excel
            </button>
          }>
          <ExcelSheet data={finalLogs} name='finalLogs'>
            <ExcelColumn label='Date' value='date' />
            <ExcelColumn label='Survey Id' value='surveyId' />
            <ExcelColumn label='Customer Name' value='customerName' />
            <ExcelColumn label='Particulars' value='particulars' />
            <ExcelColumn label='Received Type' value='recievedType' />
            <ExcelColumn label='Received Amount' value='recievedAmount' />
            <ExcelColumn label='Spent Amount' value='spentAmount' />
            <ExcelColumn label='Remark' value='remark' />
          </ExcelSheet>
        </ExcelFile>
      </div>
      <table className='BookingDRecord___Main__table'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Survey Id</th>
            <th>Customer Name</th>
            <th>Particulars</th>
            <th>Received Type</th>
            <th>Received Amount</th>
            <th>Spent Amount</th>
            <th>Remark</th>
          </tr>
        </thead>
        <tbody>
          {finalLogs.map((finalLog, i) => {
            const {
              date,
              surveyId,
              customerName,
              particulars,
              recievedType,
              recievedAmount,
              spentAmount,
              remark,
            } = finalLog;
            return (
              <tr key={i}>
                <td>{date}</td>
                <td>{surveyId}</td>
                <td>{customerName}</td>
                <td>{particulars}</td>
                <td>{recievedType}</td>
                <td>{recievedAmount}</td>
                <td>{spentAmount}</td>
                <td>{remark}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BookingDRecord;
