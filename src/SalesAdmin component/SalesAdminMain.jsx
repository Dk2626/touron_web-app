import React, { useState } from 'react';
import BookingTable from './BookingTable';
import SalesRequest from './SalesRequest';
import SalesSelfPlan from './SalesSelfPlan';
import YearStatistics from './YearStatistics';
import FlightMail from '../MailSend/FlightMail';
import HotelMail from '../MailSend/HotelMail';
import './SalesAdminMain.css';

const SalesAdminMain = () => {
  const [step, setStep] = useState(1);

  const renderSale = () => {
    switch (step) {
      case 1:
        return <SalesRequest />;
      case 2:
        return <SalesSelfPlan />;
      case 3:
        return <YearStatistics />;
      case 4:
        return <BookingTable />;
      case 5:
        return <FlightMail />;
      case 6:
        return <HotelMail />;
      default:
        return step;
    }
  };

  return (
    <div className='salessadminmainn'>
      <div className='salessadminmainndivide1'>
        <ul className='salessadminmainndivide1Ul'>
          <li
            onClick={() => setStep(1)}
            className={
              step == 1
                ? 'salessadminmainndivide1Li'
                : 'salessadminmainndivide1LiN'
            }>
            Request
          </li>
          <li
            onClick={() => setStep(2)}
            className={
              step == 2
                ? 'salessadminmainndivide1Li'
                : 'salessadminmainndivide1LiN'
            }>
            Self Plan
          </li>
          <li
            onClick={() => setStep(3)}
            className={
              step == 3
                ? 'salessadminmainndivide1Li'
                : 'salessadminmainndivide1LiN'
            }>
            Year Statistics
          </li>
          <li
            onClick={() => setStep(4)}
            className={
              step == 4
                ? 'salessadminmainndivide1Li'
                : 'salessadminmainndivide1LiN'
            }>
            Booking
          </li>
          <li
            onClick={() => setStep(5)}
            className={
              step == 5
                ? 'salessadminmainndivide1Li'
                : 'salessadminmainndivide1LiN'
            }>
            Send Hotel Mail
          </li>
          <li
            onClick={() => setStep(6)}
            className={
              step == 6
                ? 'salessadminmainndivide1Li'
                : 'salessadminmainndivide1LiN'
            }>
            Send Flight Mail
          </li>
        </ul>
      </div>
      <div className='salessadminmainndivide2'>{renderSale()}</div>
    </div>
  );
};

export default SalesAdminMain;
