// import React, { useRef } from 'react';

// const Record = () => {
//   const myRef = useRef(null);

//   const handleClick = () => {
//     const element = myRef.current;
//     if (element) {
//       const elementAsString = element.toString();
//       console.log('adas', elementAsString);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleClick}>Click me</button>
//       <div ref={myRef}>Hello, world!</div>
//     </div>
//   );
// };

// export default Record;

import React, { useEffect, useRef, useState } from 'react';
import { firedb } from '../firebase';
import parse from 'html-react-parser';

const Record = () => {
  const [email, setEmail] = useState('');
  const ht = useRef(null);

  // // console.log('ht', ht.current);

  // const parser = new DOMParser();
  // // const htmlString = `${ht.current}`;
  // const doc = parser.parseFromString(ht.current.toString(), 'text/html');
  // const element = doc.body.firstChild;

  // console.log('element', element);

  let data = {
    billTo:
      '<p>Dinesh,<br>851/a, Genagai samuthiram road,<br>jeeva nagar, Budalur</p>',
    customerName: 'Dinesh',
    destination: 'Coorg',
    dueDate: '2023-03-29',
    email: 'dineshkumardm2619@gmail.com',
    invoiceDatas: [
      {
        invcDes: '<p>ffff<br>ggg</p>',
        qty: '2',
        unitPrice: '297',
      },
      {
        invcDes: '<p>sdfsd</p>',
        qty: '1',
        unitPrice: '9999',
      },
      {
        invcDes: '<p>dsds</p>',
        qty: '2',
        unitPrice: '2355',
      },
    ],
    invoiceDate: '2023-03-28',
    invoiceNo: '123',
    onwardDate: '2023-03-30',
    returnDate: '2023-04-06',
  };
  // const isMounted = useRef(false);

  // const getInvoiceData = () => {
  //   firedb.ref('invoices').on("value", data => {
  //     if(isMounted.current){
  //        data.forEach((d) => )
  //     }
  //   })
  // }

  // useEffect(() => {
  //   isMounted.current = true;
  //   getInvoiceData();
  //   return () => (isMounted.current = false);
  // }, []);

  function submitMail(e) {
    e.preventDefault();
    firedb
      .ref('invoice')
      .push({
        email,
        html: ht.current.toString(),
      })
      .then(() => setEmail(''))
      .catch((err) => console.log(err));
  }

  let arr = [1, 2, 3, 4, 4, 5];

  return (
    <div>
      <div
        ref={ht}
        style={{
          backgroundColor: 'white',
          padding: 20,
          margin: 10,
          width: '100%',
        }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div style={{ width: '200px', height: '180px' }}>
              <img
                src='https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/logof.png?alt=media&token=a45a95ae-e4a8-469d-a03d-2b20c6f2a484'
                alt='logo'
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div>
              <h6>tour On (A Brand of Lotsatravel Holidays LLP)</h6>
              <p>
                Chennai <br />
                Tamil Nadu 600073 <br />
                GST Number: 33AAHFL7839F1Z6 <br />
                GSTIN: 33AAHFL7839F1Z6
              </p>
            </div>
          </div>
          <div>
            <h2>TAX INVOICE</h2>
            <h6># INV-10123 </h6>
          </div>
          <div>
            {arr.map((a, i) => {
              return (
                <div key={i}>
                  <div>{a}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <form onSubmit={submitMail}>
        <div>
          <label>email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <input type='submit' value='Send Mail' />
      </form>
    </div>
  );
};

export default Record;
