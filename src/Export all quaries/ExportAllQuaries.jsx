import React, { useState, useEffect } from 'react';
import { firedb } from '../firebase';
import ReactExport from 'react-export-excel';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExportAllQuaries = () => {
  const [datas, setDatas] = useState([]);

  const getData = () => {
    let final = [];
    firedb.ref('userGeneralInfo').on('value', (data) => {
      data.forEach((d) => {
        if (d.val().name && d.val().email && d.val().phoneNumber) {
          final.push({
            name: d.val().name,
            email: d.val().email,
            mobile: d.val().phoneNumber,
          });
        }
      });
      setDatas(final);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ padding: 10 }}>
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
          <ExcelSheet data={datas} name='Customers'>
            <ExcelColumn label='Name' value='name' />
            <ExcelColumn label='Mobile' value='mobile' />
            <ExcelColumn label='Email' value='email' />
          </ExcelSheet>
        </ExcelFile>
        {/* <div
          style={{
            backgroundColor: 'blueviolet',
            cursor: 'pointer',
            margin: '10px',
            width: '150px',
            textAlign: 'center',
            color: 'white',
            padding: 10,
          }}>
          Export to Excel
        </div> */}
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((d, i) => {
            return (
              <tr key={i}>
                <td>{d.name}</td>
                <td>{d.mobile}</td>
                <td>{d.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExportAllQuaries;
