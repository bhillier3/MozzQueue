import React, { useState, useEffect } from 'react'
import SelectServers from './SelectServers'
import firebase from '../firebase'

import { query, collection, orderBy, onSnapshot, where } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const db = firebase.firestore()

const MozzQueue = () => {
  const [isSelServClicked, setIsSelServClicked] = useState(false)
  const [activeServers, setActiveServers] = useState([])

  useEffect(() => {
    const activeServerQueryRef = query(
      collection(db, 'servers'),
      where('active', '==', true), orderBy('name')
    )
    onSnapshot(activeServerQueryRef, (snapshot) => {
      setActiveServers(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  })

  const handleSelServClick = e => {
    e.preventDefault()

    setIsSelServClicked(true)
  }

  return (
    <div className='mozzq-container'>
      {isSelServClicked ? (
        <div className='select-servers'>
          <SelectServers
            setIsSelServClicked={setIsSelServClicked}
          />
        </div>
        ) : (
        <div className='active-servers'>
          <h3 className='selserv-title'>Active Servers</h3>
          <div className='servers-container'>
            {activeServers.map(server => 
              <div 
                className='server'
                key={server.id}>
                {server.data.name}
              </div>
            )}
          </div>
          <button className='selserv-btn' onClick={handleSelServClick}>
            Select Active Servers
          </button>
        </div>
      )}

      
    </div>
  )
}

export default MozzQueue

// TODOS:
// 1. Select active servers from a list
// 2. User can add table to the queue with necessary information
///// a) Server, Table #, Notes
///// b) auto add current time on submit
// 3a. User fires select table on list to indicate leaving to that table
// 3b. Auto add current time on fire
// 3c. Timer starts for that queue item
// 3d. User can click finish on queue item to stop timer and end
// 3e (optional). display time took to complete
// 4. Reset Queue and servers back to nothing
//
// OPTIONAL: User can select MOZZ vs EXPO
//////// EXPO will be view only