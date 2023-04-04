import React, { useEffect, useRef, useState } from 'react';
import { firedb } from '../firebase';

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
    <div>
      {formOpen && (
        <div
          style={{
            position: 'absolute',
            background: '#fff',
            padding: '10px',
            top: '50%',
            left: '50%',
          }}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <p>Are you sure you want to delete?</p>
              <button style={{ margin: '5px' }} onClick={() => removeData()}>
                Delete
              </button>
              <button
                style={{ margin: '5px' }}
                onClick={() => setFormOpen(false)}>
                Cancel
              </button>
            </>
          )}
        </div>
      )}
      <div>
        <table>
          <thead>
            <tr>
              <th>Survey Id</th>
              <th>Customer Name</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {bookRecords.map((b, i) => (
              <tr key={i}>
                <td>{b.survey}</td>
                <td>{b.name}</td>
                <td
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setKey(b.key);
                    setFormOpen(true);
                  }}>
                  Del
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
