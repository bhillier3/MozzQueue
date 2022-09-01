import React, { useState, useEffect, useRef } from 'react'
import firebase from '../firebase'

import { doc, updateDoc, onSnapshot, deleteDoc, Timestamp } from 'firebase/firestore'
const db = firebase.firestore()

const MozzEntry = ({ id, data }) => {
  const [isStarted, setIsStarted] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    onSnapshot(doc(db, 'mozzqueue', id), (snapshot) => {
      setIsStarted(snapshot.data().isStarted)
      setIsComplete(snapshot.data().isComplete)
    })
  }, [setIsStarted, setIsComplete])

  const handleFireClick = async() => {
    await updateDoc(doc(db, 'mozzqueue', id), {
      start_time: Timestamp.now(),
      isStarted: true
    })
  }
  const handleFinishClick = async() => {
    await updateDoc(doc(db, 'mozzqueue', id), {
      finish_time: Timestamp.now(),
      isComplete: true
    })
  }
  const handleDelete = async() => {
    await deleteDoc(doc(db, 'mozzqueue', id))
  }

  return(
    <div className={
      `mozz-entry-container
      ${isStarted && !isComplete && 'active-entry'}
      ${isComplete && 'complete-entry'}`
    }>
      <div className='entry-box'>
        <div className='entry-label'>Server</div>
        <div className='entry-data'>{data.server}</div>
      </div>
      <div className='entry-box'>
        <div className='entry-label'>Table #</div>
        <div className='entry-data'>{data.table}</div>
      </div>
      <div className='entry-box'>
        <div className='entry-label'>Notes</div>
        <div className='entry-data'>{data.notes}</div>
      </div>
      <div className='entry-box'>
        <div className='entry-label'>Entry Time</div>
        <div className='entry-data'>
          {data.entry_time.toDate().toLocaleTimeString('en-US')}
        </div>
      </div>
      <div className='entry-box'>
        <div className='entry-label'>Start Time</div>
        <div className='entry-data'>
          {isStarted ?
            data.start_time.toDate().toLocaleTimeString('en-US') :
            <button className='entry-btn' onClick={handleFireClick}>
              Fire
            </button>
          }
        </div>
      </div>
      <div className='entry-box'>
        <div className='entry-label'>Finish Time</div>
        <div className={`entry-data ${isComplete && 'finish-time'}`}>
          {isStarted ?
            (isComplete ?
              data.finish_time.toDate().toLocaleTimeString('en-US') :
              <button className='entry-btn' onClick={handleFinishClick}>
                Done
              </button>
            ) : '--:--:--'
          }
        </div>
      </div>
      <button className='delete-btn' onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default MozzEntry