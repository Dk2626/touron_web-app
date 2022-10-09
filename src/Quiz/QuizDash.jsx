import React, { useState, useEffect, useRef } from 'react';
import { firedb } from '../firebase';
import './QuizDash.css';

const QuizDash = () => {
  const isMounted = useRef(false);
  const [finalQuizData, setFinalQuizData] = useState([]);

  const getData = () => {
    const datas = [];
    firedb.ref('quiz').on('value', (data) => {
      if (isMounted.current) {
        data.forEach((d) => {
          datas.push(d.val());
        });
      }
      setFinalQuizData(datas);
    });
  };

  useEffect(() => {
    isMounted.current = true;
    getData();
    return () => (isMounted.current = false);
  }, []);

  return (
    <div className='quizDashMainHome'>
      <div className='quizDashMainHomeHead'>
        <h3>Participants - {finalQuizData.length}</h3>
      </div>
      <table className='quizDashMain'>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Date</th>
            <th style={{ width: '150px' }}>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Gender</th>
            <th>Opting</th>
            <th>Score</th>
            <th>Time</th>
          </tr>
        </thead>
        {finalQuizData && (
          <tbody>
            {finalQuizData
              .sort((a, b) => b.correct - a.correct || a.seconds - b.seconds)
              .map((final, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{final.date ? final.date : '-'}</td>
                    <td style={{ width: '150px' }}>{final.name}</td>
                    <td>{final.email}</td>
                    <td>{final.phone}</td>
                    <td>{final.gender}</td>
                    <td>{final.opting}</td>
                    <td>{final.correct}</td>
                    <td>{final.seconds}</td>
                  </tr>
                );
              })}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default QuizDash;
