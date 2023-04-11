import React, { useEffect, useRef, useState } from 'react';
import { firedb } from '../firebase';
import './BookingDeletion.css';
import { MdDeleteForever } from 'react-icons/md';

const BookingDeletion = () => {
  const isMounted = useRef(false);
  const [bookRecords, setBookRecords] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState('');

  function getData() {
    let final = [];
    firedb.ref('bookingdetails1').on('value', (data) => {
      if (isMounted.current) {
        data.forEach((d) => {
          final.push({
            key: d.key,
            survey: d.val().surveyId,
            name: d.val().general.customerName,
            dest: d.val().general.destination,
            onward: d.val().general.onwardDate,
            return: d.val().general.returnDate,
          });
        });
      }
      setBookRecords(final.reverse());
    });
  }

  useEffect(() => {
    isMounted.current = true;
    getData();
    return () => (isMounted.current = false);
  }, []);

  function removeData() {
    setLoading(true);
    firedb
      .ref(`bookingdetails1/${key}`)
      .remove()
      .then(() => {
        setLoading(false);
        setFormOpen(false);
      })
      .catch((err) => console.log('err', err));
  }

  return (
    <div className='bookingDeletion_form_mainzz_ss'>
      {formOpen && (
        <div className='bookingDeletion_form_mainzz'>
          <div className='bookingDeletion_form_mainzz_f'>
            {loading ? (
              <div>Please wait...</div>
            ) : (
              <>
                <p className='bookingDeletion_form_mainzz_p'>
                  Are you sure you want to delete?
                </p>
                <div>
                  <button
                    className='bookingDeletion_form_mainzz_btn1'
                    style={{ margin: '5px' }}
                    onClick={() => removeData()}>
                    Delete
                  </button>
                  <button
                    className='bookingDeletion_form_mainzz_btn2'
                    style={{ margin: '5px' }}
                    onClick={() => setFormOpen(false)}>
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <div>
        <table className='bookingDeletion_table_mainsss'>
          <thead>
            <tr className='bookingDeletion_table_tr'>
              <th>Sl.no</th>
              <th>Survey Id</th>
              <th>Customer Name</th>
              <th>Destination</th>
              <th>Departure</th>
              <th>Return</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {bookRecords.map((b, i) => (
              <tr key={i} className='bookingDeletion_table_tr1'>
                <td>{i + 1}</td>
                <td>{b.survey}</td>
                <td>{b.name}</td>
                <td>{b.dest}</td>
                <td>{b.onward}</td>
                <td>{b.return}</td>
                <td
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setKey(b.key);
                    setFormOpen(true);
                  }}>
                  <MdDeleteForever className='bookingDeletion_table_tr1_dels' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingDeletion;
