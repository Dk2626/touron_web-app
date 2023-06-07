import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { firedb } from '../firebase';
import { useToasts } from 'react-toast-notifications';
import { HiPencilAlt, HiTrash } from 'react-icons/hi';

const DummySlot = () => {
  const isMounted = useRef(false);
  const [modal, setModal] = useState(false);
  const closeModal = () => {
    setModal(false);
    setDummyName('');
  };
  const openModal = () => setModal(true);
  const [edit, setEdit] = useState(false);
  const { addToast } = useToasts();
  const [dumId, setDumId] = useState('');
  const [dummyName, setDummyName] = useState('');
  const [dummys, setDummys] = useState({});
  const [delModal, setDelModal] = useState(false);
  const closeDelModal = () => setDelModal(false);
  const openDelModal = () => setDelModal(true);

  const addDummy = () => {
    firedb
      .ref('dummyslot')
      .push({
        time: dummyName,
      })
      .then(() => {
        setModal(false);
        addToast('dummyslot added successfully', {
          appearance: 'success',
        });
        setDummyName('');
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const updateDummy = () => {
    firedb
      .ref(`dummyslot/${dumId}`)
      .set({
        time: dummyName,
      })
      .then(() => {
        setModal(false);
        setEdit(false);
        setDumId('');
        setDummyName('');
        addToast('dummyslot updated successfully', {
          appearance: 'info',
        });
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const deleteDummy = () => {
    firedb
      .ref(`dummyslot/${dumId}`)
      .remove()
      .then(() => {
        setDelModal(false);
        setDumId('');
        addToast('dummyslot deleted successfully', {
          appearance: 'error',
        });
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const getDummy = () => {
    firedb.ref('dummyslot').on('value', (snapshot) => {
      if (isMounted.current) {
        if (snapshot.val() != null)
          setDummys({
            ...snapshot.val(),
          });
      }
    });
  };

  useEffect(() => {
    isMounted.current = true;
    getDummy();
    return () => (isMounted.current = false);
  }, []);

  return (
    <>
      <Modal isOpen={delModal}>
        <ModalHeader toggle={closeDelModal}>Delete DummySlot</ModalHeader>
        <ModalBody>
          <div>
            <h5>Are you sure, you want to delete this dummyslot</h5>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{ backgroundColor: '#12B0E8' }}
            onClick={() => setDelModal(false)}>
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: '#E21717' }}
            onClick={() => deleteDummy()}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modal}>
        <ModalHeader toggle={closeModal}>
          {edit ? 'Update DummySlot' : 'Add DummySlot'}
        </ModalHeader>
        <ModalBody>
          <div className='adminFieldMain'>
            <div className='adminField'>
              <h6>Dummy Slot Time</h6>
              <input
                type='name'
                onChange={(e) => setDummyName(e.target.value)}
                value={dummyName}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{ backgroundColor: '#4DD637' }}
            onClick={() => (dumId ? updateDummy() : addDummy())}>
            {dumId ? 'Update' : 'Add'}
          </Button>
        </ModalFooter>
      </Modal>
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
            <h3 style={{ color: '#666666' }}>DummySlot Section</h3>
          </div>
          <div className='add-booking' onClick={() => openModal()}>
            <h6> + Add DummySlot</h6>
          </div>
        </div>
        <div className='b-table'>
          <div className='table-heading-container  admin-table'>
            <h5>Sl.No</h5>
            <h5>Time</h5>
            <h5>Action</h5>
          </div>
          <div>
            {Object.keys(dummys).map((dum, i) => {
              return (
                <div className='table-heading-row  admin-table' key={i}>
                  <h5>{i + 1}</h5>
                  <h5>{dummys[dum].time}</h5>
                  <h5>
                    <div>
                      <HiPencilAlt
                        style={{
                          color: 'blue',
                          marginRight: '5px',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          setDummyName(dummys[dum].time);
                          setDumId(dum);
                          setEdit(true);
                          openModal();
                        }}
                      />
                      <HiTrash
                        style={{
                          color: 'red',
                          marginLeft: '5px',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          setDumId(dum);
                          openDelModal();
                        }}
                      />
                    </div>
                  </h5>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DummySlot;
