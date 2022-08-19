import React, { useState, useEffect } from 'react'
import firebase from '../firebase'
import SelectServerBtn from './SelectServerBtn'

import { useCollectionDataOnce } from 'react-firebase-hooks/firestore'
import { query, collection, orderBy, onSnapshot } from 'firebase/firestore'

const db = firebase.firestore()

const SelectServers = ({ setIsSelServClicked }) => {

  const [servers, setServers] = useState([])

  useEffect(() => {
    loadServers()
  }, [])

  const loadServers = async() => {
    const serversQueryRef = query(collection(db, 'servers'), orderBy('name'))
    await onSnapshot(serversQueryRef, (snapshot) => {
      setServers(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  }

  const handleSelectServersSubmit = (e) => {
    e.preventDefault()

    setIsSelServClicked(false)
  }

  return(
    <div className="servers-container">
      {servers.map(server => (
        <SelectServerBtn
          key={server.id}
          id={server.id}
          name={server.data.name}
          active={server.data.active}
          // setActiveStatus={setActiveStatus()}
        />
      ))}
      <button
        className='assign-servers'
        onClick={handleSelectServersSubmit}>
        Assign Servers
      </button>
    </div>
  )
}

export default SelectServers