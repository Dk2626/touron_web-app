import React, { useEffect, useState, useRef } from 'react';
import { firedb } from '../firebase';

const SalesSelfPlans = () => {
  const isMounted = useRef(false);
  const [selfPlanLength, setSelfPlanLength] = useState([]);
  const [selfPlanRequest, setSelfPlanRequest] = useState([]);
  const [querystatus, setQueryStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentpage] = useState(1);
  const [assignedTasks, setAssignedTasks] = useState([]);

  console.log('first', selfPlanRequest);

  let pagesCount = selfPlanLength.length;

  console.log('pagesCount', pagesCount);

  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentpage(index);
  };

  const getselfPlanLength = (uid) => {
    firedb.ref('self-planned-tours').on('value', (data) => {
      if (isMounted.current) {
        if (data !== null) {
          let req = [];
          data.forEach((d) => {
            req.push({
              key: d.key,
              value: d.val(),
            });
          });
          setSelfPlanLength(req);
        }
      }
    });
  };

  const getAllSelfPlans = () => {
    let dd = [];
    firedb
      .ref('self-planned-tours')
      .orderByKey()
      .limitToLast(currentPage * pageSize)
      .on('value', (data) => {
        if (isMounted.current) {
          data.forEach((d) => {
            dd.push(d.val());
          });
        }
        setSelfPlanRequest(dd.reverse());
      });
  };

  useEffect(() => {
    isMounted.current = true;
    getselfPlanLength();
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    isMounted.current = true;
    getAllSelfPlans();
    return () => (isMounted.current = false);
  }, [currentPage, pageSize]);

  const getTaskAssigne = (requestID) => {
    let name = '';
    assignedTasks.forEach((a) => {
      if (a.requestID === requestID) {
        name = a.name;
      }
    });
    return name;
  };

  const colors = [
    {
      name: 'All',
      color: '#f39c12',
    },
    {
      name: 'Query Received',
      color: '#f39c12',
    },
    {
      name: 'On Progress',
      color: '#8e44ad',
    },
    {
      name: 'Plan Shared',
      color: '#7f8c8d',
    },
    {
      name: 'Cancelled',
      color: 'red',
    },
    {
      name: 'On Hold',
      color: '#3498db',
    },
    {
      name: 'Duplicate Query',
      color: '#FFF',
    },
    {
      name: 'Tour Booked',
      color: '#2d3436',
    },
    {
      name: 'Awaiting Payment',
      color: '#00cec9',
    },
    {
      name: 'Cancellation Requested',
      color: '#d63031',
    },
    {
      name: 'Estimated',
      color: 'red',
    },
    {
      name: 'Completed',
      color: '#55efc4',
    },
  ];

  const getColor = (status) => {
    let color = '';
    colors.filter((c) => {
      if (c.name === status) color = c.color;
    });
    return color;
  };

  const getAssignTask = () => {
    let task = [];
    firedb.ref(`assignedTasks`).on('value', (data) => {
      if (isMounted.current) {
        if (data.val() === null || data.val() === undefined) {
          return;
        }
        if (data.val() !== null || data.val() !== undefined) {
          data.forEach((d) => {
            task.push(d.val());
          });
        }
      }
      setAssignedTasks(task);
    });
  };

  useEffect(() => {
    isMounted.current = true;
    getAssignTask();
    return () => (isMounted.current = false);
  }, []);

  return (
    <div
      className='booking-container'
      style={{
        padding: '20px',
      }}>
      <div
        className='booking-name-container'
        style={{
          padding: '30px',
        }}>
        <div>
          <h3 style={{ color: '#666666' }}>Self Plan Management</h3>
        </div>
      </div>
      <div
        className='booking-stats-container'
        style={{
          padding: '30px',
        }}>
        <div className='booking-stats'>
          <h3>Submitted Request</h3>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h6>{selfPlanLength.length}</h6>
          </div>
        </div>
        <div
          className='filters'
          style={{
            padding: '30px',
          }}>
          <div className='month'>
            <label>Show Item : </label>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value)}>
              <option value='10'>10</option>
              <option value='20'>20</option>
              <option value='50'>50</option>
            </select>
          </div>
          <div className='month'>
            <label>Query Status : </label>
            <select
              onChange={(e) => {
                setQueryStatus(e.target.value);
              }}
              value={querystatus}>
              {colors.map((c, index) => {
                return (
                  <option key={index} value={c.name === 'All' ? '' : c.name}>
                    {c.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className='b-table' style={{ height: 'auto' }}>
        <div
          className='table-heading-container request'
          style={{
            width: '100%',
          }}>
          <h5>Request Status</h5>
          <h5>Request Id</h5>
          <h5>Name</h5>
          <h5>Travel Mode</h5>
          {/* <h5>Selected Cities</h5> */}
          <h5>Departure Date</h5>
          <h5>Total No of Days</h5>
          <h5>Handle By </h5>
        </div>
        <>
          {selfPlanRequest
            .slice(
              (currentPage === 1 ? 0 : currentPage - 1) * pageSize,
              currentPage * pageSize
            )
            .map((s, i) => {
              return (
                <div
                  className='table-heading-row request'
                  key={i}
                  style={{
                    backgroundColor:
                      s.status === 'Duplicate Query' ? '#FF6666' : '',
                  }}>
                  <h5
                    style={{
                      color: `${getColor(s.status)}`,
                    }}>
                    {s.status}
                  </h5>
                  <h5>{s.requestID}</h5>
                  <h5>{s.name}</h5>
                  <h5>{s.travelmode}</h5>
                  <h5>{s.fromData}</h5>
                  <h5>{s.totalDays}</h5>
                  <h5>{getTaskAssigne(s.requestID)}</h5>
                </div>
              );
            })}
        </>
      </div>
      <div className='pagination-table'>
        {currentPage === 1 ? null : (
          <div
            className='pag-count'
            onClick={(e) => {
              handleClick(e, currentPage - 1);
            }}
            style={{
              backgroundColor: '#0057ff',
              color: '#fff',
            }}>
            <h5>{'<'}</h5>
          </div>
        )}
        {new Array(pagesCount).fill('1').map((c, i) => {
          if (i + 1 < currentPage + 5 && i > currentPage - 2) {
            return (
              <div
                key={i}
                className='pag-count'
                onClick={(e) => handleClick(e, i + 1)}
                style={{
                  backgroundColor: currentPage - 1 === i ? '#0057ff' : '#fff',
                  color: currentPage - 1 === i ? '#fff' : '#333',
                }}>
                <h5>{i + 1}</h5>
              </div>
            );
          }
        })}
        {pagesCount - 1 === currentPage ? null : (
          <div
            className='pag-count'
            onClick={(e) => handleClick(e, currentPage + 1)}
            style={{
              backgroundColor: '#0057ff',
              color: '#fff',
            }}>
            <h5>{'>'}</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesSelfPlans;
