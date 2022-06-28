import React, { useState } from 'react'
import firebase from '../firebase'
import SelectServers from './SelectServers'

import { useCollectionData } from 'react-firebase-hooks/firestore'

const db = firebase.firestore()

const MozzQueue = () => {
  const [isSelServClicked, setIsSelServClicked] = useState(false)
  const [activeServers, setActiveServers] = useState([])

  const handleSelServClick = e => {
    e.preventDefault()

    setActiveServers([])
    setIsSelServClicked(true)
  }

  return (
    <div>
      {isSelServClicked ?
        <SelectServers
          setActiveServers={setActiveServers}
          setIsSelServClicked={setIsSelServClicked}
        /> : null
      }
      <h3>Active Servers</h3>
      {activeServers.map(s => <div key={s}>{s}</div>)}

      <button onClick={handleSelServClick}>Select Active Servers</button>
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